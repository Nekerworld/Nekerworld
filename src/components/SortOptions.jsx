import './SortOptions.css'

function SortOptions({ sortBy, onSortChange }) {
  return (
    <div className="sort-options-container">
      <label className="sort-label">정렬:</label>
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="date-desc">최신순</option>
        <option value="date-asc">오래된순</option>
        <option value="title-asc">제목순 (가나다)</option>
        <option value="title-desc">제목순 (역순)</option>
      </select>
    </div>
  )
}

export default SortOptions

