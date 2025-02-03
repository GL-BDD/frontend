/**
 * Employee component fetches and displays employee details based on the user ID from the URL.
 * It also provides options to contact the employee or request a project proposal.
 *
 * @component
 * @returns {JSX.Element} The rendered Employee component.
 *
 * @example
 * <Employee />
 *
 * @remarks
 * This component uses several hooks:
 * - `useParams` to get the user ID from the URL.
 * - `useState` to manage employee data, loading state, and toggle state.
 * - `useEffect` to fetch employee data when the component mounts or the user ID changes.
 * - `useNavigate` to navigate to the project proposal page.
 * - `useAuth` to get the current authenticated user.
 *
 * @function fetchEmployeeByID
 * Fetches employee data by user ID from the API.
 *
 * @function handleButtonClick
 * Handles the button click event to navigate to the project proposal page.
 *
 * @function handleToggle
 * Toggles the visibility of the realization section.
 *
 * @typedef {Object} Userid
 * Represents the user ID type.
 *
 * @typedef {Object} RealisationrProps
 * @property {Userid} user - The user object.
 *
 * @component
 * @param {RealisationrProps} props - The props for the Realisation component.
 * @returns {JSX.Element} The rendered Realisation component.
 *
 * @example
 * <Realisation user={user} />
 *
 * @remarks
 * This component fetches and displays the projects of an employee.
 * It uses several hooks:
 * - `useParams` to get the user ID from the URL.
 * - `useState` to manage projects data, loading state, and error state.
 * - `useEffect` to fetch projects data when the component mounts or the user ID changes.
 * - `useAuth` to get the current authenticated user and token.
 *
 * @function fetchEmployeeProjects
 * Fetches projects data by user ID from the API.
 *
 * @component
 * @returns {JSX.Element} The rendered AddProjectForm component.
 *
 * @example
 * <AddProjectForm />
 *
 * @remarks
 * This component provides a form to add a new project.
 * It uses several hooks:
 * - `useState` to manage form data, loading state, success message, and error message.
 * - `useAuth` to get the current authenticated user and token.
 *
 * @function handleFileChange
 * Handles the file input change event to update the attachments state.
 *
 * @function handleSubmit
 * Handles the form submission to add a new project.
 */
