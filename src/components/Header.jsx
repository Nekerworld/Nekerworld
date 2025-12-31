import { Link } from 'react-router-dom'
import './Header.css'

function Header({ theme, toggleTheme }) {
  const scrollToTagCloud = () => {
    // 태그 클라우드로 스크롤 (현재는 홈으로 이동)
    window.location.href = '/#tags'
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Nekerworld</Link>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">홈</Link>
          <Link to="/#tags" className="nav-link" onClick={scrollToTagCloud}>태그</Link>
          <Link to="/" className="nav-link">시리즈</Link>
        </nav>
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="테마 전환"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}

export default Header