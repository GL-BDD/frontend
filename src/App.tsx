import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SingIn from './pages/sing-in-up/SingIn'
import SingUp from './pages/sing-in-up/SingUp'
import HomePage from './components/home/HomePage'
import Employee from './components/employe/Employee'
import NavBar from './components/navbar/NavBar'
import EmployeesPage from './components/Employeespage/EmployeesPage'
import { ProfessionProvider } from './context/ContextProfession'
import { AuthProvider } from './context/AuthContext'
import AddProjectAll from './pages/quote/AddProjectAll'
import AddProjectArtisan from './pages/quote/AddProjectArtisan'
import ProjectProposals from './pages/quote/ProjectProposals'
import ArtisanProfile from './pages/artisan/ArtisanProfile'
import ShowProposal from './pages/quote/ShowProposal'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProfessionProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profession/:profession" element={<EmployeesPage />} />
            <Route
              path="/profession/:profession/:idUtilisateur"
              element={<Employee />}
            />
            <Route path="/singin" element={<SingIn />} />
            <Route path="/singup" element={<SingUp />} />
            <Route path="/project-proposal" element={<AddProjectAll />} />
            <Route
              path="/project-proposal/:artisanId"
              element={<AddProjectArtisan />}
            />
            <Route path="/project-proposals" element={<ProjectProposals />} />
            <Route path="/project-proposals/:proposalId" element={<ShowProposal />} />
          </Routes>
        </ProfessionProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
export default App
