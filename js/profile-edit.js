/* profile-edit.js */

document.addEventListener('DOMContentLoaded', () => {
  const user = Auth.getUser();
  if (!user || !user.isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }

  const nicknameInput = document.getElementById('nicknameInput');
  const emailInput = document.getElementById('emailInput');
  const avatarPreview = document.getElementById('avatarPreview');
  const avatarInput = document.getElementById('avatarInput');
  const changeAvatarBtn = document.getElementById('changeAvatarBtn');
  const nickCount = document.getElementById('nickCount');

  // Fill initial values
  if (nicknameInput) {
    nicknameInput.value = user.name || '';
    if (nickCount) nickCount.textContent = (user.name || '').length;
  }
  if (emailInput) emailInput.value = user.email || 'user@gmail.com';
  if (avatarPreview && user.avatar) {
    avatarPreview.innerHTML = `<img src="${user.avatar}" alt="${user.name}">`;
  }

  // Counter
  if (nicknameInput && nickCount) {
    nicknameInput.addEventListener('input', () => {
      nickCount.textContent = nicknameInput.value.length;
    });
  }

  // Change avatar
  if (changeAvatarBtn && avatarInput) {
    changeAvatarBtn.addEventListener('click', () => {
      avatarInput.click();
    });

    avatarInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          if (avatarPreview) {
            avatarPreview.innerHTML = `<img src="${evt.target.result}" alt="미리보기">`;
          }
          avatarPreview.dataset.newAvatar = evt.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });
  }
});

function saveProfile() {
  const nicknameInput = document.getElementById('nicknameInput');
  const avatarPreview = document.getElementById('avatarPreview');

  const newName = nicknameInput ? nicknameInput.value.trim() : '';
  if (!newName) {
    showToast('닉네임을 입력해 주세요.');
    return;
  }

  const newAvatar = avatarPreview && avatarPreview.dataset.newAvatar ? avatarPreview.dataset.newAvatar : null;
  Auth.updateProfile(newName, newAvatar);

  showToast('프로필이 수정되었습니다.');
  setTimeout(() => {
    window.location.href = 'mypage.html';
  }, 600);
}
