import './TagFilter.css'
import { getTagCounts, getSortedTags } from '../utils/search'

function TagFilter({ posts, selectedTag, onTagSelect, maxTags = 20 }) {
  const tagCounts = getTagCounts(posts)
  const sortedTags = getSortedTags(tagCounts).slice(0, maxTags)

  if (sortedTags.length === 0) return null

  return (
    <div className="tag-filter-container">
      <div className="tag-filter-header">
        <h3 className="tag-filter-title">태그</h3>
        <button
          className={`tag-filter-all ${!selectedTag ? 'active' : ''}`}
          onClick={() => onTagSelect(null)}
        >
          전체
        </button>
      </div>
      <div className="tag-filter-list">
        {sortedTags.map(({ tag, count }) => (
          <button
            key={tag}
            className={`tag-filter-item ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => onTagSelect(tag)}
          >
            <span className="tag-name">#{tag}</span>
            <span className="tag-count">({count})</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TagFilter

