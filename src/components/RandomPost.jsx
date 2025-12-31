import { Link } from 'react-router-dom'
import { getRandomPost } from '../utils/wiki'
import './RandomPost.css'

function RandomPost() {
  const randomPost = getRandomPost()

  if (!randomPost) return null

  return (
    <div className="random-post">
      <Link to={`/post/${randomPost.slug}`} className="random-post-link">
        <span className="random-post-icon">🎲</span>
        <span className="random-post-text">랜덤 문서</span>
      </Link>
    </div>
  )
}

export default RandomPost

