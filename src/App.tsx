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
import AddProject from './pages/quote/AddProject'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProfessionProvider>
        <BrowserRouter>
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
            <Route path="/project-proposal" element={<AddProject />} />
          </Routes>
        </BrowserRouter>
      </ProfessionProvider>
    </AuthProvider>
  )
}

export default App
