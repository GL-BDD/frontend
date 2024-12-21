// import { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
import './Employee.css'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import PlaceIcon from '@mui/icons-material/Place'
// import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'

export default function Employee() {
  //   const { param1,parm2,param3 } = useParams();
  // //   const [getEmployee,currentEmployee] = useEmployee()
  //   useEffect(() => {
  //     getEmployee(id)
  //   }, [id, currentEmployee])

  const imageEmployee =
    'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'

  const employee = {
    name: 'Ali Electricien',
    email: 'ar.@gmail.com',
    profession: 'Electricien',
    specialite: 'climatisation',
    phonenumber: '01254886',
    adress: 'bejaia amizour klsz ..ezop ',
    disponibilite: true,
    realisation: {
      realisationName: 'Panne de quelque chose',
      realisationImage: { image: { url: '', title: '' } },
    },
    certification: '',
    employeeImage: '',
  }

  return (
    <div className="container employepage">
      <div className="employeepage__information">
        <div className="employee--image">
          <img src={imageEmployee} alt="" />
        </div>
        <div className="employee--details">
          <div>
            <h3>{employee.name}</h3>
            <p>
              {employee.profession} : {employee.specialite}
            </p>
            <p
              className={`${employee.disponibilite ? 'disponible' : 'non-disponible'}`}
            >
              {employee.disponibilite ? 'disponible' : 'non displonible'}
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
            <p>{employee.adress}</p>
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
    </div>
  )
}
