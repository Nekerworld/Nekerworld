import matter from 'gray-matter'

/**
 * 마크다운 파일을 파싱하여 포스트 데이터를 추출합니다
 * @param {string} markdown - 마크다운 파일 내용
 * @param {string} filename - 파일명 (slug 생성에 사용)
 * @returns {Object} 파싱된 포스트 데이터
 */
export function parseMarkdown(markdown, filename) {
  const { data, content } = matter(markdown)
  const slug = filename.replace(/\.md$/, '')
  
  // 읽기 시간 계산 (한국어 기준: 분당 200자)
  const readTime = Math.ceil(content.length / 200)
  
  return {
    slug,
    title: data.title || '제목 없음',
    date: data.date || new Date().toISOString().split('T')[0],
    category: data.category || '기타',
    tags: data.tags || [],
    excerpt: data.excerpt || content.substring(0, 150) + '...',
    content,
    readTime: `${readTime}분`,
    series: data.series || null,
    seriesOrder: data.seriesOrder || null,
    ...data
  }
}

/**
 * 포스트 목록을 날짜순으로 정렬합니다
 * @param {Array} posts - 포스트 배열
 * @returns {Array} 정렬된 포스트 배열
 */
export function sortPostsByDate(posts) {
  return [...posts].sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })
}

/**
 * 포스트를 카테고리로 필터링합니다
 * @param {Array} posts - 포스트 배열
 * @param {string} category - 카테고리
 * @returns {Array} 필터링된 포스트 배열
 */
export function filterPostsByCategory(posts, category) {
  if (category === '전체') return posts
  return posts.filter(post => post.category === category)
}

/**
 * 포스트를 태그로 필터링합니다
 * @param {Array} posts - 포스트 배열
 * @param {string} tag - 태그
 * @returns {Array} 필터링된 포스트 배열
 */
export function filterPostsByTag(posts, tag) {
  return posts.filter(post => post.tags.includes(tag))
}

