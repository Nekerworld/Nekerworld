import BlogList from '../components/BlogList'
import Sidebar from '../components/Sidebar'
import './Home.css'

function Home() {
  return (
    <div className="home-container">
      <div className="home-main">
        <BlogList />
      </div>
      <Sidebar />
    </div>
  )
}

export default Home

