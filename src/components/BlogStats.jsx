import { getBlogStats } from '../utils/wiki'
import './BlogStats.css'

function BlogStats() {
  const stats = getBlogStats()

  return (
    <div className="blog-stats">
      <div className="stat-item">
        <span className="stat-value">{stats.totalPosts}</span>
        <span className="stat-label">문서</span>
      </div>
      <div className="stat-divider"></div>
      <div className="stat-item">
        <span className="stat-value">{stats.totalTags}</span>
        <span className="stat-label">태그</span>
      </div>
      <div className="stat-divider"></div>
      <div className="stat-item">
        <span className="stat-value">{stats.totalCategories}</span>
        <span className="stat-label">분류</span>
      </div>
      {stats.totalSeries > 0 && (
        <>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">{stats.totalSeries}</span>
            <span className="stat-label">시리즈</span>
          </div>
        </>
      )}
    </div>
  )
}

export default BlogStats

