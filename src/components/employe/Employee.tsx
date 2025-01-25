// import { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
import './Employee.css'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import PlaceIcon from '@mui/icons-material/Place'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const BASE_URL = import.meta.env.VITE_API_URL

export default function Employee() {
  const { idUtilisateur } = useParams()
  const [employee, setEmployee] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }

  async function fetchEmployeeByID() {
    try {
      setLoading(true)
      const res = await fetch(`${BASE_URL}/api/artisans/${idUtilisateur}`)
      const data = await res.json()
      setLoading(false)
      setEmployee(data.artisan)
    } catch (e) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployeeByID()
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
                  {employee.specialization} :{employee.specialization}
                </p>
                <p>disponible</p>
              </div>
            </div>
            <div className="employeepage--contact">
              <div>
                <LocalPhoneIcon style={{ fontSize: '20px' }} />{' '}
                <p>{employee.phonenumber}</p>
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
              <button onClick={handleButtonClick} className="chat">
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
                +
              </p>
            </div>
            {toggle ? (
              <div className="employeepage__realisation_header_realisation">
                <Realisation />
              </div>
            ) : (
              ''
            )}
          </div>

          <div className="employeepage__certification">
            <h2>Cértification</h2>
          </div>
        </>
      )}
    </div>
  )
}

type Userid = {}
type RealisationrProps = {
  user: Userid
}

const Realisation: React.FC<RealisationrProps> = ({ user }) => {
  const BASE_URL = import.meta.env.VITE_API_URL
  const { idUtilisateur } = useParams()
  const [project, setProject] = useState({})
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()

  async function fetchEmployeeProject() {
    try {
      setLoading(true)
      const res = await fetch(
        `${BASE_URL}/api/artisans/project/${idUtilisateur}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const data = await res.json()
      console.log('projet : ', data)
      setLoading(false)
      setProject(data.projects)
    } catch (e) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployeeProject()
  }, [idUtilisateur])
  return (
    <>
      <p>
        Électricien qualifié pour vos installations, dépannages, mises aux
        normes électriques et climatisation. <br />
        <br />
        Je propose une large gamme de services, dont : <br />- Installation
        électrique complète (neuve ou rénovation) <br />- Dépannage et
        maintenance <br />- Mise aux normes de vos installations électriques
        <br />- Installation de domotique <br />- Motorisation portail et
        visiophonie <br />- Pose et dépannage de climatisation ( agrée pour la
        manipulation fluides frigorigènes ) <br />
        ... et bien plus encore !
        <br />
        <br />
        Je suis disponible pour les particuliers, les professionnels et les
        collectivités. <br />
        <br />
        N'hésitez pas à me contacter pour un devis. Mots-clés : électricien,
        dépannage électrique, installation électrique, mise aux normes
        électriques, domotique, climatisation."
      </p>
    </>
  )
}
