import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackHeader from '../components/layout/BackHeader';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../utils/auth';
import '../../css/common.css';
import '../../css/account-deletion.css';

export const AccountDeletionPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleDelete = () => {
    if (!isConfirmed) return;

    if (window.confirm('정말로 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.')) {
      logout();
      showToast('회원 탈퇴가 완료되었습니다.');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };

  const reasons = [
    { key: 'not-useful', label: '서비스가 필요하지 않아요' },
    { key: 'inaccurate', label: '분석 결과가 정확하지 않아요' },
    { key: 'privacy', label: '개인정보 보호가 걱정돼요' },
    { key: 'switch-account', label: '다른 계정으로 재가입하려 해요' },
    { key: 'other', label: '기타' },
  ];

  return (
    <div className="app-shell">
      <BackHeader title="회원 탈퇴" backTo="/mypage" />

      <main className="main-content no-bottom">
        {/* Hero */}
        <div className="deletion-hero">
          <div className="deletion-icon">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <h1 className="deletion-title">정말 탈퇴하시겠어요?</h1>
          <p className="deletion-sub">
            탈퇴 후에는 계정과 모든 스캔 데이터가 영구 삭제되며 복구할 수 없습니다.
          </p>
        </div>

        {/* Warning */}
        <div className="deletion-warning">
          <div className="deletion-warning-title">
            <i className="fa-solid fa-circle-exclamation"></i> 탈퇴 전 꼭 확인하세요
          </div>
          <div className="deletion-warning-list">
            <div className="deletion-warning-item">
              <i className="fa-solid fa-xmark"></i>
              모든 스캔 기록 및 분석 결과가 삭제됩니다
            </div>
            <div className="deletion-warning-item">
              <i className="fa-solid fa-xmark"></i>
              프로필 정보 및 개인 통계가 삭제됩니다
            </div>
            <div className="deletion-warning-item">
              <i className="fa-solid fa-xmark"></i>
              동일 이메일로 재가입하더라도 데이터를 복구할 수 없습니다
            </div>
            <div className="deletion-warning-item">
              <i className="fa-solid fa-xmark"></i>
              탈퇴 처리 후 즉시 반영됩니다
            </div>
          </div>
        </div>

        {/* Reason */}
        <div className="deletion-form">
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">탈퇴 사유 (선택)</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {reasons.map((r) => (
                <div
                  key={r.key}
                  className={`reason-option ${selectedReason === r.key ? 'selected' : ''}`}
                  onClick={() => setSelectedReason(r.key)}
                >
                  <div className="reason-radio"></div>
                  <div className="reason-text">{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Confirm check */}
          <div
            className={`confirm-check-wrap ${isConfirmed ? 'checked' : ''}`}
            onClick={() => setIsConfirmed(!isConfirmed)}
          >
            <div className="confirm-checkbox">
              {isConfirmed && <i className="fa-solid fa-check"></i>}
            </div>
            <div className="confirm-check-text">
              위 내용을 모두 확인했으며, 회원 탈퇴 시 모든 데이터가 삭제됨에 동의합니다.
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="deletion-actions">
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={!isConfirmed}
          >
            <i className="fa-solid fa-trash"></i> 회원 탈퇴 진행
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/mypage')}>
            탈퇴 취소
          </button>
        </div>
      </main>
    </div>
  );
};

export default AccountDeletionPage;
