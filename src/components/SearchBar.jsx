import './SearchBar.css'

function SearchBar({ searchQuery, onSearchChange, placeholder = '포스트 검색...' }) {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <svg 
          className="search-icon" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            className="search-clear"
            onClick={() => onSearchChange('')}
            aria-label="검색어 지우기"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar

