/**
 * HomePage component renders the main page of the application.
 * It displays a welcome message, a search bar for professions, and buttons for authenticated users.
 *
 * @component
 * @returns {JSX.Element} The rendered HomePage component.
 *
 * @example
 * // Usage example:
 * <HomePage />
 */

/**
 * SearchBar component allows users to search for professionals by selecting a profession from a dropdown.
 *
 * @component
 * @param {SearchBarProps} props - The props for the SearchBar component.
 * @param {User} props.user - The authenticated user object.
 * @returns {JSX.Element} The rendered SearchBar component.
 *
 * @example
 * // Usage example:
 * <SearchBar user={user} />
 */

/**
 * User type represents the structure of the authenticated user object.
 *
 * @typedef {Object} User
 * @property {number} id - The unique identifier of the user.
 * @property {string} email - The email address of the user.
 * @property {string} username - The username of the user.
 * @property {string} role - The role of the user (e.g., 'client').
 * @property {number} iat - The issued at timestamp of the user's token.
 * @property {number} exp - The expiration timestamp of the user's token.
 */

/**
 * SearchBarProps type represents the props for the SearchBar component.
 *
 * @typedef {Object} SearchBarProps
 * @property {User} user - The authenticated user object.
 */
import './HomePage.css'
import Artisans from './artisans/Artisans'
import About from './about/About'
import Footer from './footer/Footer'
import { useState } from 'react'
import { useProfession } from '../../context/ContextProfession'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function HomePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  console.log(user)

  return (
    <div className="home-page">
      <div
        className={
          user == null ? 'herro-section herro-section-min' : 'herro-section'
        }
      >
        {user && (
          <div className="w-full max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Hello,{' '}
              <span className="text-blue-600 capitalize">{user.username}</span>!
              👋
            </h1>
          </div>
        )}
        <h2>Veuillez choisir une profession</h2>
        <SearchBar user={user} />

        {user && user.role === 'client' && (
          <button
            className="project-proposal-button"
            onClick={() => {
              navigate('/project-proposal')
            }}
          >
            ajouter un projet
          </button>
        )}
      </div>
      {user == null ? <About /> : ''}
      {user == null ? <Artisans /> : ''}
      <Footer />
    </div>
  )
}

// Search Bar Component
type User = {
  id: number
  email: string
  username: string
  role: string
  iat: number
  exp: number
}
type SearchBarProps = {
  user: User
}

const SearchBar: React.FC<SearchBarProps> = ({ user }) => {
  // Liste des professions
  const professions = ['électricien', 'plombier', 'peintre']
  const [profession, setProfession] = useState<string>('') // Typage explicite
  const { setSelectedProfession } = useProfession()
  const navigate = useNavigate()

  // Gérer la recherche de la profession
  function handleSearch() {
    if (profession) {
      setSelectedProfession(profession)
      navigate(`/profession/${profession}`) // Redirection
    }
  }

  console.log(user) // Afficher les infos utilisateur dans la console

  return (
    <div className="searchbar">
      <select
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
      >
        <option value="">Choisissez une profession</option>
        {professions.map((prof, index) => (
          <option key={index} value={prof}>
            {prof}
          </option>
        ))}
      </select>
      <button className="searchbarbutton" onClick={handleSearch}>
        Rechercher
      </button>
    </div>
  )
}
