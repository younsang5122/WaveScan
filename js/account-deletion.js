/* account-deletion.js */

document.addEventListener('DOMContentLoaded', () => {
  const reasonOptions = document.querySelectorAll('.reason-option');
  const confirmWrap = document.getElementById('confirmWrap');
  const confirmCheckbox = document.getElementById('confirmCheckbox');
  const deleteAccountBtn = document.getElementById('deleteAccountBtn');

  let selectedReason = null;
  let isConfirmed = false;

  // Reason select
  reasonOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      reasonOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedReason = opt.getAttribute('data-reason');
    });
  });

  // Confirm checkbox
  if (confirmWrap && confirmCheckbox) {
    confirmWrap.addEventListener('click', () => {
      isConfirmed = !isConfirmed;
      if (isConfirmed) {
        confirmWrap.classList.add('checked');
        confirmCheckbox.innerHTML = '<i class="fa-solid fa-check"></i>';
      } else {
        confirmWrap.classList.remove('checked');
        confirmCheckbox.innerHTML = '';
      }
      if (deleteAccountBtn) deleteAccountBtn.disabled = !isConfirmed;
    });
  }

  // Submit deletion
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', () => {
      if (!isConfirmed) return;

      if (confirm('정말로 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.')) {
        Auth.logout();
        showToast('회원 탈퇴가 완료되었습니다.');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      }
    });
  }
});
