import React from 'react';
import { Link } from 'react-router-dom';

interface AppHeaderProps {
  title: string;
  showNotif?: boolean;
  notifDot?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, showNotif = true, notifDot = false }) => {
  return (
    <header className="app-header">
      <div className="header-inner">
        <Link to="/home" className="header-brand">
          <img src="/img/logo.jpg" alt="WaveScan" className="header-logo" />
          <span className="header-title">{title}</span>
        </Link>
        {showNotif && (
          <div className="header-actions">
            <Link to="/notifications" className="header-btn" aria-label="알림">
              <i className="fa-regular fa-bell" />
              {notifDot && <span className="notif-dot" />}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
