import { getAllPosts, getPostBySlug } from './postsData'

/**
 * 같은 태그를 가진 포스트를 찾습니다
 * @param {string} slug - 현재 포스트의 slug
 * @param {number} limit - 최대 반환 개수
 * @returns {Array} 관련 포스트 배열
 */
export function getRelatedPostsByTag(slug, limit = 3) {
  const allPosts = getAllPosts()
  const currentPost = getPostBySlug(slug)

  if (!currentPost || !currentPost.tags || currentPost.tags.length === 0) {
    return []
  }

  const relatedPosts = allPosts.filter(post => {
    // 현재 포스트는 제외
    if (post.slug === slug) return false

    // 같은 태그가 하나라도 있으면 관련 포스트
    return post.tags && post.tags.some(tag => currentPost.tags.includes(tag))
  })

  // 공통 태그 수가 많은 순으로 정렬
  const scoredPosts = relatedPosts.map(post => {
    const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag))
    return { ...post, commonTagCount: commonTags.length }
  })

  scoredPosts.sort((a, b) => b.commonTagCount - a.commonTagCount)

  return scoredPosts.slice(0, limit).map(({ commonTagCount, ...post }) => post)
}

/**
 * 같은 카테고리의 포스트를 찾습니다
 * @param {string} slug - 현재 포스트의 slug
 * @param {number} limit - 최대 반환 개수
 * @returns {Array} 관련 포스트 배열
 */
export function getRelatedPostsByCategory(slug, limit = 3) {
  const allPosts = getAllPosts()
  const currentPost = getPostBySlug(slug)

  if (!currentPost || !currentPost.category) {
    return []
  }

  return allPosts
    .filter(post => post.category === currentPost.category && post.slug !== slug)
    .slice(0, limit)
}

/**
 * 태그와 카테고리를 모두 고려한 관련 포스트를 찾습니다
 * @param {string} slug - 현재 포스트의 slug
 * @param {number} limit - 최대 반환 개수
 * @returns {Array} 관련 포스트 배열
 */
export function getRelatedPosts(slug, limit = 3) {
  const tagRelated = getRelatedPostsByTag(slug, limit * 2)
  const categoryRelated = getRelatedPostsByCategory(slug, limit * 2)

  // 중복 제거 및 우선순위: 태그 > 카테고리
  const postMap = new Map()

  // 태그로 찾은 포스트를 먼저 추가 (우선순위 높음)
  tagRelated.forEach(post => {
    if (!postMap.has(post.slug)) {
      postMap.set(post.slug, { ...post, priority: 1 })
    }
  })

  // 카테고리로 찾은 포스트 추가
  categoryRelated.forEach(post => {
    if (!postMap.has(post.slug)) {
      postMap.set(post.slug, { ...post, priority: 2 })
    }
  })

  // 우선순위와 날짜로 정렬
  const sortedPosts = Array.from(postMap.values())
    .sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority // 우선순위가 높은 것 먼저
      }
      return new Date(b.date) - new Date(a.date) // 날짜 최신순
    })
    .slice(0, limit)

  return sortedPosts.map(({ priority, ...post }) => post)
}

