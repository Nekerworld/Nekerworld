import './Header.css'

function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <a href="/">기술 블로그</a>
        </div>
        <nav className="nav">
          <a href="#home" className="nav-link">홈</a>
          <a href="#posts" className="nav-link">포스트</a>
          <a href="#about" className="nav-link">소개</a>
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

