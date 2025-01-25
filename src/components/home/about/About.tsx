import './About.css'
import HomeIcon from '@mui/icons-material/Home'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import EngineeringIcon from '@mui/icons-material/Engineering'
export default function About() {
  return (
    <div className="container">
      <div className="about" id="about">
        <div className="description">
          <div className="description-text">
            <h3>
              {' '}
              <strong>Pourquoi</strong> DZ-estate est la solution fiable ?
            </h3>
          </div>
        </div>
        <div className="about-information grid-container why ">
          <div className="box">
            <h3>Les artisans dont vous avez besoin</h3>
            <p>
              accéder aux artisans disposant des compétences dont vous avez
              besoin. Vous recevez les réponses des artisans intéressés par
              votre projet et choisissez ceux avec qui vous souhaitez échanger.
            </p>
          </div>
          <div className="box">
            <h3>De véritables avis clients</h3>
            <p>
              Grâce à notre système d'évaluations, vous avez accès à de
              véritables avis clients qui vous permettent de choisir de manière
              éclairée, la personne que vous souhaitez engager.
            </p>
          </div>
          <div className="box">
            <h3>Vous avez le contrôle</h3>
            <p>
              Consultez les profils des artisans, l'historique de leurs
              chantiers ainsi que leurs évaluations avant de décider avec qui
              vous souhaitez échanger. Seuls les artisans que vous avez
              sélectionnés peuvent vous contacter.
            </p>
          </div>
        </div>

        <div className="description">
          <div className="description-text">
            <h3>
              <strong>Comment</strong> Ca Marche ?
            </h3>
          </div>
        </div>
        <div className="about-information grid-container how">
          <div className="box">
            <EngineeringIcon style={{ fontSize: '45px' }} />
            <h3>Je Choisi Mon Professionnel</h3>
            <p>Vous sélectionnez les profissionnels</p>
          </div>
          <div className="box">
            <QuestionAnswerIcon style={{ fontSize: '45px' }} />
            <h3>J'explique Mon Projet</h3>
            <p>Expliquer votre projet au profissionnel</p>
          </div>
          <div className="box">
            <HomeIcon style={{ fontSize: '45px' }} />
            <h3>Je Profite de Ma Maison</h3>
            <p>Vous etes satisfait de vos traveaux</p>
          </div>
        </div>
      </div>
    </div>
  )
}
