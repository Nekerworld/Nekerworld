import { Link } from 'react-router-dom'
import './SeriesNavigation.css'

function SeriesNavigation({ seriesInfo, currentSlug }) {
  if (!seriesInfo || !seriesInfo.seriesName) return null

  const { seriesName, seriesPosts, currentIndex, totalPosts, prevPost, nextPost } = seriesInfo

  return (
    <div className="series-navigation">
      <div className="series-header">
        <span className="series-label">시리즈</span>
        <span className="series-name">{seriesName}</span>
        <span className="series-progress">
          {currentIndex} / {totalPosts}
        </span>
      </div>
      <div className="series-list">
        {seriesPosts.map((post, index) => (
          <Link
            key={post.slug}
            to={`/post/${post.slug}`}
            className={`series-item ${post.slug === currentSlug ? 'current' : ''} ${index < currentIndex - 1 ? 'completed' : ''}`}
          >
            <span className="series-item-number">{index + 1}</span>
            <span className="series-item-title">{post.title}</span>
          </Link>
        ))}
      </div>
      <div className="series-nav-buttons">
        {prevPost && (
          <Link to={`/post/${prevPost.slug}`} className="series-nav-btn prev">
            ← 이전 글
          </Link>
        )}
        {nextPost && (
          <Link to={`/post/${nextPost.slug}`} className="series-nav-btn next">
            다음 글 →
          </Link>
        )}
      </div>
    </div>
  )
}

export default SeriesNavigation

