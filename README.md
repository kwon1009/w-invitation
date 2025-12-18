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

### 📂 게시물 준비중 섹션
파일 탐색기 스타일로 준비 중인 콘텐츠 표시:
- 📷 wedding_photos.zip - uploading...
- 🎬 highlight_video.mp4 - encoding...
- 🗺️ location_map.png - rendering...
- 💌 guestbook.db - initializing...

### 📱 반응형 디자인
| 화면 크기 | 적용 범위 |
|----------|----------|
| 작은 모바일 | ~360px |
| 기본 모바일 | ~767px |
| 태블릿 | 768px+ |
| 데스크톱 | 1024px+ |
| 대형 데스크톱 | 1400px+ |

## 🚀 GitHub Pages 배포 방법

1. 이 저장소를 GitHub에 푸시합니다
2. GitHub 저장소 → **Settings** → **Pages**
3. Source에서 **Deploy from a branch** 선택
4. Branch에서 **main** (또는 master) 선택 후 **Save**
5. 몇 분 후 `https://[username].github.io/[repository-name]` 에서 확인 가능

## 📁 파일 구조

```
├── index.html    # 메인 청첩장 페이지
└── README.md     # 설명 파일
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
