import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './signinup.css'

interface LoginFormData {
  email: string
  password: string
  role: string
}

const API_URL = 'https://cors-proxy.fringe.zone/https://backend-yijt.onrender.com/api/auth'

export default function SingIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    role: 'client'
  })
  const [isLoading, setIsLoading] = useState(false)
  const successMessage = location.state?.message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'artisan' : 'client') : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Format the data
      const payload = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role === 'artisan' ? 'artisan' : 'client'
      }

      console.log('Sending login data:', payload)
      const response = await axios.post(`${API_URL}/login`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('Login response:', {
        status: response.status,
        data: response.data
      })

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token)
      }
      if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }

      // Redirect based on role
      navigate(formData.role === 'artisan' ? '/artisan-dashboard' : '/')
    } catch (err: any) {
      console.error('Login error:', err)
      
      // Log detailed error information
      if (err.response) {
        console.error('Error Response:', {
          data: err.response.data,
          status: err.response.status,
          headers: err.response.headers
        })
      }

      let errorMessage = 'Login failed. '
      
      if (err.response?.status === 401) {
        errorMessage = 'Invalid credentials. Please check your email and password.'
      } else if (err.response?.data?.message) {
        errorMessage += err.response.data.message
      } else if (err.response?.data?.error) {
        errorMessage += err.response.data.error
      } else if (err.response?.data) {
        errorMessage += JSON.stringify(err.response.data)
      }

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="signin">
        <div className="signin--information">
          <h2>Welcome Back</h2>
          <p style={{ color: '#241a1aac' }}>Enter your details</p>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
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

            <div className="role-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="role"
                  checked={formData.role === 'artisan'}
                  onChange={handleChange}
                />
                Login as Artisan
              </label>
            </div>

            <button className="bleu" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <p>
            Don't have an account? <a href="/singup">Sign Up</a>
          </p>
        </div>
        <div className="signin--image">
          <img src="/images/loginimagedesktp.jpg" alt="signin illustration" />
        </div>
      </div>
    </div>
  )
}
