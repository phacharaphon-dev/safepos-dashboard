import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#070514] font-sans text-white selection:bg-purple-500 selection:text-white">
      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[300px] bg-purple-700/20 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-indigo-700/15 blur-[120px] rounded-full" />

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
          <button className="relative w-10 h-10 rounded-full bg-[#130f29] border border-purple-500/30 flex items-center justify-center text-slate-200 hover:text-white hover:border-purple-400 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-fuchsia-600 text-[10px] font-bold rounded-full border border-[#070514] shadow-[0_0_8px_#d946ef]">
              0
            </span>
          </button>

          <Link to="/profile" className="w-10 h-10 rounded-full bg-[#130f29] border-2 border-purple-400 p-0.5 flex items-center justify-center shadow-[0_0_12px_#a855f7] transition overflow-hidden">
            <img alt="พชรพล ฤกษนันทน์" className="w-full h-full rounded-full object-cover" src="/profile.jpg" />
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT SHELL */}
      <main className="relative z-10 flex-1 w-full px-6 py-5 flex gap-7 overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-60 flex flex-col justify-between py-5 px-3.5 rounded-[26px] bg-[#0d0920]/90 border border-purple-500/25 shadow-[0_0_35px_rgba(0,0,0,0.8)] backdrop-blur-xl shrink-0">
          <nav className="flex flex-col space-y-2.5 w-full">
            <Link
              to="/"
              className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-purple-500/10 transition"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>

            <Link
              to="/posture"
              className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-purple-500/10 transition"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="7" y="7" width="10" height="10" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v4m6-4v4M9 17v4m6-4v4M3 9h4m-4 6h4m10-6h4m-4 6h4" />
              </svg>
              <span className="text-sm font-medium">Live AI Analysis</span>
            </Link>

            <Link
              to="/analytics"
              className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-purple-500/10 transition"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm font-medium">Reports</span>
            </Link>

            <Link
              to="/settings"
              className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-purple-500/10 transition"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">Settings</span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600/35 to-indigo-600/20 text-white font-semibold border border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition"
            >
              <div className="flex items-center space-x-3.5">
                <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm">Users</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]"></span>
            </Link>
          </nav>

          <a
            href="#logout"
            className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition mt-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </a>
        </aside>

        {/* BODY CONTENT */}
        <div className="flex-1 overflow-y-auto pr-2 pb-6">
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
            
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-wide">
                Profile &amp; Device
              </h1>
              <p className="text-sm text-slate-300 mt-1">
                Manage user biometric profile and optical telemetry sensors
              </p>
              <div className="mt-2.5 h-1.5 w-14 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_12px_#a855f7]" />
            </div>

            {/* Card 1: User profile */}
            <section className="w-full rounded-[28px] bg-[#100b26]/90 border border-purple-500/35 backdrop-blur-xl p-8 flex flex-col gap-6 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col gap-1 pb-4 border-b border-purple-500/20">
                <h2 className="text-xl font-bold text-white tracking-tight">User Profile</h2>
                <p className="text-xs text-slate-300">Personal biometric details and account identity</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-8 py-2">
                <div className="relative flex-shrink-0">
                  <img 
                    alt="พชรพล ฤกษนันทน์" 
                    className="w-24 h-24 rounded-full object-cover ring-2 ring-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.5)]" 
                    src="/profile.jpg" 
                  />
                  <span className="absolute bottom-0 right-1.5 w-4 h-4 rounded-full bg-[#00f5a0] ring-2 ring-[#100b26] shadow-[0_0_8px_#00f5a0]"></span>
                </div>
                <div className="flex flex-col items-center sm:items-start gap-4 flex-1">
                  <div className="flex flex-col items-center sm:items-start gap-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-white tracking-tight">พชรพล ฤกษนันทน์</h3>
                      <span className="px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-semibold tracking-wide">Primary Account</span>
                    </div>
                    <span className="text-xs font-mono text-slate-300">phacharaphon@gmail.com</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161032] border border-purple-500/30">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M8 3v18m0-15h4m-4 6h3m-3 6h4"></path>
                      </svg>
                      <span className="text-xs text-slate-300">Height:</span>
                      <span className="text-sm font-bold text-white font-mono">175 cm</span>
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161032] border border-purple-500/30">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 3v3m-7 4l2 7a5 5 0 0010 0l2-7H5z"></path>
                        <circle cx="12" cy="14" r="2"></circle>
                      </svg>
                      <span className="text-xs text-slate-300">Weight:</span>
                      <span className="text-sm font-bold text-white font-mono">68 kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Card 2: Hardware status */}
            <section className="w-full rounded-[28px] bg-[#100b26]/90 border border-purple-500/35 backdrop-blur-xl p-8 flex flex-col gap-6 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col gap-1 pb-4 border-b border-purple-500/20">
                <h2 className="text-xl font-bold text-white tracking-tight">Hardware Status</h2>
                <p className="text-xs text-slate-300">Connected optical biomechanics cameras and telemetry feed</p>
              </div>
              <div className="flex flex-col gap-4">
                
                {/* Device 1 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#161032]/90 border border-purple-500/30">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 flex-shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                      <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Device ID: CAM-01-OFFICE</h3>
                      <p className="text-xs text-slate-300 mt-0.5">Desk optical sensor (workstation)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-[#100b26] border border-purple-500/30 text-slate-200 font-mono text-xs">1080p 60fps</span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06332e] border border-[#00f5a0]/40 text-[#00f5a0] text-xs font-bold tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-[#00f5a0] animate-pulse shadow-[0_0_6px_#00f5a0]"></span>
                      <span>Online</span>
                    </div>
                  </div>
                </div>

                {/* Device 2 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#161032]/50 border border-purple-500/15">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 flex-shrink-0">
                      <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Device ID: CAM-02-HOME</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Secondary optical sensor (home setup)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-[#100b26] border border-white/10 text-slate-400 font-mono text-xs">Last sync: 2d ago</span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span>Offline</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}