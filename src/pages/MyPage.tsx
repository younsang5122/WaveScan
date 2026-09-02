import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import BottomNav from '../components/layout/BottomNav';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import { showToast } from '../utils/auth';
import '../../css/common.css';
import '../../css/mypage.css';

export const MyPage: React.FC = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { stats } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
      showToast('로그아웃 되었습니다.');
      setTimeout(() => {
        navigate('/login');
      }, 500);
    }
  };

  return (
    <div className="app-shell">
      <AppHeader title="마이페이지" notifDot={true} />

      <main className="main-content">
        {isLoggedIn && user ? (
          /* LOGGED-IN view */
          <div id="loggedInView">
            {/* Profile hero */}
            <div className="mypage-hero">
              <div className="profile-wrap">
                <div className="profile-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <i className="fa-solid fa-user"></i>
                  )}
                </div>
                <div className="profile-info">
                  <div className="profile-name">{user.name || '사용자'}</div>
                  <div className="profile-tag">
                    {user.provider === 'google' ? (
                      <>
                        <i className="fa-brands fa-google"></i> Google 연동
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-user-check"></i> 회원
                      </>
                    )}
                  </div>
                </div>
                <Link to="/profile-edit" className="profile-edit-btn" aria-label="프로필 수정">
                  <i className="fa-solid fa-pen"></i>
                </Link>
              </div>
              <div className="profile-stats">
                <div className="pstat">
                  <div className="pstat-value">{stats.total}</div>
                  <div className="pstat-label">총 스캔</div>
                </div>
                <div className="pstat">
                  <div className="pstat-value">{stats.safe}</div>
                  <div className="pstat-label">안전</div>
                </div>
                <div className="pstat">
                  <div className="pstat-value">{stats.accuracy}</div>
                  <div className="pstat-label">개인 정확도</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mypage-content">
              {/* Quick actions */}
              <div className="menu-section">
                <div className="menu-section-label">빠른 메뉴</div>
                <div className="list-group">
                  <Link to="/history" className="list-item">
                    <div className="list-item-icon">
                      <i className="fa-solid fa-clock-rotate-left"></i>
                    </div>
                    <div className="list-item-body">
                      <div className="list-item-title">스캔 기록</div>
                      <div className="list-item-desc">내가 검사한 용기 목록 보기</div>
                    </div>
                    <div className="list-item-right">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </Link>
                  <Link to="/guide" className="list-item">
                    <div className="list-item-icon">
                      <i className="fa-solid fa-book-open"></i>
                    </div>
                    <div className="list-item-body">
                      <div className="list-item-title">안전 가이드</div>
                      <div className="list-item-desc">재질별 전자레인지 사용 수칙</div>
                    </div>
                    <div className="list-item-right">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Settings */}
              <div className="menu-section">
                <div className="menu-section-label">설정</div>
                <div className="list-group">
                  <Link to="/profile-edit" className="list-item">
                    <div className="list-item-icon">
                      <i className="fa-solid fa-user-pen"></i>
                    </div>
                    <div className="list-item-body">
                      <div className="list-item-title">프로필 수정</div>
                      <div className="list-item-desc">닉네임 · 프로필 사진 변경</div>
                    </div>
                    <div className="list-item-right">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </Link>
                  <Link to="/notification-settings" className="list-item">
                    <div className="list-item-icon">
                      <i className="fa-solid fa-bell"></i>
                    </div>
                    <div className="list-item-body">
                      <div className="list-item-title">알림 설정</div>
                      <div className="list-item-desc">푸시 알림 · 마케팅 수신 설정</div>
                    </div>
                    <div className="list-item-right">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Support */}
              <div className="menu-section">
                <div className="menu-section-label">고객지원</div>
                <div className="list-group">
                  <Link to="/support" className="list-item">
                    <div className="list-item-icon amber">
                      <i className="fa-solid fa-circle-question"></i>
                    </div>
                    <div className="list-item-body">
                      <div className="list-item-title">고객 지원 · FAQ</div>
                      <div className="list-item-desc">자주 묻는 질문 및 1:1 문의</div>
                    </div>
                    <div className="list-item-right">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Account */}
              <div className="menu-section account-menu-section">
                <div className="menu-section-label">계정 관리</div>
                <div className="account-card-group">
                  <button className="account-action-item logout" onClick={handleLogout} type="button">
                    <div className="account-action-left">
                      <div className="account-action-icon logout-icon">
                        <i className="fa-solid fa-right-from-bracket"></i>
                      </div>
                      <div className="account-action-text">
                        <span className="account-action-title">로그아웃</span>
                      </div>
                    </div>
                    <div className="account-action-arrow">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </button>
                  <Link to="/account-deletion" className="account-action-item delete">
                    <div className="account-action-left">
                      <div className="account-action-icon delete-icon">
                        <i className="fa-solid fa-user-xmark"></i>
                      </div>
                      <div className="account-action-text">
                        <span className="account-action-title">회원 탈퇴</span>
                        <span className="account-action-desc">계정 정보 및 데이터 영구 삭제</span>
                      </div>
                    </div>
                    <div className="account-action-arrow">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </Link>
                </div>
              </div>

              <div style={{ paddingBottom: 24, textAlign: 'center', fontSize: 12, color: 'var(--text-tertiary)' }}>
                WaveScan v1.0.0 ·{' '}
                <Link to="/support" style={{ color: 'var(--color-primary)' }}>
                  이용약관
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* GUEST view */
          <div id="guestView">
            <div className="mypage-guest anim-fade-in-up">
              <div className="mypage-guest-icon">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="mypage-guest-title">로그인이 필요해요</div>
              <p className="mypage-guest-desc">
                로그인하면 스캔 기록을 저장하고
                <br />
                개인 통계와 프로필을 관리할 수 있어요.
              </p>
              <div className="mypage-guest-btns">
                <Link to="/login" className="btn btn-primary">
                  <i className="fa-brands fa-google"></i> Google로 로그인
                </Link>
                <Link to="/home" className="btn btn-secondary">
                  로그인 없이 계속하기
                </Link>
              </div>
            </div>

            {/* Guest menu */}
            <div className="menu-section" style={{ marginTop: 8 }}>
              <div className="list-group">
                <Link to="/guide" className="list-item">
                  <div className="list-item-icon">
                    <i className="fa-solid fa-book-open"></i>
                  </div>
                  <div className="list-item-body">
                    <div className="list-item-title">안전 가이드</div>
                    <div className="list-item-desc">로그인 없이도 볼 수 있어요</div>
                  </div>
                  <div className="list-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
                <Link to="/support" className="list-item">
                  <div className="list-item-icon amber">
                    <i className="fa-solid fa-circle-question"></i>
                  </div>
                  <div className="list-item-body">
                    <div className="list-item-title">고객 지원 · FAQ</div>
                  </div>
                  <div className="list-item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default MyPage;
