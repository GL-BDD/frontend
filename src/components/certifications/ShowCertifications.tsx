import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './showcertification.css'
export default function ShowCertifications({ certifications }) {
  const { token } = useAuth() // Récupérer le token pour l'authentification
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const BASE_URL = import.meta.env.VITE_API_URL

  // Fonction pour supprimer un certificat
  async function handleDeleteCertification(certification_id: string) {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${BASE_URL}/api/artisans/certifications/${certification_id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Authentification
          },
        },
      )

      if (!response.ok) {
        const errorMessage = await response.text()
        setLoading(false)
        throw new Error(
          errorMessage || 'Erreur lors de la suppression du certificat.',
        )
      }

      alert('Certificat supprimé avec succès.')
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="showcertifications">
      {certifications &&
        certifications.map((certification) => (
          <div className="certification">
            <p>
              {certification?.certification_name} - {certification?.issue_date}
            </p>
            <div className="certification_image">
              <img src={certification?.attachment} alt="image certification" />
            </div>
            <div className="deletebutton">
              <button
                style={{ backgroundColor: 'red', color: 'white' }}
                onClick={() =>
                  handleDeleteCertification(certification?.certification_id)
                }
              >
                Supprimer le Certificat
              </button>
            </div>
            <br />
          </div>
        ))}
    </div>
  )
}
