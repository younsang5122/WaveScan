import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackHeader from '../components/layout/BackHeader';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../utils/auth';
import '../../css/common.css';
import '../../css/profile-edit.css';

export const ProfileEditPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = useState(user?.name || '');
  const [avatarSrc, setAvatarSrc] = useState(user?.avatar || '');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setAvatarSrc(evt.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    const trimmed = nickname.trim();
    if (!trimmed) {
      showToast('닉네임을 입력해 주세요.');
      return;
    }

    updateProfile(trimmed, avatarSrc || undefined);
    showToast('프로필이 수정되었습니다.');
    setTimeout(() => {
      navigate('/mypage');
    }, 600);
  };

  return (
    <div className="app-shell">
      <BackHeader
        title="프로필 수정"
        backTo="/mypage"
        rightAction={
          <button className="header-btn" onClick={handleSave} aria-label="저장">
            <i className="fa-solid fa-check" />
          </button>
        }
      />

      <main className="main-content no-bottom">
        {/* Hero */}
        <div className="profile-edit-hero">
          <div className="avatar-edit-wrap">
            <div className="avatar-large">
              {avatarSrc ? (
                <img src={avatarSrc} alt="프로필" />
              ) : (
                <i className="fa-solid fa-user"></i>
              )}
            </div>
            <button
              className="avatar-edit-btn"
              onClick={() => avatarInputRef.current?.click()}
              aria-label="사진 변경"
            >
              <i className="fa-solid fa-camera"></i>
            </button>
          </div>
          <span className="avatar-hint">탭하여 프로필 사진 변경</span>
        </div>

        {/* Form */}
        <div className="edit-form">
          <div className="social-badge">
            <i className="fa-brands fa-google"></i> Google 계정으로 가입됨
          </div>

          <div className="form-section-title">기본 정보</div>

          <div className="input-group">
            <label className="input-label" htmlFor="nicknameInput">
              닉네임
            </label>
            <div className="input-wrap">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                id="nicknameInput"
                className="input-field has-icon"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={20}
                placeholder="닉네임을 입력하세요"
              />
            </div>
            <div className="char-count">
              <span>{nickname.length}</span>/20
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="emailInput">
              이메일
            </label>
            <div className="input-wrap">
              <i className="fa-regular fa-envelope"></i>
              <input
                type="email"
                id="emailInput"
                className="input-field has-icon readonly-field"
                value={user?.email || 'user@gmail.com'}
                readOnly
              />
            </div>
            <div className="input-hint">Google 계정 이메일은 변경할 수 없습니다</div>
          </div>
        </div>

        <div className="edit-actions">
          <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => navigate('/mypage')}>
            취소
          </button>
          <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleSave}>
            <i className="fa-solid fa-check"></i> 저장하기
          </button>
        </div>
      </main>

      <input
        type="file"
        ref={avatarInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleAvatarChange}
      />
    </div>
  );
};

export default ProfileEditPage;
