import React, { useState } from 'react';
import BackHeader from '../components/layout/BackHeader';
import { showToast } from '../utils/auth';
import '../../css/common.css';
import '../../css/notification-settings.css';

export const NotificationSettingsPage: React.FC = () => {
  const [toggles, setToggles] = useState({
    scanComplete: true,
    dangerAlert: true,
    guideUpdate: true,
    notice: true,
    marketing: false,
  });

  const [masterChecked, setMasterChecked] = useState(true);

  const handleMasterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setMasterChecked(checked);
    setToggles({
      scanComplete: checked,
      dangerAlert: checked,
      guideUpdate: checked,
      notice: checked,
      marketing: checked,
    });
    showToast(checked ? '모든 알림이 켜졌습니다.' : '모든 알림이 꺼졌습니다.');
  };

  const handleToggleChange = (key: keyof typeof toggles) => {
    setToggles((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const allChecked = Object.values(next).every(Boolean);
      setMasterChecked(allChecked);
      return next;
    });
  };

  return (
    <div className="app-shell">
      <BackHeader title="알림 설정" backTo="/mypage" />

      <main className="main-content no-bottom">
        {/* Master toggle */}
        <div className="master-toggle-wrap">
          <div className="master-toggle-info">
            <div className="title">전체 알림</div>
            <div className="desc">모든 푸시 알림을 켜거나 끕니다</div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={masterChecked}
              onChange={handleMasterChange}
            />
            <div className="toggle-track"></div>
          </label>
        </div>

        {/* Settings */}
        <div className="notif-settings-list">
          {/* Scan */}
          <div className="notif-setting-card">
            <div className="notif-setting-header">
              <i className="fa-solid fa-camera notif-setting-header-icon"></i>
              <span className="notif-setting-header-title">스캔 알림</span>
            </div>
            <div className="notif-setting-item">
              <div className="notif-setting-label">
                <div className="notif-setting-title">스캔 완료 알림</div>
                <div className="notif-setting-desc">AI 분석이 완료되면 알려드려요</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={toggles.scanComplete}
                  onChange={() => handleToggleChange('scanComplete')}
                />
                <div className="toggle-track"></div>
              </label>
            </div>
            <div className="notif-setting-item">
              <div className="notif-setting-label">
                <div className="notif-setting-title">위험 용기 경고</div>
                <div className="notif-setting-desc">위험 등급 용기 스캔 시 즉시 알림</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={toggles.dangerAlert}
                  onChange={() => handleToggleChange('dangerAlert')}
                />
                <div className="toggle-track"></div>
              </label>
            </div>
          </div>

          {/* Service */}
          <div className="notif-setting-card">
            <div className="notif-setting-header">
              <i className="fa-solid fa-gear notif-setting-header-icon"></i>
              <span className="notif-setting-header-title">서비스 알림</span>
            </div>
            <div className="notif-setting-item">
              <div className="notif-setting-label">
                <div className="notif-setting-title">안전 가이드 업데이트</div>
                <div className="notif-setting-desc">새로운 안전 정보가 추가되면 알려드려요</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={toggles.guideUpdate}
                  onChange={() => handleToggleChange('guideUpdate')}
                />
                <div className="toggle-track"></div>
              </label>
            </div>
            <div className="notif-setting-item">
              <div className="notif-setting-label">
                <div className="notif-setting-title">공지사항 알림</div>
                <div className="notif-setting-desc">서비스 공지 및 업데이트 안내</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={toggles.notice}
                  onChange={() => handleToggleChange('notice')}
                />
                <div className="toggle-track"></div>
              </label>
            </div>
          </div>

          {/* Marketing */}
          <div className="notif-setting-card">
            <div className="notif-setting-header">
              <i className="fa-solid fa-tag notif-setting-header-icon"></i>
              <span className="notif-setting-header-title">마케팅 알림</span>
            </div>
            <div className="notif-setting-item">
              <div className="notif-setting-label">
                <div className="notif-setting-title">이벤트 및 혜택</div>
                <div className="notif-setting-desc">새로운 이벤트와 혜택 정보</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={toggles.marketing}
                  onChange={() => handleToggleChange('marketing')}
                />
                <div className="toggle-track"></div>
              </label>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 20px', fontSize: '12px', color: 'var(--text-tertiary)', lineHeight: '1.6' }}>
          * 위험 용기 경고 알림은 서비스 정책에 따라 항상 수신될 수 있습니다.<br />
          * 알림 설정은 기기 알림 권한이 허용된 경우에만 작동합니다.
        </div>
      </main>
    </div>
  );
};

export default NotificationSettingsPage;
