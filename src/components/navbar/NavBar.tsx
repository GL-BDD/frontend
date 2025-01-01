import { useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar() {
  const [isActive, setIsActive] = useState(false)
  const toggleNav = () => {
    setIsActive(!isActive)
  }
  return (
    <div id="home">
      <nav>
        <div className="logo">
          <h1>LOGO</h1>
        </div>
        <ul>
          <li>
            <a href="/#about">À propos</a>
          </li>
          <li>
            <a href="/#artisans">Artisans</a>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="singin">Login</Link>
          </li>
          <li>
            <Link to="singup">Sign-up</Link>
          </li>
          <li>
            <a href="#">Francais</a>
          </li>
          <li>
            <a href="#">Arabe</a>
          </li>
        </ul>
        <div
          className={`hamburger ${isActive ? 'hamburger-active' : ''}`}
          onClick={() => toggleNav()}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </nav>
      <div className={`menubar ${isActive ? 'active' : ''}`}>
        <ul>
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
            <Link to="singup">Sign-up</Link>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#about">À propos</a>
          </li>
          <li>
            <a href="#artisans">Artisans</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">Francais</a>
          </li>
          <li>
            <a href="#">Arabe</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
