import { Link } from 'react-router-dom'
import PostCard from './PostCard'
import './RelatedPosts.css'

function RelatedPosts({ posts, title = '관련 포스트' }) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="related-posts">
      <h2 className="related-posts-title">{title}</h2>
      <div className="related-posts-grid">
        {posts.map(post => (
          <Link key={post.slug} to={`/post/${post.slug}`} style={{ textDecoration: 'none' }}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RelatedPosts

