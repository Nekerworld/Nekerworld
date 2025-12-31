import './DocumentHistory.css'

// GitHub 리포지토리 정보
const GITHUB_REPO = 'nekerworld/Nekerworld'
const GITHUB_BRANCH = 'main'

function DocumentHistory({ slug }) {
  const filePath = `public/posts/${slug}.md`
  const historyUrl = `https://github.com/${GITHUB_REPO}/commits/${GITHUB_BRANCH}/${filePath}`

  return (
    <div className="document-history">
      <a
        href={historyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="history-link"
      >
        <span className="history-icon">📝</span>
        <span className="history-text">문서 역사 보기 (GitHub)</span>
      </a>
    </div>
  )
}

export default DocumentHistory

