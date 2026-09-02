import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import BottomNav from '../components/layout/BottomNav';
import '../../css/common.css';
import '../../css/guide.css';

type MaterialTab = 'pp' | 'ceramic' | 'glass' | 'melamine' | 'stainless' | 'aluminum';

export const GuidePage: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<MaterialTab>('pp');

  useEffect(() => {
    const hash = location.hash.replace('#', '') as MaterialTab;
    if (hash && ['pp', 'ceramic', 'glass', 'melamine', 'stainless', 'aluminum'].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  return (
    <div className="app-shell">
      <AppHeader title="안전 가이드" notifDot={true} />

      <main className="main-content">
        {/* Header Sub-banner Section */}
        <div className="guide-top-banner">
          <div className="guide-top-content">
            <div className="guide-top-badge">
              <i className="fa-solid fa-shield-halved"></i>
              <span>안전성 백서</span>
            </div>
            <h1 className="guide-top-title">재질별 전자레인지 사용 가이드</h1>
            <p className="guide-top-desc">주방 용기의 소재별 열 내구성과 안전 수칙을 한눈에 확인하세요.</p>
          </div>
          <div className="guide-top-icon">
            <i className="fa-solid fa-book-bookmark"></i>
          </div>
        </div>

        {/* Pill Navigation Bar */}
        <div className="guide-tabs-wrap">
          <div className="guide-tabs" role="tablist">
            <button
              className={`guide-tab ${activeTab === 'pp' ? 'active' : ''}`}
              onClick={() => setActiveTab('pp')}
            >
              PP 플라스틱
            </button>
            <button
              className={`guide-tab ${activeTab === 'ceramic' ? 'active' : ''}`}
              onClick={() => setActiveTab('ceramic')}
            >
              세라믹·도자기
            </button>
            <button
              className={`guide-tab ${activeTab === 'glass' ? 'active' : ''}`}
              onClick={() => setActiveTab('glass')}
            >
              내열 유리
            </button>
            <button
              className={`guide-tab ${activeTab === 'melamine' ? 'active' : ''}`}
              onClick={() => setActiveTab('melamine')}
            >
              멜라민 수지
            </button>
            <button
              className={`guide-tab ${activeTab === 'stainless' ? 'active' : ''}`}
              onClick={() => setActiveTab('stainless')}
            >
              스테인리스
            </button>
            <button
              className={`guide-tab ${activeTab === 'aluminum' ? 'active' : ''}`}
              onClick={() => setActiveTab('aluminum')}
            >
              알루미늄
            </button>
          </div>
        </div>

        {/* Panels */}
        <div className="guide-panels">
          {/* 1. PP 플라스틱 */}
          {activeTab === 'pp' && (
            <div className="guide-panel active" id="panel-pp">
              <div className="material-hero hero-pp">
                <div className="material-hero-icon-box">♻️</div>
                <div className="material-hero-info">
                  <div className="material-hero-name">PP 플라스틱</div>
                  <div className="material-hero-eng">Polypropylene (PP 5)</div>
                  <div className="status-pill safe">
                    <i className="fa-solid fa-circle-check"></i> 전자레인지 사용 가능
                  </div>
                </div>
              </div>

              <div className="rules-card">
                <div className="rules-header">
                  <div className="rules-header-icon">
                    <i className="fa-solid fa-list-check"></i>
                  </div>
                  <div className="rules-title">사용 수칙</div>
                </div>
                <div className="rule-list">
                  <div className="rule-item">
                    <div className="rule-icon ok">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <div className="rule-text">전자레인지 전용 PP 용기 마크(♻️ 5번)를 꼭 확인하세요.</div>
                  </div>
                  <div className="rule-item">
                    <div className="rule-icon ok">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <div className="rule-text">내열 온도 범위(120°C~130°C 이하) 내에서 사용하세요.</div>
                  </div>
                  <div className="rule-item">
                    <div className="rule-icon warn">
                      <i className="fa-solid fa-exclamation"></i>
                    </div>
                    <div className="rule-text">
                      장시간 고온 가열 시 변형 가능성이 있으므로 데우기 위주로 사용하세요.
                    </div>
                  </div>
                  <div className="rule-item">
                    <div className="rule-icon no">
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="rule-text">
                      금속 장식이나 알루미늄 코팅이 포함된 PP 용기는 절대 가열 금지입니다.
                    </div>
                  </div>
                </div>
              </div>

              <div className="tips-card">
                <div className="tips-header">
                  <div className="tips-header-icon">
                    <i className="fa-solid fa-lightbulb"></i>
                  </div>
                  <div className="tips-title">스마트 안전 팁</div>
                </div>
                <div className="tip-list">
                  <div className="tip-item">
                    <div className="tip-num">1</div>
                    용기 바닥 재질 번호 중 5번(PP)만 전자레인지 조리에 안전합니다.
                  </div>
                  <div className="tip-item">
                    <div className="tip-num">2</div>
                    밀폐 뚜껑을 닫은 채 가열하지 말고 반드시 증기 배출구를 열어주세요.
                  </div>
                  <div className="tip-item">
                    <div className="tip-num">3</div>
                    변색이나 흠집이 심한 노후 용기는 새 것으로 교체하는 것이 안전합니다.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. 세라믹 · 도자기 */}
          {activeTab === 'ceramic' && (
            <div className="guide-panel active" id="panel-ceramic">
              <div className="material-hero hero-ceramic">
                <div className="material-hero-icon-box">🏺</div>
                <div className="material-hero-info">
                  <div className="material-hero-name">세라믹 · 도자기</div>
                  <div className="material-hero-eng">Ceramic & Pottery</div>
                  <div className="status-pill safe">
                    <i className="fa-solid fa-circle-check"></i> 대부분 사용 가능
                  </div>
                </div>
              </div>

              <div className="rules-card">
                <div className="rules-header">
                  <div className="rules-header-icon">
                    <i className="fa-solid fa-list-check"></i>
                  </div>
                  <div className="rules-title">사용 수칙</div>
                </div>
                <div className="rule-list">
                  <div className="rule-item">
                    <div className="rule-icon ok">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <div className="rule-text">
                      금속 장식이 없는 일반 도자기 그릇은 안심하고 사용할 수 있습니다.
                    </div>
                  </div>
                  <div className="rule-item">
                    <div className="rule-icon ok">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <div className="rule-text">
                      내열 세라믹 소재는 높은 온도에서도 우수한 안정성을 발휘합니다.
                    </div>
                  </div>
                  <div className="rule-item">
                    <div className="rule-icon warn">
                      <i className="fa-solid fa-exclamation"></i>
                    </div>
                    <div className="rule-text">
                      미세한 금이나 미세 균열이 있는 용기는 가열 중 파손 위험이 있습니다.
                    </div>
                  </div>
                  <div className="rule-item">
                    <div className="rule-icon no">
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="rule-text">
                      금채/은채 등 금속성 테두리 무늬 도자기는 불꽃 발생 위험으로 절대 금지입니다.
                    </div>
                  </div>
                </div>
              </div>

              <div className="tips-card">
                <div className="tips-header">
                  <div className="tips-header-icon">
                    <i className="fa-solid fa-lightbulb"></i>
                  </div>
                  <div className="tips-title">스마트 안전 팁</div>
                </div>
                <div className="tip-list">
                  <div className="tip-item">
                    <div className="tip-num">1</div>
                    금색이나 은색 무늬가 그려진 고급 식기는 전자레인지를 피하세요.
                  </div>
                  <div className="tip-item">
                    <div className="tip-num">2</div>
                    냉동실에 넣었던 차가운 도자기를 바로 전자레인지에 가열하지 마세요.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. 내열 유리 */}
          {activeTab === 'glass' && (
            <div className="guide-panel active" id="panel-glass">
              <div className="material-hero hero-glass">
                <div className="material-hero-icon-box">🥛</div>
                <div className="material-hero-info">
                  <div className="material-hero-name">내열 유리</div>
                  <div className="material-hero-eng">Tempered Heat-Resistant Glass</div>
                  <div className="status-pill safe">
                    <i className="fa-solid fa-circle-check"></i> 내열 강화 유리 가능
                  </div>
                </div>
              </div>

              <div className="rules-card">
                <div className="rules-header">
                  <div className="rules-header-icon">
                    <i className="fa-solid fa-list-check"></i>
                  </div>
                  <div className="rules-title">사용 수칙</div>
                </div>
                <div className="rule-list">
                  <div className="rule-item">
                    <div className="rule-icon ok">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <div className="rule-text">
                      전자레인지 전용 내열 강화유리 용기는 매우 안전합니다.
                    </div>
                  </div>
                  <div className="rule-item">
                    <div className="rule-icon warn">
                      <i className="fa-solid fa-exclamation"></i>
                    </div>
                    <div className="rule-text">
                      일반 유리잔이나 얇은 와인 잔은 열충격에 의해 쉽게 깨질 수 있습니다.
                    </div>
                  </div>
                  <div className="rule-item">
                    <div className="rule-icon no">
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="rule-text">
                      크리스털 유리 및 납 성분 유리는 전자파에 취약하므로 사용 금지입니다.
                    </div>
                  </div>
                </div>
              </div>

              <div className="tips-card">
                <div className="tips-header">
                  <div className="tips-header-icon">
                    <i className="fa-solid fa-lightbulb"></i>
                  </div>
                  <div className="tips-title">스마트 안전 팁</div>
                </div>
                <div className="tip-list">
                  <div className="tip-item">
                    <div className="tip-num">1</div>
                    제품 바닥의 '내열유리' 표기 마크를 먼저 확인하세요.
                  </div>
                  <div className="tip-item">
                    <div className="tip-num">2</div>
                    유리 용기에 흠집이 심한 경우 가열 중 비산 파손될 수 있습니다.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. 멜라민 수지 */}
          {activeTab === 'melamine' && (
            <div className="guide-panel active" id="panel-melamine">
              <div className="material-hero hero-melamine">
                <div className="material-hero-icon-box">🍽️</div>
                <div className="material-hero-info">
                  <div className="material-hero-name">멜라민 수지</div>
                  <div className="material-hero-eng">Melamine Resin</div>
                  <div className="status-pill danger">
                    <i className="fa-solid fa-circle-xmark"></i> 전자레인지 사용 금지
                  </div>
                </div>
              </div>

              <div className="rules-card">
                <div className="rules-header">
                  <div className="rules-header-icon">
                    <i className="fa-solid fa-list-check"></i>
                  </div>
                  <div className="rules-title">사용 수칙</div>
                </div>
                <div className="rule-list">
                  <div className="rule-item">
                    <div className="rule-icon no">
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="rule-text">
                      멜라민 수지 식기는 전자레인지 가열을 절대 금지합니다.
                    </div>
                  </div>
                  <div className="rule-item">
                    <div className="rule-icon no">
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="rule-text">
                      가열 시 포름알데히드 등 유해물질이 용출될 수 있습니다.
                    </div>
                  </div>
                  <div className="rule-item">
                    <div className="rule-icon ok">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <div className="rule-text">
                      차과, 과일 등 찬 음식 차림용으로만 안전하게 사용하세요.
                    </div>
                  </div>
                </div>
              </div>

              <div className="tips-card">
                <div className="tips-header">
                  <div className="tips-header-icon">
                    <i className="fa-solid fa-lightbulb"></i>
                  </div>
                  <div className="tips-title">스마트 안전 팁</div>
                </div>
                <div className="tip-list">
                  <div className="tip-item">
                    <div className="tip-num">1</div>
                    어린이용 캐릭터 식기 중 멜라민 소재가 많으니 유의하세요.
                  </div>
                  <div className="tip-item">
                    <div className="tip-num">2</div>
                    음식을 데울 때는 도자기나 내열유리 용기로 옮겨 담아 가열하세요.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. 스테인리스 */}
          {activeTab === 'stainless' && (
            <div className="guide-panel active" id="panel-stainless">
              <div className="material-hero hero-stainless">
                <div className="material-hero-icon-box">🥄</div>
                <div className="material-hero-info">
                  <div className="material-hero-name">스테인리스</div>
                  <div className="material-hero-eng">Stainless Steel</div>
                  <div className="status-pill danger">
                    <i className="fa-solid fa-circle-xmark"></i> 전자레인지 사용 금지
                  </div>
                </div>
              </div>

              <div className="rules-card">
                <div className="rules-header">
                  <div className="rules-header-icon">
                    <i className="fa-solid fa-list-check"></i>
                  </div>
                  <div className="rules-title">사용 수칙</div>
                </div>
                <div className="rule-list">
                  <div className="rule-item">
                    <div className="rule-icon no">
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="rule-text">
                      스테인리스 용기 및 금속 기구는 절대 가열 금지입니다.
                    </div>
                  </div>
                  <div className="rule-item">
                    <div className="rule-icon no">
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="rule-text">
                      전자파를 반사하여 아크 방전(불꽃)을 일으켜 화재 위험이 발생합니다.
                    </div>
                  </div>
                  <div className="rule-item">
                    <div className="rule-icon ok">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <div className="rule-text">인덕션, 가스레인지, 오븐 용도로만 사용하세요.</div>
                  </div>
                </div>
              </div>

              <div className="tips-card">
                <div className="tips-header">
                  <div className="tips-header-icon">
                    <i className="fa-solid fa-lightbulb"></i>
                  </div>
                  <div className="tips-title">스마트 안전 팁</div>
                </div>
                <div className="tip-list">
                  <div className="tip-item">
                    <div className="tip-num">1</div>
                    용기 내부에 금속 포크나 숟가락이 남아있지 않은지 항상 체크하세요.
                  </div>
                  <div className="tip-item">
                    <div className="tip-num">2</div>
                    가열 중 불꽃이 튀면 즉시 정지 버튼을 누르고 전원을 차단하세요.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. 알루미늄 */}
          {activeTab === 'aluminum' && (
            <div className="guide-panel active" id="panel-aluminum">
              <div className="material-hero hero-aluminum">
                <div className="material-hero-icon-box">🫙</div>
                <div className="material-hero-info">
                  <div className="material-hero-name">알루미늄</div>
                  <div className="material-hero-eng">Aluminum Foil & Containers</div>
                  <div className="status-pill danger">
                    <i className="fa-solid fa-circle-xmark"></i> 전자레인지 사용 금지
                  </div>
                </div>
              </div>

              <div className="rules-card">
                <div className="rules-header">
                  <div className="rules-header-icon">
                    <i className="fa-solid fa-list-check"></i>
                  </div>
                  <div className="rules-title">사용 수칙</div>
                </div>
                <div className="rule-list">
                  <div className="rule-item">
                    <div className="rule-icon no">
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="rule-text">
                      알루미늄 포일 및 배달용 은박 용기는 사용 절대 금지입니다.
                    </div>
                  </div>
                  <div className="rule-item">
                    <div className="rule-icon no">
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="rule-text">
                      강력한 불꽃 반사 현상으로 인해 기기 고장 및 화재를 유발합니다.
                    </div>
                  </div>
                </div>
              </div>

              <div className="tips-card">
                <div className="tips-header">
                  <div className="tips-header-icon">
                    <i className="fa-solid fa-lightbulb"></i>
                  </div>
                  <div className="tips-title">스마트 안전 팁</div>
                </div>
                <div className="tip-list">
                  <div className="tip-item">
                    <div className="tip-num">1</div>
                    배달 음식의 은박 뚜껑과 은박 포일을 완전히 제거 후 전자레인지에 넣으세요.
                  </div>
                  <div className="tip-item">
                    <div className="tip-num">2</div>
                    전자레인지 전용 용기에 음식물을 옮겨 데우는 것이 안전합니다.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default GuidePage;
