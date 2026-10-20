import { Link } from 'react-router-dom';

export default function Analytics() {
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
              className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600/35 to-indigo-600/20 text-white font-semibold border border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition"
            >
              <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm">Reports</span>
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
              className="flex items-center justify-between px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-purple-500/10 transition"
            >
              <div className="flex items-center space-x-3.5">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium">Users</span>
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
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-wide">
                  Medical Analytics &amp; Logs
                </h1>
                <p className="text-sm text-slate-300 mt-1">
                  Biomechanical event history and longitudinal clinical recovery trends
                </p>
                <div className="mt-2.5 h-1.5 w-14 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_12px_#a855f7]" />
              </div>
              <div className="flex items-center gap-3">
                <button className="bg-[#161032] hover:bg-purple-900/40 border border-purple-500/40 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-100 transition flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.2)]" type="button">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span>Export PDF</span>
                </button>
                <button className="bg-[#161032] hover:bg-purple-900/40 border border-purple-500/40 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-100 transition flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.2)]" type="button">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Card 1: Posture improvement trend */}
            <section className="w-full rounded-[28px] bg-[#100b26]/90 border border-purple-500/35 backdrop-blur-xl p-8 flex flex-col gap-6 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Posture Improvement Trend
                </h2>
                <p className="text-xs text-slate-300">
                  7-day average spinal alignment vs ergonomic target
                </p>
              </div>
              <div className="w-full relative overflow-hidden pt-2">
                <div className="w-full h-72 sm:h-80">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 840 260">
                    <defs>
                      <linearGradient id="purpleCurveGrad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35"></stop>
                        <stop offset="65%" stopColor="#a855f7" stopOpacity="0.08"></stop>
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0"></stop>
                      </linearGradient>
                      <filter height="140%" id="purpleGlow" width="140%" x="-20%" y="-20%">
                        <feGaussianBlur result="blur" stdDeviation="5"></feGaussianBlur>
                        <feMerge>
                          <feMergeNode in="blur"></feMergeNode>
                          <feMergeNode in="SourceGraphic"></feMergeNode>
                        </feMerge>
                      </filter>
                    </defs>
                    <line stroke="#3b2d54" strokeOpacity="0.5" strokeWidth="1" x1="56" x2="820" y1="18" y2="18"></line>
                    <line stroke="#3b2d54" strokeOpacity="0.5" strokeWidth="1" x1="56" x2="820" y1="68" y2="68"></line>
                    <line stroke="#3b2d54" strokeOpacity="0.5" strokeWidth="1" x1="56" x2="820" y1="118" y2="118"></line>
                    <line stroke="#3b2d54" strokeOpacity="0.5" strokeWidth="1" x1="56" x2="820" y1="168" y2="168"></line>
                    <line stroke="#3b2d54" strokeOpacity="0.5" strokeWidth="1" x1="56" x2="820" y1="218" y2="218"></line>
                    <line stroke="#00f5a0" strokeDasharray="5 5" strokeOpacity="0.7" strokeWidth="1.5" x1="56" x2="780" y1="93" y2="93"></line>
                    <text fill="#00f5a0" fontFamily="Inter" fontSize="11" opacity="0.9" textAnchor="start" x="786" y="96">target (85%)</text>
                    <text fill="#a39bbb" fontFamily="Inter" fontSize="11" textAnchor="end" x="44" y="22">100%</text>
                    <text fill="#a39bbb" fontFamily="Inter" fontSize="11" textAnchor="end" x="44" y="72">90%</text>
                    <text fill="#a39bbb" fontFamily="Inter" fontSize="11" textAnchor="end" x="44" y="122">80%</text>
                    <text fill="#a39bbb" fontFamily="Inter" fontSize="11" textAnchor="end" x="44" y="172">70%</text>
                    <text fill="#a39bbb" fontFamily="Inter" fontSize="11" textAnchor="end" x="44" y="222">60%</text>
                    <path d="M 80 188 C 140 180, 160 152, 200 148 C 240 144, 280 162, 320 138 C 360 114, 400 120, 440 102 C 480 84, 520 90, 560 76 C 600 62, 640 68, 680 54 C 720 40, 760 38, 800 32 L 800 218 L 80 218 Z" fill="url(#purpleCurveGrad)"></path>
                    <path d="M 80 188 C 140 180, 160 152, 200 148 C 240 144, 280 162, 320 138 C 360 114, 400 120, 440 102 C 480 84, 520 90, 560 76 C 600 62, 640 68, 680 54 C 720 40, 760 38, 800 32" fill="none" filter="url(#purpleGlow)" stroke="#a855f7" strokeLinecap="round" strokeWidth="3.5"></path>
                    <g>
                      <circle cx="80" cy="188" fill="#100b26" r="5" stroke="#c084fc" strokeWidth="2.5"></circle>
                      <circle cx="200" cy="148" fill="#100b26" r="5" stroke="#c084fc" strokeWidth="2.5"></circle>
                      <circle cx="320" cy="138" fill="#100b26" r="5" stroke="#c084fc" strokeWidth="2.5"></circle>
                      <circle cx="440" cy="102" fill="#100b26" r="5" stroke="#c084fc" strokeWidth="2.5"></circle>
                      <circle cx="560" cy="76" fill="#100b26" r="5" stroke="#c084fc" strokeWidth="2.5"></circle>
                      <circle cx="680" cy="54" fill="#100b26" r="5" stroke="#c084fc" strokeWidth="2.5"></circle>
                      <circle cx="800" cy="32" fill="#100b26" r="5" stroke="#c084fc" strokeWidth="2.5"></circle>
                    </g>
                    <text fill="#a39bbb" fontFamily="Inter" fontSize="12" textAnchor="middle" x="80" y="248">mon</text>
                    <text fill="#a39bbb" fontFamily="Inter" fontSize="12" textAnchor="middle" x="200" y="248">tue</text>
                    <text fill="#a39bbb" fontFamily="Inter" fontSize="12" textAnchor="middle" x="320" y="248">wed</text>
                    <text fill="#a39bbb" fontFamily="Inter" fontSize="12" textAnchor="middle" x="440" y="248">thu</text>
                    <text fill="#a39bbb" fontFamily="Inter" fontSize="12" textAnchor="middle" x="560" y="248">fri</text>
                    <text fill="#a39bbb" fontFamily="Inter" fontSize="12" textAnchor="middle" x="680" y="248">sat</text>
                    <text fill="#a39bbb" fontFamily="Inter" fontSize="12" textAnchor="middle" x="800" y="248">sun</text>
                  </svg>
                </div>
              </div>
            </section>

            {/* Card 2: Event log */}
            <section className="w-full rounded-[28px] bg-[#100b26]/90 border border-purple-500/35 backdrop-blur-xl p-8 flex flex-col gap-6 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Event Log
                </h2>
                <p className="text-xs text-slate-300">
                  Recent detected postural anomalies and kinematic alerts
                </p>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="text-slate-300 text-xs font-bold uppercase tracking-wider border-b border-purple-500/30 pb-3">
                      <th className="pb-4 pl-2" scope="col">Timestamp</th>
                      <th className="pb-4" scope="col">Posture Type</th>
                      <th className="pb-4" scope="col">Max Angle</th>
                      <th className="pb-4" scope="col">Duration</th>
                      <th className="pb-4 pr-2 text-right" scope="col">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-200 divide-y divide-purple-500/15">
                    <tr className="hover:bg-purple-500/10 transition-colors">
                      <td className="py-4 pl-2 text-slate-300 font-mono text-xs">Today, 14:22</td>
                      <td className="py-4 font-semibold text-white">Forward head tilt</td>
                      <td className="py-4 text-purple-300 font-bold text-sm drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">38°</td>
                      <td className="py-4 text-slate-300 font-mono text-xs">12m 40s</td>
                      <td className="py-4 pr-2 text-right">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          Critical
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-purple-500/10 transition-colors">
                      <td className="py-4 pl-2 text-slate-300 font-mono text-xs">Today, 13:05</td>
                      <td className="py-4 font-semibold text-white">Thoracic slouching</td>
                      <td className="py-4 text-amber-400 font-bold text-sm">29°</td>
                      <td className="py-4 text-slate-300 font-mono text-xs">8m 15s</td>
                      <td className="py-4 pr-2 text-right">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          Warning
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-purple-500/10 transition-colors">
                      <td className="py-4 pl-2 text-slate-300 font-mono text-xs">Today, 11:48</td>
                      <td className="py-4 font-semibold text-white">Lateral spine lean</td>
                      <td className="py-4 text-amber-400 font-bold text-sm">18°</td>
                      <td className="py-4 text-slate-300 font-mono text-xs">5m 20s</td>
                      <td className="py-4 pr-2 text-right">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          Warning
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-purple-500/10 transition-colors">
                      <td className="py-4 pl-2 text-slate-300 font-mono text-xs">Today, 10:15</td>
                      <td className="py-4 font-semibold text-white">Anterior pelvic tilt</td>
                      <td className="py-4 text-amber-400 font-bold text-sm">24°</td>
                      <td className="py-4 text-slate-300 font-mono text-xs">14m 10s</td>
                      <td className="py-4 pr-2 text-right">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          Warning
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-purple-500/10 transition-colors">
                      <td className="py-4 pl-2 text-slate-300 font-mono text-xs">Today, 09:30</td>
                      <td className="py-4 font-semibold text-white">Hyperextended neck</td>
                      <td className="py-4 text-purple-300 font-bold text-sm drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">35°</td>
                      <td className="py-4 text-slate-300 font-mono text-xs">11m 05s</td>
                      <td className="py-4 pr-2 text-right">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          Critical
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}