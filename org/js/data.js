/* =====================================================
   WaveScan — data.js
   Mock Data & Storage Helper
   ===================================================== */

const SAMPLE_SCANS = [
  {
    id: 'scan_1',
    date: '2026-09-01 14:30',
    timestamp: Date.now() - 3600000 * 2,
    material: 'PP 플라스틱',
    materialCode: 'PP',
    grade: 'safe',
    gradeTitle: '전자레인지 사용 가능',
    gradeDesc: 'BPA Free 인증을 완료한 안전한 PP 5 재질 용기입니다.',
    maxTemp: 120,
    bpaStatus: 'Free',
    confidence: 96,
    imageUrl: 'img/logo.jpg',
    checklist: [
      { name: 'BPA Free 인증', status: 'pass', text: '인증 완료' },
      { name: '고온 변형 테스트', status: 'pass', text: '120°C 내열 통과' },
      { name: '금속 장식 유무', status: 'pass', text: '금속 성분 없음' },
      { name: '밀폐 증기 배출', status: 'warn', text: '뚜껑 개봉 필요' }
    ],
    aiComment: '해당 용기는 폴리프로필렌(PP 5) 재질로 제작되어 전자레인지 데우기(120°C 이하)에 안전합니다. 뚜껑을 살짝 열거나 증기 배출구를 연 상태에서 사용을 권장합니다.'
  },
  {
    id: 'scan_2',
    date: '2026-08-31 18:15',
    timestamp: Date.now() - 3600000 * 24,
    material: '세라믹 도자기',
    materialCode: 'CERAMIC',
    grade: 'safe',
    gradeTitle: '전자레인지 사용 가능',
    gradeDesc: '금속 무늬가 없는 순수 내열 세라믹 용기입니다.',
    maxTemp: 200,
    bpaStatus: 'N/A',
    confidence: 94,
    imageUrl: '',
    checklist: [
      { name: '금속 장식(금채/은채)', status: 'pass', text: '금속 무늬 없음' },
      { name: '균열 및 파손', status: 'pass', text: '균열 없음' },
      { name: '내열 온도', status: 'pass', text: '200°C 안정적' }
    ],
    aiComment: '금속 테두리나 무늬가 없는 내열 도자기 그릇입니다. 전자레인지 조리 및 데우기에 매우 적합합니다.'
  },
  {
    id: 'scan_3',
    date: '2026-08-29 11:20',
    timestamp: Date.now() - 3600000 * 72,
    material: '멜라민 수지',
    materialCode: 'MELAMINE',
    grade: 'danger',
    gradeTitle: '전자레인지 사용 금지',
    gradeDesc: '가열 시 유해물질(포름알데히드) 배출 위험이 있습니다.',
    maxTemp: 70,
    bpaStatus: 'Unsafe',
    confidence: 98,
    imageUrl: '',
    checklist: [
      { name: '전자레인지 내열성', status: 'fail', text: '70°C 이상 변형' },
      { name: '유해물질 배출', status: 'fail', text: '가열 시 포름알데히드 배출' },
      { name: '전자레인지 인증', status: 'fail', text: '인증 불가' }
    ],
    aiComment: '⚠️ 경고: 멜라민 수지는 열에 약하며 가열 시 유해물질이 음식물에 용출될 수 있습니다. 전자레인지 조리를 절대 금지합니다.'
  },
  {
    id: 'scan_4',
    date: '2026-08-25 09:40',
    timestamp: Date.now() - 3600000 * 160,
    material: '스테인리스 스틸',
    materialCode: 'STAINLESS',
    grade: 'danger',
    gradeTitle: '전자레인지 사용 금지',
    gradeDesc: '금속 소재로 아크 방전(불꽃) 및 화재 위험이 있습니다.',
    maxTemp: 300,
    bpaStatus: 'N/A',
    confidence: 99,
    imageUrl: '',
    checklist: [
      { name: '전자파 반사 위험', status: 'fail', text: '아크 방전 불꽃 발생' },
      { name: '기기 손상 위험', status: 'fail', text: '전자레인지 고장 원인' }
    ],
    aiComment: '🚫 숟가락, 스테인리스 용기 등 금속 제품은 마이크로파를 반사하여 불꽃을 일으킵니다. 전자레인지에 절대 넣지 마세요.'
  }
];

// LocalStorage Storage Keys
const KEYS = {
  SCANS: 'wavescan_scans',
  USER: 'wavescan_user',
  NOTIFS: 'wavescan_notifs',
  SETTINGS: 'wavescan_settings'
};

// Data Store Helper
const WaveData = {
  getScans() {
    const data = localStorage.getItem(KEYS.SCANS);
    if (!data) {
      localStorage.setItem(KEYS.SCANS, JSON.stringify(SAMPLE_SCANS));
      return SAMPLE_SCANS;
    }
    return JSON.parse(data);
  },

  saveScan(newScan) {
    const scans = this.getScans();
    scans.unshift(newScan);
    localStorage.setItem(KEYS.SCANS, JSON.stringify(scans));
    return scans;
  },

  deleteScan(id) {
    let scans = this.getScans();
    scans = scans.filter(s => s.id !== id);
    localStorage.setItem(KEYS.SCANS, JSON.stringify(scans));
    return scans;
  },

  getStats() {
    const scans = this.getScans();
    const total = scans.length;
    const safe = scans.filter(s => s.grade === 'safe').length;
    const caution = scans.filter(s => s.grade === 'caution').length;
    const danger = scans.filter(s => s.grade === 'danger').length;
    const accuracy = total > 0 ? Math.round((safe / total) * 100) + '%' : '분석 중';

    return { total, safe, caution, danger, accuracy };
  }
};
