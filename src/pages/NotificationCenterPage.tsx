import React, { useState } from 'react';
import BackHeader from '../components/layout/BackHeader';
import { showToast } from '../utils/auth';
import '../../css/common.css';
import '../../css/notification.css';

interface NotifItem {
  id: string;
  type: string;
  iconClass: string;
  icon: string;
  title: string;
  desc: string;
  time: string;
  dateGroup: string;
  unread: boolean;
}

const INITIAL_NOTIFS: NotifItem[] = [
  {
    id: 'n1',
    type: 'scan',
    iconClass: 'scan',
    icon: 'fa-solid fa-camera',
    title: '스캔 분석 완료',
    desc: 'PP 플라스틱 용기 스캔 분석 결과가 등록되었습니다. [안전]',
    time: '방금 전',
    dateGroup: '오늘',
    unread: true,
  },
  {
    id: 'n2',
    type: 'caution',
    iconClass: 'caution',
    icon: 'fa-solid fa-triangle-exclamation',
    title: '주의 등급 용기 감지',
    desc: '최근 스캔한 멜라민 그릇은 전자레인지 고온 사용 시 주의가 필요합니다.',
    time: '2시간 전',
    dateGroup: '오늘',
    unread: true,
  },
  {
    id: 'n3',
    type: 'system',
    iconClass: 'system',
    icon: 'fa-solid fa-shield-halved',
    title: 'WaveScan 1.0 서비스 안내',
    desc: '구글 간편 로그인 및 재질별 AI 안전 가이드가 새롭게 정립되었습니다.',
    time: '어제',
    dateGroup: '이번 주',
    unread: false,
  },
];

export const NotificationCenterPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotifItem[]>(INITIAL_NOTIFS);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('모든 알림을 읽음 처리했습니다.');
  };

  const handleClearAll = () => {
    setNotifications([]);
    showToast('알림을 모두 지웠습니다.');
  };

  const handleItemClick = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  let currentGroup = '';

  return (
    <div className="app-shell">
      <BackHeader
        title="알림"
        backTo="/home"
        rightAction={
          <button className="header-btn" onClick={handleClearAll} title="모두 지우기">
            <i className="fa-solid fa-check-double"></i>
          </button>
        }
      />

      <main className="main-content no-bottom">
        <div className="notif-clear-bar">
          <button className="notif-clear-btn" onClick={handleMarkAllRead}>
            <i className="fa-solid fa-envelope-open"></i> 모두 읽음으로 표시
          </button>
        </div>

        {notifications.length > 0 ? (
          <div className="notif-list">
            {notifications.map((n) => {
              const showGroupLabel = n.dateGroup !== currentGroup;
              if (showGroupLabel) {
                currentGroup = n.dateGroup;
              }
              return (
                <React.Fragment key={n.id}>
                  {showGroupLabel && (
                    <div className="notif-date-group">
                      <span className="notif-date-label">{n.dateGroup}</span>
                    </div>
                  )}
                  <div
                    className={`notif-item ${n.unread ? 'unread' : ''}`}
                    onClick={() => handleItemClick(n.id)}
                  >
                    <div className={`notif-icon ${n.iconClass}`}>
                      <i className={n.icon}></i>
                    </div>
                    <div className="notif-body">
                      <div className="notif-title">{n.title}</div>
                      <div className="notif-desc">{n.desc}</div>
                    </div>
                    <div className="notif-time">{n.time}</div>
                    {n.unread && <div className="notif-unread-dot"></div>}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fa-regular fa-bell"></i>
            </div>
            <div className="empty-title">알림이 없어요</div>
            <div className="empty-desc">
              스캔 결과 및 중요 안내 사항이
              <br />
              여기에 표시됩니다
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NotificationCenterPage;
