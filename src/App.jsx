import { useState, useEffect } from 'react'
import Header from './components/Header'
import BlogList from './components/BlogList'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="app">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">
        <BlogList />
      </main>
      <Footer />
    </div>
  )
}

export default App
