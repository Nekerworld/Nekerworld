import { useState } from 'react'
import PostCard from './PostCard'
import './BlogList.css'

// 샘플 블로그 포스트 데이터
const samplePosts = [
  {
    id: 1,
    title: 'React Hooks 완전 정리',
    excerpt: 'useState, useEffect, useContext 등 React Hooks에 대해 자세히 알아보겠습니다.',
    date: '2024-01-15',
    category: 'React',
    readTime: '5분',
    tags: ['React', 'Hooks', 'JavaScript']
  },
  {
    id: 2,
    title: 'JavaScript 비동기 처리 이해하기',
    excerpt: 'Promise, async/await를 활용한 비동기 프로그래밍 패턴을 정리했습니다.',
    date: '2024-01-10',
    category: 'JavaScript',
    readTime: '8분',
    tags: ['JavaScript', 'Async', 'Promise']
  },
  {
    id: 3,
    title: 'CSS Grid로 레이아웃 마스터하기',
    excerpt: 'CSS Grid를 활용한 현대적인 웹 레이아웃 설계 방법을 공유합니다.',
    date: '2024-01-05',
    category: 'CSS',
    readTime: '6분',
    tags: ['CSS', 'Grid', 'Layout']
  },
  {
    id: 4,
    title: 'Git 명령어 정리',
    excerpt: '자주 사용하는 Git 명령어들과 워크플로우를 정리했습니다.',
    date: '2024-01-01',
    category: 'Git',
    readTime: '4분',
    tags: ['Git', 'Version Control']
  }
]

function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  
  const categories = ['전체', ...new Set(samplePosts.map(post => post.category))]
  
  const filteredPosts = selectedCategory === '전체' 
    ? samplePosts 
    : samplePosts.filter(post => post.category === selectedCategory)

  return (
    <div className="blog-list-container">
      <div className="blog-header">
        <h1 className="blog-title">기술 블로그</h1>
        <p className="blog-subtitle">공부한 내용들을 정리하는 공간입니다</p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="posts-grid">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="no-posts">
          <p>해당 카테고리에 포스트가 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export default BlogList

