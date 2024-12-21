import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './signinup.css'

interface LoginFormData {
  email: string
  password: string
}

const API_URL =
  'https://cors-proxy.fringe.zone/https://backend-yijt.onrender.com/api/auth'

export default function SingIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const successMessage = location.state?.message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      console.log('Sending login data:', formData)
      const response = await axios.post(`${API_URL}/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })

      console.log('Login successful:', response.data)

      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }

      navigate('/')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Login error:', err)

      const errorMessage =
        err.response?.data?.message ||
        'Une erreur est survenue lors de la connexion. Veuillez réessayer.'

      setError(errorMessage)
      console.error('Error details:', {
        data: err.response?.data,
        status: err.response?.status,
        message: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="signin">
        <div className="signin--information">
          <h2>Heureux de vous revoir</h2>
          <p style={{ color: '#241a1aac' }}>entrer vos details</p>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button className="bleu" type="submit" disabled={isLoading}>
              {isLoading ? 'Connexion...' : 'Sign in'}
            </button>
            <button type="button">Sign in with google</button>
            <p style={{ color: '#241a1aac' }}>
              vous avez pas un compte
              <Link to="/singup">
                <span className="bleu"> Sign up</span>
              </Link>
            </p>
          </form>
        </div>

        <div className="signin--image">
          <img src="/images/loginimagedesktp.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}
