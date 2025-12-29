# 💒 민규 && 희선 // Wedding.exe

개발자 스타일의 모바일 청첩장 웹사이트입니다.

## 📅 결혼식 정보

| 항목 | 내용 |
|------|------|
| **일시** | 2026년 4월 4일 (토) 오후 4시 |
| **장소** | 국방컨벤션 |
| **신랑** | 류민규 (류병화 • 박정의 아들) |
| **신부** | 권희선 (권기민 • 조숙희의 딸) |

## ✨ 주요 기능

### 🖥️ 개발자 테마 UI
- GitHub Dark 테마 컬러 스킴
- Fira Code / JetBrains Mono 모노스페이스 폰트
- 터미널 윈도우 스타일 (macOS 버튼)
- 코드 하이라이팅 (`const ourLife = new Journey()`)
- 깜빡이는 커서 애니메이션
- Matrix 스타일 배경 (하트 ♥와 0, 1)
- 스캔라인 효과 (레트로 모니터 느낌)

### 📊 BUILD IN PROGRESS (마일스톤 타임라인)
Git log 스타일로 표시되는 마일스톤:
- `2025.06.21` - init: 프로젝트 시작 🎉
- `2025.12.27` - feat: 웨딩 촬영 📸
- `2026.01.15` - deploy: 신혼집 입주 🏠
- `2026.04.04` - release: v1.0.0 결혼식 💒

### 📈 자동 진행률 계산
- 시작일(2025.06.21) ~ 결혼식(2026.04.04) 기준
- 오늘 날짜에 따라 자동으로 퍼센티지 계산
- 마일스톤 상태 자동 업데이트 (released/in progress/scheduled)

### 💌 방명록 기능
- 이름과 메시지 입력
- 글자 수 카운터 (200자 제한)
- **서버 사이드 저장**: `guestbook/entries.json` 파일에 저장
- **로컬 저장**: 서버가 없을 경우 localStorage 사용
- JSON 파일 다운로드 기능
- 최신순 정렬 표시
- XSS 방지 (HTML 이스케이프)

### 📂 게시물 준비중 섹션
파일 탐색기 스타일로 준비 중인 콘텐츠 표시:
- 📷 wedding_photos.zip - uploading...
- 🎬 highlight_video.mp4 - encoding...
- 🗺️ location_map.png - rendering...

### 📱 반응형 디자인
| 화면 크기 | 적용 범위 |
|----------|----------|
| 작은 모바일 | ~360px |
| 기본 모바일 | ~767px |
| 태블릿 | 768px+ |
| 데스크톱 | 1024px+ |
| 대형 데스크톱 | 1400px+ |

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 서버 실행
```bash
npm start
```

서버가 `http://localhost:3000`에서 실행됩니다.

### 3. 방명록 데이터 저장 위치
방명록 데이터는 `guestbook/entries.json` 파일에 저장됩니다.

## 📁 파일 구조

```
├── index.html          # 메인 청첩장 페이지
├── server.js           # Express 서버 (방명록 API)
├── package.json        # Node.js 의존성
├── guestbook/          # 방명록 데이터 폴더
│   └── entries.json    # 방명록 엔트리 (자동 생성)
└── README.md           # 설명 파일
```

## 🔧 API 엔드포인트

### GET /api/guestbook
방명록 조회
```json
{
  "success": true,
  "entries": [
    {
      "name": "홍길동",
      "message": "축하합니다!",
      "date": "2026-01-01T12:00:00.000Z"
    }
  ]
}
```

### POST /api/guestbook
방명록 저장
```json
{
  "name": "홍길동",
  "message": "축하합니다!"
}
```

## 🎨 커스터마이징

### 색상 변경
`index.html`의 `:root` CSS 변수를 수정하세요:
```css
:root {
    --bg-dark: #0D1117;      /* 배경색 */
    --green: #3FB950;        /* 메인 강조색 */
    --cyan: #79C0FF;         /* 이름 색상 */
    --yellow: #E3B341;       /* 하이라이트 */
    --pink: #FF7B72;         /* 키워드/하트 */
    /* ... */
}
```

### 마일스톤 수정
JavaScript의 `milestones` 배열과 HTML의 `.git-commit` 요소를 수정하세요.

---

Built with ♥ && JavaScript  
© 2026 MinGyu && HeeSun
