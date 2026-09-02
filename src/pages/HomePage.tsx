import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import BottomNav from '../components/layout/BottomNav';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import { showToast } from '../utils/auth';
import '../../css/common.css';
import '../../css/home.css';

export const HomePage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { scans, stats } = useData();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      showToast('이미지를 분석하는 중...');
      setTimeout(() => {
        navigate('/scan-result?upload=true');
      }, 800);
    }
  };

  const recentScans = scans.slice(0, 5);

  return (
    <div className="app-shell">
      <AppHeader title="WaveScan" notifDot={true} />

      <main className="main-content" id="mainContent">
        {/* Guest banner (shown when not logged in) */}
        {!isLoggedIn && (
          <Link to="/login" className="guest-banner anim-fade-in-up" id="guestBanner">
            <div className="guest-banner-icon">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <div className="guest-banner-text">
              <div className="title">로그인하고 더 많은 기능을</div>
              <div className="desc">스캔 기록 저장 및 개인 통계를 이용해보세요</div>
            </div>
            <i className="fa-solid fa-chevron-right guest-banner-arrow"></i>
          </Link>
        )}

        {/* Hero CTA */}
        <div className="hero-section anim-fade-in-up anim-delay-1">
          <div className="hero-card">
            <div className="hero-label">
              <i className="fa-solid fa-wand-magic-sparkles"></i> AI 스캔 분석
            </div>
            <h1 className="hero-title">
              용기 안전성을<br />바로 확인하세요
            </h1>
            <p className="hero-sub">
              카메라로 스캔하거나 앨범에서 이미지를 선택해 전자레인지 사용 안전성을 즉시 확인하세요
            </p>
            <div className="hero-actions">
              <Link to="/scan" className="hero-btn primary" id="scanBtn">
                <i className="fa-solid fa-camera"></i> 카메라 스캔
              </Link>
              <button className="hero-btn secondary" id="uploadBtn" onClick={handleUploadClick}>
                <i className="fa-solid fa-image"></i> 앨범 선택
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-section anim-fade-in-up anim-delay-2" id="statsSection">
          <div className="section-header">
            <h2 className="section-title">
              <i className="fa-solid fa-chart-bar"></i> 나의 스캔 통계
            </h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fa-solid fa-camera"></i>
              </div>
              <div className="stat-value" id="totalScanCount">
                {stats.total}
              </div>
              <div className="stat-label">총 스캔 횟수</div>
              <div className="stat-badge" id="scanBadge">
                이번 달
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon amber">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <div className="stat-value" id="accuracyVal">
                {isLoggedIn ? stats.accuracy : '—'}
              </div>
              <div className="stat-label" id="accuracyLabel">
                {isLoggedIn ? '개인 정확도' : '로그인 필요'}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="recent-section anim-fade-in-up anim-delay-3">
          <div className="section-header">
            <h2 className="section-title">
              <i className="fa-regular fa-clock"></i> 최근 스캔
            </h2>
            <Link to="/history" className="section-link">
              전체 보기
            </Link>
          </div>

          <div className="scan-carousel hide-scroll" id="scanCarousel">
            {recentScans.length > 0 ? (
              recentScans.map((scan) => {
                let badgeHtml = null;
                if (scan.grade === 'safe') badgeHtml = <span className="badge badge-safe">안전</span>;
                else if (scan.grade === 'caution') badgeHtml = <span className="badge badge-caution">주의</span>;
                else badgeHtml = <span className="badge badge-danger">위험</span>;

                return (
                  <Link key={scan.id} to={`/scan-result?id=${scan.id}`} className="scan-card">
                    <div className="scan-thumb">
                      {scan.imageUrl ? (
                        <img src={scan.imageUrl} alt={scan.material} />
                      ) : (
                        <i className="fa-solid fa-bowl-food"></i>
                      )}
                      <div className="scan-thumb-badge">{badgeHtml}</div>
                    </div>
                    <div className="scan-info">
                      <div className="scan-material">{scan.material}</div>
                      <div className="scan-date">{scan.date.split(' ')[0]}</div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="empty-state" id="scanEmptyState" style={{ width: '100%' }}>
                <div className="empty-icon">
                  <i className="fa-solid fa-camera"></i>
                </div>
                <div className="empty-title">스캔 기록이 없어요</div>
                <div className="empty-desc">첫 번째 용기를 스캔해보세요</div>
              </div>
            )}
          </div>
        </div>

        {/* Guide Preview */}
        <div className="guide-section anim-fade-in-up anim-delay-4">
          <div className="section-header">
            <h2 className="section-title">
              <i className="fa-solid fa-book-open"></i> 재질별 안전 가이드
            </h2>
            <Link to="/guide" className="section-link">
              더 보기
            </Link>
          </div>
          <div className="guide-grid">
            <Link to="/guide#pp" className="guide-card">
              <div className="guide-emoji">♻️</div>
              <div className="guide-name">
                PP<br />플라스틱
              </div>
            </Link>
            <Link to="/guide#ceramic" className="guide-card">
              <div className="guide-emoji">🏺</div>
              <div className="guide-name">
                세라믹·<br />도자기
              </div>
            </Link>
            <Link to="/guide#glass" className="guide-card">
              <div className="guide-emoji">🥛</div>
              <div className="guide-name">유리</div>
            </Link>
            <Link to="/guide#melamine" className="guide-card">
              <div className="guide-emoji">🍽️</div>
              <div className="guide-name">멜라민</div>
            </Link>
            <Link to="/guide#stainless" className="guide-card">
              <div className="guide-emoji">🥄</div>
              <div className="guide-name">스테인리스</div>
            </Link>
            <Link to="/guide" className="guide-card">
              <div className="guide-emoji">📖</div>
              <div className="guide-name">
                전체<br />보기
              </div>
            </Link>
          </div>
        </div>

        <div className="home-bottom-pad"></div>
      </main>

      <BottomNav />

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default HomePage;
