# 🌊 WaveScan (웨이브스캔)

> **지능형 이미징 기술 기반 전자레인지 용기 안전 검사 모바일 웹 서비스**  
> WaveScan은 사용자가 주방 용기의 이미지/스캔을 통해 전자레인지 사용 안전성을 즉시 확인하고 관리할 수 있도록 돕는 모바일 퍼스트 퍼블리싱 프로젝트입니다.

---

## 📌 목차 (Table of Contents)

1. [프로젝트 개요](#-프로젝트-개요)
2. [주요 기능](#-주요-기능)
3. [페이지 구조 (Page Map)](#-페이지-구조-page-map)
4. [디자인 시스템 & 컬러 팔레트](#-디자인-시스템--컬러-팔레트-design-system--color-palette)
5. [기술 스택 (Tech Stack)](#-기술-스택-tech-stack)
6. [디렉토리 구조 (Directory Structure)](#-디렉토리-구조-directory-structure)
7. [실행 및 확인 방법](#-실행-및-확인-방법)
8. [로그인 상태별 이용 정책](#-로그인-상태별-이용-정책)
9. [사용자 스캔 통계 & 프로필](#-사용자-스캔-통계--프로필)
10. [퍼블리싱 및 설계 특징](#-퍼블리싱-및-설계-특징)

---

## 💡 프로젝트 개요

- **프로젝트명**: WaveScan (웨이브스캔)
- **목적**: 플라스틱, 세라믹, 유리, 금속 등 다양한 주방 용기의 재질과 안전 태그를 AI 스캔으로 분석하여 전자레인지 조리 시 유해 물질 배출 및 폭발 위험을 예방
- **디자인 컨셉**: Soft Modern Glassmorphism & Mobile App Shell Layout (고운돋움 폰트 기반의 청량하고 신뢰감 있는 딥 테일/민트 톤 UI)

---

## 🔥 주요 기능

### 1. 📱 앱 셸 & 인증 (App Shell & Auth)

- **스플래시 화면 (`splash.html`)**: 서비스 로딩 브랜드 모션
- **인증 시작 (`auth-start.html`)**: 소셜 로그인 (Google) 및 일반 로그인 분기
- **로그인 / 회원가입 (`login.html`, `signup.html`)**: 폼 검증 및 계정 생성 UI

### 2. 🏠 메인 홈 대시보드 (`index.html`)

- **히어로 CTA 카드**: 원클릭 카메라 스캔 및 앨범 이미지 업로드
- **대시보드 통계**: 사용자의 누적 스캔 횟수와 개인 AI 분석 정확도를 실시간 요약
- **개인화 통계**: 스캔을 많이 할수록 누적 스캔 횟수와 정확도가 실제 사용자 활동량에 따라 변화
- **최근 스캔 캐러셀**: 직전에 검사한 용기 이미지와 분석 결과를 함께 확인

### 3. 📷 용기 스캔 & AI 결과 분석 (`scan.html`, `scan-result.html`)

- **실시간 카메라 가이드 (`scan.html`)**: 용기 조준 뷰파인더, 조명 렌즈 및 자동 줌 가이드
- **스캔 분석 결과 (`scan-result.html`)**:
  - 사용자가 스캔한 실제 이미지와 AI 분석 결과를 한 화면에서 확인
  - 안전 / 주의 / 위험 3단계 등급 판정
  - 재질 감지 (PP, Ceramic, Stainless 등) 및 용기 내열 온도 분석
  - 안전 파라미터 체크리스트 (BPA Free, 고온 변형 테스트, 금속 장식 유무)
  - 스캔 결과별 이미지, 재질, 안전 여부, 분석 설명을 기록하여 히스토리에서 재확인

### 4. 📂 스캔 히스토리 관리 (`history.html`)

- **필터링 & 검색**: 전체 / 안전 / 주의 / 위험별 필터링 기능
- **스캔 리스트**: 날짜별 분석 상세 이력 조회 및 삭제 기능

### 5. 📖 안전 가이드 & 고객지원 (`guide.html`, `support.html`)

- **재질별 올바른 사용 가이드 (`guide.html`)**: PP, 세라믹, 유리, 멜라민, 알루미늄 등 소재별 레인지 사용 수칙
- **고객지원 센터 (`support.html`)**: 자주 묻는 질문(FAQ) 아코디언 및 1:1 문의 폼

### 6. 👤 마이페이지 & 설정 (`mypage.html`, `profile-edit.html` 등)

- **로그인 사용자 마이페이지**: 프로필 사진, 닉네임, 총 스캔 횟수, 개인 정확도 등 사용자 활동 정보를 제공
- **소셜 로그인 프로필 연동**: 카카오/네이버/Google/Apple 등 소셜 로그인 시 해당 계정에서 제공하는 프로필 이미지를 마이페이지 프로필 사진으로 사용
- **프로필 관리 (`mypage.html`, `profile-edit.html`)**: 사용자 정보 및 닉네임 수정
- **비로그인 마이페이지 접근**: 로그인하지 않은 상태에서 마이페이지를 클릭하면 로그인 안내/로그인 화면(`auth-start.html`)으로 이동
- **알림 센터 & 설정 (`notification-center.html`, `notification-settings.html`)**: 스캔 완료 알림, 주의사항 push 알림 켜기/끄기
- **회원 탈퇴 (`account-deletion.html`)**: 계정 삭제 사유 수집 및 안전한 탈퇴 절차 안내

---

## 🗺️ 페이지 구조 (Page Map)

| 페이지명                | 파일 경로                         | 주요 역할                                                    |
| :---------------------- | :-------------------------------- | :----------------------------------------------------------- |
| **스플래시**            | `splash.html`                     | 브랜드 로딩 화면                                             |
| **인증 시작**           | `auth-start.html`                 | 소셜 & 일반 로그인 입구                                      |
| **로그인**              | `login.html`                      | 일반 계정 로그인 폼                                          |
| **회원가입**            | `signup.html`                     | 신규 회원가입 폼                                             |
| **메인 홈**             | `index.html`                      | 스캔 시작, 사용자별 스캔 통계, 최근 이미지/결과              |
| **카메라 스캔**         | `scan.html`                       | 용기 이미징 및 카메라 뷰파인더                               |
| **스캔 결과**           | `scan-result.html`                | 스캔 이미지, 안전 등급 판정 & 세부 분석 리포트               |
| **스캔 기록**           | `history.html`                    | 전체 스캔 목록, 이미지 및 결과 필터링                        |
| **안전 가이드**         | `guide.html`                      | 재질별 전자레인지 사용 지침                                  |
| **마이페이지**          | `mypage.html`                     | 로그인 사용자 프로필, 총 스캔 횟수, 개인 정확도 및 주요 메뉴 |
| **비로그인 마이페이지** | `mypage.html` → `auth-start.html` | 비로그인 상태에서 마이페이지 클릭 시 로그인 화면으로 이동    |
| **프로필 수정**         | `profile-edit.html`               | 사용자 정보 및 닉네임 변경                                   |
| **알림 센터**           | `notification-center.html`        | 주요 수신 알림 목록                                          |
| **알림 설정**           | `notification-settings.html`      | Push 및 마케팅 알림 스위치                                   |
| **고객 지원**           | `support.html`                    | FAQ 아코디언 & 1:1 문의하기                                  |
| **회원 탈퇴**           | `account-deletion.html`           | 회원 탈퇴 절차 및 유의사항                                   |

---

## 🎨 디자인 가이드 & 컬러 팔레트 (Design System & Brand Assets)

제공된 브랜드 디자인 가이드 시안을 바탕으로 **고운돋움(Gowun Dodum)** 타이포그래피와 **4가지 핵심 브랜드 컬러 (Primary, Secondary, Tertiary, Neutral)**를 정립하여 서비스 전체에 적용하고 있습니다.

### 🔤 타이포그래피 (Typography)

- **메인 폰트**: `Gowun Dodum (고운돋움)`
- **브랜드 톤앤매너**: 신뢰감 있고 가독성 높은 산세리프 스타일
- **대표 메인 문구**:
  - _"안전한 주방 생활"_
  - _"AI 기반 전자레인지 용기 검사"_

---

### 🎨 핵심 4대 컬러 팔레트 (Core 4 Color Palette)

| 구분          | Color Name         | Hex Code  | Swatch                                                                       | 주요 용도 및 역할                                                               |
| :------------ | :----------------- | :-------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **Primary**   | **Primary Teal**   | `#00A3AD` | ![#00A3AD](https://img.shields.io/badge/-%2300A3AD-00A3AD?style=flat-square) | **메인 컨셉 컬러**: 대표 브랜드 색상, 주요 버튼 및 강조 UI (`--color-primary`)  |
| **Secondary** | **Secondary Mint** | `#2EC4B6` | ![#2EC4B6](https://img.shields.io/badge/-%232EC4B6-2EC4B6?style=flat-square) | **서브 컬러**: 서브 강조, 안전 아이콘/그래프, 보조 포인트 (`--color-secondary`) |
| **Tertiary**  | **Warm Amber**     | `#F59E0B` | ![#F59E0B](https://img.shields.io/badge/-%23F59E0B-F59E0B?style=flat-square) | **서브/포인트 컬러**: 브랜드 심볼 배지, 주의/경고 태그 (`--color-tertiary`)     |
| **Neutral**   | **Slate Dark**     | `#1E293B` | ![#1E293B](https://img.shields.io/badge/-%231E293B-1E293B?style=flat-square) | **네추럴/다크**: 메인 타이틀, 헤드라인, 탭바 (`--color-neutral`)                |

---

### 🖼️ 서브 배경 & 상태 컬러 (Surface Tints & Status)

| 구분                   | Color Name          | Hex Code  | Swatch                                                                       | 주요 용도 및 CSS 변수                          |
| :--------------------- | :------------------ | :-------- | :--------------------------------------------------------------------------- | :--------------------------------------------- |
| **Sub Surface (민트)** | **Surface Mint**    | `#E4F6F4` | ![#E4F6F4](https://img.shields.io/badge/-%23E4F6F4-E4F6F4?style=flat-square) | 안전 카드의 연한 민트 배경 (`--surface-mint`)  |
| **Sub Surface (앰버)** | **Surface Amber**   | `#FDF1DF` | ![#FDF1DF](https://img.shields.io/badge/-%23FDF1DF-FDF1DF?style=flat-square) | 주의 카드의 연한 앰버 배경 (`--surface-amber`) |
| **Status Safe**        | **Safe Mint**       | `#CFF3EC` | ![#CFF3EC](https://img.shields.io/badge/-%23CFF3EC-CFF3EC?style=flat-square) | 안전 태그 배지 배경 (`--status-safe-bg`)       |
| **App Background**     | **Soft Slate Gray** | `#F7F9FA` | ![#F7F9FA](https://img.shields.io/badge/-%23F7F9FA-F7F9FA?style=flat-square) | 앱 화면 기본 배경 (`--surface-app-bg`)         |

---

## 🛠️ 기술 스택 (Tech Stack)

- **Markup**: HTML5 (Semantic Tags, ARIA Accessibility)
- **Style**: Custom Vanilla CSS3 (CSS Variables, Flexbox, Grid, Dynamic Transitions)
- **Script**: JavaScript ES6+ (DOM Manipulation, Event Handling)
- **Font**: Google Fonts (`Gowun Dodum`)
- **Icon**: Font Awesome 6.5.1
- **Architecture**: Mobile Web App Shell UI (View-port fixed layout + Scrollable Main Content)

---

## 📂 디렉토리 구조 (Directory Structure)

```
WaveScan-main/
├── index.html                  # 메인 홈 페이지
├── splash.html                 # 스플래시 로딩
├── auth-start.html             # 소셜 인증 시작
├── login.html                  # 로그인
├── signup.html                 # 회원가입
├── scan.html                   # 카메라 스캔 화면
├── scan-result.html            # 스캔 분석 결과
├── history.html                # 스캔 히스토리
├── guide.html                  # 사용 가이드
├── mypage.html                 # 마이페이지
├── profile-edit.html           # 프로필 수정
├── notification-center.html    # 알림 센터
├── notification-settings.html  # 알림 설정
├── support.html                # 고객 지원 & FAQ
├── account-deletion.html       # 회원 탈퇴
├── README.md                   # 프로젝트 설명서 (현재 파일)
├── 작업계획_퍼블리싱_v06.md    # 퍼블리싱 작업 계획서
├── css/                        # 모듈별 CSS 스타일시트
│   ├── common.css              # 공통 UI 변수 및 컴포넌트 스타일
│   ├── home.css                # 홈 화면 전용 CSS
│   ├── scan.css                # 스캔 화면 CSS
│   ├── scan-result.css         # 스캔 결과 화면 CSS
│   └── ...                     # 페이지별 CSS
├── js/                         # 모듈별 JavaScript
│   ├── data.js                 # 공통 Mock Data (스캔 기록, 통계, FAQ 등)
│   ├── home.js                 # 홈 화면 인터렉션 Script
│   ├── scan.js                 # 카메라 스캔 모션 Script
│   ├── scan-result.js          # 스캔 이미지 및 AI 결과 표시/저장
│   ├── auth.js                 # 로그인 상태 및 소셜 프로필 연동
│   └── mypage.js               # 사용자별 스캔 횟수/정확도 및 마이페이지 상태 관리
│   └── ...                     # 페이지별 Script
├── img/                        # 브랜드 로고 및 이미지 리소스
└── 디자인시안/                 # 기획 및 디자인 참고 자료
```

---

## 🚀 실행 및 확인 방법

1. 별도의 빌드 과정 없이 `index.html` 또는 `splash.html`을 웹 브라우저(Chrome, Edge, Safari 등)에서 직접 열어 확인합니다.
2. 모바일 뷰(Mobile View: 375px ~ 430px 기준) 환경에서 가장 최적화된 앱 UI 레이아웃을 경험할 수 있습니다.
3. Chrome 개발자 도구(F12) → Device Toolbar(Ctrl+Shift+M)를 켜서 모바일 화면으로 테스트하는 것을 권장합니다.

---

## 🔐 로그인 상태별 이용 정책

WaveScan은 **비로그인 사용자와 로그인 사용자의 이용 경험을 분리**하여 설계합니다.

### 비로그인 상태

1. 홈 화면에서 용기 스캔 기능을 이용할 수 있습니다.
2. 스캔 후에는 사용자가 촬영/업로드한 이미지와 해당 이미지의 AI 분석 결과를 확인할 수 있습니다.
3. 마이페이지를 클릭하면 개인 정보 화면 대신 `auth-start.html` 로그인 화면으로 이동합니다.
4. 개인별 누적 스캔 횟수, 개인 정확도, 프로필 정보 등 계정 기반 데이터는 로그인 후 제공합니다.

### 로그인 상태

1. 사용자의 스캔 이미지와 분석 결과를 계정 기준으로 저장/관리합니다.
2. 누적 스캔 횟수는 사용자가 실제로 완료한 스캔 수를 기준으로 표시합니다.
3. 개인 정확도는 사용자의 스캔 활동 및 결과 데이터에 따라 변화하도록 구성합니다.
4. 마이페이지에서 프로필, 스캔 통계, 스캔 기록 및 설정을 확인할 수 있습니다.
5. 소셜 로그인 사용자는 로그인 제공자가 전달하는 프로필 이미지를 사용자 프로필 사진으로 사용합니다.

---

## 📊 사용자 스캔 통계 & 프로필

### 1. 스캔 이미지 + 결과값 관리

각 스캔 기록에는 다음 정보를 연결하여 관리합니다.

- 사용자가 촬영하거나 앨범에서 선택한 **원본 이미지**
- AI가 분석한 **안전/주의/위험 결과**
- 감지된 **용기 재질**
- 분석 근거 및 주의사항
- 스캔 날짜/시간

### 2. 사용자별 총 스캔 횟수

총 스캔 횟수는 고정된 샘플 값이 아니라 **사용자가 실제로 완료한 스캔 횟수에 따라 변경**합니다.

예시:

- 첫 스캔 → `총 1회`
- 10회 완료 → `총 10회`
- 50회 완료 → `총 50회`

### 3. 사용자별 정확도

AI 분석 정확도 역시 모든 사용자에게 동일한 고정 수치를 보여주는 방식이 아니라 **개인의 누적 활동 및 결과 데이터에 따라 변화하는 개인화 지표**로 구성합니다.

- 스캔 횟수가 증가하면 개인 통계 데이터가 누적됩니다.
- 정확도 영역은 사용자의 누적 결과를 기준으로 표시합니다.
- 초기 사용자는 데이터가 충분하지 않으므로 정확도를 단정적으로 표시하지 않고, 필요한 경우 `분석 데이터 수집 중`과 같은 상태를 사용할 수 있습니다.

> 실제 AI 모델의 검증 정확도와 사용자의 개인 통계는 별개의 개념으로 관리합니다. 화면에서는 사용자가 이해하기 쉬운 개인 활동 지표로 구분하여 표시합니다.

### 4. 소셜 로그인 프로필 이미지

카카오, 네이버, Google, Apple 등 소셜 로그인으로 가입/로그인한 경우 **해당 소셜 계정에서 제공하는 프로필 이미지를 WaveScan 프로필 이미지로 연결**합니다.

- 프로필 이미지 제공 시 → 해당 이미지 표시
- 프로필 이미지 미제공/사용 불가 시 → WaveScan 기본 프로필 이미지 표시
- 로그아웃 상태 → 로그인 안내 상태 표시

### 5. 마이페이지 접근 정책

| 상태        | 마이페이지 클릭 결과                   |
| :---------- | :------------------------------------- |
| 비로그인    | `auth-start.html` 로그인 화면으로 이동 |
| 일반 로그인 | 개인 프로필/통계/기록 표시             |
| 소셜 로그인 | 소셜 프로필 이미지 + 개인 통계 표시    |

## ✨ 퍼블리싱 및 설계 특징

1. **React / Next.js 데이터 이관 고려 구조**
   - `js/data.js` 파일에 상태값(`safe`, `caution`, `danger`)과 화면 표기 라벨, 이미지 아이콘 매핑 구조를 분리해 설계하여, 향후 React의 State 및 Props 구조로 손쉽게 이관 가능합니다.
2. **반응형 뷰포트 & 앱 셸**
   - `common.css`에서 정의된 `.app-shell` 구조로 모바일 프레임의 완성도를 극대화했습니다.
3. **웹 접근성 & Semantic HTML**
   - `<header>`, `<main>`, `<nav>`, `<section>` 등 시맨틱 태그 및 ARIA 속성을 활용하여 표준을 준수하였습니다.
