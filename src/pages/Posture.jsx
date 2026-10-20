import { Link } from 'react-router-dom';

export default function Posture() {
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
              className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600/35 to-indigo-600/20 text-white font-semibold border border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition"
            >
              <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="7" y="7" width="10" height="10" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v4m6-4v4M9 17v4m6-4v4M3 9h4m-4 6h4m10-6h4m-4 6h4" />
              </svg>
              <span className="text-sm">Live AI Analysis</span>
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
        <div className="flex-1 flex flex-col justify-start overflow-hidden pr-1">
          <div className="mb-4 shrink-0">
            <h1 className="text-3xl font-extrabold text-white tracking-wide">3D Posture Analysis</h1>
            <p className="text-sm text-slate-300 mt-1">Real-time biomechanical wireframe &amp; skeletal node tracking</p>
            <div className="mt-2.5 h-1.5 w-14 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_12px_#a855f7]" />
          </div>
          
          <section className="w-full flex-1 flex flex-col relative h-[calc(100vh-170px)] max-h-[750px]">
            <div className="relative w-full h-full rounded-[28px] p-3 bg-[#100b26]/90 border-2 border-purple-500/40 shadow-[0_0_35px_rgba(168,85,247,0.2)] flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#080614] border border-purple-500/20 flex items-center justify-center shadow-inner">
                
                <img alt="Futuristic glowing 3D wireframe mesh silhouette of seated biomechanics posture" className="w-full h-full object-contain filter brightness-[0.95] contrast-[1.08] hue-rotate-[60deg]" src="https://lh3.googleusercontent.com/aida/AEtjO1XQECtf9oLTu0tEgbZiYb3omeIukZz9ok-gHb6BdQLsCy5V-HKAc4n1h9Ta5dSeMxjP0FJEtsoXm8mO3WE-Q35Q91d5ek6YW6GCyHGfjmfX_IEhHVPBrWYdvBgLDPRbmBU50IBCTidyhvgL-VqCUeUZffre5kpZ8cp1u0hLoLN1hkdoMrJgRyxiKe1NGwktHm80ZEI25vtFm3t6ih-ce1S9XFXFyB1we7WS8qk09cg9eXjr2tHAioTtJz2A" />
                
                <div className="absolute inset-5 pointer-events-none">
                  <div className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-purple-400/60 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-purple-400/60 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-purple-400/60 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-purple-400/60 rounded-br-lg"></div>
                </div>

                <div className="absolute top-5 left-5 flex items-center space-x-2 bg-[#161032]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-purple-400/40 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#a855f7]"></span>
                  <span className="text-xs font-bold tracking-wider text-purple-200 uppercase">Biomechanics HUD v2.4</span>
                </div>

                {/* Hotspot 1 */}
                <div className="absolute top-[18%] left-[27%] flex items-center group/node cursor-pointer">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <span className="absolute w-5 h-5 rounded-full bg-rose-500/30 animate-pulse"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] ring-2 ring-rose-400/50"></span>
                  </div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-rose-500 to-rose-500/40"></div>
                  <div className="bg-[#161032]/90 rounded-xl p-3 border border-rose-500/50 backdrop-blur-md shadow-2xl min-w-[140px]">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-white">Forward head</span>
                      <span className="text-xs font-extrabold text-rose-400">85%</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      <span className="text-[11px] font-semibold text-rose-400">Critical strain</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">Cervical tilt: +14°</p>
                  </div>
                </div>

                {/* Hotspot 2 */}
                <div className="absolute top-[37%] left-[17%] flex items-center group/node cursor-pointer">
                  <div className="bg-[#161032]/90 rounded-xl p-3 border border-amber-500/50 backdrop-blur-md shadow-2xl min-w-[135px]">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-white">Slouching</span>
                      <span className="text-xs font-extrabold text-amber-400">60%</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span className="text-[11px] font-semibold text-amber-400">Moderate angle</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">Kyphosis curvature</p>
                  </div>
                  <div className="w-6 h-0.5 bg-gradient-to-r from-amber-500/40 to-amber-400"></div>
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <span className="absolute w-5 h-5 rounded-full bg-amber-500/30 animate-pulse"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] ring-2 ring-amber-500/40"></span>
                  </div>
                </div>

                {/* Hotspot 3 */}
                <div className="absolute bottom-[34%] left-[24%] flex items-center group/node cursor-pointer">
                  <div className="bg-[#161032]/90 rounded-xl p-3 border border-purple-500/50 backdrop-blur-md shadow-2xl min-w-[145px]">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-white">Prolonged static</span>
                      <span className="text-xs font-extrabold text-purple-300">15%</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f5a0]"></span>
                      <span className="text-[11px] font-semibold text-[#00f5a0]">Optimal alignment</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">Lumbar support seated</p>
                  </div>
                  <div className="w-7 h-0.5 bg-gradient-to-r from-purple-500/40 to-purple-400"></div>
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <span className="absolute w-5 h-5 rounded-full bg-purple-500/30 animate-pulse"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7] ring-2 ring-purple-500/40"></span>
                  </div>
                </div>

                <div className="absolute bottom-5 right-5 flex items-center space-x-2 bg-[#161032]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-purple-400/30 text-xs text-slate-300">
                  <span className="text-slate-400">Perspective:</span>
                  <span className="text-white font-bold">Sagittal (Side)</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-purple-300 font-semibold cursor-pointer hover:underline">Coronal</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}