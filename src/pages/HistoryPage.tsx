import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import BottomNav from '../components/layout/BottomNav';
import { useData } from '../hooks/useData';
import { showToast } from '../utils/auth';
import '../../css/common.css';
import '../../css/history.css';

export const HistoryPage: React.FC = () => {
  const { scans, stats, deleteScan } = useData();
  const navigate = useNavigate();

  const [currentFilter, setCurrentFilter] = useState<'all' | 'safe' | 'caution' | 'danger'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredScans = scans.filter((s) => {
    if (currentFilter !== 'all' && s.grade !== currentFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return s.material.toLowerCase().includes(q) || s.date.includes(q);
    }
    return true;
  });

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('이 스캔 기록을 삭제하시겠습니까?')) {
      deleteScan(id);
      showToast('기록이 삭제되었습니다.');
    }
  };

  return (
    <div className="app-shell">
      <AppHeader title="스캔 기록" notifDot={true} />

      <main className="main-content">
        {/* Stats summary */}
        <div className="history-stats">
          <div className="hstat">
            <div className="hstat-dot safe"></div>
            <div className="hstat-value">{stats.safe}</div>
            <div className="hstat-label">안전</div>
          </div>
          <div className="hstat">
            <div className="hstat-dot caution"></div>
            <div className="hstat-value">{stats.caution}</div>
            <div className="hstat-label">주의</div>
          </div>
          <div className="hstat">
            <div className="hstat-dot danger"></div>
            <div className="hstat-value">{stats.danger}</div>
            <div className="hstat-label">위험</div>
          </div>
          <div className="hstat">
            <div style={{ height: '8px' }}></div>
            <div className="hstat-value">{stats.total}</div>
            <div className="hstat-label">전체</div>
          </div>
        </div>

        {/* Search */}
        <div className="search-wrap">
          <div className="search-input-wrap">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="재질 또는 날짜로 검색..."
            />
          </div>
        </div>

        {/* Filter chips */}
        <div className="filter-bar">
          <button
            className={`filter-chip ${currentFilter === 'all' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('all')}
          >
            전체
          </button>
          <button
            className={`filter-chip ${currentFilter === 'safe' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('safe')}
          >
            ✅ 안전
          </button>
          <button
            className={`filter-chip ${currentFilter === 'caution' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('caution')}
          >
            ⚠️ 주의
          </button>
          <button
            className={`filter-chip ${currentFilter === 'danger' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('danger')}
          >
            🚫 위험
          </button>
        </div>

        {/* List */}
        {filteredScans.length > 0 ? (
          <div className="history-list">
            {filteredScans.map((scan) => (
              <div
                key={scan.id}
                className="history-card"
                onClick={() => navigate(`/scan-result?id=${scan.id}`)}
              >
                <div className="history-thumb">
                  {scan.imageUrl ? (
                    <img src={scan.imageUrl} alt={scan.material} />
                  ) : (
                    <i className="fa-solid fa-bowl-food"></i>
                  )}
                  <div className={`history-thumb-status ${scan.grade}`}></div>
                </div>
                <div className="history-body">
                  <div className="history-header">
                    <div className="history-material">{scan.material}</div>
                    <div className="history-date">{scan.date.split(' ')[0]}</div>
                  </div>
                  <div className="history-desc">{scan.gradeDesc}</div>
                  <div className="history-footer">
                    {scan.grade === 'safe' && <span className="badge badge-safe">안전</span>}
                    {scan.grade === 'caution' && <span className="badge badge-caution">주의</span>}
                    {scan.grade === 'danger' && <span className="badge badge-danger">위험</span>}
                    <button
                      className="history-delete"
                      onClick={(e) => handleDelete(e, scan.id)}
                      title="삭제"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fa-solid fa-clock-rotate-left"></i>
            </div>
            <div className="empty-title">스캔 기록이 없어요</div>
            <div className="empty-desc">
              용기를 스캔하면 여기에 기록이 쌓여요.
              <br />
              첫 번째 스캔을 시작해보세요!
            </div>
            <Link to="/scan" className="btn btn-primary" style={{ marginTop: 24, maxWidth: 200 }}>
              <i className="fa-solid fa-camera"></i> 지금 스캔하기
            </Link>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default HistoryPage;
