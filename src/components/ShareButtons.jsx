import { useState } from 'react'
import './ShareButtons.css'

function ShareButtons({ title, url, description }) {
  const [copied, setCopied] = useState(false)
  
  // 현재 페이지 URL 가져오기 (HashRouter 사용 시)
  const currentUrl = url || window.location.href.replace(window.location.hash, '') + window.location.hash
  const shareTitle = title || document.title
  const shareDescription = description || ''

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = currentUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareToTwitter = () => {
    const text = `${shareTitle}${shareDescription ? ` - ${shareDescription}` : ''}`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`
    window.open(twitterUrl, '_blank', 'width=550,height=420')
  }

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    window.open(facebookUrl, '_blank', 'width=550,height=420')
  }

  const shareToKakao = () => {
    // 카카오톡 공유는 Kakao SDK가 필요합니다
    // 여기서는 간단한 링크 공유로 대체
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: shareTitle,
          description: shareDescription || shareTitle,
          imageUrl: '',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      })
    } else {
      // Kakao SDK가 없는 경우 기본 링크 복사
      handleCopy()
    }
  }

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
    window.open(linkedInUrl, '_blank', 'width=550,height=420')
  }

  return (
    <div className="share-buttons-container">
      <span className="share-label">공유하기</span>
      <div className="share-buttons">
        <button
          className="share-btn twitter"
          onClick={shareToTwitter}
          aria-label="Twitter 공유"
          title="Twitter 공유"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
          </svg>
        </button>

        <button
          className="share-btn facebook"
          onClick={shareToFacebook}
          aria-label="Facebook 공유"
          title="Facebook 공유"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
          </svg>
        </button>

        <button
          className="share-btn linkedin"
          onClick={shareToLinkedIn}
          aria-label="LinkedIn 공유"
          title="LinkedIn 공유"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </button>

        <button
          className="share-btn kakao"
          onClick={shareToKakao}
          aria-label="카카오톡 공유"
          title="카카오톡 공유"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.48 3 2 6.15 2 10.1c0 2.35 1.75 4.45 4.38 5.71L5.5 20l4.62-2.69c.94.13 1.92.13 2.88 0L17.5 20l-1.13-4.19C19.75 14.55 21.5 12.45 21.5 10.1 21.5 6.15 17.02 3 12 3z"/>
          </svg>
        </button>

        <button
          className={`share-btn copy ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label="URL 복사"
          title="URL 복사"
        >
          {copied ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
          )}
        </button>
      </div>
      {copied && <span className="copy-feedback">복사되었습니다!</span>}
    </div>
  )
}

export default ShareButtons

