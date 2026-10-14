import { Link } from 'react-router-dom';

export default function Analytics() {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-x-hidden bg-[radial-gradient(ellipse_at_55%_40%,#182840_0%,#0B1020_65%)] font-sans text-[#F4F7FC] selection:bg-teal-500 selection:text-white">
      {/* Subtle ambient decorative grid background patterns */}
      <div className="absolute top-12 right-12 w-32 h-32 dot-matrix pointer-events-none opacity-30"></div>
      <div className="absolute bottom-6 left-6 w-36 h-36 dot-matrix pointer-events-none opacity-30"></div>

      {/* BEGIN: TopBar */}
      <header className="w-full px-8 py-5 flex items-center justify-between z-20 sticky top-0 bg-[#0c1424]/80 backdrop-blur-md">
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg className="w-7 h-7 text-[#19e6a4] drop-shadow-[0_0_10px_rgba(25,230,164,0.6)]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M7 3C4.5 6 4 10 6 13C8 16 11 16 12 19C12.8 21.3 15 22 17 21C20 19.5 20 15 18 12C16 9 13 9 12 6C11.2 3.7 9 3 7 3Z"></path>
            </svg>
          </div>
          <div className="flex tracking-wider text-xl font-extrabold uppercase">
            <span className="text-white">SAFE</span><span className="text-[#19e6a4] drop-shadow-[0_0_8px_rgba(25,230,164,0.5)]">POSTURE</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-[#19e6a4] text-xs font-semibold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#19e6a4] animate-pulse shadow-[0_0_6px_#19e6a4]"></span>
            <span>TELEMETRY LIVE</span>
          </div>
          <button aria-label="Notifications" className="relative p-2 text-slate-300 hover:text-white transition duration-200 focus:outline-none" type="button">
            <svg className="w-6 h-6 stroke-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-[#0c1424]"></span>
          </button>
          <div className="relative cursor-pointer ring-2 ring-slate-700/60 rounded-full p-0.5 hover:ring-teal-400 transition duration-300">
            {/* เปลี่ยนรูปมุมขวาบนเป็น /profile.jpg */}
            <img alt="User Profile Avatar" className="w-9 h-9 rounded-full object-cover" src="/profile.jpg" />
          </div>
        </div>
      </header>
      {/* END: TopBar */}

      {/* BEGIN: Main App Shell */}
      <main className="flex-1 w-full px-6 pb-6 pt-1 flex items-stretch gap-6 relative z-10 overflow-hidden">
        
        {/* BEGIN: LeftSidebar */}
        <aside className="w-16 flex flex-col justify-between items-center py-5 px-2 rounded-3xl bg-[#141d2f]/90 border border-slate-700/40 shadow-2xl backdrop-blur-md shrink-0 h-[calc(100vh-100px)]">
          <nav aria-label="Sidebar Navigation" className="flex flex-col items-center space-y-6 w-full">
            
            {/* ปุ่มที่ 1: Dashboard */}
            <Link aria-label="Dashboard" to="/" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-teal-300 hover:bg-slate-800/50 rounded-xl transition">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z"></path>
              </svg>
            </Link>

            {/* ปุ่มที่ 2: 3D Posture */}
            <Link aria-label="3D posture analysis" to="/posture" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-teal-300 hover:bg-slate-800/50 rounded-xl transition">
              <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </Link>

            {/* ปุ่มที่ 3: Analytics (Active หน้านี้) */}
            <Link aria-current="page" aria-label="Analytics" to="/analytics" className="w-11 h-11 flex items-center justify-center rounded-xl bg-teal-500/20 text-[#19e6a4] shadow-[0_0_18px_rgba(25,230,164,0.35)] border border-teal-500/40 transition">
              <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </Link>

            {/* ปุ่มที่ 4: Settings */}
            <Link aria-label="Settings" to="/settings" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-teal-300 hover:bg-slate-800/50 rounded-xl transition">
              <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </Link>

            {/* ปุ่มที่ 5: Profile */}
            <Link aria-label="Profile" to="/profile" className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-teal-300 hover:bg-slate-800/50 rounded-xl transition">
              <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-[#19e6a4] rounded-full shadow-[0_0_8px_rgba(25,230,164,0.9)]"></span>
            </Link>
          </nav>

          <a aria-label="Logout" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-slate-800/50 rounded-xl transition mt-auto" href="#logout">
            <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </a>
        </aside>
        {/* END: LeftSidebar */}

        {/* BEGIN: Analytics Body Content */}
        <div className="pl-4 pr-2 pb-6 flex-1 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  Medical analytics &amp; logs
                </h1>
                <p className="text-xs font-medium text-slate-400 tracking-wide">
                  Biomechanical event history and longitudinal clinical recovery trends
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-200 transition-all backdrop-blur-md flex items-center gap-2 shadow-sm hover:shadow-[0_0_16px_rgba(25,230,164,0.2)]" type="button">
                  <svg className="w-4 h-4 text-[#19e6a4]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span>Export PDF</span>
                </button>
                <button className="bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 rounded-xl px-4 py-2 text-sm text-slate-200 transition-all backdrop-blur-md flex items-center gap-2 shadow-sm hover:shadow-[0_0_16px_rgba(25,230,164,0.2)]" type="button">
                  <svg className="w-4 h-4 text-[#19e6a4]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Card 1: Posture improvement trend */}
            <section className="w-full rounded-3xl bg-[#182338]/80 border border-slate-700/50 backdrop-blur-xl p-8 flex flex-col gap-6 shadow-2xl">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Posture improvement trend
                </h2>
                <p className="text-xs text-slate-400">
                  7-day average spinal alignment vs ergonomic target
                </p>
              </div>
              <div className="w-full relative overflow-hidden pt-2">
                <div className="w-full h-72 sm:h-80">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 840 260">
                    <defs>
                      <linearGradient id="curveGradientNew" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#19e6a4" stopOpacity="0.28"></stop>
                        <stop offset="65%" stopColor="#19e6a4" stopOpacity="0.05"></stop>
                        <stop offset="100%" stopColor="#19e6a4" stopOpacity="0"></stop>
                      </linearGradient>
                      <filter height="140%" id="glowEffectNew" width="140%" x="-20%" y="-20%">
                        <feGaussianBlur result="blur" stdDeviation="4"></feGaussianBlur>
                        <feMerge>
                          <feMergeNode in="blur"></feMergeNode>
                          <feMergeNode in="SourceGraphic"></feMergeNode>
                        </feMerge>
                      </filter>
                    </defs>
                    <line stroke="#2d3449" strokeOpacity="0.4" strokeWidth="1" x1="56" x2="820" y1="18" y2="18"></line>
                    <line stroke="#2d3449" strokeOpacity="0.4" strokeWidth="1" x1="56" x2="820" y1="68" y2="68"></line>
                    <line stroke="#2d3449" strokeOpacity="0.4" strokeWidth="1" x1="56" x2="820" y1="118" y2="118"></line>
                    <line stroke="#2d3449" strokeOpacity="0.4" strokeWidth="1" x1="56" x2="820" y1="168" y2="168"></line>
                    <line stroke="#2d3449" strokeOpacity="0.4" strokeWidth="1" x1="56" x2="820" y1="218" y2="218"></line>
                    <line stroke="#7bd0ff" strokeDasharray="5 5" strokeOpacity="0.65" strokeWidth="1.5" x1="56" x2="780" y1="93" y2="93"></line>
                    <text fill="#7bd0ff" fontFamily="Inter" fontSize="11" opacity="0.8" textAnchor="start" x="786" y="96">target (85%)</text>
                    <text fill="#859490" fontFamily="Inter" fontSize="11" textAnchor="end" x="44" y="22">100%</text>
                    <text fill="#859490" fontFamily="Inter" fontSize="11" textAnchor="end" x="44" y="72">90%</text>
                    <text fill="#859490" fontFamily="Inter" fontSize="11" textAnchor="end" x="44" y="122">80%</text>
                    <text fill="#859490" fontFamily="Inter" fontSize="11" textAnchor="end" x="44" y="172">70%</text>
                    <text fill="#859490" fontFamily="Inter" fontSize="11" textAnchor="end" x="44" y="222">60%</text>
                    <path d="M 80 188 C 140 180, 160 152, 200 148 C 240 144, 280 162, 320 138 C 360 114, 400 120, 440 102 C 480 84, 520 90, 560 76 C 600 62, 640 68, 680 54 C 720 40, 760 38, 800 32 L 800 218 L 80 218 Z" fill="url(#curveGradientNew)"></path>
                    <path d="M 80 188 C 140 180, 160 152, 200 148 C 240 144, 280 162, 320 138 C 360 114, 400 120, 440 102 C 480 84, 520 90, 560 76 C 600 62, 640 68, 680 54 C 720 40, 760 38, 800 32" fill="none" filter="url(#glowEffectNew)" stroke="#19e6a4" strokeLinecap="round" strokeWidth="3.5"></path>
                    <g>
                      <circle cx="80" cy="188" fill="#0c1424" r="5" stroke="#19e6a4" strokeWidth="2.5"></circle>
                      <circle cx="200" cy="148" fill="#0c1424" r="5" stroke="#19e6a4" strokeWidth="2.5"></circle>
                      <circle cx="320" cy="138" fill="#0c1424" r="5" stroke="#19e6a4" strokeWidth="2.5"></circle>
                      <circle cx="440" cy="102" fill="#0c1424" r="5" stroke="#19e6a4" strokeWidth="2.5"></circle>
                      <circle cx="560" cy="76" fill="#0c1424" r="5" stroke="#19e6a4" strokeWidth="2.5"></circle>
                      <circle cx="680" cy="54" fill="#0c1424" r="5" stroke="#19e6a4" strokeWidth="2.5"></circle>
                      <circle cx="800" cy="32" fill="#0c1424" r="5" stroke="#19e6a4" strokeWidth="2.5"></circle>
                    </g>
                    <text fill="#859490" fontFamily="Inter" fontSize="12" textAnchor="middle" x="80" y="248">mon</text>
                    <text fill="#859490" fontFamily="Inter" fontSize="12" textAnchor="middle" x="200" y="248">tue</text>
                    <text fill="#859490" fontFamily="Inter" fontSize="12" textAnchor="middle" x="320" y="248">wed</text>
                    <text fill="#859490" fontFamily="Inter" fontSize="12" textAnchor="middle" x="440" y="248">thu</text>
                    <text fill="#859490" fontFamily="Inter" fontSize="12" textAnchor="middle" x="560" y="248">fri</text>
                    <text fill="#859490" fontFamily="Inter" fontSize="12" textAnchor="middle" x="680" y="248">sat</text>
                    <text fill="#859490" fontFamily="Inter" fontSize="12" textAnchor="middle" x="800" y="248">sun</text>
                  </svg>
                </div>
              </div>
            </section>

            {/* Card 2: Event log */}
            <section className="w-full rounded-3xl bg-[#182338]/80 border border-slate-700/50 backdrop-blur-xl p-8 flex flex-col gap-6 shadow-2xl">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Event log
                </h2>
                <p className="text-xs text-slate-400">
                  Recent detected postural anomalies and kinematic alerts
                </p>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="text-slate-400 text-xs font-medium tracking-wider border-b border-slate-700/50 pb-3">
                      <th className="pb-4 pl-2 font-medium" scope="col">Timestamp</th>
                      <th className="pb-4 font-medium" scope="col">Posture type</th>
                      <th className="pb-4 font-medium" scope="col">Max angle</th>
                      <th className="pb-4 font-medium" scope="col">Duration</th>
                      <th className="pb-4 pr-2 font-medium text-right" scope="col">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-200 divide-y divide-slate-800/80">
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 pl-2 text-slate-400 font-mono text-xs">Today, 14:22</td>
                      <td className="py-4 font-medium text-white">Forward head tilt</td>
                      <td className="py-4 text-[#19e6a4] font-semibold text-sm drop-shadow-[0_0_6px_rgba(25,230,164,0.4)]">38°</td>
                      <td className="py-4 text-slate-300 font-mono text-xs">12m 40s</td>
                      <td className="py-4 pr-2 text-right">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.15)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]"></span>
                          Critical
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 pl-2 text-slate-400 font-mono text-xs">Today, 13:05</td>
                      <td className="py-4 font-medium text-white">Thoracic slouching</td>
                      <td className="py-4 text-amber-400 font-semibold text-sm">29°</td>
                      <td className="py-4 text-slate-300 font-mono text-xs">8m 15s</td>
                      <td className="py-4 pr-2 text-right">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]"></span>
                          Warning
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 pl-2 text-slate-400 font-mono text-xs">Today, 11:48</td>
                      <td className="py-4 font-medium text-white">Lateral spine lean</td>
                      <td className="py-4 text-amber-400 font-semibold text-sm">18°</td>
                      <td className="py-4 text-slate-300 font-mono text-xs">5m 20s</td>
                      <td className="py-4 pr-2 text-right">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]"></span>
                          Warning
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 pl-2 text-slate-400 font-mono text-xs">Today, 10:15</td>
                      <td className="py-4 font-medium text-white">Anterior pelvic tilt</td>
                      <td className="py-4 text-amber-400 font-semibold text-sm">24°</td>
                      <td className="py-4 text-slate-300 font-mono text-xs">14m 10s</td>
                      <td className="py-4 pr-2 text-right">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]"></span>
                          Warning
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 pl-2 text-slate-400 font-mono text-xs">Today, 09:30</td>
                      <td className="py-4 font-medium text-white">Hyperextended neck</td>
                      <td className="py-4 text-[#19e6a4] font-semibold text-sm drop-shadow-[0_0_6px_rgba(25,230,164,0.4)]">35°</td>
                      <td className="py-4 text-slate-300 font-mono text-xs">11m 05s</td>
                      <td className="py-4 pr-2 text-right">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.15)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]"></span>
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
        {/* END: Analytics Body Content */}

      </main>
      {/* END: Main App Shell */}
    </div>
  );
}