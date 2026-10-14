
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-x-hidden bg-[radial-gradient(ellipse_at_55%_40%,#182840_0%,#0B1020_65%)] font-sans text-[#F4F7FC] selection:bg-teal-500 selection:text-white">
      {/* Subtle ambient decorative grid background patterns */}
      <div className="absolute top-12 right-12 w-32 h-32 dot-matrix pointer-events-none opacity-30"></div>
      <div className="absolute bottom-6 left-6 w-36 h-36 dot-matrix pointer-events-none opacity-30"></div>

      {/* BEGIN: TopBar */}
      <header className="w-full px-8 py-5 flex items-center justify-between z-20 sticky top-0 bg-[#0c1424]/80 backdrop-blur-md">
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg className="w-7 h-7 text-[#00E5A0] filter drop-shadow-[0_0_12px_rgba(0,229,160,0.8)]" fill="none" viewBox="0 0 32 32">
              <path d="M11 6C11 6 8 10 8 16C8 22 12 26 12 26" stroke="#00E5A0" strokeLinecap="round" strokeWidth="3.2" />
              <path d="M21 6C21 6 15 11 15 16C15 21 21 26 21 26" stroke="#35E0D0" strokeLinecap="round" strokeWidth="3.2" />
              <circle cx="16" cy="16" fill="#A7F3D0" r="2.5" />
            </svg>
          </div>
          <div className="flex items-center tracking-wider text-xl font-extrabold uppercase">
            <span className="text-[#F4F7FC] tracking-widest">SAFE</span><span className="text-[#00E5A0] drop-shadow-[0_0_10px_rgba(0,229,160,0.6)] tracking-widest">POSTURE</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-[#19e6a4] text-xs font-semibold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#19e6a4] animate-pulse shadow-[0_0_6px_#19e6a4]"></span>
            <span>TELEMETRY LIVE</span>
          </div>
          <button className="relative p-2 text-slate-300 hover:text-white transition duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#FF777F] rounded-full ring-2 ring-[#0B1020] shadow-[0_0_8px_#FF777F]"></span>
          </button>
          <Link to="/profile" className="relative cursor-pointer ring-2 ring-slate-700/60 rounded-full p-0.5 hover:ring-[#35E0D0] transition duration-300">
            <img alt="User avatar" className="w-9 h-9 rounded-full object-cover" src="/profile.jpg" />
          </Link>
        </div>
      </header>
      {/* END: TopBar */}

      {/* BEGIN: Main App Shell */}
      <main className="flex-1 w-full px-6 pb-6 pt-1 flex items-stretch gap-6 relative z-10 overflow-hidden">
        
        {/* BEGIN: LeftSidebar */}
        <aside className="w-16 flex flex-col justify-between items-center py-5 px-2 rounded-3xl bg-[#141d2f]/90 border border-slate-700/40 shadow-2xl backdrop-blur-md shrink-0 h-[calc(100vh-100px)]">
          <nav className="flex flex-col items-center space-y-6 w-full">
            
            {/* ปุ่มที่ 1: หน้า Dashboard (Active) */}
            <Link aria-current="page" to="/" className="w-11 h-11 flex items-center justify-center rounded-xl bg-teal-500/20 text-[#19e6a4] shadow-[0_0_18px_rgba(25,230,164,0.35)] border border-teal-500/40 transition">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z"></path>
              </svg>
            </Link>

            {/* ปุ่มที่ 2: ไปหน้า 3D Posture */}
            <Link to="/posture" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-teal-300 hover:bg-slate-800/50 rounded-xl transition">
              <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* ปุ่มที่ 3: ไปหน้า Analytics */}
            <Link to="/analytics" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-teal-300 hover:bg-slate-800/50 rounded-xl transition">
              <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* ปุ่มที่ 4: ไปหน้า Settings */}
            <Link to="/settings" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-teal-300 hover:bg-slate-800/50 rounded-xl transition">
              <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* ปุ่มที่ 5: ไปหน้า Profile */}
            <Link to="/profile" className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-teal-300 hover:bg-slate-800/50 rounded-xl transition">
              <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-[#19e6a4] rounded-full shadow-[0_0_8px_rgba(25,230,164,0.9)]"></span>
            </Link>
          </nav>

          <a className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-slate-800/50 rounded-xl transition mt-auto" href="#logout">
            <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </aside>
        {/* END: LeftSidebar */}

        {/* BEGIN: Dashboard Body Content */}
        <div className="pl-4 pr-2 pb-4 flex-1 flex flex-col justify-between overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
            
            {/* Title Section */}
            <div className="mb-5 shrink-0">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Dashboard
              </h1>
            </div>

            {/* 3-Column Grid ตามภาพเรฟเฟอเรนซ์ */}
            <div className="grid grid-cols-1 xl:grid-cols-[1.55fr_0.95fr_0.95fr] gap-8 flex-1 items-stretch min-h-[540px]">
              
              {/* ================= COLUMN 1: LIVE CAM ================= */}
              <div className="flex flex-col gap-3 min-w-0">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  LIVE CAM
                </h2>

                <div className="relative flex-1 min-h-[380px] rounded-[30px] p-2.5 bg-gradient-to-b from-slate-700/35 to-slate-900/60 border border-slate-600/40 shadow-[0_20px_50px_rgba(0,0,0,0.65)] flex flex-col">
                  <div className="relative flex-1 w-full h-full overflow-hidden rounded-[22px] bg-[#080D16] border border-slate-700/50">
                    <img
                      alt="Live camera view"
                      className="absolute inset-0 w-full h-full object-cover object-center brightness-95 contrast-105"
                      src="https://lh3.googleusercontent.com/aida/AEtjO1UO7SSuZQ6JpvZHI5cXbkiF1vcryAMr0FVIxlw3wPj4MWHWmweLSQR1eV0qdt0xmVhBDJ96idId6ccpI0iabnRnZre9eRevD6SR3JqggfZyiraAX_yaaZY4bI16H_Zy5zXUB9wWHiC746l58zqnGucXuHmtNDyO1XLtkuk1h4wWCVnzK1aSZr69i1BFOGfC4tySZVLkpTHHAwy30TK-YgaIx_ZJ0vcOTTc-bTOj1M0UITcw-6SbYO1s6zQ"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#04070e]/80 via-transparent to-[#04070e]/20 pointer-events-none" />

                    <div className="absolute top-3.5 left-3.5 h-9 w-9 border-l-[2.5px] border-t-[2.5px] border-slate-400/50 rounded-tl-xl pointer-events-none" />
                    <div className="absolute top-3.5 right-3.5 h-9 w-9 border-r-[2.5px] border-t-[2.5px] border-slate-400/50 rounded-tr-xl pointer-events-none" />
                    <div className="absolute bottom-3.5 left-3.5 h-9 w-9 border-b-[2.5px] border-l-[2.5px] border-slate-400/50 rounded-bl-xl pointer-events-none" />
                    <div className="absolute bottom-3.5 right-3.5 h-9 w-9 border-b-[2.5px] border-r-[2.5px] border-slate-400/50 rounded-br-xl pointer-events-none" />

                    <div className="absolute top-6 left-6 flex items-center gap-2 rounded-lg border border-white/15 bg-slate-900/75 px-3 py-1.5 backdrop-blur-md shadow-lg">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#19e6a4] shadow-[0_0_8px_#19e6a4] animate-pulse" />
                      <span className="text-xs font-bold tracking-wider text-slate-100">LIVE CAM</span>
                    </div>

                    <div className="absolute bottom-6 right-7 flex flex-col items-end gap-1 text-right">
                      <p className="text-xs font-medium text-slate-200 tracking-wide">
                        Camera : 100%
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-300/90">
                        <span>Camera settings</span>
                        <div className="w-5 h-3 rounded-full bg-slate-600/80 border border-slate-400/40 flex items-center justify-end px-0.5">
                          <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* ================= COLUMN 2: CURRENT STATUS ================= */}
              <div className="flex flex-col gap-3 min-w-0">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  CURRENT STATUS
                </h2>

                <div className="relative flex flex-1 flex-col items-center justify-center py-6 px-4 text-center">
                  <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#19e6a4]/15 blur-[65px]" />

                  <div className="relative flex h-44 w-44 shrink-0 items-center justify-center rounded-full border-[6px] border-[#19e6a4] bg-[radial-gradient(circle,rgba(25,230,164,0.22)_0%,rgba(16,185,129,0.06)_65%,transparent_100%)] shadow-[0_0_45px_rgba(25,230,164,0.4),inset_0_0_28px_rgba(25,230,164,0.25)]">
                    <div className="absolute inset-2.5 rounded-full border-[2px] border-[#19e6a4]/35" />
                    <svg className="h-20 w-20 text-[#19e6a4] drop-shadow-[0_0_14px_rgba(25,230,164,0.9)]" fill="none" stroke="currentColor" strokeWidth="3.2" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <h3 className="mt-7 text-5xl font-extrabold tracking-tight text-[#71f8e4] drop-shadow-[0_0_22px_rgba(25,230,164,0.65)]">
                    Normal
                  </h3>

                  <p className="mt-2 text-lg font-medium text-slate-300">
                    Optimal Posture
                  </p>

                  <button
                    type="button"
                    className="mt-6 rounded-2xl border border-teal-400/35 bg-gradient-to-b from-[#253949]/90 to-[#182736]/90 px-7 py-2.5 text-sm font-semibold text-slate-100 shadow-[0_0_20px_rgba(25,230,164,0.15),inset_0_1px_1px_rgba(255,255,255,0.15)] transition hover:border-[#19e6a4] hover:shadow-[0_0_25px_rgba(25,230,164,0.35)] active:scale-95"
                  >
                    Re-Calibrate
                  </button>

                  <p className="mt-7 max-w-[260px] text-xs leading-relaxed text-slate-400/90">
                    Subtle environmental data sits gracefully under environmental data.
                  </p>
                </div>
              </div>

              {/* ================= COLUMN 3: DAILY SUMMARY ================= */}
              <div className="flex flex-col gap-3 min-w-0">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  DAILY SUMMARY
                </h2>

                <div className="flex flex-col justify-between gap-4 flex-1">
                  
                  {/* Card 1: TOTAL ACTIVE TIME */}
                  <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-[24px] border border-cyan-300/20 bg-gradient-to-br from-[#1b3242]/90 via-[#132432]/90 to-[#0e1b26]/90 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                    <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl" />

                    <div className="relative flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                        TOTAL ACTIVE TIME
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-400/10 text-[#4fdbc8] shadow-inner">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>

                    <p className="relative my-1 text-4xl font-extrabold tracking-tight text-white">
                      4h 43m
                    </p>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-950/60 p-0.5 border border-white/5">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#19e6a4] to-[#4fdbc8] shadow-[0_0_12px_#19e6a4]" />
                    </div>
                  </div>

                  {/* Card 2: BAD POSTURE */}
                  <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-[24px] border border-rose-300/20 bg-gradient-to-br from-[#3b2835]/90 via-[#281c25]/90 to-[#1c141a]/90 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                    <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-rose-400/10 blur-2xl" />

                    <div className="relative flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                        BAD POSTURE
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-300/25 bg-rose-400/15 text-rose-300 shadow-inner">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M12 9v3m0 4h.01m-7.2 4h14.4c1.5 0 2.4-1.6 1.7-2.9L13.7 4.5c-.8-1.3-2.6-1.3-3.4 0L3.1 17.1c-.7 1.3.2 2.9 1.7 2.9z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>

                    <div className="relative flex items-end justify-between my-1">
                      <p className="text-4xl font-extrabold tracking-tight text-white">
                        1h 10m
                      </p>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-400 shadow-sm mb-1">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                        </svg>
                      </span>
                    </div>

                    <div className="h-1" />
                  </div>

                  {/* Card 3: ALERTS TRIGGERED */}
                  <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-[24px] border border-cyan-300/20 bg-gradient-to-br from-[#1b3242]/90 via-[#132432]/90 to-[#0e1b26]/90 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                    <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl" />

                    <div className="relative flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                        ALERTS TRIGGERED
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-400/10 text-cyan-200 shadow-inner">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M18 9a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12a2 2 0 004 0" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>

                    <p className="relative my-1 text-4xl font-extrabold tracking-tight text-white">
                      12 times
                    </p>

                    <div className="relative flex items-center justify-between gap-1.5 pt-2 px-1">
                      {[
                        '#2dd4bf', '#38bdf8', '#34d399', '#fb7185',
                        '#38bdf8', '#34d399', '#38bdf8', '#fbbf24',
                        '#2dd4bf', '#fb7185', '#818cf8', '#64748b',
                      ].map((color, index) => (
                        <span
                          key={index}
                          className={`rounded-full transition-all ${
                            index === 3
                              ? 'w-5 h-2 bg-[#ff5c5c] shadow-[0_0_10px_#ff5c5c]'
                              : 'w-2 h-2'
                          }`}
                          style={{ backgroundColor: index === 3 ? '#ff5c5c' : color }}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
        {/* END: Dashboard Body Content */}

      </main>
      {/* END: Main App Shell */}
    </div>
  );
}