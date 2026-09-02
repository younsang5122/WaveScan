import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import BottomNav from '../components/layout/BottomNav';
import { useData } from '../hooks/useData';
import type { ScanData } from '../types';
import { showToast } from '../utils/auth';
import '../../css/common.css';
import '../../css/scan-result.css';

export const ScanResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const scanId = searchParams.get('id');
  const isUpload = searchParams.get('upload') === 'true';

  const { scans, saveScan } = useData();
  const [isSaved, setIsSaved] = useState(false);

  const existingScan = scanId ? scans.find((s) => s.id === scanId) : null;
  const sessionCapturedImage = sessionStorage.getItem('scannedImage');

  const currentScan: ScanData = existingScan || {
    id: 'scan_' + Date.now(),
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    timestamp: Date.now(),
    material: isUpload ? '내열 강화 유리' : 'PP 플라스틱 5',
    materialCode: isUpload ? 'GLASS' : 'PP',
    grade: 'safe',
    gradeTitle: '전자레인지 사용 가능',
    gradeDesc: 'BPA Free 인증을 완료한 안전한 내열 용기입니다.',
    maxTemp: isUpload ? 180 : 120,
    bpaStatus: 'Free',
    confidence: 96,
    imageUrl: sessionCapturedImage || (isUpload ? '' : '/img/logo.jpg'),
    checklist: [
      { name: 'BPA Free 인증', status: 'pass', text: '인증 완료' },
      { name: '고온 변형 테스트', status: 'pass', text: '내열 기준 통과' },
      { name: '금속 장식 성분', status: 'pass', text: '금속 성분 미감지' },
      { name: '증기 배출 가이드', status: 'warn', text: '뚜껑 개봉 후 가열' },
    ],
    aiComment:
      '분석 결과 해당 용기는 전자레인지 고온 데우기에 적합한 안전 용기입니다. 뚜껑을 약간 열어 증기가 배출되도록 조리하세요.',
  };

  const displayImage = sessionCapturedImage || currentScan.imageUrl;
  const tempPct = Math.min(100, Math.round((currentScan.maxTemp / 240) * 100));

  const handleSave = () => {
    if (sessionCapturedImage) {
      currentScan.imageUrl = sessionCapturedImage;
    }
    saveScan(currentScan);
    setIsSaved(true);
    showToast('스캔 결과가 저장되었습니다.');
  };

  return (
    <div className="app-shell">
      <AppHeader title="분석 결과" notifDot={true} />

      <main className="main-content">
        {/* Image + Grade overlay */}
        <div className="result-hero">
          <div className="result-image-wrap">
            {displayImage ? (
              <img src={displayImage} alt="스캔 이미지" className="result-image" />
            ) : (
              <div className="result-image-placeholder">
                <i className="fa-solid fa-bowl-food"></i>
                <span>스캔된 이미지</span>
              </div>
            )}
            <div className={`result-grade-overlay ${currentScan.grade}`}>
              {currentScan.grade === 'safe' && <i className="fa-solid fa-circle-check"></i>}
              {currentScan.grade === 'caution' && <i className="fa-solid fa-triangle-exclamation"></i>}
              {currentScan.grade === 'danger' && <i className="fa-solid fa-circle-xmark"></i>}
              <span>
                {currentScan.grade === 'safe' && '안전'}
                {currentScan.grade === 'caution' && '주의'}
                {currentScan.grade === 'danger' && '위험'}
              </span>
            </div>
          </div>

          {/* Grade card */}
          <div className={`grade-card ${currentScan.grade}`}>
            <div className="grade-icon">
              {currentScan.grade === 'safe' && <i className="fa-solid fa-circle-check"></i>}
              {currentScan.grade === 'caution' && <i className="fa-solid fa-triangle-exclamation"></i>}
              {currentScan.grade === 'danger' && <i className="fa-solid fa-circle-xmark"></i>}
            </div>
            <div>
              <div className="grade-label">안전 등급</div>
              <div className="grade-title">{currentScan.gradeTitle}</div>
              <div className="grade-desc">{currentScan.gradeDesc}</div>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Material info */}
        <div className="result-section">
          <div className="section-header mb-16">
            <h2 className="section-title">
              <i className="fa-solid fa-layer-group"></i> 재질 분석
            </h2>
          </div>
          <div className="material-grid">
            <div className="material-item">
              <div className="material-item-label">감지된 재질</div>
              <div className="material-item-value">{currentScan.material}</div>
            </div>
            <div className="material-item">
              <div className="material-item-label">내열 온도</div>
              <div className="material-item-value">{currentScan.maxTemp}°C</div>
            </div>
            <div className="material-item">
              <div className="material-item-label">BPA 상태</div>
              <div className="material-item-value">{currentScan.bpaStatus}</div>
            </div>
            <div className="material-item">
              <div className="material-item-label">분석 신뢰도</div>
              <div className="material-item-value">{currentScan.confidence}%</div>
            </div>
          </div>
          <div className="temp-bar-wrap">
            <div className="temp-bar-labels">
              <span>0°C</span>
              <span>{currentScan.maxTemp}°C / 최대 240°C</span>
            </div>
            <div className="temp-bar">
              <div className="temp-bar-fill" style={{ width: `${tempPct}%` }}></div>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Safety checklist */}
        <div className="result-section">
          <div className="section-header mb-16">
            <h2 className="section-title">
              <i className="fa-solid fa-list-check"></i> 안전 파라미터
            </h2>
          </div>
          <div className="checklist">
            {currentScan.checklist.map((item, idx) => {
              let iconClass = 'pass';
              let icon = <i className="fa-solid fa-check"></i>;
              if (item.status === 'fail') {
                iconClass = 'fail';
                icon = <i className="fa-solid fa-xmark"></i>;
              } else if (item.status === 'warn') {
                iconClass = 'warn';
                icon = <i className="fa-solid fa-exclamation"></i>;
              }
              return (
                <div className="checklist-item" key={idx}>
                  <div className={`check-icon ${iconClass}`}>{icon}</div>
                  <div className="checklist-item-text">{item.name}</div>
                  <div className={`checklist-item-result ${iconClass}`}>{item.text}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="section-divider"></div>

        {/* AI comment */}
        <div className="result-section">
          <div className="section-header mb-16">
            <h2 className="section-title">
              <i className="fa-solid fa-robot"></i> AI 분석 의견
            </h2>
          </div>
          <div className="ai-comment">
            <div className="ai-comment-header">
              <i className="fa-solid fa-wand-magic-sparkles"></i> WaveScan AI
            </div>
            <p className="ai-comment-text">{currentScan.aiComment}</p>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Actions */}
        <div className="result-actions">
          <button
            className="btn btn-primary btn-icon"
            onClick={handleSave}
            disabled={isSaved}
          >
            {isSaved ? (
              <>
                <i className="fa-solid fa-check"></i> 저장 완료
              </>
            ) : (
              <>
                <i className="fa-solid fa-bookmark"></i> 결과 저장하기
              </>
            )}
          </button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/scan" className="btn btn-secondary" style={{ flex: 1 }}>
              <i className="fa-solid fa-rotate-right"></i> 다시 스캔
            </Link>
            <Link to="/history" className="btn btn-ghost" style={{ flex: 1 }}>
              <i className="fa-solid fa-clock-rotate-left"></i> 기록 보기
            </Link>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default ScanResultPage;
