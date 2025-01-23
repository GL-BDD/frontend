import { useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function NavBar() {
  const [isActive, setIsActive] = useState(false)
  const { user,logout } = useAuth();
  const navigate = useNavigate()
  const toggleNav = () => {
    setIsActive(!isActive)
  }
  return (
    <div id="home">
      <nav>
        <a href="/">
        <div className="logo">
          <h1>LOGO</h1>
        </div>
        </a>
        <ul>
          <li>
            <a href="/#about">À propos</a>
          </li>
          <li>
            <a href="/#artisans">Artisans</a>
          </li>
        </ul>
        <ul>
          {!user ? (<><li>
            <Link to="singin">Login</Link>
          </li>
          <li>
            <Link to="singup">Sign-up</Link>
          </li></>): <><button className='logout' onClick={()=>{navigate(`/artisan-profile/${user?.id}`)}}>{user?.username}</button> <li><button className='logout' onClick={() => {
            logout();
          }}>Logout</button></li></>}
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
