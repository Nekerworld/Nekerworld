import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// 포스트 메타데이터 (postsData.js에서 가져옴)
const postsMetadata = [
  {
    slug: 'react-hooks',
    title: 'React Hooks 완전 정리',
    date: '2024-01-15',
    category: 'React',
    tags: ['React', 'Hooks', 'JavaScript'],
    excerpt: 'useState, useEffect, useContext 등 React Hooks에 대해 자세히 알아보겠습니다.',
    readTime: '5분',
    series: 'React 학습',
    seriesOrder: 1
  },
  {
    slug: 'javascript-async',
    title: 'JavaScript 비동기 처리 이해하기',
    date: '2024-01-10',
    category: 'JavaScript',
    tags: ['JavaScript', 'Async', 'Promise'],
    excerpt: 'Promise, async/await를 활용한 비동기 프로그래밍 패턴을 정리했습니다.',
    readTime: '8분'
  },
  {
    slug: 'css-grid',
    title: 'CSS Grid로 레이아웃 마스터하기',
    date: '2024-01-05',
    category: 'CSS',
    tags: ['CSS', 'Grid', 'Layout'],
    excerpt: 'CSS Grid를 활용한 현대적인 웹 레이아웃 설계 방법을 공유합니다.',
    readTime: '6분'
  },
  {
    slug: 'git-commands',
    title: 'Git 명령어 정리',
    date: '2024-01-01',
    category: 'Git',
    tags: ['Git', 'Version Control'],
    excerpt: '자주 사용하는 Git 명령어들과 워크플로우를 정리했습니다.',
    readTime: '4분'
  }
]

function getAllPosts() {
  return postsMetadata
}

function sortPostsByDate(posts, order = 'desc') {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    const comparison = dateB - dateA
    return order === 'asc' ? -comparison : comparison
  })
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const distPath = join(__dirname, '..', 'dist')
const publicPath = join(__dirname, '..', 'public')

// 사이트 설정
const siteUrl = 'https://nekerworld.github.io/Nekerworld'
const siteTitle = 'Nekerworld 기술 블로그'
const siteDescription = '공부한 내용들을 정리하는 기술 블로그입니다.'

function generateRSS() {
  const posts = sortPostsByDate(getAllPosts(), 'desc')
  const buildDate = new Date().toUTCString()

  const rssItems = posts.map(post => {
    const postUrl = `${siteUrl}/#/post/${post.slug}`
    const pubDate = new Date(post.date).toUTCString()
    
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.excerpt || '')}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category || '')}</category>
    </item>`
  }).join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>ko</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`

  // dist 폴더가 없으면 생성
  try {
    mkdirSync(distPath, { recursive: true })
    writeFileSync(join(distPath, 'feed.xml'), rss, 'utf-8')
    console.log('✅ RSS feed generated: dist/feed.xml')
  } catch (error) {
    // dist 폴더가 없으면 public에 생성 (개발 환경)
    writeFileSync(join(publicPath, 'feed.xml'), rss, 'utf-8')
    console.log('✅ RSS feed generated: public/feed.xml')
  }
}

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

generateRSS()

