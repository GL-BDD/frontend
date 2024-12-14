import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './signinup.css'

interface RegisterFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const API_URL = 'https://cors-proxy.fringe.zone/https://backend-yijt.onrender.com/api/auth'

export default function SingUp() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      setIsLoading(false)
      return
    }

    try {
      const { confirmPassword, ...registerData } = formData
      
      
      const apiData = {
        ...registerData,
        role: 'user'
      }
      
      console.log('Sending registration data:', apiData)
      const response = await axios.post(`${API_URL}/register`, apiData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      
      console.log('Registration successful:', response.data)
      
      
      navigate('/singin', { 
        state: { message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' }
      })
    } catch (err: any) {
      console.error('Registration error:', err)
      
      
      const errorMessage = err.response?.data?.message || 
        'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.'
      
      setError(errorMessage)
      console.error('Error details:', {
        data: err.response?.data,
        status: err.response?.status,
        message: errorMessage
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="signin">
        <div className="signin--information">
          <h2>Créer un compte</h2>
          <p style={{ color: '#241a1aac' }}>entrer vos informations</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Nom d'utilisateur</label>
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

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />

            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
            />

            <button 
              className="bleu" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Inscription...' : 'Sign up'}
            </button>
            <button type="button">Sign up with google</button>
            <p style={{ color: '#241a1aac' }}>
              Vous avez déjà un compte?
              <Link to="/signin">
                <span className="bleu"> Sign in</span>
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
