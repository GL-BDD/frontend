/**
 * The main application component that sets up the routing for the application.
 * It uses `BrowserRouter` from `react-router-dom` to handle client-side routing.
 * The application is wrapped with `AuthProvider` and `ProfessionProvider` to provide
 * authentication and profession context to the entire app.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 *
 * Routes:
 * - `/` - Renders the `HomePage` component.
 * - `/profession/:profession` - Renders the `EmployeesPage` component.
 * - `/profession/:profession/:idUtilisateur` - Renders the `Employee` component.
 * - `/singin` - Renders the `SingIn` component.
 * - `/singup` - Renders the `SingUp` component.
 * - `/project-proposal` - Renders the `AddProjectAll` component.
 * - `/project-proposal/:artisanId` - Renders the `AddProjectArtisan` component.
 * - `/project-proposals` - Renders the `ProjectProposals` component.
 * - `/project-proposals/:proposalId` - Renders the `ShowProposal` component.
 */
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
import ArtisanDashboard from './pages/ArtisanDashboard'

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
            <Route
              path="/project-proposals/:proposalId"
              element={<ShowProposal />}
            />
            <Route path="/project-proposals/:proposalId" element={<ShowProposal />} />
            <Route path="/artisan-dashboard" element={<ArtisanDashboard />} />
          </Routes>
        </ProfessionProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
export default App
