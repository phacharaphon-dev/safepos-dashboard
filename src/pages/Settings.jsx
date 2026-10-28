import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue, update } from 'firebase/database';
import { rtdb } from '../firebase';

const USER_ID = 'user123';

export default function Settings() {
  const [angleThreshold, setAngleThreshold] = useState(20);
  const [timeThresholdSec, setTimeThresholdSec] = useState(180); 
  const [cooldownPeriodMin, setCooldownPeriodMin] = useState(15);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isPopupEnabled, setIsPopupEnabled] = useState(true);

  useEffect(() => {
    const settingsRef = ref(rtdb, `Users/${USER_ID}/settings`);
    
    const unsubscribe = onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.angle_threshold !== undefined) setAngleThreshold(data.angle_threshold);
        if (data.time_threshold_sec !== undefined) setTimeThresholdSec(data.time_threshold_sec);
        if (data.cooldown_period_min !== undefined) setCooldownPeriodMin(data.cooldown_period_min);
        if (data.is_sound_enabled !== undefined) setIsSoundEnabled(data.is_sound_enabled);
        if (data.is_popup_enabled !== undefined) setIsPopupEnabled(data.is_popup_enabled);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateSetting = (key, value) => {
    const settingsRef = ref(rtdb, `Users/${USER_ID}/settings`);
    update(settingsRef, { [key]: value }).catch(err => console.error("Error updating setting:", err));
  };

  const calculatePercent = (value, min, max) => {
    return `${((value - min) / (max - min)) * 100}%`;
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#070514] font-sans text-white selection:bg-purple-500 selection:text-white">
      {/* Ambient Background Glows - ปรับให้แสงสว่างขึ้นนิดหน่อยเพื่อให้ทะลุกระจกสวยๆ */}
      <div className="pointer-events-none absolute top-[-10%] left-[15%] w-[700px] h-[400px] bg-purple-600/30 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[15%] w-[600px] h-[400px] bg-indigo-600/20 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-[40%] left-[40%] w-[500px] h-[300px] bg-fuchsia-600/10 blur-[120px] rounded-full" />

      {/* TOP BAR - Glassmorphism */}
      <header className="relative z-20 w-full px-8 py-4 flex items-center justify-between border-b border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-sm">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.7)] border border-white/20">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 4.5l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5L12 6.5z" />
            </svg>
          </div>
          <div className="flex items-center tracking-wider text-2xl font-black uppercase">
            <span className="text-white drop-shadow-md">SAFE</span>
            <span className="text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]">POSTURE</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative w-10 h-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition backdrop-blur-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-fuchsia-600 text-[10px] font-bold rounded-full border border-white/20 shadow-[0_0_8px_#d946ef]">
              0
            </span>
          </button>

          <Link to="/profile" className="w-10 h-10 rounded-full bg-black/20 border border-white/10 p-0.5 flex items-center justify-center hover:bg-white/10 transition overflow-hidden backdrop-blur-md">
            <img alt="User avatar" className="w-full h-full rounded-full object-cover" src="/profile.jpg" />
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT SHELL */}
      <main className="relative z-10 flex-1 w-full px-6 py-5 flex gap-7 overflow-hidden">
        
        {/* LEFT SIDEBAR - Liquid Glass */}
        <aside className="w-60 flex flex-col justify-between py-5 px-3.5 rounded-[26px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 border-t-white/20 border-l-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] shrink-0">
          <nav className="flex flex-col space-y-2.5 w-full">
            <Link to="/" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link to="/posture" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="7" y="7" width="10" height="10" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v4m6-4v4M9 17v4m6-4v4M3 9h4m-4 6h4m10-6h4m-4 6h4" />
              </svg>
              <span className="text-sm font-medium">Live AI Analysis</span>
            </Link>
            <Link to="/analytics" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm font-medium">Reports</span>
            </Link>
            <Link to="/settings" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl bg-white/10 text-white font-semibold border border-white/20 shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition backdrop-blur-md">
              <svg className="w-5 h-5 text-purple-300 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">Settings</span>
            </Link>
            <Link to="/profile" className="flex items-center justify-between px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition">
              <div className="flex items-center space-x-3.5">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium">Users</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]"></span>
            </Link>
          </nav>
        </aside>

        {/* BODY CONTENT */}
        <div className="flex-1 overflow-y-auto pr-2 pb-6">
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
            
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-md">
                Parameter Settings
              </h1>
              <p className="text-sm text-slate-300 mt-1 drop-shadow-sm">
                Configure real-time kinematic detection thresholds and notification preferences
              </p>
              <div className="mt-2.5 h-1.5 w-14 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400 shadow-[0_0_12px_#a855f7]" />
            </div>

            {/* Card 1: Threshold & timing - Liquid Glass Card */}
            <section className="w-full rounded-[28px] bg-white/[0.04] backdrop-blur-3xl border border-white/10 border-t-white/20 border-l-white/20 p-8 flex flex-col gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col gap-1 pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white tracking-tight drop-shadow-sm">Threshold &amp; Timing</h2>
                <p className="text-xs text-slate-300">Posture anomaly detection triggers and response intervals</p>
              </div>
              <div className="flex flex-col divide-y divide-white/5 gap-6">
                
                {/* Angle threshold */}
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white tracking-tight">Angle threshold</h3>
                      <p className="text-xs text-slate-300 mt-0.5">Maximum allowable cervical and thoracic deviation before registering an anomaly</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-base shadow-sm backdrop-blur-md">
                      <span>{angleThreshold}°</span>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2 pt-1 relative">
                    <input 
                      type="range" min="15" max="30" step="1"
                      value={angleThreshold}
                      onChange={(e) => setAngleThreshold(Number(e.target.value))}
                      onMouseUp={(e) => updateSetting('angle_threshold', Number(e.target.value))}
                      onTouchEnd={(e) => updateSetting('angle_threshold', Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30 m-0 p-0" 
                    />
                    <div className="relative w-full h-2.5 rounded-full bg-black/40 border border-white/10 overflow-visible flex items-center pointer-events-none shadow-inner">
                      <div className="h-full bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full shadow-[0_0_12px_#a855f7]" style={{ width: calculatePercent(angleThreshold, 15, 30) }}></div>
                      <div className="absolute w-5 h-5 rounded-full bg-white border-2 border-fuchsia-400 shadow-[0_0_15px_rgba(255,255,255,0.8)] -translate-x-1/2" style={{ left: calculatePercent(angleThreshold, 15, 30) }}></div>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-mono text-slate-300 px-0.5 pointer-events-none">
                      <span>15°</span><span>20°</span><span>25°</span><span>30°</span>
                    </div>
                  </div>
                </div>

                {/* Time threshold */}
                <div className="flex items-center justify-between gap-4 pt-6">
                  <div className="flex-1 pr-4">
                    <h3 className="text-sm font-semibold text-white tracking-tight">Time threshold (minutes)</h3>
                    <p className="text-xs text-slate-300 mt-0.5">Continuous duration required in slouch posture before recording an event</p>
                  </div>
                  <div className="flex items-center bg-black/30 border border-white/10 rounded-xl p-1 gap-2 shadow-inner backdrop-blur-md">
                    <button 
                      onClick={() => {
                        const newVal = Math.max(60, timeThresholdSec - 60);
                        setTimeThresholdSec(newVal);
                        updateSetting('time_threshold_sec', newVal);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/20 text-slate-200 hover:text-white transition z-10 border border-transparent hover:border-white/10"
                    >
                      <svg className="w-4 h-4 stroke-current pointer-events-none" fill="none" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14" strokeLinecap="round"></path></svg>
                    </button>
                    <div className="flex items-baseline px-2 min-w-[3.5rem] justify-center text-center pointer-events-none">
                      <span className="text-base font-bold text-white font-mono drop-shadow-md">{timeThresholdSec / 60}</span>
                      <span className="text-xs text-slate-300 font-medium ml-1">min</span>
                    </div>
                    <button 
                      onClick={() => {
                        const newVal = Math.min(3600, timeThresholdSec + 60);
                        setTimeThresholdSec(newVal);
                        updateSetting('time_threshold_sec', newVal);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/20 text-slate-200 hover:text-white transition z-10 border border-transparent hover:border-white/10"
                    >
                      <svg className="w-4 h-4 stroke-current pointer-events-none" fill="none" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14m-7-7h14" strokeLinecap="round"></path></svg>
                    </button>
                  </div>
                </div>

                {/* Cooldown period */}
                <div className="flex flex-col gap-3 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white tracking-tight">Cooldown period (minutes)</h3>
                      <p className="text-xs text-slate-300 mt-0.5">Snooze duration between consecutive warning triggers</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-base shadow-sm backdrop-blur-md">
                      <span>{cooldownPeriodMin} min</span>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2 pt-1 relative">
                    <input 
                      type="range" min="5" max="60" step="1"
                      value={cooldownPeriodMin}
                      onChange={(e) => setCooldownPeriodMin(Number(e.target.value))}
                      onMouseUp={(e) => updateSetting('cooldown_period_min', Number(e.target.value))}
                      onTouchEnd={(e) => updateSetting('cooldown_period_min', Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30 m-0 p-0" 
                    />
                    <div className="relative w-full h-2.5 rounded-full bg-black/40 border border-white/10 overflow-visible flex items-center pointer-events-none shadow-inner">
                      <div className="h-full bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full shadow-[0_0_12px_#a855f7]" style={{ width: calculatePercent(cooldownPeriodMin, 5, 60) }}></div>
                      <div className="absolute w-5 h-5 rounded-full bg-white border-2 border-fuchsia-400 shadow-[0_0_15px_rgba(255,255,255,0.8)] -translate-x-1/2" style={{ left: calculatePercent(cooldownPeriodMin, 5, 60) }}></div>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-mono text-slate-300 px-0.5 pointer-events-none">
                      <span>5m</span><span>15m</span><span>30m</span><span>45m</span><span>60m</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Card 2: Alert preferences - Liquid Glass Card */}
            <section className="w-full rounded-[28px] bg-white/[0.04] backdrop-blur-3xl border border-white/10 border-t-white/20 border-l-white/20 p-8 flex flex-col gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col gap-1 pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white tracking-tight drop-shadow-sm">Alert Preferences</h2>
                <p className="text-xs text-slate-300">Audio-visual feedback channels for active session monitoring</p>
              </div>
              <div className="flex flex-col divide-y divide-white/5 gap-6">
                
                {/* Sound alert */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="flex-1 pr-4">
                    <h3 className="text-sm font-semibold text-white tracking-tight">Sound alert</h3>
                    <p className="text-xs text-slate-300 mt-0.5">Play subtle acoustic chime when deviation exceeds threshold</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newVal = !isSoundEnabled;
                      setIsSoundEnabled(newVal);
                      updateSetting('is_sound_enabled', newVal);
                    }}
                    className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-300 ease-in-out focus:outline-none p-0.5 z-10 border ${isSoundEnabled ? 'bg-purple-500 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.8)]' : 'bg-black/40 border-white/10 shadow-inner'}`} 
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 mt-[1px] transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${isSoundEnabled ? 'translate-x-5' : 'translate-x-1'}`}></span>
                  </button>
                </div>

                {/* Screen pop-up overlay */}
                <div className="flex items-center justify-between gap-4 pt-6">
                  <div className="flex-1 pr-4">
                    <h3 className="text-sm font-semibold text-white tracking-tight">Screen pop-up overlay</h3>
                    <p className="text-xs text-slate-300 mt-0.5">Display unobtrusive HUD banner over active desktop workspace</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newVal = !isPopupEnabled;
                      setIsPopupEnabled(newVal);
                      updateSetting('is_popup_enabled', newVal);
                    }}
                    className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-300 ease-in-out focus:outline-none p-0.5 z-10 border ${isPopupEnabled ? 'bg-purple-500 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.8)]' : 'bg-black/40 border-white/10 shadow-inner'}`} 
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 mt-[1px] transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${isPopupEnabled ? 'translate-x-5' : 'translate-x-1'}`}></span>
                  </button>
                </div>

              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}