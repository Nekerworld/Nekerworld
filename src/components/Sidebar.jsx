import { Link } from 'react-router-dom'
import { getAllPosts, sortPostsByDate } from '../utils/postsData'
import { getTagCounts, getSortedTags } from '../utils/search'
import RandomPost from './RandomPost'
import BlogStats from './BlogStats'
import './Sidebar.css'

function Sidebar() {
  const allPosts = getAllPosts()
  const recentPosts = sortPostsByDate(allPosts, 'desc').slice(0, 5)
  const tagCounts = getTagCounts(allPosts)
  const popularTags = getSortedTags(tagCounts).slice(0, 10)
  const categories = ['전체', ...new Set(allPosts.map(post => post.category))]

  return (
    <aside className="sidebar">
      <RandomPost />
      
      <BlogStats />

      <div className="sidebar-section">
        <h3 className="sidebar-title">인기 태그</h3>
        <div className="sidebar-tags">
          {popularTags.map(({ tag, count }) => (
            <Link
              key={tag}
              to={`/#tag:${tag}`}
              className="sidebar-tag"
            >
              #{tag} <span className="tag-count">({count})</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">최근 포스트</h3>
        <ul className="sidebar-posts">
          {recentPosts.map(post => (
            <li key={post.slug} className="sidebar-post-item">
              <Link to={`/post/${post.slug}`} className="sidebar-post-link">
                <span className="sidebar-post-title">{post.title}</span>
                <span className="sidebar-post-date">{post.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">카테고리</h3>
        <ul className="sidebar-categories">
          {categories.map(category => (
            <li key={category}>
              <Link
                to={`/#category:${category}`}
                className="sidebar-category-link"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <Link to="/all-posts" className="sidebar-all-posts-link">
          <span className="sidebar-all-posts-icon">📚</span>
          <span>모든 문서 보기</span>
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar

