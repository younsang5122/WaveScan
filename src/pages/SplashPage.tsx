import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/common.css';
import '../../css/splash.css';

const steps = [
  { pct: '30%', text: 'AI 스캔 엔진 초기화 중...' },
  { pct: '70%', text: '용기 안전 데이터베이스 로딩...' },
  { pct: '100%', text: '준비 완료!' },
];

export const SplashPage: React.FC = () => {
  const navigate = useNavigate();
  const [fillWidth, setFillWidth] = useState('0%');
  const [loaderText, setLoaderText] = useState('서비스를 준비하는 중...');

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setFillWidth(steps[current].pct);
        setLoaderText(steps[current].text);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/login');
        }, 500);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="splash-page">
      {/* Decorative blobs */}
      <div className="splash-blob b1"></div>
      <div className="splash-blob b2"></div>
      <div className="splash-blob b3"></div>

      {/* Wave rings */}
      <div className="splash-rings">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
      </div>

      {/* Content */}
      <div className="splash-content">
        <div className="splash-logo-wrap">
          <img src="/img/logo.jpg" alt="WaveScan 로고" className="splash-logo" />
        </div>
        <div className="splash-brand">Wave Scan</div>
        <div className="splash-tagline">AI 기반 전자레인지 용기 안전 검사</div>

        <div className="splash-loader">
          <div className="loader-bar">
            <div className="loader-fill" style={{ width: fillWidth }}></div>
          </div>
          <div className="loader-text">{loaderText}</div>
        </div>
      </div>

      <div className="splash-footer">안전한 주방 생활의 시작 · WaveScan</div>
    </div>
  );
};

export default SplashPage;