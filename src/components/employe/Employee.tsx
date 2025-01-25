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

const BASE_URL = import.meta.env.VITE_API_URL

export default function Employee() {
  const { idUtilisateur } = useParams()
  interface Employee {
    username?: string
    specialization?: string
    phonenumber?: string
    email?: string
  }

  const [employee, setEmployee] = useState<Employee>({})
  const [certifications, setCertifications] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
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
  const fetchCertifications = async()=>{
    try {
      setLoading(true)
      const res = await fetch(`${BASE_URL}/api/artisans/certifications/${idUtilisateur}`)
      const data = await res.json()
      setCertifications(data.certifications)
      console.log(data.certifications)      
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchEmployeeByID();
    fetchCertifications();
  }, [idUtilisateur])

  const handleButtonClick = () => {
    console.log('button clicked')
    navigate(`/project-proposal/${idUtilisateur}`)
  }

  return (
    <div className="container employepage">
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
                <p>
                  specialization :{employee.specialization}
                </p>
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
            </div>
          </div>

          <div className="employeepage__presentation">
            <h2>Présentation</h2>
            <p>
              Électricien qualifié pour vos installations, dépannages, mises aux
              normes électriques et climatisation. <br />
              <br />
              Je propose une large gamme de services, dont : <br />-
              Installation électrique complète (neuve ou rénovation) <br />-
              Dépannage et maintenance <br />- Mise aux normes de vos
              installations électriques
              <br />- Installation de domotique <br />- Motorisation portail et
              visiophonie <br />- Pose et dépannage de climatisation ( agrée
              pour la manipulation fluides frigorigènes ) <br />
              ... et bien plus encore !
              <br />
              <br />
              Je suis disponible pour les particuliers, les professionnels et
              les collectivités. <br />
              <br />
              N'hésitez pas à me contacter pour un devis. Mots-clés :
              électricien, dépannage électrique, installation électrique, mise
              aux normes électriques, domotique, climatisation."
            </p>
          </div>
          <div className="employeepage__realisation">
            <div className="employeepage__realisation_header">
              <h2>Réalisation</h2>
              <p className="ptoggle" onClick={() => handleToggle()}>
                {toggle ? '-' : '+'}
              </p>
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
            <h2>Cértification</h2>
            {user?.role == 'artisan' ? <AddCertification /> : ''}
          <ShowCertifications certifications={certifications}/>
          </div>
        </>
      )}
    </div>
  )
}
