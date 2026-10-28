import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../firebase";

export function useEventLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const logsRef = ref(rtdb, "Event_Logs");
    const unsubscribe = onValue(logsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const logList = Object.values(data).sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setLogs(logList);
      } else {
        setLogs([]);
      }
    });
    return () => unsubscribe();
  }, []);

  return logs;
}

export default function Analytics() {
  const logs = useEventLogs();

  const formatTime = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleString("th-TH", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#070514] font-sans text-white selection:bg-purple-500 selection:text-white">
      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute top-[-10%] left-[15%] w-[700px] h-[400px] bg-purple-600/30 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[15%] w-[600px] h-[400px] bg-indigo-600/20 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-[40%] left-[40%] w-[500px] h-[300px] bg-fuchsia-600/10 blur-[120px] rounded-full" />

      {/* TOP BAR - Glassmorphism */}
      <header className="relative z-20 w-full px-8 py-4 flex items-center justify-between border-b border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-sm">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.7)] border border-white/20">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 4.5l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5L12 6.5z" /></svg>
          </div>
          <div className="flex items-center tracking-wider text-2xl font-black uppercase">
            <span className="text-white drop-shadow-md">SAFE</span>
            <span className="text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]">POSTURE</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
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
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link to="/posture" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v4m6-4v4M9 17v4m6-4v4M3 9h4m-4 6h4m10-6h4m-4 6h4" /></svg>
              <span className="text-sm font-medium">Live AI Analysis</span>
            </Link>
            <Link to="/analytics" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl bg-white/10 text-white font-semibold border border-white/20 shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition backdrop-blur-md">
              <svg className="w-5 h-5 text-purple-300 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              <span className="text-sm">Reports</span>
            </Link>
            <Link to="/settings" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-sm font-medium">Settings</span>
            </Link>
            <Link to="/profile" className="flex items-center justify-between px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition">
              <div className="flex items-center space-x-3.5">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span className="text-sm font-medium">Users</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]"></span>
            </Link>
          </nav>
          <a href="#logout" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition mt-auto">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </a>
        </aside>

        {/* BODY CONTENT - TABLE */}
        <div className="flex-1 overflow-y-auto pr-2 pb-6">
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
            
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-md">
                Analytics & Reports
              </h1>
              <p className="text-sm text-slate-300 mt-1 drop-shadow-sm">
                ประวัติการแจ้งเตือนท่านั่งผิดปกติ (Event Logs)
              </p>
              <div className="mt-2.5 h-1.5 w-14 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400 shadow-[0_0_12px_#a855f7]" />
            </div>

            {/* Table Container - Liquid Glass */}
            <div className="w-full rounded-[28px] bg-white/[0.04] backdrop-blur-3xl border border-white/10 border-t-white/20 border-l-white/20 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-sm tracking-wider text-slate-300 uppercase">
                      <th className="pb-4 px-4 font-semibold drop-shadow-sm">Date & Time</th>
                      <th className="pb-4 px-4 font-semibold drop-shadow-sm">Posture Issue</th>
                      <th className="pb-4 px-4 font-semibold drop-shadow-sm">Max Angle</th>
                      <th className="pb-4 px-4 font-semibold drop-shadow-sm">Duration</th>
                      <th className="pb-4 px-4 font-semibold drop-shadow-sm">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {logs.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-slate-400">
                          ไม่มีข้อมูลการแจ้งเตือน
                        </td>
                      </tr>
                    ) : (
                      logs.map((log, index) => (
                        <tr key={index} className="hover:bg-white/5 transition duration-150">
                          <td className="py-4 px-4 text-sm font-medium text-slate-200">
                            {formatTime(log.timestamp)}
                          </td>
                          <td className="py-4 px-4 text-sm text-white drop-shadow-sm">
                            {log.posture_type}
                          </td>
                          <td className="py-4 px-4 text-sm text-purple-300 font-mono drop-shadow-sm">
                            {log.max_angle}°
                          </td>
                          <td className="py-4 px-4 text-sm text-slate-300">
                            {log.duration_sec} วินาที
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border backdrop-blur-md ${
                              log.severity_level === 'Critical' 
                                ? 'bg-rose-500/20 text-rose-300 border-rose-400/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]' 
                                : 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                            }`}>
                              {log.severity_level}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}