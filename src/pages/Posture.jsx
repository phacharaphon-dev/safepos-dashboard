
import { Link } from 'react-router-dom';

export default function Posture() {
  return (
    <div className="bg-[#0c1424] text-slate-100 font-sans min-h-screen selection:bg-teal-500 selection:text-white flex flex-col justify-between overflow-x-hidden relative">
      {/* Subtle ambient decorative grid background patterns */}
      <div className="absolute top-12 right-12 w-28 h-28 dot-matrix pointer-events-none opacity-40"></div>
      <div className="absolute bottom-6 left-6 w-32 h-32 dot-matrix pointer-events-none opacity-40"></div>
      
      {/* BEGIN: MainHeader */}
      <header className="w-full px-6 py-3 flex items-center justify-between z-20 shrink-0">
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
      {/* END: MainHeader */}

      {/* BEGIN: MainContentLayout */}
      <main className="flex-1 w-full px-6 pb-6 pt-1 flex items-stretch gap-6 relative z-10 overflow-hidden">
        
        {/* BEGIN: LeftFloatingSidebar */}
        <aside className="w-16 flex flex-col justify-between items-center py-5 px-2 rounded-3xl bg-[#141d2f]/90 border border-slate-700/40 shadow-2xl backdrop-blur-md shrink-0 h-[calc(100vh-100px)]">
          <nav aria-label="Sidebar Navigation" className="flex flex-col items-center space-y-6 w-full">
            
            {/* ปุ่มที่ 1: Dashboard */}
            <Link aria-label="Dashboard" to="/" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-teal-300 hover:bg-slate-800/50 rounded-xl transition">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z"></path>
              </svg>
            </Link>

            {/* ปุ่มที่ 2: 3D Posture (Active) */}
            <Link aria-label="3D posture analysis" to="/posture" className="w-11 h-11 flex items-center justify-center rounded-xl bg-teal-500/20 text-[#19e6a4] shadow-[0_0_18px_rgba(25,230,164,0.35)] border border-teal-500/40 transition">
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
        {/* END: LeftFloatingSidebar */}

        {/* BEGIN: DashboardBody */}
        <div className="flex-1 flex flex-col justify-start overflow-hidden">
          <div className="mb-3 flex items-end justify-between shrink-0">
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">3D posture analysis</h1>
              <p className="text-xs font-medium text-slate-400 tracking-wide">Real-time biomechanical wireframe &amp; skeletal node tracking</p>
            </div>
          </div>
          
          <section className="w-full flex-1 flex flex-col relative h-[calc(100vh-130px)] max-h-[750px]">
            <div className="relative w-full h-full rounded-2xl p-2.5 bg-gradient-to-b from-[#182338]/90 to-[#0e1728]/95 border border-slate-700/50 shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#060e20] flex items-center justify-center shadow-inner">
                
                <img alt="Futuristic glowing 3D wireframe mesh silhouette of seated biomechanics posture" className="w-full h-full object-contain filter brightness-[0.95] contrast-[1.08]" src="https://lh3.googleusercontent.com/aida/AEtjO1XQECtf9oLTu0tEgbZiYb3omeIukZz9ok-gHb6BdQLsCy5V-HKAc4n1h9Ta5dSeMxjP0FJEtsoXm8mO3WE-Q35Q91d5ek6YW6GCyHGfjmfX_IEhHVPBrWYdvBgLDPRbmBU50IBCTidyhvgL-VqCUeUZffre5kpZ8cp1u0hLoLN1hkdoMrJgRyxiKe1NGwktHm80ZEI25vtFm3t6ih-ce1S9XFXFyB1we7WS8qk09cg9eXjr2tHAioTtJz2A" />
                
                <div className="absolute inset-4 pointer-events-none">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-slate-400/40 rounded-tl-sm"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-slate-400/40 rounded-tr-sm"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-slate-400/40 rounded-bl-sm"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-slate-400/40 rounded-br-sm"></div>
                </div>

                <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_6px_#06b6d4]"></span>
                  <span className="text-[11px] font-semibold tracking-wider text-slate-200">biomechanics hud v2.4</span>
                </div>

                {/* Hotspot 1 */}
                <div className="absolute top-[18%] left-[27%] flex items-center group/node cursor-pointer">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <span className="absolute w-5 h-5 rounded-full bg-rose-500/30 animate-pulse"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] ring-2 ring-rose-400/50"></span>
                  </div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-rose-500 to-rose-500/40"></div>
                  <div className="card-warning-glass rounded-xl p-2.5 border border-rose-500/40 backdrop-blur-md shadow-2xl min-w-[130px]">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11px] font-bold text-white">Forward head</span>
                      <span className="text-[10px] font-extrabold text-rose-400">85%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      <span className="text-[10px] font-semibold text-rose-400">Critical strain</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Cervical tilt: +14°</p>
                  </div>
                </div>

                {/* Hotspot 2 */}
                <div className="absolute top-[37%] left-[17%] flex items-center group/node cursor-pointer">
                  <div className="card-dark-glass rounded-xl p-2.5 border border-amber-500/40 backdrop-blur-md shadow-2xl min-w-[125px]">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11px] font-bold text-white">Slouching</span>
                      <span className="text-[10px] font-extrabold text-amber-400">60%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span className="text-[10px] font-semibold text-amber-400">Moderate angle</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Kyphosis curvature</p>
                  </div>
                  <div className="w-6 h-0.5 bg-gradient-to-r from-amber-500/40 to-amber-400"></div>
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <span className="absolute w-5 h-5 rounded-full bg-amber-500/30 animate-pulse"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] ring-2 ring-amber-500/40"></span>
                  </div>
                </div>

                {/* Hotspot 3 */}
                <div className="absolute bottom-[34%] left-[24%] flex items-center group/node cursor-pointer">
                  <div className="card-dark-glass rounded-xl p-2.5 border border-teal-500/40 backdrop-blur-md shadow-2xl min-w-[135px]">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11px] font-bold text-white">Prolonged static</span>
                      <span className="text-[10px] font-extrabold text-[#19e6a4]">15%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span className="text-[10px] font-semibold text-[#19e6a4]">Optimal alignment</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Lumbar support seated</p>
                  </div>
                  <div className="w-7 h-0.5 bg-gradient-to-r from-teal-500/40 to-[#19e6a4]"></div>
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <span className="absolute w-5 h-5 rounded-full bg-teal-500/20 animate-pulse"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#19e6a4] shadow-[0_0_8px_rgba(25,230,164,0.9)] ring-2 ring-teal-500/40"></span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 text-[11px] text-slate-300">
                  <span className="text-slate-400">perspective:</span>
                  <span className="text-white font-semibold">sagittal (side)</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-teal-400 font-medium cursor-pointer hover:underline">coronal</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* END: DashboardBody */}
      </main>
      {/* END: MainContentLayout */}
    </div>
  );
}