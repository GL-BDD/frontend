// import { Google } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import './signinup.css'
// import GoogleIcon from '@mui/icons-material/Google'
export default function SingIn() {
  return (
    <div className="container">
      <div className="signin ">
        <div className="signin--information ">
          <h2>Heureux de vous revoir</h2>
          <p style={{ color: '#241a1aac' }}>entrer vos details</p>
          <form action="">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            <button className="bleu">Sign in </button>
            <button>Sign in with google</button>
            <p style={{ color: '#241a1aac' }}>
              vous avez pas un compte
              <Link to="/singup">
                <span className="bleu"> Sign up</span>
              </Link>
            </p>
          </form>
        </div>
        <div className="signin--image ">
          <img src="/images/loginimagedesktp.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}
