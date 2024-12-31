import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './signinup.css'

interface RegisterFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  role: string
}

const BASE_URL = import.meta.env.VITE_API_URL

export default function SingUp() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: 'client',
  })
  const [isLoading, setIsLoading] = useState(false)

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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      setIsLoading(false)
      return
    }

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    try {
      const { confirmPassword, ...registerData } = formData

      // Format the data to match API expectations
      const payload = {
        username: registerData.username.trim(),
        email: registerData.email.trim().toLowerCase(),
        password: registerData.password,
        role: registerData.role.toLowerCase(), // Ensure role is lowercase
        phoneNumber: registerData.phoneNumber.replace(/\s+/g, ''),
      }

      console.log('Sending registration data:', payload)

      const response = await axios.post(`${BASE_URL}/register`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log('Registration response:', {
        status: response.status,
        data: response.data,
        headers: response.headers,
      })

      navigate('/singin', {
        state: {
          message: 'Registration successful! You can now login.',
        },
      })
    } catch (err: any) {
      console.error('Registration error:', err)

      // Log detailed error information
      if (err.response) {
        console.error('Error Response:', {
          data: err.response.data,
          status: err.response.status,
          headers: err.response.headers,
          message: err.response.data?.message,
          error: err.response.data?.error,
          details: err.response.data?.details,
        })
      }

      let errorMessage = ''

      if (err.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.'
      } else if (err.response?.status === 400) {
        if (err.response.data?.message) {
          errorMessage = err.response.data.message
        } else if (err.response.data?.error) {
          errorMessage = err.response.data.error
        } else if (err.response.data?.details) {
          errorMessage = err.response.data.details
        } else {
          errorMessage =
            'Invalid registration data. Please check your information.'
        }
      } else {
        errorMessage = 'Registration failed. Please try again.'
      }

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Add basic validation before form submission
  const validateForm = () => {
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return false
    }
    if (formData.phoneNumber.length < 10) {
      setError('Please enter a valid phone number')
      return false
    }
    return true
  }

  return (
    <div className="container">
      <div className="signup">
        <div className="signup--information">
          <h2>Create Account</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
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

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
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
                Register as Artisan
              </label>
            </div>

            <button className="bleu" type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          <p>
            Already have an account? <a href="/singin">Sign In</a>
          </p>
        </div>
        <div className="signup--image">
          <img src="/images/loginimagedesktp.jpg" alt="signup illustration" />
        </div>
      </div>
    </div>
  )
}
