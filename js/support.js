/* support.js */

document.addEventListener('DOMContentLoaded', () => {
  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // Contact form submission
  const submitContactBtn = document.getElementById('submitContactBtn');
  const contactCategory = document.getElementById('contactCategory');
  const contactTitle = document.getElementById('contactTitle');
  const contactContent = document.getElementById('contactContent');
  const contactEmail = document.getElementById('contactEmail');

  // Pre-fill email if user is logged in
  const user = Auth.getUser();
  if (user && user.email && contactEmail) {
    contactEmail.value = user.email;
  }

  if (submitContactBtn) {
    submitContactBtn.addEventListener('click', () => {
      if (!contactCategory || !contactCategory.value) {
        showToast('문의 유형을 선택해 주세요.');
        return;
      }
      if (!contactTitle || !contactTitle.value.trim()) {
        showToast('제목을 입력해 주세요.');
        return;
      }
      if (!contactContent || !contactContent.value.trim()) {
        showToast('내용을 입력해 주세요.');
        return;
      }
      if (!contactEmail || !contactEmail.value.trim()) {
        showToast('답변받을 이메일을 입력해 주세요.');
        return;
      }

      showToast('1:1 문의가 정상 접수되었습니다.');
      contactTitle.value = '';
      contactContent.value = '';
      contactCategory.value = '';
    });
  }
});
