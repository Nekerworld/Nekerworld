import { Link } from 'react-router-dom'
import { getAllPosts, sortPostsByDate } from '../utils/postsData'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import './AllPosts.css'

function AllPosts() {
  const allPosts = sortPostsByDate(getAllPosts(), 'desc')
  const categories = [...new Set(allPosts.map(post => post.category))]

  return (
    <div className="all-posts-container">
      <div className="all-posts-header">
        <h1 className="all-posts-title">모든 문서</h1>
        <p className="all-posts-subtitle">총 {allPosts.length}개의 문서</p>
      </div>

      {categories.map(category => {
        const categoryPosts = allPosts.filter(post => post.category === category)
        return (
          <div key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <ul className="posts-list">
              {categoryPosts.map(post => {
                const formattedDate = format(new Date(post.date), 'yyyy.MM.dd', { locale: ko })
                return (
                  <li key={post.slug} className="post-list-item">
                    <Link to={`/post/${post.slug}`} className="post-list-link">
                      <span className="post-list-title">{post.title}</span>
                      <span className="post-list-date">{formattedDate}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default AllPosts

