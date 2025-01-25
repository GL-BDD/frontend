import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook'
import XIcon from '@mui/icons-material/X'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
/**
 * Footer component that renders the footer section of the website.
 * It includes social media icons and navigation links.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 *
 * @returns {JSX.Element} The rendered footer component.
 */
export default function Footer() {
  return (
    <>
      <footer className="footer">
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
    </>
  )
}
