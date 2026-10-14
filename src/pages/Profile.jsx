
import { Link } from 'react-router-dom';

export default function Profile() {
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
            <img 
              alt="พชรพล ฤกษนันทน์" 
              className="w-9 h-9 rounded-full object-cover" 
              src="/profile.jpg" 
            />
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

            {/* ปุ่มที่ 3: Analytics */}
            <Link aria-label="Analytics" to="/analytics" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-teal-300 hover:bg-slate-800/50 rounded-xl transition">
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

            {/* ปุ่มที่ 5: Profile (Active หน้านี้) */}
            <Link aria-current="page" aria-label="Profile" to="/profile" className="w-11 h-11 flex items-center justify-center rounded-xl bg-teal-500/20 text-[#19e6a4] shadow-[0_0_18px_rgba(25,230,164,0.35)] border border-teal-500/40 transition">
              <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </Link>
          </nav>

          <a aria-label="Logout" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-slate-800/50 rounded-xl transition mt-auto" href="#logout">
            <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </a>
        </aside>
        {/* END: LeftSidebar */}

        {/* BEGIN: Profile Body Content */}
        <div className="pl-4 pr-2 pb-6 flex-1 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
            
            <div className="flex flex-col gap-1 mb-2">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Profile &amp; device
              </h1>
              <p className="text-xs font-medium text-slate-400 tracking-wide">
                Manage user biometric profile and optical telemetry sensors
              </p>
            </div>

            {/* Card 1: User profile */}
            <section className="w-full rounded-3xl bg-[#182338]/80 border border-slate-700/50 backdrop-blur-xl p-8 flex flex-col gap-6 shadow-2xl">
              <div className="flex flex-col gap-1 pb-4 border-b border-slate-700/50">
                <h2 className="text-xl font-bold text-white tracking-tight">User profile</h2>
                <p className="text-xs text-slate-400">Personal biometric details and account identity</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-8 py-2">
                <div className="relative flex-shrink-0">
                  <img 
                    alt="พชรพล ฤกษนันทน์" 
                    className="w-24 h-24 rounded-full object-cover ring-2 ring-[#19e6a4] shadow-[0_0_18px_rgba(25,230,164,0.35)]" 
                    src="/profile.jpg" 
                  />
                  <span className="absolute bottom-0 right-1.5 w-4 h-4 rounded-full bg-[#19e6a4] ring-2 ring-[#0c1424] shadow-[0_0_8px_rgba(25,230,164,0.5)]"></span>
                </div>
                <div className="flex flex-col items-center sm:items-start gap-4 flex-1">
                  <div className="flex flex-col items-center sm:items-start gap-1">
                    <div className="flex items-center gap-3">
                      {/* 👇👇 เปลี่ยนชื่อตรงนี้เป็น พชรพล ฤกษนันทน์ เรียบร้อยแล้วครับ 👇👇 */}
                      <h3 className="text-2xl font-bold text-white tracking-tight">พชรพล ฤกษนันทน์</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-[#19e6a4] text-xs font-semibold tracking-wide">Primary account</span>
                    </div>
                    {/* 👇👇 อีเมลด้านล่างชื่อ (แก้ปรับได้ตามต้องการครับ) 👇👇 */}
                    <span className="text-xs font-mono text-slate-400">phacharaphon@gmail.com</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/70 border border-slate-700/60 shadow-inner">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M8 3v18m0-15h4m-4 6h3m-3 6h4"></path>
                      </svg>
                      <span className="text-xs text-slate-400">Height:</span>
                      {/* 👇👇 แก้ตัวเลขส่วนสูงตรงนี้ได้เลยครับ 👇👇 */}
                      <span className="text-sm font-bold text-white font-mono">175 cm</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/70 border border-slate-700/60 shadow-inner">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 3v3m-7 4l2 7a5 5 0 0010 0l2-7H5z"></path>
                        <circle cx="12" cy="14" r="2"></circle>
                      </svg>
                      <span className="text-xs text-slate-400">Weight:</span>
                      {/* 👇👇 แก้ตัวเลขน้ำหนักตรงนี้ได้เลยครับ 👇👇 */}
                      <span className="text-sm font-bold text-white font-mono">68 kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Card 2: Hardware status */}
            <section className="w-full rounded-3xl bg-[#182338]/80 border border-slate-700/50 backdrop-blur-xl p-8 flex flex-col gap-6 shadow-2xl">
              <div className="flex flex-col gap-1 pb-4 border-b border-slate-700/50">
                <h2 className="text-xl font-bold text-white tracking-tight">Hardware status</h2>
                <p className="text-xs text-slate-400">Connected optical biomechanics cameras and telemetry feed</p>
              </div>
              <div className="flex flex-col divide-y divide-slate-800/80 gap-4">
                
                {/* Device 1 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/40">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-[#19e6a4] flex-shrink-0">
                      <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white tracking-tight">Device ID: CAM-01-OFFICE</h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Desk optical sensor (workstation)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 font-mono text-xs">1080p 60fps</span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-[#19e6a4] text-xs font-semibold tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-[#19e6a4] animate-pulse shadow-[0_0_6px_#19e6a4]"></span>
                      <span>Online</span>
                    </div>
                  </div>
                </div>

                {/* Device 2 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/40">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 flex-shrink-0">
                      <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white tracking-tight">Device ID: CAM-02-HOME</h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Secondary optical sensor (home setup)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-400 font-mono text-xs">Last sync: 2d ago</span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]"></span>
                      <span>Offline</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

          </div>
        </div>
        {/* END: Profile Body Content */}

      </main>
      {/* END: Main App Shell */}
    </div>
  );
}