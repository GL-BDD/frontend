import { Link } from 'react-router-dom'
import './Artisans.css'
export default function Artisans() {
  return (
    <div className="container">
      <div className="artisans" id="artisans">
        <div className="description">
          <div className="description-text">
            <h3>
              Quels travaux <strong>souhaitez-vous faire</strong> ?
            </h3>
            <p>
              DZ-artisans vous propose des artisans de confiance dans votre
              ville ou à proximité. Grâce à notre portail vous trouverez
              forcément un professionnel qualifié et disponible pour réaliser
              vos travaux.
            </p>
          </div>
        </div>
        <div className="artisans-professions grid-container">
          <Link to="maconnerie" className="card ">
            <a className="child">
              <h4>Maçonnerie</h4>
              <img src="/professions-images/maconnerie.jpg" alt="" />
            </a>
            <p>
              Pour la réalisation de vos fondations et murs, contactez une
              entreprise de maçonnerie
            </p>
          </Link>
          <Link to="electricite" className="card ">
            <a className="child">
              <h4>Électricité</h4>
              <img src="/professions-images/electricite.jpg" alt="" />
            </a>
            <p>
              Pour tous vos travaux d'électricité : conformité du tableau
              électrique, création d'une prise, contactez une entreprise
              spécialisée en électricité !
            </p>
          </Link>
          <Link to="menuiserie" className="card ">
            <a className="child">
              <h4>Menuiserie</h4>
              <img src="/professions-images/menuiserie.jpg" alt="" />
            </a>
            <p>
              Envie de menuiseries en bois, aluminium ou pvc ? Découvrez les
              entreprises de menuiseries !
            </p>
          </Link>
          <Link to="peinture" className="card ">
            <a className="child">
              <h4>Peinture</h4>
              <img src="/professions-images/peinture.jpg" alt="" />
            </a>
            <p>
              Besoin d'embellir vos murs (peinture, papier-peint, etc),
              contactez une entreprise de peinture !
            </p>
          </Link>
          <Link to="plomberie" className="card ">
            <a className="child">
              <h4>Plomberie</h4>
              <img src="/professions-images/plomberie.jpg" alt="" />
            </a>
            <p>
              Envie de rénover votre salle de bain ? Faites appel à une
              entreprise de plomberie !
            </p>
          </Link>
          <Link to="platrerie" className="card ">
            <a className="child">
              <h4>Plâtrerie</h4>
              <img src="/professions-images/platerie.jpg" alt="" />
            </a>
            <p>
              Besoin d'une nouvelle cloison ? Faites appel à une entreprise de
              plâtrerie !
            </p>
          </Link>
          <Link to="architecture" className="card ">
            <a className="child">
              <h4>Architecture</h4>
              <img src="/professions-images/architecrture.jpg" alt="" />
            </a>
            <p>
              Besoin d'un professionnel pour réaliser vos plans d'exécution pour
              votre projet ? Découvrez les entreprises d'architecture.
            </p>
          </Link>
          <Link to="carrelage" className="card">
            <a className="child">
              <h4>Carrelage</h4>
              <img src="/professions-images/carrelage.jpg" alt="" />
            </a>
            <p>
              Pour la pose de carrelage au sol ou mural, pose de parquet, faites
              appel à une entreprise de carrelage !
            </p>
          </Link>
          <Link to="charpente" className="card">
            <a className="child">
              <h4>Charpente</h4>
              <img src="/professions-images/charpente.jpg" alt="" />
            </a>
            <p>
              Envie d'une charpente en bois, traditionnelle ou américaine,
              contactez une entreprise de couverture !
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
