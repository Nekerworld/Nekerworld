import { useEffect, useState } from 'react'
import './TableOfContents.css'

function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([])

  useEffect(() => {
    if (!content) return

    // 마크다운 헤딩 추출 (#, ##, ### 등)
    const headingRegex = /^(#{1,3})\s+(.+)$/gm
    const matches = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w가-힣\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')

      matches.push({
        level,
        text,
        id
      })
    }

    setHeadings(matches)
  }, [content])

  if (headings.length === 0) return null

  const handleClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // URL 해시 업데이트 (선택사항)
      window.history.pushState(null, null, `#${id}`)
    }
  }

  return (
    <nav className="table-of-contents">
      <h3 className="toc-title">목차</h3>
      <ul className="toc-list">
        {headings.map((heading, index) => (
          <li
            key={index}
            className={`toc-item toc-level-${heading.level}`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className="toc-link"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents

