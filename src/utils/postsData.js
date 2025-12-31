// 빌드 타임에 마크다운 파일을 import하여 파싱
// 개발 환경에서는 fetch를 사용하므로, 여기서는 메타데이터만 정의
// 실제 구현은 빌드 스크립트 또는 클라이언트 사이드에서 처리

// 포스트 메타데이터 (개발 환경용)
export const postsMetadata = [
  {
    slug: 'react-hooks',
    title: 'React Hooks 완전 정리',
    date: '2024-01-15',
    category: 'React',
    tags: ['React', 'Hooks', 'JavaScript'],
    excerpt: 'useState, useEffect, useContext 등 React Hooks에 대해 자세히 알아보겠습니다.',
    readTime: '5분',
    series: 'React 학습',
    seriesOrder: 1
  },
  {
    slug: 'javascript-async',
    title: 'JavaScript 비동기 처리 이해하기',
    date: '2024-01-10',
    category: 'JavaScript',
    tags: ['JavaScript', 'Async', 'Promise'],
    excerpt: 'Promise, async/await를 활용한 비동기 프로그래밍 패턴을 정리했습니다.',
    readTime: '8분'
  },
  {
    slug: 'css-grid',
    title: 'CSS Grid로 레이아웃 마스터하기',
    date: '2024-01-05',
    category: 'CSS',
    tags: ['CSS', 'Grid', 'Layout'],
    excerpt: 'CSS Grid를 활용한 현대적인 웹 레이아웃 설계 방법을 공유합니다.',
    readTime: '6분'
  },
  {
    slug: 'git-commands',
    title: 'Git 명령어 정리',
    date: '2024-01-01',
    category: 'Git',
    tags: ['Git', 'Version Control'],
    excerpt: '자주 사용하는 Git 명령어들과 워크플로우를 정리했습니다.',
    readTime: '4분'
  }
]

/**
 * 모든 포스트의 메타데이터를 가져옵니다
 */
export function getAllPosts() {
  return postsMetadata
}

/**
 * 특정 slug의 포스트를 가져옵니다
 */
export function getPostBySlug(slug) {
  return postsMetadata.find(post => post.slug === slug)
}

/**
 * 포스트 목록을 날짜순으로 정렬합니다 (최신순)
 */
export function sortPostsByDate(posts) {
  return [...posts].sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })
}

/**
 * 포스트를 카테고리로 필터링합니다
 */
export function filterPostsByCategory(posts, category) {
  if (category === '전체') return posts
  return posts.filter(post => post.category === category)
}

/**
 * 마크다운 파일을 가져옵니다 (런타임)
 */
export async function getPostContent(slug) {
  try {
    const response = await fetch(`/posts/${slug}.md`)
    if (!response.ok) throw new Error('Post not found')
    return await response.text()
  } catch (error) {
    console.error('Failed to fetch post:', error)
    throw error
  }
}

