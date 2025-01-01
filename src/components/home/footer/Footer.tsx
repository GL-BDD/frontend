import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook'
import XIcon from '@mui/icons-material/X'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <ul className="social-icon" style={{ padding: 0 }}>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <FacebookIcon />
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <XIcon />
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <LinkedInIcon />
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <InstagramIcon />
            </a>
          </li>
        </ul>
        <ul className="menu" style={{ padding: 0 }}>
          <li className="menu__item">
            <a className="menu__link" href="#home">
              Home
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#about">
              About
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#artisans">
              Services
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">
              Contact
            </a>
          </li>
        </ul>
        <p>&copy;2024 DZ Artisans | All Rights Reserved</p>
      </footer>
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    </>
  )
}
