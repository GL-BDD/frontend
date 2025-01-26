/**
 * The `Artisans` component renders a list of artisan professions with links to their respective pages.
 * Each profession is displayed as a card with an image, title, and description.
 *
 * @component
 * @example
 * return (
 *   <Artisans />
 * )
 *
 * @returns {JSX.Element} A React component that displays a list of artisan professions.
 */
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
          <Link to="/profession/plombier" className="card">
            <div className="child">
              <h4>Plomberie</h4>
              <img src="/images/plomberie.jpg" alt="" />
            </div>
            <p>
              Envie de rénover votre salle de bain ? Faites appel à une
              entreprise de plomberie !
            </p>
          </Link>
          <Link to="" className="card">
            <div className="child">
              <h4>Maçonnerie</h4>
              <img src="/images/maconnerie.jpg" alt="" />
            </div>
            <p>
              Pour la réalisation de vos fondations et murs, contactez une
              entreprise de maçonnerie
            </p>
          </Link>
          <Link to="/profession/electricite" className="card">
            <div className="child">
              <h4>Électricité</h4>
              <img src="/images/electricite.jpg" alt="" />
            </div>
            <p>
              Pour tous vos travaux d'électricité : conformité du tableau
              électrique, création d'une prise, contactez une entreprise
              spécialisée en électricité !
            </p>
          </Link>
          <Link to="" className="card">
            <div className="child">
              <h4>Menuiserie</h4>
              <img src="/images/menuiserie.jpg" alt="" />
            </div>
            <p>
              Envie de menuiseries en bois, aluminium ou pvc ? Découvrez les
              entreprises de menuiseries !
            </p>
          </Link>
          <Link to="/profession/peintre" className="card">
            <div className="child">
              <h4>Peinture</h4>
              <img src="/images/peinture.jpg" alt="" />
            </div>
            <p>
              Besoin d'embellir vos murs (peinture, papier-peint, etc),
              contactez une entreprise de peinture !
            </p>
          </Link>
          <Link to="" className="card">
            <div className="child">
              <h4>Plâtrerie</h4>
              <img src="/images/platerie.jpg" alt="" />
            </div>
            <p>
              Besoin d'une nouvelle cloison ? Faites appel à une entreprise de
              plâtrerie !
            </p>
          </Link>
          <Link to="" className="card">
            <div className="child">
              <h4>Architecture</h4>
              <img src="/images/architecrture.jpg" alt="" />
            </div>
            <p>
              Besoin d'un professionnel pour réaliser vos plans d'exécution pour
              votre projet ? Découvrez les entreprises d'architecture.
            </p>
          </Link>
          <Link to="" className="card">
            <div className="child">
              <h4>Carrelage</h4>
              <img src="/images/carrelage.jpg" alt="" />
            </div>
            <p>
              Pour la pose de carrelage au sol ou mural, pose de parquet, faites
              appel à une entreprise de carrelage !
            </p>
          </Link>
          <Link to="" className="card">
            <div className="child">
              <h4>Charpente</h4>
              <img src="/images/charpente.jpg" alt="" />
            </div>
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
