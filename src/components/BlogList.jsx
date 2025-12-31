import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import PostCard from './PostCard'
import SearchBar from './SearchBar'
import TagFilter from './TagFilter'
import SortOptions from './SortOptions'
import { getAllPosts, filterPostsByCategory } from '../utils/postsData'
import { searchPosts, filterPostsByTag } from '../utils/search'
import { sortPostsByDate, sortPostsByTitle } from '../utils/sort'
import './BlogList.css'

function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedTag, setSelectedTag] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date-desc')
  
  const allPosts = getAllPosts()
  const categories = ['전체', ...new Set(allPosts.map(post => post.category))]

  // 필터링 및 정렬된 포스트
  const filteredAndSortedPosts = useMemo(() => {
    let posts = [...allPosts]

    // 카테고리 필터링
    posts = filterPostsByCategory(posts, selectedCategory)

    // 태그 필터링
    if (selectedTag) {
      posts = filterPostsByTag(posts, selectedTag)
    }

    // 검색
    if (searchQuery.trim()) {
      posts = searchPosts(posts, searchQuery)
    }

    // 정렬
    switch (sortBy) {
      case 'date-desc':
        posts = sortPostsByDate(posts, 'desc')
        break
      case 'date-asc':
        posts = sortPostsByDate(posts, 'asc')
        break
      case 'title-asc':
        posts = sortPostsByTitle(posts, 'asc')
        break
      case 'title-desc':
        posts = sortPostsByTitle(posts, 'desc')
        break
      default:
        posts = sortPostsByDate(posts, 'desc')
    }

    return posts
  }, [allPosts, selectedCategory, selectedTag, searchQuery, sortBy])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSelectedTag(null) // 카테고리 변경 시 태그 필터 초기화
  }

  const handleTagSelect = (tag) => {
    setSelectedTag(tag)
    setSelectedCategory('전체') // 태그 선택 시 카테고리 필터 초기화
  }

  return (
    <div className="blog-list-container">
      <div className="blog-header">
        <h1 className="blog-title">기술 블로그</h1>
        <p className="blog-subtitle">공부한 내용들을 정리하는 공간입니다</p>
      </div>

      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="filters-section">
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      <TagFilter
        posts={allPosts}
        selectedTag={selectedTag}
        onTagSelect={handleTagSelect}
      />

      <div className="posts-grid">
        {filteredAndSortedPosts.map(post => (
          <Link key={post.slug} to={`/post/${post.slug}`} style={{ textDecoration: 'none' }}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>

      {filteredAndSortedPosts.length === 0 && (
        <div className="no-posts">
          <p>
            {searchQuery 
              ? `"${searchQuery}"에 대한 검색 결과가 없습니다.`
              : selectedTag
              ? `"#${selectedTag}" 태그가 포함된 포스트가 없습니다.`
              : '해당 조건에 맞는 포스트가 없습니다.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default BlogList

