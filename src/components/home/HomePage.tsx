import NavBar from './navbar/NavBar'
import './HomePage.css'
import Artisans from './artisans/Artisans'
import About from './about/About'
import Footer from './footer/Footer'
export default function HomePage() {
  return (
    <div className="home-page">
      <div className="herro-section">
        <NavBar />
      </div>
      <About />
      <Artisans />
      <Footer />
    </div>
  )
}
