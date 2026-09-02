/* splash.js */

document.addEventListener('DOMContentLoaded', () => {
  const loaderFill = document.getElementById('loaderFill');
  const loaderText = document.getElementById('loaderText');

  const steps = [
    { pct: '30%', text: 'AI 스캔 엔진 초기화 중...' },
    { pct: '70%', text: '용기 안전 데이터베이스 로딩...' },
    { pct: '100%', text: '준비 완료!' }
  ];

  let current = 0;
  const interval = setInterval(() => {
    if (current < steps.length) {
      if (loaderFill) loaderFill.style.width = steps[current].pct;
      if (loaderText) loaderText.textContent = steps[current].text;
      current++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        // 로딩바 100% 도달 시 login.html로 이동
        window.location.href = 'login.html';
      }, 500);
    }
  }, 700);
});
