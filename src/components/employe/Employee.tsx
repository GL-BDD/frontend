// import { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
import './Employee.css'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import PlaceIcon from '@mui/icons-material/Place'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
const BASE_URL = import.meta.env.VITE_API_URL

export default function Employee() {
  const { idUtilisateur } = useParams()
  const [employee, setEmployee] = useState({})
  const [loading, setLoading] = useState(false)

  async function fetchEmployeeByID() {
    try {
      setLoading(true)
      const res = await fetch(
        `${BASE_URL}/api/artisans/${idUtilisateur}`,
      )
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

  const imageEmployee =
    'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'

  return (
    <div className="container employepage">
      {loading ? (
        <h2>Data is Loading ...</h2>
      ) : (
        <>
          <div className="employeepage__information">
            <div className="employee--image">
              <img src={imageEmployee} alt="" />
            </div>
            <div className="employee--details">
              <div>
                <h3>{employee.username}</h3>
                <p>
                  {employee.specialization} :{employee.specialization}
                </p>
                <p
                // className={`${employee.disponibilite ? 'disponible' : 'non-disponible'}`}
                >
                  {/* {employee.disponibilite ? 'disponible' : 'non displonible'} */}
                  disponible
                </p>
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
              <p className="chat">Demander un Devis</p>
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
            <h2>Réalisation</h2>
            {/* <ImageList variant="masonry" cols={3} gap={8}>
          {employee.realisation.realisationImage.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar position="below" title={item.author} />
            </ImageListItem>
          ))}
        </ImageList> */}
          </div>
          <div className="employeepage__certification">
            <h2>Cértification</h2>
          </div>
        </>
      )}
    </div>
  )
}
