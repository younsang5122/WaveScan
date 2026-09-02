import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../../css/common.css';
import '../../css/auth-start.css';

export const AuthStartPage: React.FC = () => {
  const { loginWithGoogle, setGuestMode } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    loginWithGoogle();
    navigate('/home');
  };

  const handleGuestLogin = () => {
    setGuestMode();
    navigate('/home');
  };

  return (
    <div className="auth-page">
      {/* Decorative circles */}
      <div className="auth-deco d1"></div>
      <div className="auth-deco d2"></div>
      <div className="auth-deco d3"></div>

      {/* Hero */}
      <div className="auth-hero">
        <div className="auth-logo-ring anim-fade-in-up">
          <img src="/img/logo.jpg" alt="WaveScan 로고" className="auth-logo" />
        </div>
        <div className="auth-brand anim-fade-in-up anim-delay-1">WaveScan</div>
        <div className="auth-headline anim-fade-in-up anim-delay-2">
          안전한 주방 생활의 시작
        </div>
        <p className="auth-desc anim-fade-in-up anim-delay-3">
          AI 스캔으로 주방 용기의 전자레인지
          <br />
          안전성을 즉시 확인하세요
        </p>

        <div className="auth-features anim-fade-in-up anim-delay-4">
          <span className="auth-chip">
            <i className="fa-solid fa-bolt"></i> 즉시 분석
          </span>
          <span className="auth-chip">
            <i className="fa-solid fa-shield-halved"></i> 안전 등급
          </span>
          <span className="auth-chip">
            <i className="fa-solid fa-clock-rotate-left"></i> 기록 관리
          </span>
        </div>
      </div>

      {/* Login card */}
      <div className="auth-card-wrap">
        <div className="auth-card">
          <div className="auth-card-title">시작하기</div>
          <p className="auth-card-sub">간편하게 로그인하고 모든 기능을 사용해보세요</p>

          <button className="btn-google-auth" onClick={handleGoogleLogin}>
            <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google로 계속하기
          </button>

          <div className="auth-divider">
            <span>또는</span>
          </div>

          <button className="btn-guest" onClick={handleGuestLogin}>
            <i className="fa-regular fa-user"></i>
            로그인 없이 사용하기
          </button>

          <p className="auth-notice">
            로그인하면 WaveScan의 <a href="#terms">이용약관</a> 및 <a href="#privacy">개인정보처리방침</a>에 동의하게 됩니다.
            비로그인 상태에서도 스캔 기능을 이용할 수 있으나 기록 저장은 제한됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthStartPage;
