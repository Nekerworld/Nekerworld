import { useEffect, useRef } from 'react'
import './Comments.css'

// Giscus 설정
// 사용자가 GitHub 리포지토리 정보를 설정해야 합니다
const GISCUS_REPO = 'nekerworld/Nekerworld' // GitHub 리포지토리 (owner/repo)
const GISCUS_REPO_ID = '' // Giscus 설정 후 얻은 repo-id (선택사항, 자동 감지됨)
const GISCUS_CATEGORY = 'Announcements' // Discussions 카테고리
const GISCUS_CATEGORY_ID = '' // 카테고리 ID (선택사항, 자동 감지됨)

function Comments({ postTitle, postSlug }) {
  const commentsRef = useRef(null)

  useEffect(() => {
    // 기존 Giscus 스크립트가 있으면 제거
    const existingScript = document.querySelector('script[src*="giscus"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Giscus 스크립트 생성
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', GISCUS_REPO)
    script.setAttribute('data-repo-id', GISCUS_REPO_ID)
    script.setAttribute('data-category', GISCUS_CATEGORY)
    script.setAttribute('data-category-id', GISCUS_CATEGORY_ID)
    script.setAttribute('data-mapping', 'pathname') // 또는 'title', 'og:title' 등
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') || 'light')
    script.setAttribute('data-lang', 'ko')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true

    if (commentsRef.current) {
      commentsRef.current.appendChild(script)
    }

    // 테마 변경 감지 및 업데이트
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-theme') || 'light'
      const iframe = commentsRef.current?.querySelector('iframe')
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          { giscus: { setConfig: { theme } } },
          'https://giscus.app'
        )
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    return () => {
      observer.disconnect()
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [postTitle, postSlug])

  return (
    <div className="comments-container">
      <h2 className="comments-title">댓글</h2>
      <div ref={commentsRef} className="giscus"></div>
      <p className="comments-note">
        댓글 기능은 GitHub Discussions를 사용합니다. GitHub 계정으로 로그인하여 댓글을 남길 수 있습니다.
      </p>
    </div>
  )
}

export default Comments

