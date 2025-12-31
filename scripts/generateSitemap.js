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

const __dirname = dirname(fileURLToPath(import.meta.url))
const distPath = join(__dirname, '..', 'dist')
const publicPath = join(__dirname, '..', 'public')

// 사이트 설정
const siteUrl = 'https://nekerworld.github.io/Nekerworld'

function generateSitemap() {
  const posts = getAllPosts()
  const currentDate = new Date().toISOString().split('T')[0]

  const urls = [
    {
      loc: `${siteUrl}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    ...posts.map(post => ({
      loc: `${siteUrl}/#/post/${post.slug}`,
      lastmod: post.date || currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    }))
  ]

  const sitemapItems = urls.map(url => `    <url>
      <loc>${escapeXml(url.loc)}</loc>
      <lastmod>${url.lastmod}</lastmod>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
    </url>`).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapItems}
</urlset>`

  // dist 폴더가 없으면 생성
  try {
    mkdirSync(distPath, { recursive: true })
    writeFileSync(join(distPath, 'sitemap.xml'), sitemap, 'utf-8')
    console.log('✅ Sitemap generated: dist/sitemap.xml')
  } catch (error) {
    // dist 폴더가 없으면 public에 생성 (개발 환경)
    writeFileSync(join(publicPath, 'sitemap.xml'), sitemap, 'utf-8')
    console.log('✅ Sitemap generated: public/sitemap.xml')
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

generateSitemap()

