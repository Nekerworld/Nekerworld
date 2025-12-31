/**
 * 포스트를 검색어로 필터링합니다
 * @param {Array} posts - 포스트 배열
 * @param {string} searchQuery - 검색어
 * @returns {Array} 필터링된 포스트 배열
 */
export function searchPosts(posts, searchQuery) {
  if (!searchQuery || searchQuery.trim() === '') return posts

  const query = searchQuery.toLowerCase().trim()

  return posts.filter(post => {
    // 제목 검색
    const titleMatch = post.title.toLowerCase().includes(query)
    
    // 요약 검색
    const excerptMatch = post.excerpt?.toLowerCase().includes(query) || false
    
    // 태그 검색
    const tagMatch = post.tags?.some(tag => 
      tag.toLowerCase().includes(query)
    ) || false
    
    // 카테고리 검색
    const categoryMatch = post.category?.toLowerCase().includes(query) || false

    return titleMatch || excerptMatch || tagMatch || categoryMatch
  })
}

/**
 * 포스트를 태그로 필터링합니다
 * @param {Array} posts - 포스트 배열
 * @param {string} tag - 태그
 * @returns {Array} 필터링된 포스트 배열
 */
export function filterPostsByTag(posts, tag) {
  if (!tag) return posts
  return posts.filter(post => post.tags?.includes(tag) || false)
}

/**
 * 모든 태그와 각 태그의 포스트 수를 반환합니다
 * @param {Array} posts - 포스트 배열
 * @returns {Object} 태그별 포스트 수 객체
 */
export function getTagCounts(posts) {
  const tagCounts = {}
  
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })
  
  return tagCounts
}

/**
 * 태그를 포스트 수 기준으로 정렬하여 반환합니다
 * @param {Object} tagCounts - 태그별 포스트 수 객체
 * @returns {Array} [tag, count] 형태의 배열, 포스트 수 내림차순 정렬
 */
export function getSortedTags(tagCounts) {
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1]) // 포스트 수 내림차순
    .map(([tag, count]) => ({ tag, count }))
}