import './Employee.css'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import PlaceIcon from '@mui/icons-material/Place'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AddCertification from './addcertification/AddCertification'
import Realisation from './realisation/Realisation'
import AddProjectForm from './addproject/AddProjectForm'
import ShowCertifications from '../../components/certifications/ShowCertifications'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export default function Employee() {
  const { idUtilisateur } = useParams()
  interface Employee {
    username?: string
    specialization?: string
    phonenumber?: string
    email?: string
    description?: string
  }

  const [employee, setEmployee] = useState<Employee>({})
  const [certifications, setCertifications] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { user, token } = useAuth()

  const [toggle, setToggle] = useState(false)
  const [toggleC, setToggleC] = useState(false)

  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [updateFormData, setUpdateFormData] = useState({
    username: '',
    specialization: '',
    email: '',
    phone_number: '',
    description: ''
  })

  const handleToggle = () => {
    setToggle(!toggle)
  }
  const handleToggleC = () => {
    setToggleC(!toggleC)
  }

  async function fetchEmployeeByID() {
    try {
      setLoading(true)
      const res = await fetch(`${BASE_URL}/api/artisans/${idUtilisateur}`)
      const data = await res.json()
      setEmployee(data.artisan)
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }
  const fetchCertifications = async () => {
    try {
      setLoading(true)
      const res = await fetch(
        `${BASE_URL}/api/artisans/certifications/${idUtilisateur}`,
      )
      const data = await res.json()
      setCertifications(data.certifications)
      console.log(data.certifications)
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchEmployeeByID()
    fetchCertifications()
  }, [idUtilisateur])

  const handleButtonClick = () => {
    console.log('button clicked')
    navigate(`/project-proposal/${idUtilisateur}`)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const updatedData = {
        username: updateFormData.username,
        specialization: employee.specialization,
        email: employee.email,
        phone_number: updateFormData.phone_number,
        description: updateFormData.description
      }

      const response = await axios.put(
        `${BASE_URL}/api/artisans`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if (response.status === 200) {
        setShowUpdateForm(false)
        fetchEmployeeByID()
      }
    } catch (error) {
      console.error('Error updating employee:', error)
    }
  }

  return (
    <div className="container employepage">
      {console.log("User role:", user?.role)}
      {user?.role === 'artisan' && (
        <>
          {showUpdateForm && (
            <div className="yahya_modal-overlay">
              <div className="yahya_modal-container">
                <div className="yahya_modal-header">
                  <h1 className="yahya_modal-title">Update Profile</h1>
                  <button 
                    onClick={() => setShowUpdateForm(false)}
                    className="yahya_close-button"
                  >
                    ×
                  </button>
                </div>
                
                <form onSubmit={handleUpdate}>
                  <div className="yahya_form-group">
                    <label className="yahya_form-label">Username</label>
                    <input
                      type="text"
                      placeholder="Enter username"
                      value={updateFormData.username}
                      onChange={(e) => setUpdateFormData({...updateFormData, username: e.target.value})}
                      className="yahya_form-input"
                    />
                  </div>

                  <div className="yahya_form-group">
                    <label className="yahya_form-label">Phone Number</label>
                    <input
                      type="text"
                      placeholder="Enter phone number"
                      value={updateFormData.phone_number}
                      onChange={(e) => setUpdateFormData({...updateFormData, phone_number: e.target.value})}
                      className="yahya_form-input"
                    />
                  </div>

                  <div className="yahya_form-group">
                    <label className="yahya_form-label">Description</label>
                    <textarea
                      placeholder="Enter description"
                      value={updateFormData.description}
                      onChange={(e) => setUpdateFormData({...updateFormData, description: e.target.value})}
                      className="yahya_form-input yahya_form-textarea"
                    />
                  </div>

                  <div className="yahya_form-actions">
                    <button
                      type="button"
                      onClick={() => setShowUpdateForm(false)}
                      className="yahya_button yahya_button-cancel"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="yahya_button yahya_button-submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}

      {loading ? (
        <h2>Data is Loading ...</h2>
      ) : (
        <>
          <div className="employeepage__information">
            <div className="employee--image">
              {employee.username?.charAt(0)}
            </div>
            <div className="employee--details">
              <div>
                <h3>{employee.username}</h3>
                <p>specialization :{employee.specialization}</p>
                <p>disponible</p>
              </div>
            </div>
            <div className="employeepage--contact">
              <div>
                <LocalPhoneIcon style={{ fontSize: '20px' }} />{' '}
                <p>{employee.phone_number}</p>
              </div>
              <div>
                <PlaceIcon style={{ fontSize: '20px' }} />
                <p>Algerie</p>
              </div>
              <div>
                <EmailIcon style={{ fontSize: '20px' }} />
                <p>{employee.email}</p>
              </div>
            </div>
            <div className="employeepage--chat">
              <button
                onClick={handleButtonClick}
                className="chat"
                disabled={user?.role == 'artisan'}
              >
                Demander un Devis
              </button>
              <p className="chat">Contacter</p>
              {user && user.role == 'artisan' && user.id == idUtilisateur && (
                <button
                  onClick={() => {
                    setUpdateFormData({
                      username: employee.username || '',
                      specialization: employee.specialization || '',
                      email: employee.email || '',
                      phone_number: employee.phonenumber || '',
                      description: employee.description || ''
                    })
                    setShowUpdateForm(true)
                  }}
                  className="chat"
                >
                  Update Profile
                </button>
              )}
            </div>
          </div>

          <div className="employeepage__presentation">
            <h2>Présentation</h2>
            <p>{employee.description}</p>
          </div>
          <div className="employeepage__realisation">
            <div className="employeepage__realisation_header">
              <h2>Réalisation</h2>
              {user && <p className="ptoggle" onClick={() => handleToggle()}>
                {toggle ? '-' : '+'}
              </p>}
              
            </div>
            {toggle ? (
              <div className="employeepage__realisation_header_realisation">
                {user?.role == 'artisan' ? (
                  <>
                    <Realisation user={{}} />
                    <AddProjectForm />
                  </>
                ) : (
                  <Realisation user={{}} />
                )}
              </div>
            ) : (
              ''
            )}
          </div>

          <div className="employeepage__certification">
            <div className="employeepage__certification__header">
              <h2>Cértification</h2>
              {user && (
                <p className="ptoggle" onClick={() => handleToggleC()}>
                  {toggleC ? '-' : '+'}
                </p>
              )}
            </div>
            {toggleC ? (
              <>
                <ShowCertifications certifications={certifications} setCertifications={setCertifications} />
                {user?.role == 'artisan' ? <AddCertification setCertifications={setCertifications} /> : ''}
              </>
            ) : (
              ''
            )}
          </div>
        </>
      )}
    </div>
  )
}
