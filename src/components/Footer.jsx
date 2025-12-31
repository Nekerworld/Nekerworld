import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">블로그</h3>
            <p className="footer-description">
              공부한 내용들을 정리하는 기술 블로그입니다.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">링크</h3>
            <div className="footer-links">
              <a 
                href="https://github.com/nekerworld/Nekerworld" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub
              </a>
              <a 
                href="mailto:your-email@example.com" 
                className="footer-link"
              >
                이메일
              </a>
              <a 
                href="/feed.xml" 
                className="footer-link"
              >
                RSS
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Nekerworld. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

