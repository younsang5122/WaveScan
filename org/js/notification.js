/* notification.js */

const SAMPLE_NOTIFS = [
  {
    id: 'n1',
    type: 'scan',
    iconClass: 'scan',
    icon: '<i class="fa-solid fa-camera"></i>',
    title: '스캔 분석 완료',
    desc: 'PP 플라스틱 용기 스캔 분석 결과가 등록되었습니다. [안전]',
    time: '방금 전',
    dateGroup: '오늘',
    unread: true
  },
  {
    id: 'n2',
    type: 'caution',
    iconClass: 'caution',
    icon: '<i class="fa-solid fa-triangle-exclamation"></i>',
    title: '주의 등급 용기 감지',
    desc: '최근 스캔한 멜라민 그릇은 전자레인지 고온 사용 시 주의가 필요합니다.',
    time: '2시간 전',
    dateGroup: '오늘',
    unread: true
  },
  {
    id: 'n3',
    type: 'system',
    iconClass: 'system',
    icon: '<i class="fa-solid fa-shield-halved"></i>',
    title: 'WaveScan 1.0 서비스 안내',
    desc: '구글 간편 로그인 및 재질별 AI 안전 가이드가 새롭게 정립되었습니다.',
    time: '어제',
    dateGroup: '이번 주',
    unread: false
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const notifList = document.getElementById('notifList');
  const notifEmpty = document.getElementById('notifEmpty');
  const markAllReadBtn = document.getElementById('markAllReadBtn');
  const clearAllBtn = document.getElementById('clearAllBtn');

  let notifications = [...SAMPLE_NOTIFS];

  function renderNotifs() {
    if (!notifList) return;
    notifList.innerHTML = '';

    if (notifications.length === 0) {
      if (notifEmpty) notifEmpty.style.display = 'flex';
      return;
    }

    if (notifEmpty) notifEmpty.style.display = 'none';

    let currentGroup = '';
    notifications.forEach(n => {
      if (n.dateGroup !== currentGroup) {
        currentGroup = n.dateGroup;
        const groupEl = document.createElement('div');
        groupEl.className = 'notif-date-group';
        groupEl.innerHTML = `<span class="notif-date-label">${currentGroup}</span>`;
        notifList.appendChild(groupEl);
      }

      const item = document.createElement('div');
      item.className = `notif-item ${n.unread ? 'unread' : ''}`;
      item.innerHTML = `
        <div class="notif-icon ${n.iconClass}">${n.icon}</div>
        <div class="notif-body">
          <div class="notif-title">${n.title}</div>
          <div class="notif-desc">${n.desc}</div>
        </div>
        <div class="notif-time">${n.time}</div>
        ${n.unread ? '<div class="notif-unread-dot"></div>' : ''}
      `;

      item.addEventListener('click', () => {
        n.unread = false;
        renderNotifs();
      });

      notifList.appendChild(item);
    });
  }

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
      notifications.forEach(n => n.unread = false);
      renderNotifs();
      showToast('모든 알림을 읽음 처리했습니다.');
    });
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      notifications = [];
      renderNotifs();
      showToast('알림을 모두 지웠습니다.');
    });
  }

  renderNotifs();
});
