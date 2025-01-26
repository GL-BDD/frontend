/**
 * SingUp component handles the user registration process.
 *
 * @component
 * @example
 * return (
 *   <SingUp />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @description
 * This component renders a registration form that allows users to create an account.
 * It includes fields for username, email, phone number, password, and confirm password.
 * Users can also choose to register as an artisan by checking a checkbox.
 *
 * The component manages form state using the `useState` hook and handles form submission
 * with the `handleSubmit` function. It performs basic validation before sending the data
 * to the server using Axios for the registration process.
 *
 * @function handleChange
 * @description Handles changes to form input fields and updates the form state.
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input field.
 *
 * @function handleSubmit
 * @description Handles form submission, performs validation, and sends registration data to the server.
 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
 *
 * @function validateForm
 * @description Validates the form data before submission.
 * @returns {boolean} True if the form data is valid, otherwise false.
 *
 * @constant {string} BASE_URL - The base URL for the API, retrieved from environment variables.
 * @constant {string} API_URL - The full URL for the authentication API.
 *
 * @typedef {Object} RegisterFormData
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password for the account.
 * @property {string} confirmPassword - The confirmation of the password.
 * @property {string} phoneNumber - The phone number of the user.
 * @property {string} role - The role of the user, either 'client' or 'artisan'.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './signinup.css'

const BASE_URL = import.meta.env.VITE_API_URL

interface RegisterFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  role: string
}

const API_URL = `${BASE_URL}/api/auth`

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

      const response = await axios.post(`${API_URL}/register`, payload, {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-8">
      <div className="signup">
        <div className="signup--information">
          <h2>Create Account</h2>
          {error && (
            <p className="text-red-600 bg-red-50 p-3 rounded-lg mb-4">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              className="focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
              className="focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              className="focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className="focus:ring-2 focus:ring-blue-500"
            />

            <div className="role-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="role"
                  checked={formData.role === 'artisan'}
                  onChange={handleChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                Register as Artisan
              </label>
            </div>

            <button
              className="bleu hover:bg-blue-700 transition-colors duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          <p>
            Already have an account?{' '}
            <a
              href="/singin"
              className="hover:text-blue-700 transition-colors duration-200"
            >
              Sign In
            </a>
          </p>
        </div>
        <div className="signup--image">
          <img
            src="/images/loginimagedesktp.jpg"
            alt="signup illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}
