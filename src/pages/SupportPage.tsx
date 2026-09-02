import React, { useState } from 'react';
import AppHeader from '../components/layout/AppHeader';
import BottomNav from '../components/layout/BottomNav';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../utils/auth';
import '../../css/common.css';
import '../../css/support.css';

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: 'WaveScan은 어떻게 사용하나요?',
    answer:
      '카메라 스캔 버튼을 눌러 주방 용기를 촬영하거나, 앨범에서 이미지를 선택하면 AI가 재질과 안전성을 자동으로 분석합니다. 결과는 안전 / 주의 / 위험 3단계로 표시됩니다.',
  },
  {
    question: '로그인 없이도 스캔을 사용할 수 있나요?',
    answer:
      '네, 로그인 없이도 스캔 및 분석 결과 확인이 가능합니다. 단, 스캔 기록 저장, 개인 통계, 프로필 관리는 로그인 후 이용하실 수 있습니다.',
  },
  {
    question: 'AI 분석 결과가 항상 정확한가요?',
    answer:
      'WaveScan AI는 이미지 기반 분석으로 높은 정확도를 제공하지만, 조명·각도·이미지 품질에 따라 결과가 달라질 수 있습니다. 중요한 결정은 용기에 표시된 재질 정보를 함께 확인하세요.',
  },
  {
    question: '스캔 기록은 어디에 저장되나요?',
    answer:
      '로그인 사용자의 스캔 기록은 계정에 연결되어 안전하게 저장됩니다. 비로그인 상태에서는 기기의 로컬 저장소(localStorage)에만 임시 저장됩니다.',
  },
  {
    question: '어떤 용기 재질을 스캔할 수 있나요?',
    answer:
      'PP 플라스틱, 세라믹, 도자기, 유리, 멜라민, 스테인리스, 알루미늄 등 일반적인 주방 용기 재질을 모두 분석할 수 있습니다. 용기의 라벨이나 안전 마크가 보이도록 촬영하면 더욱 정확한 결과를 얻을 수 있어요.',
  },
  {
    question: '계정을 탈퇴하면 어떻게 되나요?',
    answer:
      '회원 탈퇴 시 계정 정보 및 저장된 스캔 기록이 모두 삭제됩니다. 삭제된 데이터는 복구가 불가능하니 신중하게 결정해 주세요.',
  },
];

export const SupportPage: React.FC = () => {
  const { user } = useAuth();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState(user?.email || '');

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx((prev) => (prev === idx ? null : idx));
  };

  const handleSubmit = () => {
    if (!category) {
      showToast('문의 유형을 선택해 주세요.');
      return;
    }
    if (!title.trim()) {
      showToast('제목을 입력해 주세요.');
      return;
    }
    if (!content.trim()) {
      showToast('내용을 입력해 주세요.');
      return;
    }
    if (!email.trim()) {
      showToast('답변받을 이메일을 입력해 주세요.');
      return;
    }

    showToast('1:1 문의가 정상 접수되었습니다.');
    setTitle('');
    setContent('');
    setCategory('');
  };

  return (
    <div className="app-shell">
      <AppHeader title="고객 지원" notifDot={true} />

      <main className="main-content">
        {/* Hero */}
        <div className="support-hero">
          <div className="support-hero-icon">💬</div>
          <h1 className="support-hero-title">무엇을 도와드릴까요?</h1>
          <p className="support-hero-desc">
            자주 묻는 질문을 확인하거나 1:1 문의를 남겨주세요.
            <br />
            빠르게 답변드리겠습니다.
          </p>
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <div className="section-header" style={{ marginBottom: 14 }}>
            <h2 className="section-title">
              <i className="fa-solid fa-circle-question"></i> 자주 묻는 질문
            </h2>
          </div>

          <div className="faq-list">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <div className="faq-question" onClick={() => toggleFaq(idx)}>
                    <div className="faq-q-icon">Q</div>
                    <div className="faq-q-text">{faq.question}</div>
                    <i className="fa-solid fa-chevron-down faq-chevron"></i>
                  </div>
                  {isOpen && (
                    <div className="faq-answer">
                      <div className="faq-answer-inner">{faq.answer}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact form */}
        <div className="contact-section">
          <div className="contact-card">
            <div className="contact-header">
              <div className="contact-header-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div>
                <div className="contact-header-title">1:1 문의하기</div>
                <div className="contact-header-desc">답변은 영업일 기준 1~2일 내로 드립니다</div>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="contactCategory">
                문의 유형
              </label>
              <select
                id="contactCategory"
                className="input-field"
                style={{ height: 52, cursor: 'pointer' }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">유형을 선택해주세요</option>
                <option value="scan">스캔 오류 문의</option>
                <option value="account">계정 관련 문의</option>
                <option value="guide">안전 가이드 문의</option>
                <option value="feedback">서비스 개선 제안</option>
                <option value="other">기타 문의</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="contactTitle">
                제목
              </label>
              <input
                type="text"
                id="contactTitle"
                className="input-field"
                placeholder="문의 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="contactContent">
                내용
              </label>
              <textarea
                id="contactContent"
                className="input-field"
                rows={5}
                placeholder="문의 내용을 자세히 입력해 주세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="contactEmail">
                답변받을 이메일
              </label>
              <div className="input-wrap">
                <i className="fa-regular fa-envelope"></i>
                <input
                  type="email"
                  id="contactEmail"
                  className="input-field has-icon"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button className="btn btn-primary" onClick={handleSubmit}>
              <i className="fa-solid fa-paper-plane"></i> 문의 보내기
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default SupportPage;
