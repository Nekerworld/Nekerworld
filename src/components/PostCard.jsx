import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import './PostCard.css'

function PostCard({ post }) {
  const formattedDate = format(new Date(post.date), 'yyyy.MM.dd', { locale: ko })

  return (
    <article className="post-card">
      <div className="post-card-header">
        <span className="post-category">{post.category}</span>
        <span className="post-date">{formattedDate}</span>
      </div>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-excerpt">{post.excerpt}</p>
      <div className="post-footer">
        <div className="post-tags">
          {post.tags && post.tags.map((tag, index) => (
            <span key={index} className="post-tag">#{tag}</span>
          ))}
        </div>
        <span className="post-read-time">{post.readTime} 읽기</span>
      </div>
    </article>
  )
}

export default PostCard

