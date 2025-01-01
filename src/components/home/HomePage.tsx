import './HomePage.css'
import Artisans from './artisans/Artisans'
import About from './about/About'
import Footer from './footer/Footer'
import { useState } from 'react'
import { useProfession } from '../../context/ContextProfession'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function HomePage() {
  const { user } = useAuth();
  
  return (
    <div className="home-page">
      <div className="herro-section">
        {user && (
          <div className="w-full max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Hello, <span className="text-blue-600 capitalize">{user.email.split('@')[0]}</span>! 👋
            </h1>
          </div>
        )}
        <h2>Veuillez choisir une profession</h2>
        <SearchBar />
      </div>
      <About />
      <Artisans />
      <Footer />
    </div>
  )
}

// Search Bar Component

function SearchBar() {
  //profession liste
  const professions = ['électricien', 'plombier', 'peintre']
  const [profession, setProfession] = useState('')
  const { setSelectedProfession } = useProfession()
  const navigate = useNavigate()
  //handle the search of the profession
  function handleSearch() {
    if (profession) {
      setSelectedProfession(profession)
      navigate(`/profession/${profession}`) // Rediriger
    }
  }

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
