import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { getPostBySlug, getPostContent, getAllPosts } from '../utils/postsData'
import { parseMarkdown } from '../utils/postParser'
import { getSeriesNavigation } from '../utils/series'
import { getRelatedPosts } from '../utils/relatedPosts'
import SeriesNavigation from '../components/SeriesNavigation'
import RelatedPosts from '../components/RelatedPosts'
import ShareButtons from '../components/ShareButtons'
import Comments from '../components/Comments'
import './PostDetail.css'

function getCodeStyle() {
  const theme = document.documentElement.getAttribute('data-theme')
  return theme === 'dark' ? vscDarkPlus : oneLight
}

function PostDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true)
        const postMeta = getPostBySlug(slug)
        if (!postMeta) {
          setError('Post not found')
          return
        }

        const markdown = await getPostContent(slug)
        const parsedPost = parseMarkdown(markdown, `${slug}.md`)
        setPost({ ...postMeta, ...parsedPost })
        setContent(parsedPost.content)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  if (loading) {
    return (
      <div className="post-detail-container">
        <div className="loading">로딩 중...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="post-detail-container">
        <div className="error">포스트를 찾을 수 없습니다.</div>
        <Link to="/" className="back-link">홈으로 돌아가기</Link>
      </div>
    )
  }

  // 시리즈 네비게이션
  const seriesInfo = getSeriesNavigation(slug)
  
  // 일반 이전/다음 포스트 찾기 (시리즈가 아닌 경우)
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const prevPost = !seriesInfo.seriesName && currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = !seriesInfo.seriesName && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  // 관련 포스트
  const relatedPosts = getRelatedPosts(slug, 3)

  const formattedDate = format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })

  return (
    <article className="post-detail-container">
      <Link to="/" className="back-button">← 목록으로</Link>
      
      <header className="post-header">
        <div className="post-meta">
          <span className="post-category">{post.category}</span>
          <span className="post-date">{formattedDate}</span>
          <span className="post-read-time">{post.readTime} 읽기</span>
        </div>
        <h1 className="post-title">{post.title}</h1>
        {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="post-tag">#{tag}</span>
            ))}
          </div>
        )}
      </header>

      {seriesInfo.seriesName && (
        <SeriesNavigation seriesInfo={seriesInfo} currentSlug={slug} />
      )}

      <div className="post-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={getCodeStyle()}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      <ShareButtons 
        title={post.title}
        description={post.excerpt}
      />

      {relatedPosts.length > 0 && (
        <RelatedPosts posts={relatedPosts} />
      )}

      <Comments 
        postTitle={post.title}
        postSlug={slug}
      />

      {!seriesInfo.seriesName && (
        <nav className="post-navigation">
          {prevPost && (
            <Link to={`/post/${prevPost.slug}`} className="nav-link prev">
              <span className="nav-label">이전 포스트</span>
              <span className="nav-title">{prevPost.title}</span>
            </Link>
          )}
          {nextPost && (
            <Link to={`/post/${nextPost.slug}`} className="nav-link next">
              <span className="nav-label">다음 포스트</span>
              <span className="nav-title">{nextPost.title}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  )
}

export default PostDetail

