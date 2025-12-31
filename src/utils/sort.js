/**
 * 포스트를 제목순으로 정렬합니다 (가나다순)
 * @param {Array} posts - 포스트 배열
 * @param {string} order - 'asc' (오름차순) 또는 'desc' (내림차순)
 * @returns {Array} 정렬된 포스트 배열
 */
export function sortPostsByTitle(posts, order = 'asc') {
  return [...posts].sort((a, b) => {
    const comparison = a.title.localeCompare(b.title, 'ko')
    return order === 'asc' ? comparison : -comparison
  })
}

/**
 * 포스트를 날짜순으로 정렬합니다
 * @param {Array} posts - 포스트 배열
 * @param {string} order - 'asc' (오름차순) 또는 'desc' (내림차순, 최신순)
 * @returns {Array} 정렬된 포스트 배열
 */
export function sortPostsByDate(posts, order = 'desc') {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    const comparison = dateB - dateA
    return order === 'asc' ? -comparison : comparison
  })
}

