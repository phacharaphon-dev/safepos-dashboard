import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Posture from './pages/Posture';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Profile from './pages/Profile'; // <-- เพิ่มการอิมพอร์ต

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/posture" element={<Posture />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} /> {/* <-- เพิ่ม Route นี้ */}
      </Routes>
    </Router>
  );
}