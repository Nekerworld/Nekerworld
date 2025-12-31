import { getAllPosts } from './postsData'
import { sortPostsByDate } from './sort'

/**
 * 모든 시리즈 목록을 가져옵니다
 * @returns {Object} 시리즈 이름을 키로, 포스트 배열을 값으로 가지는 객체
 */
export function getAllSeries() {
  const allPosts = getAllPosts()
  const seriesMap = {}

  allPosts.forEach(post => {
    if (post.series) {
      if (!seriesMap[post.series]) {
        seriesMap[post.series] = []
      }
      seriesMap[post.series].push(post)
    }
  })

  // 각 시리즈를 seriesOrder로 정렬
  Object.keys(seriesMap).forEach(seriesName => {
    seriesMap[seriesName].sort((a, b) => {
      const orderA = a.seriesOrder || 0
      const orderB = b.seriesOrder || 0
      return orderA - orderB
    })
  })

  return seriesMap
}

/**
 * 특정 시리즈의 포스트 목록을 가져옵니다
 * @param {string} seriesName - 시리즈 이름
 * @returns {Array} 시리즈에 속한 포스트 배열 (seriesOrder 순서)
 */
export function getPostsBySeries(seriesName) {
  const allPosts = getAllPosts()
  return allPosts
    .filter(post => post.series === seriesName)
    .sort((a, b) => {
      const orderA = a.seriesOrder || 0
      const orderB = b.seriesOrder || 0
      return orderA - orderB
    })
}

/**
 * 특정 포스트의 시리즈 내 이전/다음 포스트를 찾습니다
 * @param {string} slug - 현재 포스트의 slug
 * @returns {Object} { prevPost, nextPost } 또는 { prevPost: null, nextPost: null }
 */
export function getSeriesNavigation(slug) {
  const allPosts = getAllPosts()
  const currentPost = allPosts.find(p => p.slug === slug)

  if (!currentPost || !currentPost.series) {
    return { prevPost: null, nextPost: null }
  }

  const seriesPosts = getPostsBySeries(currentPost.series)
  const currentIndex = seriesPosts.findIndex(p => p.slug === slug)

  return {
    prevPost: currentIndex > 0 ? seriesPosts[currentIndex - 1] : null,
    nextPost: currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null,
    seriesName: currentPost.series,
    seriesPosts: seriesPosts,
    currentIndex: currentIndex + 1, // 1부터 시작
    totalPosts: seriesPosts.length
  }
}

/**
 * 시리즈 목록을 반환합니다 (시리즈 이름과 포스트 수)
 * @returns {Array} { name, count, posts } 형태의 배열
 */
export function getSeriesList() {
  const seriesMap = getAllSeries()
  return Object.entries(seriesMap)
    .map(([name, posts]) => ({
      name,
      count: posts.length,
      posts: posts
    }))
    .sort((a, b) => b.count - a.count) // 포스트 수 많은 순으로 정렬
}

