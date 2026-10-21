import { useState, useEffect, Suspense, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../firebase';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

const USER_ID = 'user123';

// พิกัด 3D ที่ล็อกตามแนวกระดูกสันหลัง (X = 0 คือกลางลำตัวพอดี)
const DEFAULT_CALIBRATION = {
  rotY: -1.57, // หันข้าง 90 องศา
  head: [0, 0.62, -0.02],   // จุดที่ 1: ศีรษะ/คอ
  back: [0, 0.22, 0.08],    // จุดที่ 2: หลังส่วนบน
  waist: [0, -0.15, 0.05],  // จุดที่ 3: เอว/สะโพก
};

// คอมโพเนนต์ย่อยสำหรับสร้างจุดยึด 3D ที่ล็อกตำแหน่ง "จุดกลมๆ" ไว้ที่พิกัด 3D เป๊ะๆ
function HotspotPin({ position, color, side = 'right', title, percent, statusText, subText }) {
  const colorMap = {
    rose: {
      dot: 'bg-rose-500 shadow-[0_0_12px_#f43f5e]',
      ping: 'bg-rose-500/50',
      line: 'from-rose-500 to-rose-500/30',
      border: 'border-rose-500/60',
      text: 'text-rose-400',
      hex: '#f43f5e',
    },
    amber: {
      dot: 'bg-amber-400 shadow-[0_0_12px_#f59e0b]',
      ping: 'bg-amber-500/50',
      line: 'from-amber-400 to-amber-500/30',
      border: 'border-amber-500/60',
      text: 'text-amber-400',
      hex: '#f59e0b',
    },
    purple: {
      dot: 'bg-purple-400 shadow-[0_0_12px_#a855f7]',
      ping: 'bg-purple-500/50',
      line: 'from-purple-400 to-purple-500/30',
      border: 'border-purple-500/60',
      text: 'text-purple-300',
      hex: '#a855f7',
    },
  }[color];

  return (
    <group position={position}>
      {/* หมุดทรงกลม 3D แท้ๆ ที่ฝังอยู่บนจุดพิกัดของโมเดล */}
      <mesh>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color={colorMap.hex} />
      </mesh>

      {/* ไม่ใส่ center บน <Html> เพื่อให้จุด (0,0) อยู่ที่หมุดกลมๆ เป๊ะ 100% เวลาหมุนจะไม่เหวี่ยงหนี */}
      <Html zIndexRange={[100, 0]}>
        <div className="relative pointer-events-none select-none">
          {/* จุดกลมๆ อยู่ตรงกลางพิกัด (0,0) พอดี */}
          <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5">
            <span className={`absolute w-5 h-5 rounded-full ${colorMap.ping} animate-ping`} />
            <span className={`w-3 h-3 rounded-full ${colorMap.dot} ring-2 ring-white`} />
          </div>

          {/* เส้นชี้และป้ายข้อความ ยื่นออกจากจุดกลมๆ */}
          <div
            className={`absolute top-0 -translate-y-1/2 flex items-center ${
              side === 'right' ? 'left-2.5 flex-row' : 'right-2.5 flex-row-reverse'
            }`}
          >
            <div
              className={`w-8 h-0.5 ${
                side === 'right' ? 'bg-gradient-to-r' : 'bg-gradient-to-l'
              } ${colorMap.line}`}
            />
            <div
              className={`bg-[#161032]/95 rounded-xl p-2.5 border ${colorMap.border} backdrop-blur-md min-w-[145px] shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-0.5 gap-2">
                <span className="text-xs font-bold text-white whitespace-nowrap">{title}</span>
                <span className={`text-xs font-extrabold ${colorMap.text}`}>{percent}%</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    color === 'purple' ? 'bg-[#00f5a0]' : colorMap.dot.split(' ')[0]
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold ${
                    color === 'purple' ? 'text-[#00f5a0]' : colorMap.text
                  }`}
                >
                  {statusText}
                </span>
              </div>
              <p className="text-[10px] text-slate-300 mt-0.5 whitespace-nowrap">{subText}</p>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

function ModelWithHotspots({ summary, latestAngle, config, activeTarget, onSurfaceClick }) {
  const { scene } = useGLTF('/my-model.glb');
  const outerGroupRef = useRef();

  // ปรับขนาดและดึงจุดศูนย์กลางโมเดลมาที่ [0, 0, 0] อัตโนมัติ
  useLayoutEffect(() => {
    if (!scene || !outerGroupRef.current) return;

    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);
    scene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const targetHeight = 2.4;
      const autoScale = targetHeight / maxDim;

      scene.scale.setScalar(autoScale);
      scene.position.set(
        -center.x * autoScale,
        -center.y * autoScale,
        -center.z * autoScale
      );
    }
  }, [scene]);

  // ระบบ Raycasting: คลิกบนพื้นผิวโมเดล 3D จุดไหน หมุดจะย้ายไปเกาะพื้นผิวจุดนั้นทันที
  const handlePointerDown = (e) => {
    if (!activeTarget || !outerGroupRef.current) return;
    e.stopPropagation();
    const localPt = outerGroupRef.current.worldToLocal(e.point.clone());
    onSurfaceClick(activeTarget, [
      Number(localPt.x.toFixed(3)),
      Number(localPt.y.toFixed(3)),
      Number(localPt.z.toFixed(3)),
    ]);
  };

  return (
    <group ref={outerGroupRef} rotation={[0, config.rotY, 0]}>
      <primitive object={scene} onClick={handlePointerDown} />

      <HotspotPin
        position={config.head}
        color="rose"
        side="right"
        title="Forward head"
        percent={summary.forward_head_percent ?? 0}
        statusText="Critical strain"
        subText={`Cervical tilt: +${latestAngle ?? 0}°`}
      />

      <HotspotPin
        position={config.back}
        color="amber"
        side="left"
        title="Slouching"
        percent={summary.slouching_percent ?? 0}
        statusText="Moderate angle"
        subText="Kyphosis curvature"
      />

      <HotspotPin
        position={config.waist}
        color="purple"
        side="left"
        title="Prolonged static"
        percent={summary.static_percent ?? 0}
        statusText="Optimal alignment"
        subText="Lumbar support seated"
      />
    </group>
  );
}

export default function Posture() {
  const [summary, setSummary] = useState({
    forward_head_percent: 85,
    slouching_percent: 60,
    static_percent: 15,
    alert_count: 0,
  });
  const [latestAngle, setLatestAngle] = useState(14);

  // ใช้ Key ใหม่ (v3) เพื่อล้างค่าเก่าที่เคยเพี้ยนในเครื่องออกอัตโนมัติ
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('safeposture_3d_config_v3');
      return saved ? JSON.parse(saved) : DEFAULT_CALIBRATION;
    } catch {
      return DEFAULT_CALIBRATION;
    }
  });

  // โหมดคลิกจิ้มเลือกจุดบนตัวโมเดล 3D โดยตรง ('head' | 'back' | 'waist' | null)
  const [activeTarget, setActiveTarget] = useState(null);

  const handleSurfaceClick = (key, newCoords) => {
    setConfig((prev) => {
      const updated = { ...prev, [key]: newCoords };
      localStorage.setItem('safeposture_3d_config_v3', JSON.stringify(updated));
      return updated;
    });
    setActiveTarget(null); // ปักหมุดเสร็จแล้วออกจากโหมดคลิกอัตโนมัติ
  };

  useEffect(() => {
    const summariesRef = ref(rtdb, 'Daily_Summaries');
    const unsubSummaries = onValue(summariesRef, (snapshot) => {
      if (snapshot.exists()) {
        const allSummaries = snapshot.val();
        const userKeys = Object.keys(allSummaries).filter((k) => k.startsWith(`${USER_ID}_`)).sort();
        if (userKeys.length > 0) {
          const latest = allSummaries[userKeys[userKeys.length - 1]];
          setSummary({
            forward_head_percent: latest.forward_head_percent ?? 85,
            slouching_percent: latest.slouching_percent ?? 60,
            static_percent: latest.static_percent ?? 15,
            alert_count: latest.alert_count ?? 0,
          });
        }
      }
    });

    const logsRef = ref(rtdb, 'Event_Logs');
    const unsubLogs = onValue(logsRef, (snapshot) => {
      if (snapshot.exists()) {
        const logs = Object.values(snapshot.val()).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        if (logs.length > 0 && logs[0].max_angle) {
          setLatestAngle(logs[0].max_angle);
        }
      }
    });

    return () => {
      unsubSummaries();
      unsubLogs();
    };
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#070514] font-sans text-white selection:bg-purple-500 selection:text-white">
      <div className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[300px] bg-purple-700/20 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-indigo-700/15 blur-[120px] rounded-full" />

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
              {summary.alert_count}
            </span>
          </button>
          <Link to="/profile" className="w-10 h-10 rounded-full bg-[#130f29] border border-purple-500/30 p-0.5 flex items-center justify-center hover:border-purple-400 transition overflow-hidden">
            <img alt="User avatar" className="w-full h-full rounded-full object-cover" src="/profile.jpg" />
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full px-6 py-5 flex gap-7 overflow-hidden">
        
        <aside className="w-60 flex flex-col justify-between py-5 px-3.5 rounded-[26px] bg-[#0d0920]/90 border border-purple-500/25 shadow-[0_0_35px_rgba(0,0,0,0.8)] backdrop-blur-xl shrink-0">
          <nav className="flex flex-col space-y-2.5 w-full">
            <Link to="/" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-purple-500/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link to="/posture" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600/35 to-indigo-600/20 text-white font-semibold border border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition">
              <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v4m6-4v4M9 17v4m6-4v4M3 9h4m-4 6h4m10-6h4m-4 6h4" /></svg>
              <span className="text-sm">Live AI Analysis</span>
            </Link>
            <Link to="/analytics" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-purple-500/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              <span className="text-sm font-medium">Reports</span>
            </Link>
            <Link to="/settings" className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-purple-500/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-sm font-medium">Settings</span>
            </Link>
            <Link to="/profile" className="flex items-center justify-between px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-purple-500/10 transition">
              <div className="flex items-center space-x-3.5">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span className="text-sm font-medium">Users</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]"></span>
            </Link>
          </nav>
          <a href="#logout" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition mt-auto">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </a>
        </aside>

        <div className="flex-1 flex flex-col justify-start overflow-hidden pr-1">
          <div className="mb-4 shrink-0">
            <h1 className="text-3xl font-extrabold text-white tracking-wide">3D Posture Analysis</h1>
            <p className="text-sm text-slate-300 mt-1">Real-time biomechanical wireframe &amp; skeletal node tracking</p>
            <div className="mt-2.5 h-1.5 w-14 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_12px_#a855f7]" />
          </div>
          
          <section className="w-full flex-1 flex flex-col relative h-[calc(100vh-170px)] max-h-[750px]">
            <div className="relative w-full h-full rounded-[28px] p-3 bg-[#100b26]/90 border-2 border-purple-500/40 shadow-[0_0_35px_rgba(168,85,247,0.2)] flex items-center justify-center overflow-hidden">
              
              <div
                className={`relative w-full h-full rounded-[20px] overflow-hidden bg-[#080614] border border-purple-500/20 shadow-inner ${
                  activeTarget ? 'cursor-crosshair' : 'cursor-move'
                }`}
              >
                <Canvas camera={{ position: [0, 0.2, 4.2], fov: 45 }}>
                  <ambientLight intensity={1.1} />
                  <directionalLight position={[10, 10, 5]} intensity={1.5} />
                  <directionalLight position={[-10, -10, -5]} intensity={0.6} />
                  
                  <Suspense fallback={<Html center><div className="text-purple-400 font-bold">Loading 3D Model...</div></Html>}>
                    <ModelWithHotspots
                      summary={summary}
                      latestAngle={latestAngle}
                      config={config}
                      activeTarget={activeTarget}
                      onSurfaceClick={handleSurfaceClick}
                    />
                  </Suspense>

                  <OrbitControls target={[0, 0, 0]} enablePan={true} enableZoom={true} enableRotate={!activeTarget} />
                </Canvas>

                <div className="absolute top-5 left-5 flex items-center space-x-2 bg-[#161032]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-purple-400/40 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#a855f7]"></span>
                  <span className="text-xs font-bold tracking-wider text-purple-200 uppercase">Biomechanics HUD v2.4</span>
                </div>

                {/* แถบเครื่องมือ Raycast คลิกจิ้มปักหมุดบนตัวโมเดลโดยตรง */}
                <div className="absolute top-5 right-5 z-30 flex flex-wrap items-center gap-2 bg-[#120d2b]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-400/40 shadow-lg text-xs">
                  <span className="text-slate-300 font-semibold mr-1">🎯 คลิกปักหมุดบนตัวโมเดล:</span>
                  {[
                    { key: 'head', label: '🔴 หัว', activeClass: 'bg-rose-600 text-white border-rose-300' },
                    { key: 'back', label: '🟡 หลัง', activeClass: 'bg-amber-500 text-black border-amber-200' },
                    { key: 'waist', label: '🟣 เอว', activeClass: 'bg-purple-600 text-white border-purple-300' },
                  ].map((btn) => (
                    <button
                      key={btn.key}
                      onClick={() => setActiveTarget(activeTarget === btn.key ? null : btn.key)}
                      className={`px-2.5 py-1 rounded-full font-bold border transition ${
                        activeTarget === btn.key
                          ? `${btn.activeClass} animate-pulse`
                          : 'bg-white/5 text-slate-200 border-white/15 hover:bg-white/15'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setConfig(DEFAULT_CALIBRATION);
                      localStorage.removeItem('safeposture_3d_config_v3');
                      setActiveTarget(null);
                    }}
                    className="px-2 py-1 text-[11px] text-slate-400 hover:text-rose-400 transition"
                    title="รีเซ็ตตำแหน่งเริ่มต้น"
                  >
                    รีเซ็ต
                  </button>
                </div>

                {activeTarget && (
                  <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 z-30 bg-purple-600/90 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg border border-purple-300 animate-bounce">
                    👆 คลิกเมาส์ลงบนตำแหน่ง &quot;{activeTarget === 'head' ? 'หัว/คอ' : activeTarget === 'back' ? 'หลัง' : 'เอว'}&quot; ของตัวละคร 3D ได้เลย!
                  </div>
                )}
              </div>

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}