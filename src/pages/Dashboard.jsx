import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../firebase';

const USER_ID = 'user123';
const DEVICE_ID = 'CAM-01-OFFICE';

function formatMinutes(totalMin) {
  const m = Number(totalMin) || 0;
  const hours = Math.floor(m / 60);
  const mins = m % 60;
  return `${hours}h ${mins}m`;
}

export default function Dashboard() {
  const [score, setScore] = useState(100);
  const [showDangerModal, setShowDangerModal] = useState(false);
  const [hasAlerted, setHasAlerted] = useState(false);
  
  // 🔴 เพิ่ม State สำหรับจัดการ Cooldown ของป๊อปอัป
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0); 
  
  const riskThreshold = 50;

  // State สำหรับเก็บข้อมูลจาก Firebase
  const [deviceStatus, setDeviceStatus] = useState('Online');
  const [postureStateFromDB, setPostureStateFromDB] = useState('Normal');
  const [summary, setSummary] = useState({
    total_active_time_min: 0,
    total_bad_posture_min: 0,
    alert_count: 0,
  });
  const [isPopupEnabled, setIsPopupEnabled] = useState(true);

  // เชื่อมต่อ Firebase Realtime Database
  useEffect(() => {
    const deviceRef = ref(rtdb, `Devices/${DEVICE_ID}`);
    const unsubDevice = onValue(deviceRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setDeviceStatus(data.status || 'Online');
        
        const rawStatus = data.current_posture_status || data.current_posture || 'Normal';
        const normalizedStatus = String(rawStatus).trim().toLowerCase();

        if (normalizedStatus === 'critical') {
          setPostureStateFromDB('Critical');
          setScore(0);
        } else if (normalizedStatus === 'warning') {
          setPostureStateFromDB('Warning');
          setScore(60);
        } else {
          setPostureStateFromDB('Normal');
          setScore(100);
        }
      }
    });

    const summariesRef = ref(rtdb, 'Daily_Summaries');
    const unsubSummaries = onValue(summariesRef, (snapshot) => {
      if (snapshot.exists()) {
        const allSummaries = snapshot.val();
        const userKeys = Object.keys(allSummaries)
          .filter((k) => k.startsWith(`${USER_ID}_`))
          .sort();
        if (userKeys.length > 0) {
          const latestKey = userKeys[userKeys.length - 1];
          setSummary(allSummaries[latestKey]);
        }
      }
    });

    const settingsRef = ref(rtdb, `Users/${USER_ID}/settings`);
    const unsubSettings = onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const s = snapshot.val();
        if (typeof s.is_popup_enabled === 'boolean') {
          setIsPopupEnabled(s.is_popup_enabled);
        }
      }
    });

    return () => {
      unsubDevice();
      unsubSummaries();
      unsubSettings();
    };
  }, []);

  // 🔴 อัปเกรดระบบแสดงผล Pop-up (เพิ่ม หน่วงเวลา และ คูลดาวน์)
  useEffect(() => {
    let graceTimer;

    // ถ้าคะแนนวิกฤต และไม่ได้แจ้งเตือนอยู่ และไม่ได้ติดคูลดาวน์
    if (score <= riskThreshold && !hasAlerted && !isCooldown) {
      if (isPopupEnabled) {
        // ให้เวลา 3 วินาที (Grace Period) เผื่อกำลังนั่งหรือก้มหยิบของ
        graceTimer = setTimeout(() => {
          setShowDangerModal(true);
          setHasAlerted(true);
        }, 3000); 
      }
    } else if (score > riskThreshold) {
      // ถ้านั่งตรงก่อนหมดเวลา 3 วินาที ให้ยกเลิกป๊อปอัป
      setHasAlerted(false);
      clearTimeout(graceTimer);
    }

    return () => clearTimeout(graceTimer);
  }, [score, hasAlerted, isPopupEnabled, isCooldown]);

  // ฟังก์ชันอัปเดตเวลานับถอยหลัง Cooldown (ถ้าจำเป็นต้องใช้โชว์)
  useEffect(() => {
    let countdownInterval;
    if (isCooldown && cooldownTimeLeft > 0) {
      countdownInterval = setInterval(() => {
        setCooldownTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (cooldownTimeLeft === 0) {
      setIsCooldown(false);
      clearInterval(countdownInterval);
    }
    return () => clearInterval(countdownInterval);
  }, [isCooldown, cooldownTimeLeft]);

  const isNormal = postureStateFromDB === 'Normal';
  const isWarning = postureStateFromDB === 'Warning';
  const isCritical = postureStateFromDB === 'Critical';

  const statusColor = isNormal ? '#a855f7' : isWarning ? '#f59e0b' : '#f43f5e';
  const statusGlow = isNormal ? 'rgba(168,85,247,0.6)' : isWarning ? 'rgba(245,158,11,0.6)' : 'rgba(244,63,94,0.6)';
  const statusText = isNormal ? 'Normal' : isWarning ? 'Warning' : 'Critical';
  const statusThaiTitle = isNormal
    ? 'ท่าทางของคุณอยู่ในเกณฑ์ที่ดี'
    : isWarning
    ? 'เริ่มนั่งหลังค่อม กรุณาปรับท่านั่ง'
    : 'ท่านั่งอันตราย! เสี่ยงออฟฟิศซินโดรม';
  const statusThaiSub = isNormal
    ? 'รักษาพฤติกรรมต่อไปนะครับ/ค่ะ 😊'
    : isWarning
    ? 'ยืดหลังตรงและปรับระดับสายตานะครับ ⚠️'
    : 'กรุณาปรับท่านั่งให้ถูกต้องทันที! 🚨';

  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#070514] font-sans text-white selection:bg-purple-500 selection:text-white">
      <div className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[300px] bg-purple-700/20 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-indigo-700/15 blur-[120px] rounded-full" />
      
      <svg className="pointer-events-none absolute top-0 left-0 w-full h-44 opacity-40" viewBox="0 0 1440 200" fill="none">
        <path d="M-100 160 C 300 40, 800 180, 1540 20" stroke="url(#neonWave)" strokeWidth="2.5" filter="drop-shadow(0 0 12px #a855f7)" />
        <path d="M200 0 C 600 150, 1050 -30, 1540 120" stroke="url(#neonWave2)" strokeWidth="1.5" />
        <defs>
          <linearGradient id="neonWave" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="80%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="neonWave2" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="60%" stopColor="#ec4899" stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* POP-UP แจ้งเตือนอันตราย */}
      {showDangerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-[28px] bg-[#120d2b] border-2 border-rose-500 p-7 text-center shadow-[0_0_70px_rgba(244,63,94,0.6)]">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/20 text-rose-500 ring-8 ring-rose-500/10 animate-bounce">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-wide">
              แจ้งเตือนท่านั่งอันตราย!
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              สถานะท่านั่งของคุณอยู่ในระดับความเสี่ยง (<span className="text-rose-400 font-bold">{score}% Critical</span>) กรุณาปรับท่านั่งให้หลังตรงเพื่อป้องกันออฟฟิศซินโดรมครับ
            </p>
            <button
              onClick={() => {
                setShowDangerModal(false);
                // 🔴 เมื่อกดปิด ให้เริ่มนับ Cooldown 60 วินาที (จะไม่เด้งกวนใจอีก)
                setIsCooldown(true);
                setCooldownTimeLeft(60); 
              }}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-3 font-bold text-white shadow-[0_0_25px_rgba(244,63,94,0.5)] hover:from-rose-600 hover:to-pink-700 transition active:scale-95"
            >
              ปิดหน้าต่างแจ้งเตือน
            </button>
          </div>
        </div>
      )}

      {/* TOP BAR */}
      <header className="relative z-20 w-full px-8 py-4 flex items-center justify-between border-b border-purple-500/20 bg-[#070514]/70 backdrop-blur-md">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.7)] border border-purple-300/40">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 4.5l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5L12 6.5z" />
            </svg>
          </div>
          <div className="flex items-center tracking-wider text-2xl font-black uppercase">
            <span className="text-white">SAFE</span>
            <span className="text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]">POSTURE</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          
          {/* 🔴 เพิ่ม Badge แสดงสถานะ Cooldown (ซ่อนอยู่ถ้าไม่มีคูลดาวน์) */}
          {isCooldown && (
             <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold animate-pulse">
               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <span>Alert Snoozed ({cooldownTimeLeft}s)</span>
             </div>
          )}

          <button className="relative w-10 h-10 rounded-full bg-[#130f29] border border-purple-500/30 flex items-center justify-center text-slate-200 hover:text-white hover:border-purple-400 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-fuchsia-600 text-[10px] font-bold rounded-full border border-[#070514] shadow-[0_0_8px_#d946ef]">
              {summary.alert_count ?? 0}
            </span>
          </button>

          <Link to="/profile" className="w-10 h-10 rounded-full bg-[#130f29] border border-purple-500/30 p-0.5 flex items-center justify-center hover:border-purple-400 transition overflow-hidden">
            <img alt="User avatar" className="w-full h-full rounded-full object-cover" src="/profile.jpg" />
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT SHELL */}
      <main className="relative z-10 flex-1 w-full px-6 py-5 flex gap-7 overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-60 flex flex-col justify-between py-5 px-3.5 rounded-[26px] bg-[#0d0920]/90 border border-purple-500/25 shadow-[0_0_35px_rgba(0,0,0,0.8)] backdrop-blur-xl shrink-0">
          <nav className="flex flex-col space-y-2.5 w-full">
            <Link to="/" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600/35 to-indigo-600/20 text-white font-semibold border border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition">
              <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm">Dashboard</span>
            </Link>

            <Link to="/posture" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-purple-500/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="7" y="7" width="10" height="10" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v4m6-4v4M9 17v4m6-4v4M3 9h4m-4 6h4m10-6h4m-4 6h4" />
              </svg>
              <span className="text-sm font-medium">Live AI Analysis</span>
            </Link>

            <Link to="/analytics" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-purple-500/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm font-medium">Reports</span>
            </Link>

            <Link to="/settings" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-purple-500/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">Settings</span>
            </Link>

            <Link to="/profile" className="flex items-center justify-between px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-purple-500/10 transition">
              <div className="flex items-center space-x-3.5">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium">Users</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]"></span>
            </Link>
          </nav>

          <a href="#logout" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition mt-auto">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </a>
        </aside>

        {/* DASHBOARD BODY CONTENT */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-1">
          <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
            
            <div className="mb-5">
              <h1 className="text-3xl font-extrabold text-white tracking-wide">
                Dashboard
              </h1>
              <p className="text-sm text-slate-300 mt-1">
                ภาพรวมการวิเคราะห์ท่าทางแบบเรียลไทม์
              </p>
              <div className="mt-2.5 h-1.5 w-14 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_12px_#a855f7]" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_1fr_1.05fr] gap-6 flex-1 items-stretch min-h-[520px]">
              
              {/* COLUMN 1: LIVE CAMERA VIEW */}
              <div className="relative rounded-[28px] bg-[#100b26]/90 border-2 border-purple-500/50 shadow-[0_0_35px_rgba(168,85,247,0.25)] p-5 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between z-10 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600/25 border border-purple-400/50 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 4h3l2-2h6l2 2h3a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm8 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white tracking-wide">
                        Live camera view
                      </h2>
                      <div className="flex items-center space-x-1.5 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-[#00f5a0] animate-pulse shadow-[0_0_8px_#00f5a0]" />
                        <span className="text-[11px] font-bold tracking-wider text-[#00f5a0] uppercase">
                          {deviceStatus === 'Online' ? 'TRACKING ACTIVE' : 'CAMERA OFFLINE'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-400 transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>

                <div className="relative flex-1 w-full rounded-[22px] overflow-hidden bg-[#080614] border border-purple-500/20 flex items-center justify-center min-h-[360px] p-2">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(126,34,206,0.22)_0%,rgba(8,6,20,0.95)_75%)] pointer-events-none" />

                  <div className="relative w-full h-full flex items-center justify-center rounded-[16px] overflow-hidden">
                    <div className="absolute top-0 left-0 w-7 h-7 border-t-[3px] border-l-[3px] border-purple-400 rounded-tl-[16px] shadow-[-2px_-2px_10px_rgba(168,85,247,0.6)] z-20" />
                    <div className="absolute top-0 right-0 w-7 h-7 border-t-[3px] border-r-[3px] border-purple-400 rounded-tr-[16px] shadow-[2px_-2px_10px_rgba(168,85,247,0.6)] z-20" />
                    <div className="absolute bottom-0 left-0 w-7 h-7 border-b-[3px] border-l-[3px] border-purple-400 rounded-bl-[16px] shadow-[-2px_2px_10px_rgba(168,85,247,0.6)] z-20" />
                    <div className="absolute bottom-0 right-0 w-7 h-7 border-b-[3px] border-r-[3px] border-purple-400 rounded-br-[16px] shadow-[2px_2px_10px_rgba(168,85,247,0.6)] z-20" />

                    <img 
                      src="http://127.0.0.1:5000/video_feed" 
                      alt="Live Posture AI Feed" 
                      className="absolute inset-0 w-full h-full object-cover z-10 opacity-90"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/800x600/080614/a855f7?text=CAMERA+OFFLINE";
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* COLUMN 2: CURRENT STATUS & POSTURE SCORE */}
              <div className="flex flex-col gap-5 justify-between">
                
                {/* Box 1: CURRENT STATUS */}
                <div className="relative flex-1 rounded-[26px] bg-[#100b26]/90 border border-purple-500/35 p-5 flex flex-col justify-between items-center text-center shadow-[0_0_30px_rgba(0,0,0,0.6)] overflow-hidden">
                  <div className="w-full flex items-center space-x-2 text-left">
                    <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      CURRENT STATUS
                    </span>
                  </div>

                  <div className="relative my-2 flex items-center justify-center">
                    <div
                      className="w-28 h-28 rounded-full flex items-center justify-center border-4 transition-all duration-300"
                      style={{
                        borderColor: statusColor,
                        boxShadow: `0 0 35px ${statusGlow}, inset 0 0 20px ${statusGlow}`,
                        background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(16,11,38,0.8) 80%)',
                      }}
                    >
                      <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center">
                        {isNormal ? (
                          <svg className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-10 h-10 text-white animate-bounce" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3
                      className="text-3xl font-black tracking-wide"
                      style={{ color: '#e9d5ff', textShadow: `0 0 18px ${statusGlow}` }}
                    >
                      {statusText}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-white">
                      {statusThaiTitle}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-300">
                      {statusThaiSub}
                    </p>
                  </div>
                </div>

                {/* Box 2: POSTURE SCORE */}
                <div className="relative flex-1 rounded-[26px] bg-[#100b26]/90 border border-purple-500/35 p-5 flex flex-col justify-between items-center shadow-[0_0_30px_rgba(0,0,0,0.6)]">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                        POSTURE SCORE
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-300">
                      Alert Threshold: <strong className="text-rose-400">{riskThreshold}%</strong>
                    </span>
                  </div>

                  <div className="relative flex items-center justify-center my-auto">
                    <svg className="w-40 h-40 -rotate-90 transform" viewBox="0 0 160 160">
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="14"
                        fill="transparent"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="url(#scoreGradient)"
                        strokeWidth="14"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-200 ease-out"
                        style={{ filter: `drop-shadow(0 0 10px ${statusColor})` }}
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#c084fc" />
                          <stop offset="100%" stopColor={statusColor} />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-white tracking-tight">
                        {score}%
                      </span>
                    </div>
                  </div>

                </div>

              </div>

              {/* COLUMN 3: DAILY SUMMARY */}
              <div className="rounded-[26px] bg-[#100b26]/90 border border-purple-500/35 p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.6)]">
                
                <div className="flex items-center space-x-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                    DAILY SUMMARY
                  </h2>
                </div>

                <div className="flex flex-col gap-4 flex-1 justify-between">
                  
                  {/* Card 1: Total Active Time */}
                  <div className="relative flex-1 rounded-[24px] bg-[#161032]/90 border border-purple-400/25 px-6 py-5 flex items-center hover:border-purple-400/50 transition">
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-[0_0_22px_rgba(37,99,235,0.8)] shrink-0">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-base font-semibold text-slate-200 block">
                          Total Active Time
                        </span>
                        <p className="text-4xl sm:text-5xl font-black text-white mt-1 tracking-tight">
                          {formatMinutes(summary.total_active_time_min)}
                        </p>
                        <p className="text-sm font-bold text-[#00f5a0] mt-1.5 flex items-center">
                          <span>↑ 12% from yesterday</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Bad Posture Accumulation */}
                  <div className="relative flex-1 rounded-[24px] bg-[#161032]/90 border border-purple-400/25 px-6 py-5 flex items-center hover:border-purple-400/50 transition">
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-[0_0_22px_rgba(245,158,11,0.8)] shrink-0">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-base font-semibold text-slate-200 leading-snug block">
                          Bad Posture Accumulation
                        </span>
                        <p className="text-4xl sm:text-5xl font-black text-white mt-1 tracking-tight">
                          {formatMinutes(summary.total_bad_posture_min)}
                        </p>
                        <p className="text-sm font-bold text-pink-500 mt-1.5 flex items-center">
                          <span>↓ 35% Needs attention</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Alerts Triggered */}
                  <div className="relative flex-1 rounded-[24px] bg-[#161032]/90 border border-purple-400/25 px-6 py-5 flex items-center hover:border-purple-400/50 transition">
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 rounded-full bg-fuchsia-600 flex items-center justify-center text-white shadow-[0_0_22px_rgba(217,70,239,0.8)] shrink-0">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-base font-semibold text-slate-200 block">
                          Alerts Triggered
                        </span>
                        <p className="text-4xl sm:text-5xl font-black text-white mt-1 tracking-tight">
                          {summary.alert_count ?? 0} <span className="text-2xl font-bold text-slate-300">times</span>
                        </p>
                      </div>
                    </div>
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