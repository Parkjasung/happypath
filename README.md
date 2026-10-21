# HAPPYPATH 홈페이지

주식회사 해피패스 브랜드 사이트입니다. 빌드 과정 없는 정적 HTML이라 폴더째 올리면 바로 동작합니다.

## 구성

| 경로 | 내용 |
|---|---|
| `index.html` | 메인 (회사소개, 사업영역, 경력, 고객사, 문의) |
| `qa.html` | QA DIVISION 페이지 |
| `valet.html` | VALET DIVISION 페이지 |
| `styles.css` | 공통 스타일. 고객사 로고는 이 파일 안에 이미지로 포함되어 있습니다 |
| `fonts/` | Pretendard Variable 폰트와 라이선스(SIL OFL 1.1) |
| `brand/` | 해피패스 CI: 메뉴 로고, 파비콘, 홈 화면 아이콘 |
| `site.webmanifest` | 안드로이드 홈 화면 아이콘 설정 |
| `assets/client-logos/` | 고객사 로고 원본 (사이트에서 직접 불러오지 않음, 보관용) |
| `.nojekyll` | GitHub Pages에서 파일을 그대로 쓰도록 하는 빈 파일 |

## 배포

- **GitHub Pages:** 저장소에 이 폴더 내용을 그대로 올린 뒤 Settings → Pages에서 배포 브랜치와 루트 폴더(`/`)를 선택합니다.
- **기타 웹 호스팅:** 폴더 전체를 웹 루트에 업로드합니다.
- **미리보기:** `index.html`을 브라우저로 열면 됩니다. 영문 보조 서체(JetBrains Mono)만 Google Fonts에서 불러오고, 나머지는 모두 이 폴더 안에 있습니다.

## 문구 수정

모든 문구는 HTML 파일에 바로 들어 있습니다. 상단 메뉴와 푸터는 세 페이지에 같은 내용이 반복되어 있으니, 바꿀 때 세 파일을 함께 수정해 주세요.
