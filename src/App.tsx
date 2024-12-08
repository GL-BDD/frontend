import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SingIn from './pages/sing-in-up/SingIn'
import SingUp from './pages/sing-in-up/SingUp'
import HomePage from './components/home/HomePage'
import Employee from './components/employe/Employee'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="singin" element={<SingIn />} />
          <Route path="singup" element={<SingUp />} />
          <Route path="employee" element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
