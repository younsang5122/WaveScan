import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackHeaderProps {
  title: string;
  backTo?: string;
  rightAction?: React.ReactNode;
}

const BackHeader: React.FC<BackHeaderProps> = ({ title, backTo, rightAction }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        <button className="header-btn" onClick={handleBack} aria-label="뒤로">
          <i className="fa-solid fa-arrow-left" />
        </button>
        <span className="header-title" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          {title}
        </span>
        <div className="header-actions">
          {rightAction ?? <div style={{ width: 38 }} />}
        </div>
      </div>
    </header>
  );
};

export default BackHeader;
