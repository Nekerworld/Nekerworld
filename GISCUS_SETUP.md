# Giscus 댓글 시스템 설정 가이드

Giscus는 GitHub Discussions를 기반으로 한 댓글 시스템입니다. 설정 방법은 다음과 같습니다.

## 1. GitHub 리포지토리 설정

1. GitHub 리포지토리로 이동
2. **Settings** → **General** → **Features** 섹션
3. **Discussions** 체크박스 활성화
4. **Save changes** 클릭

## 2. Giscus 앱 설치

1. https://giscus.app/ 접속
2. GitHub 계정으로 로그인
3. Giscus 앱 설치 승인

## 3. Giscus 설정

1. https://giscus.app/ 에서 리포지토리 선택
2. 다음 설정값들을 복사:
   - `data-repo` (예: `nekerworld/Nekerworld`)
   - `data-repo-id` (선택사항)
   - `data-category` (예: `Announcements`)
   - `data-category-id` (선택사항)

## 4. 코드 수정

`src/components/Comments.jsx` 파일을 열어 다음 변수들을 수정합니다:

```javascript
const GISCUS_REPO = 'your-username/your-repo' // GitHub 리포지토리 (owner/repo)
const GISCUS_REPO_ID = '' // Giscus 설정 후 얻은 repo-id (선택사항)
const GISCUS_CATEGORY = 'Announcements' // Discussions 카테고리
const GISCUS_CATEGORY_ID = '' // 카테고리 ID (선택사항)
```

## 5. 테마 설정

Giscus는 자동으로 사이트의 다크/라이트 모드에 따라 테마를 전환합니다.

## 참고 사항

- Discussions를 활성화한 후 첫 댓글이 작성될 때 Discussion이 자동으로 생성됩니다
- `data-mapping` 옵션은 현재 `pathname`으로 설정되어 있습니다. 필요에 따라 `title`, `og:title`, `url` 등으로 변경 가능합니다
- 자세한 설정 옵션은 https://github.com/giscus/giscus/blob/main/README.md 참고

