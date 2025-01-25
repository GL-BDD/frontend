/**
 * SingIn component handles the user login functionality.
 *
 * This component renders a login form where users can enter their email, password, and select their role (client or artisan).
 * Upon successful login, users are redirected to different pages based on their role.
 *
 * @component
 * @example
 * return (
 *   <SingIn />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * - Uses `useNavigate` from `react-router-dom` to handle navigation.
 * - Uses `useAuth` from `../../context/AuthContext` to handle authentication.
 * - Displays success or error messages based on the login attempt.
 *
 * @interface LoginFormData
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {string} role - The role of the user, either 'client' or 'artisan'.
 *
 * @function handleChange
 * Handles changes to the form inputs and updates the formData state.
 *
 * @function handleSubmit
 * Handles form submission, attempts to log in the user, and redirects based on the user's role.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input elements.
 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
 *
 * @returns {void}
 */
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './signinup.css'

interface LoginFormData {
  email: string
  password: string
  role: string
}

export default function SingIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, error: authError, isLoading, user } = useAuth()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    role: 'client',
  })
  const successMessage = location.state?.message

  useEffect(() => {
    if (user) {
      navigate(formData.role === 'artisan' ? '/artisan-dashboard' : '/')
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'artisan' : 'client') : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      console.log('Attempting login with:', {
        email: formData.email,
        role: formData.role,
      })

      await login(formData.email, formData.password, formData.role)

      console.log('Login successful, redirecting...')
      // Redirect based on role
      if (user) {
        navigate(formData.role === 'artisan' ? '/artisan-dashboard' : '/')
      }
    } catch (err) {
      console.error('Login error in component:', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-8">
      <div className="signin">
        <div className="signin--information">
          <h2>Welcome Back</h2>
          <p className="text-gray-600">Enter your details</p>
          {successMessage && (
            <p className="text-green-600 bg-green-50 p-3 rounded-lg">
              {successMessage}
            </p>
          )}
          {authError && (
            <p className="text-red-600 bg-red-50 p-3 rounded-lg">{authError}</p>
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
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
                I am an artisan
              </label>
            </div>
            <button
              className="bleu hover:bg-blue-700 transition-colors duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
        <div className="signin--image">
          <img
            src="/images/maitre-artisan-boulanger.jpg"
            alt="artisan baker at work"
            className="object-cover w-full h-0"
          />
        </div>
      </div>
    </div>
  )
}
