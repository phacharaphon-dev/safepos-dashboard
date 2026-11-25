import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../firebase';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SciFiEnvironment, HolographicHumanRig, CameraRig } from '../components/posture/HologramScene';
import { getSemanticTheme } from '../components/posture/postureTheme';
import { HudCallout, AngleSparkline } from '../components/posture/HudOverlays';

const USER_ID = 'user123';
const DEVICE_ID = 'CAM-01-OFFICE';
const POSE_STREAM_URL = 'http://127.0.0.1:5000/pose_stream';
const VIDEO_FEED_URL = 'http://127.0.0.1:5000/video_feed';

function formatSeconds(totalSec) {
  const s = Math.floor(Number(totalSec) || 0);
  const hours = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  return `${hours}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
}

function formatCountdown(totalSec) {
  const s = Math.max(0, Math.floor(Number(totalSec) || 0));
  const mins = String(Math.floor(s / 60)).padStart(2, '0');
  const secs = String(s % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

function getTodayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${USER_ID}_${y}-${m}-${d}`;
}

function playAlertSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    [880, 660].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.18);
      gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.18);
      osc.stop(ctx.currentTime + i * 0.18 + 0.3);
    });
  } catch (err) {
    console.error('Cannot play alert sound:', err);
  }
}

export default function Posture() {
  const [score, setScore] = useState(100);
  const [showDangerModal, setShowDangerModal] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [alertSignal, setAlertSignal] = useState(0);
  const riskThreshold = 30;

  const [deviceStatus, setDeviceStatus] = useState('Online');
  const [postureStateFromDB, setPostureStateFromDB] = useState('Normal');
  const [summary, setSummary] = useState({
    total_active_time_sec: 0,
    total_bad_posture_sec: 0,
    total_active_time_min: 0,
    total_bad_posture_min: 0,
    forward_head_percent: 0,
    slouching_percent: 0,
    static_percent: 0,
    alert_count: 0,
  });
  const [latestAngle, setLatestAngle] = useState(0);

  const isPopupEnabledRef = useRef(true);
  const isSoundEnabledRef = useRef(true);
  const lastAlertTsRef = useRef(null);

  const poseRef = useRef(null);
  const controlsRef = useRef(null);
  const calloutRefs = useRef({ ear: null, sho: null, hip: null });
  const handleProjectPins = useCallback((pins) => {
    ['ear', 'sho', 'hip'].forEach((key) => {
      const el = calloutRefs.current[key];
      const p = pins[key];
      if (!el || !p) return;
      el.style.opacity = p.visible ? '1' : '0';
      if (p.visible) {
        el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`;
      }
    });
  }, []);

  const [streamOnline, setStreamOnline] = useState(false);
  const [liveTelemetry, setLiveTelemetry] = useState({
    status: 'OFFLINE',
    posture: 'STANDBY',
    fps: 0,
    fh: 0,
    tr: 0,
    sp: 180,
    tracked: false,
  });
  const [fhHistory, setFhHistory] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [perspective, setPerspective] = useState('sagittal');
  const [showLabels, setShowLabels] = useState(true);
  const [showHologramShell, setShowHologramShell] = useState(true);
  const [showPip, setShowPip] = useState(true);

  useEffect(() => {
    let es = null;
    let lastUiUpdate = 0;
    let staleTimer = null;

    const connect = () => {
      es = new EventSource(POSE_STREAM_URL);
      es.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
          poseRef.current = data;
          setStreamOnline(true);

          if (staleTimer) clearTimeout(staleTimer);
          staleTimer = setTimeout(() => setStreamOnline(false), 3000);

          const now = performance.now();
          if (now - lastUiUpdate > 160) {
            lastUiUpdate = now;
            const fh = data.angles?.fh ?? 0;
            const tr = data.angles?.tr ?? 0;
            const sp = data.angles?.sp ?? 180;
            setLiveTelemetry({
              status: data.status || 'Normal',
              posture: data.posture || 'NORMAL',
              fps: data.fps ?? 0,
              fh,
              tr,
              sp,
              tracked: Boolean(data.tracked),
            });
            setFhHistory((prev) => [...prev.slice(-19), fh]);
          }
        } catch {
          // ignore malformed frames
        }
      };

      es.onerror = () => {
        setStreamOnline(false);
      };
    };

    connect();
    return () => {
      if (es) es.close();
      if (staleTimer) clearTimeout(staleTimer);
    };
  }, []);

  useEffect(() => {
    const deviceRef = ref(rtdb, `Devices/${DEVICE_ID}`);
    const unsubDevice = onValue(deviceRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setDeviceStatus(data.status || 'Online');
        setCooldownUntil(Number(data.cooldown_until || 0));

        const incomingAlertTs = Number(data.last_alert_ts || 0);
        if (lastAlertTsRef.current === null) {
          lastAlertTsRef.current = incomingAlertTs;
        } else if (incomingAlertTs > lastAlertTsRef.current) {
          lastAlertTsRef.current = incomingAlertTs;
          setAlertSignal(incomingAlertTs);
        }

        const rawStatus = data.current_posture_status || data.current_posture || 'Normal';
        const normalizedStatus = String(rawStatus).trim().toLowerCase();
        const realTimeScore = data.live_score;
        let finalScore;

        if (realTimeScore !== undefined) {
          finalScore = Number(realTimeScore);
        } else if (normalizedStatus === 'critical') {
          finalScore = 0;
        } else if (normalizedStatus === 'warning') {
          finalScore = 60;
        } else {
          finalScore = 100;
        }

        setScore(finalScore);

        if (finalScore <= 30) {
          setPostureStateFromDB('Critical');
        } else if (finalScore <= 60) {
          setPostureStateFromDB('Warning');
        } else {
          setPostureStateFromDB('Normal');
          setShowDangerModal(false);
        }
      }
    });

    const todaySummaryRef = ref(rtdb, `Daily_Summaries/${getTodayKey()}`);
    const unsubSummaries = onValue(todaySummaryRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setSummary({
          total_active_time_sec: data.total_active_time_sec ?? Math.floor((data.total_active_time_min || 0) * 60),
          total_bad_posture_sec: data.total_bad_posture_sec ?? Math.floor((data.total_bad_posture_min || 0) * 60),
          total_active_time_min: data.total_active_time_min || 0,
          total_bad_posture_min: data.total_bad_posture_min || 0,
          forward_head_percent: data.forward_head_percent ?? 0,
          slouching_percent: data.slouching_percent ?? 0,
          static_percent: data.static_percent ?? 0,
          alert_count: data.alert_count || 0,
        });
      }
    });

    const logsRef = ref(rtdb, 'Event_Logs');
    const unsubLogs = onValue(logsRef, (snapshot) => {
      if (snapshot.exists()) {
        const logs = Object.values(snapshot.val()).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        if (logs.length > 0 && logs[0].max_angle) {
          setLatestAngle(logs[0].max_angle);
        }
      }
    });

    const settingsRef = ref(rtdb, `Users/${USER_ID}/settings`);
    const unsubSettings = onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const s = snapshot.val();
        if (typeof s.is_popup_enabled === 'boolean') isPopupEnabledRef.current = s.is_popup_enabled;
        if (typeof s.is_sound_enabled === 'boolean') isSoundEnabledRef.current = s.is_sound_enabled;
      }
    });

    return () => {
      unsubDevice();
      unsubSummaries();
      unsubLogs();
      unsubSettings();
    };
  }, []);

  useEffect(() => {
    if (alertSignal <= 0) return;
    if (isPopupEnabledRef.current) {
      setShowDangerModal(true);
    }
    if (isSoundEnabledRef.current) {
      playAlertSound();
    }
  }, [alertSignal]);

  useEffect(() => {
    const tick = () => {
      const remain = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
      setCooldownTimeLeft(remain);
      setIsCooldown(remain > 0);
    };
    tick();
    if (!cooldownUntil) return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [cooldownUntil]);

  const isNormal = postureStateFromDB === 'Normal';
  const isWarning = postureStateFromDB === 'Warning';
  const dbSemantic = getSemanticTheme(postureStateFromDB);
  const statusColor = dbSemantic.hex;
  const statusGlow = dbSemantic.glow;
  const statusText = isNormal ? 'Normal' : isWarning ? 'Warning' : 'Critical';
  const statusThaiTitle = isNormal
    ? 'ท่าทางของคุณอยู่ในเกณฑ์ที่ดี'
    : isWarning
    ? 'เริ่มนั่งหลังค่อม กรุณาปรับท่านั่ง'
    : 'ท่านั่งอันตราย! เสี่ยงออฟฟิศซินโดรม';
  const statusThaiSub = isNormal
    ? 'รักษาสมดุลกระดูกสันหลังต่อไปครับ'
    : isWarning
    ? 'ยืดหลังตรงและปรับระดับสายตา'
    : 'กรุณาปรับท่านั่งให้ถูกต้องทันที';

  const radius = 57;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const hudTheme = getSemanticTheme(liveTelemetry.tracked ? liveTelemetry.status : 'Normal');
  const activePosture = liveTelemetry.tracked ? liveTelemetry.posture : 'NORMAL';
  const liveFh = liveTelemetry.tracked ? liveTelemetry.fh : latestAngle;
  const liveTr = liveTelemetry.tracked ? liveTelemetry.tr : 0;
  const liveSp = liveTelemetry.tracked ? liveTelemetry.sp : 180;

  const activeSec = Math.max(1, Number(summary.total_active_time_sec) || 0);
  const badSec = Math.min(activeSec, Number(summary.total_bad_posture_sec) || 0);
  const healthyRatio = summary.total_active_time_sec > 0 ? Math.max(0, Math.round(((activeSec - badSec) / activeSec) * 100)) : 100;

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#070514] font-sans text-white selection:bg-purple-500 selection:text-white">
      <div className="pointer-events-none absolute top-[-12%] left-[12%] w-[680px] h-[360px] bg-violet-600/20 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute bottom-[-12%] right-[12%] w-[560px] h-[360px] bg-indigo-600/15 blur-[140px] rounded-full" />

      {showDangerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg p-4 transition-opacity duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0d0a1f]/95 border border-rose-500/60 p-7 text-center shadow-[0_0_70px_rgba(244,63,94,0.35)] backdrop-blur-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 ring-4 ring-rose-500/20 animate-pulse">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-wide">แจ้งเตือนท่านั่งอันตราย!</h3>
            <p className="mt-2 text-sm text-slate-200 leading-relaxed">
              สถานะท่านั่งของคุณอยู่ในระดับความเสี่ยง (<span className="text-rose-400 font-bold tabular-nums">{score}%</span>) กรุณาปรับท่านั่งให้หลังตรงเพื่อป้องกันออฟฟิศซินโดรมครับ
            </p>
            <button
              onClick={() => setShowDangerModal(false)}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 px-6 py-3 text-sm font-bold text-white shadow-[0_0_25px_rgba(244,63,94,0.45)] hover:from-rose-600 hover:to-rose-700 transition active:scale-[0.98]"
            >
              รับทราบและปรับท่านั่ง
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-20 w-full px-8 py-3.5 flex items-center justify-between border-b border-white/10 bg-[#070514]/80 backdrop-blur-2xl">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center shadow-[0_0_18px_rgba(139,92,246,0.5)] border border-white/20">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 4.5l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5L12 6.5z" />
            </svg>
          </div>
          <div className="flex items-center tracking-wider text-xl font-black uppercase">
            <span className="text-white">SAFE</span>
            <span className="text-violet-400">POSTURE</span>
          </div>
        </div>

        <div className="flex items-center space-x-3.5">
          {isCooldown && (
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/45 text-amber-300 text-xs font-semibold tabular-nums backdrop-blur-md">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Alert Snoozed ({formatCountdown(cooldownTimeLeft)})</span>
            </div>
          )}
          <button className="relative w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-rose-500 text-[10px] font-bold tabular-nums rounded-full border border-[#070514]">
              {summary.alert_count ?? 0}
            </span>
          </button>
          <Link to="/profile" className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/15 p-0.5 flex items-center justify-center hover:border-violet-400 transition overflow-hidden">
            <img alt="User avatar" className="w-full h-full rounded-full object-cover" src="/profile.jpg" />
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full px-6 py-4 flex gap-5 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-56 flex flex-col justify-between py-4 px-3 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)] shrink-0">
          <nav className="flex flex-col space-y-2 w-full">
            <Link to="/" className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link to="/posture" className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl bg-violet-500/20 text-white font-semibold border border-violet-400/50 shadow-[0_0_16px_rgba(139,92,246,0.25)] transition">
              <svg className="w-5 h-5 text-violet-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v4m6-4v4M9 17v4m6-4v4M3 9h4m-4 6h4m10-6h4m-4 6h4" /></svg>
              <span className="text-sm">Live AI Analysis</span>
            </Link>
            <Link to="/analytics" className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              <span className="text-sm font-medium">Reports</span>
            </Link>
            <Link to="/settings" className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-sm font-medium">Settings</span>
            </Link>
            <Link to="/profile" className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span className="text-sm font-medium">Users</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            </Link>
          </nav>
          <a href="#logout" className="flex items-center space-x-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition mt-auto">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span className="text-xs font-medium">Sign out</span>
          </a>
        </aside>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col overflow-y-auto pr-1">
          <div className="mb-4 shrink-0 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">3D Posture Analysis</h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Real-time YOLOv8s-pose &amp; CiRA CORE biomechanical telemetry
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono tabular-nums">
              <span
                className={`px-3 py-1.5 rounded-full border flex items-center gap-2 transition-colors duration-300 ${
                  deviceStatus === 'Online'
                    ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-400/40 text-rose-300'
                }`}
              >
                <span className="relative flex h-2 w-2">
                  {deviceStatus === 'Online' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${deviceStatus === 'Online' ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                </span>
                {deviceStatus === 'Online' ? 'TRACKING ACTIVE' : 'CAMERA OFFLINE'}
              </span>

              <span
                className={`px-3 py-1.5 rounded-full border backdrop-blur-md flex items-center gap-2 transition-colors duration-300 ${
                  streamOnline
                    ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-200'
                    : 'bg-slate-800/70 border-slate-600/50 text-slate-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${streamOnline ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'}`} />
                {streamOnline ? `CIRACORE LIVE · ${liveTelemetry.fps.toFixed(0)} FPS` : 'STREAM STANDBY'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.62fr_0.98fr] gap-5 flex-1 min-h-[560px]">
            {/* Left: Integrated 3D Holographic HUD Viewport */}
            <section className="relative rounded-3xl p-2 bg-white/[0.03] backdrop-blur-3xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden min-h-[540px]">
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-[radial-gradient(circle_at_center,_#160c36_0%,_#060411_76%)] border border-violet-500/25 cursor-move">
                <Canvas camera={{ position: [0.25, 0.35, 3.1], fov: 42 }}>
                  <ambientLight intensity={0.75} />
                  <pointLight position={[2, 3, 2]} intensity={1.2} color="#8b5cf6" />

                  <Suspense fallback={null}>
                    <SciFiEnvironment />
                    <HolographicHumanRig
                      poseRef={poseRef}
                      latestAngle={latestAngle}
                      showHologramShell={showHologramShell}
                      onProjectPins={handleProjectPins}
                    />
                  </Suspense>

                  <CameraRig perspective={perspective} controlsRef={controlsRef} />
                  <OrbitControls ref={controlsRef} target={[0.2, 0.25, 0]} enablePan enableZoom enableRotate />
                </Canvas>

                {/* 3D-Projected Medical Telemetry Callouts */}
                {showLabels && (
                  <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
                    <div
                      ref={(el) => {
                        calloutRefs.current.ear = el;
                      }}
                      className="absolute top-0 left-0 will-change-transform transition-opacity duration-200"
                      style={{ opacity: 0 }}
                    >
                      <HudCallout
                        side="right"
                        title="Forward head"
                        percent={summary.forward_head_percent ?? 0}
                        statusText={activePosture === 'FORWARD_HEAD' ? 'Critical strain' : 'Cervical nominal'}
                        subText={`Cervical tilt: ${liveFh >= 0 ? '+' : ''}${Number(liveFh).toFixed(1)}°`}
                        tone={activePosture === 'FORWARD_HEAD' ? 'rose' : 'cyan'}
                      />
                    </div>

                    <div
                      ref={(el) => {
                        calloutRefs.current.sho = el;
                      }}
                      className="absolute top-0 left-0 will-change-transform transition-opacity duration-200"
                      style={{ opacity: 0 }}
                    >
                      <HudCallout
                        side="left"
                        title="Slouching"
                        percent={summary.slouching_percent ?? 0}
                        statusText={activePosture === 'SLOUCHING' ? 'Slouch detected' : 'Thoracic aligned'}
                        subText={`Trunk: ${Number(liveTr).toFixed(1)}° | Spine: ${Number(liveSp).toFixed(0)}°`}
                        tone={activePosture === 'SLOUCHING' ? 'rose' : 'emerald'}
                      />
                    </div>

                    <div
                      ref={(el) => {
                        calloutRefs.current.hip = el;
                      }}
                      className="absolute top-0 left-0 will-change-transform transition-opacity duration-200"
                      style={{ opacity: 0 }}
                    >
                      <HudCallout
                        side="left"
                        title="Prolonged static"
                        percent={summary.static_percent ?? 0}
                        statusText={(summary.static_percent ?? 0) >= 50 ? 'Break recommended' : 'Optimal alignment'}
                        subText="Lumbar support seated"
                        tone={(summary.static_percent ?? 0) >= 50 ? 'amber' : 'emerald'}
                      />
                    </div>
                  </div>
                )}

                {/* Crisp Medical Corner Reticles */}
                <div className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-violet-400/50 rounded-tl" />
                <div className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-violet-400/50 rounded-tr" />
                <div className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-violet-400/50 rounded-bl" />
                <div className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-violet-400/50 rounded-br" />

                {/* Top Cohesive HUD Header Strip */}
                <div className="pointer-events-none absolute top-4 inset-x-4 z-20 flex items-start justify-between gap-4">
                  <div className="pointer-events-auto flex items-center gap-2.5 bg-[#09071a]/88 backdrop-blur-xl px-3.5 py-2 rounded-xl border border-white/15 shadow-lg">
                    <span className={`w-2 h-2 rounded-full ${hudTheme.dot} animate-pulse`} />
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">Biomechanics HUD v2.4</span>
                      <span className="text-slate-600">|</span>
                      <span className={`text-[11px] font-bold uppercase ${hudTheme.text}`}>{hudTheme.label}</span>
                    </div>
                  </div>

                  {isCooldown && cooldownTimeLeft > 0 && (
                    <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/55 backdrop-blur-xl shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                      </span>
                      <span className="text-[11px] font-bold tracking-wider uppercase text-amber-200">COOLDOWN</span>
                      <span className="text-sm font-black font-mono tabular-nums text-white bg-amber-500/25 px-2 py-0.5 rounded-md border border-amber-400/40">
                        {formatCountdown(cooldownTimeLeft)}
                      </span>
                    </div>
                  )}

                  <div className="pointer-events-auto w-60 bg-[#09071a]/88 backdrop-blur-xl p-3.5 rounded-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.55)] font-mono">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider border-b border-white/10 pb-2 mb-2">
                      <span className="text-slate-300 font-semibold">Live Kinematics</span>
                      <span className={`font-bold ${hudTheme.text}`}>{liveTelemetry.posture}</span>
                    </div>

                    <div className="bg-[#05030e]/90 rounded-xl px-2.5 py-2 border border-white/10 mb-2.5">
                      <AngleSparkline values={fhHistory} color={hudTheme.key === 'normal' ? '#22d3ee' : hudTheme.hex} />
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 text-center mb-2.5">
                      <div className="bg-white/[0.04] rounded-lg py-1.5 px-1 border border-white/10">
                        <div className="text-[10px] font-semibold text-slate-300 tracking-wider">CVA</div>
                        <div className="text-sm font-bold text-white tabular-nums mt-0.5">{Number(liveTelemetry.fh).toFixed(1)}°</div>
                      </div>
                      <div className="bg-white/[0.04] rounded-lg py-1.5 px-1 border border-white/10">
                        <div className="text-[10px] font-semibold text-slate-300 tracking-wider">TRUNK</div>
                        <div className="text-sm font-bold text-white tabular-nums mt-0.5">{Number(liveTelemetry.tr).toFixed(1)}°</div>
                      </div>
                      <div className="bg-white/[0.04] rounded-lg py-1.5 px-1 border border-white/10">
                        <div className="text-[10px] font-semibold text-slate-300 tracking-wider">SPINE</div>
                        <div className="text-sm font-bold text-white tabular-nums mt-0.5">{Number(liveTelemetry.sp).toFixed(0)}°</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => setShowLabels((v) => !v)}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition ${
                          showLabels ? 'bg-violet-500/25 border-violet-400/60 text-white' : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        Labels
                      </button>
                      <button
                        onClick={() => setShowHologramShell((v) => !v)}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition ${
                          showHologramShell ? 'bg-violet-500/25 border-violet-400/60 text-white' : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        Holo
                      </button>
                      <button
                        onClick={() => setShowPip((v) => !v)}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition ${
                          showPip ? 'bg-cyan-500/20 border-cyan-400/55 text-cyan-200' : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        PiP
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Cohesive HUD Bar */}
                <div className="pointer-events-none absolute bottom-4 inset-x-4 z-20 flex items-end justify-between gap-4">
                  <div>
                    {showPip && (
                      <div className="pointer-events-auto inline-flex flex-col w-auto max-w-[230px] sm:max-w-[270px] rounded-2xl overflow-hidden border border-white/15 bg-[#09071a]/92 backdrop-blur-xl shadow-[0_8px_28px_rgba(0,0,0,0.65)] transition-all duration-200">
                        <div className="px-3 py-1.5 bg-white/[0.04] border-b border-white/10 flex items-center justify-between gap-3 text-[11px] font-mono text-slate-200">
                          <span className="truncate font-semibold">CIRACORE // YOLOv8s-POSE</span>
                          <span className="flex items-center gap-1.5 shrink-0 text-[10px] text-emerald-300 tabular-nums">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            LIVE
                          </span>
                        </div>
                        <img
                          src={VIDEO_FEED_URL}
                          alt="DroidCam Pose Feed"
                          className="block max-h-[185px] w-auto max-w-full object-contain bg-black"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pointer-events-auto flex items-center gap-1.5 bg-[#09071a]/90 backdrop-blur-xl p-1.5 rounded-xl border border-white/15 font-mono text-xs shadow-lg">
                    <span className="px-2 text-[11px] text-slate-400 uppercase tracking-wider">View</span>
                    <button
                      onClick={() => setPerspective('sagittal')}
                      className={`px-3 py-1 rounded-lg transition font-semibold ${
                        perspective === 'sagittal'
                          ? 'bg-violet-500/25 text-white border border-violet-400/50'
                          : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      Sagittal (Side)
                    </button>
                    <button
                      onClick={() => setPerspective('coronal')}
                      className={`px-3 py-1 rounded-lg transition font-semibold ${
                        perspective === 'coronal'
                          ? 'bg-violet-500/25 text-white border border-violet-400/50'
                          : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      Coronal (Front)
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Sidebar: High-Precision Telemetry Bento */}
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CURRENT STATUS */}
                <div
                  className="relative rounded-3xl bg-white/[0.04] backdrop-blur-3xl border border-white/10 p-4 flex flex-col justify-between items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-colors duration-300"
                  style={{ borderTopColor: statusColor }}
                >
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-100">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-200">Current Status</span>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${dbSemantic.badgeBg} ${dbSemantic.text}`}>
                      {isNormal ? 'SAFE' : isWarning ? 'WARN' : 'RISK'}
                    </span>
                  </div>

                  <div className="my-3 flex items-center justify-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center border-[3px] transition-all duration-300"
                      style={{
                        borderColor: statusColor,
                        boxShadow: `0 0 24px ${statusGlow}, inset 0 0 14px ${statusGlow}`,
                        background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.35) 80%)',
                      }}
                    >
                      {isNormal ? (
                        <svg className="w-8 h-8 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className={`w-8 h-8 ${isWarning ? 'text-amber-300' : 'text-rose-400 animate-pulse'}`} fill="none" stroke="currentColor" strokeWidth="2.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black tracking-wide text-white" style={{ textShadow: `0 0 14px ${statusGlow}` }}>
                      {statusText}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-slate-100 leading-snug">{statusThaiTitle}</p>
                    <p className="mt-0.5 text-xs text-slate-300">{statusThaiSub}</p>
                  </div>
                </div>

                {/* POSTURE SCORE */}
                <div className="relative rounded-3xl bg-white/[0.04] backdrop-blur-3xl border border-white/10 p-4 flex flex-col justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-100 shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /></svg>
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-200">Posture Score</span>
                    </div>
                    <span className="text-[11px] font-mono tabular-nums text-slate-300">
                      Min <strong className="text-rose-400">{riskThreshold}%</strong>
                    </span>
                  </div>

                  <div className="relative flex items-center justify-center my-2">
                    <div
                      className="relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        boxShadow: `0 0 24px ${statusGlow}, inset 0 0 14px ${statusGlow}`,
                        background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.35) 80%)',
                      }}
                    >
                      <svg className="w-24 h-24 -rotate-90 transform overflow-visible" viewBox="0 0 124 124">
                        <circle cx="62" cy="62" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="transparent" />
                        <circle
                          cx="62"
                          cy="62"
                          r={radius}
                          stroke={statusColor}
                          strokeWidth="8"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-[stroke-dashoffset,stroke] duration-500 ease-out"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-white tracking-tight tabular-nums">{score}%</span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">Index</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between text-[11px] text-slate-300 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/10">
                    <span>Alert Threshold</span>
                    <span className="font-mono font-bold text-rose-400 tabular-nums">{riskThreshold}%</span>
                  </div>
                </div>
              </div>

              {/* Unified DAILY SUMMARY Telemetry Bento */}
              <div className="flex-1 rounded-3xl bg-white/[0.04] backdrop-blur-3xl border border-white/10 p-5 flex flex-col justify-between gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-400/35 flex items-center justify-center text-violet-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    </div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100">Daily Telemetry Summary</h2>
                  </div>
                  <span className="text-[11px] font-mono tabular-nums text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
                    {healthyRatio}% Optimal
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 rounded-2xl bg-[#0a0818]/75 border border-white/10 border-l-4 border-l-cyan-400 px-4 py-3.5 flex items-center justify-between hover:bg-white/[0.05] transition">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 block">
                        Total Active Time
                      </span>
                      <p className="text-2xl sm:text-[26px] font-black text-white mt-1 tracking-tight font-mono tabular-nums">
                        {formatSeconds(summary.total_active_time_sec)}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" /></svg>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#0a0818]/75 border border-white/10 border-l-4 border-l-amber-400 px-4 py-3.5 flex flex-col justify-between hover:bg-white/[0.05] transition">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 leading-tight">
                        Bad Posture
                      </span>
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    </div>
                    <p className="text-xl sm:text-2xl font-black text-amber-300 mt-2 tracking-tight font-mono tabular-nums">
                      {formatSeconds(summary.total_bad_posture_sec)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#0a0818]/75 border border-white/10 border-l-4 border-l-rose-500 px-4 py-3.5 flex flex-col justify-between hover:bg-white/[0.05] transition">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 leading-tight">
                        Alerts Triggered
                      </span>
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    </div>
                    <p className="text-xl sm:text-2xl font-black text-white mt-2 tracking-tight font-mono tabular-nums">
                      {summary.alert_count ?? 0}{' '}
                      <span className="text-xs font-semibold text-rose-300 uppercase">times</span>
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#0a0818]/75 border border-white/10 p-3.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 mb-2">
                    <span className="uppercase tracking-wider">Posture Strain Breakdown</span>
                    <span className="tabular-nums text-slate-200">FH {summary.forward_head_percent ?? 0}% · SL {summary.slouching_percent ?? 0}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden flex">
                    <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${healthyRatio}%` }} title="Optimal Alignment" />
                    <div
                      className="h-full bg-rose-500 transition-all duration-500"
                      style={{ width: `${Math.min(100 - healthyRatio, summary.forward_head_percent ?? 0)}%` }}
                      title="Forward Head"
                    />
                    <div
                      className="h-full bg-amber-400 transition-all duration-500"
                      style={{ width: `${Math.min(100, summary.slouching_percent ?? 0)}%` }}
                      title="Slouching"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 mt-2">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" />Optimal</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" />Forward Head</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" />Slouching</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
