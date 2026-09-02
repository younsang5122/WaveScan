import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="bottom-nav">
      <Link to="/home" className={`nav-item ${pathname === '/home' ? 'active' : ''}`}>
        <i className="fa-solid fa-house"></i>
        <span>홈</span>
      </Link>
      <Link to="/history" className={`nav-item ${pathname === '/history' ? 'active' : ''}`}>
        <i className="fa-solid fa-clock-rotate-left"></i>
        <span>기록</span>
      </Link>
      <Link
        to="/scan"
        className={`nav-item scan-nav ${pathname === '/scan' || pathname === '/scan-result' ? 'active' : ''}`}
      >
        <div className="nav-scan-circle">
          <i className="fa-solid fa-camera"></i>
        </div>
        <span>스캔</span>
      </Link>
      <Link to="/guide" className={`nav-item ${pathname === '/guide' ? 'active' : ''}`}>
        <i className="fa-solid fa-book-open"></i>
        <span>가이드</span>
      </Link>
      <Link to="/mypage" className={`nav-item ${pathname === '/mypage' ? 'active' : ''}`}>
        <i className="fa-solid fa-user"></i>
        <span>마이페이지</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
