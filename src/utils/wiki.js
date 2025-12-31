import { getAllPosts } from './postsData'
import { getTagCounts } from './search'
import { getAllSeries } from './series'

/**
 * 랜덤 포스트를 반환합니다
 */
export function getRandomPost() {
  const allPosts = getAllPosts()
  if (allPosts.length === 0) return null
  const randomIndex = Math.floor(Math.random() * allPosts.length)
  return allPosts[randomIndex]
}

/**
 * 블로그 통계를 반환합니다
 */
export function getBlogStats() {
  const allPosts = getAllPosts()
  const tagCounts = getTagCounts(allPosts)
  const series = getAllSeries()

  return {
    totalPosts: allPosts.length,
    totalTags: Object.keys(tagCounts).length,
    totalCategories: new Set(allPosts.map(post => post.category)).size,
    totalSeries: Object.keys(series).length,
    totalWords: allPosts.reduce((sum, post) => {
      // 대략적인 단어 수 계산 (한국어 기준)
      return sum + (post.excerpt?.length || 0)
    }, 0)
  }
}

/**
 * 문서에서 다른 문서로의 링크를 찾습니다 (마크다운 링크)
 * @param {string} content - 마크다운 내용
 * @returns {Array} 연결된 문서의 slug 배열
 */
export function findDocumentLinks(content) {
  if (!content) return []
  
  const allPosts = getAllPosts()
  const links = []
  
  // 마크다운 링크 패턴 찾기: [텍스트](/post/slug) 또는 [텍스트](slug)
  const linkPattern = /\[([^\]]+)\]\((?:.*\/post\/)?([^)]+)\)/g
  let match
  
  while ((match = linkPattern.exec(content)) !== null) {
    const slug = match[2].replace(/^\/post\//, '').replace(/^#\/post\//, '')
    const linkedPost = allPosts.find(post => post.slug === slug)
    if (linkedPost && !links.includes(slug)) {
      links.push(slug)
    }
  }
  
  return links
}

/**
 * 특정 문서를 참조하는 다른 문서들을 찾습니다
 * @param {string} targetSlug - 찾을 문서의 slug
 * @returns {Array} 이 문서를 참조하는 문서들의 slug 배열
 */
export function findReferencingDocuments(targetSlug) {
  const allPosts = getAllPosts()
  const referencing = []
  
  // 실제로는 마크다운 내용을 확인해야 하지만, 
  // 현재는 메타데이터만 있으므로 시리즈 관계로 대체
  allPosts.forEach(post => {
    if (post.series) {
      const seriesPosts = allPosts.filter(p => p.series === post.series)
      if (seriesPosts.some(p => p.slug === targetSlug) && post.slug !== targetSlug) {
        referencing.push(post.slug)
      }
    }
  })
  
  return referencing
}

