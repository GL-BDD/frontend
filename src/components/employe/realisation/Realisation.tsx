import { useParams } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { useEffect, useState } from 'react'
import './realisation.css'
type Userid = {}
type RealisationrProps = {
  user: Userid
}

const Realisation: React.FC<RealisationrProps> = ({ user }) => {
  const BASE_URL = import.meta.env.VITE_API_URL
  const { idUtilisateur } = useParams<{ idUtilisateur: string }>()
  const { token } = useAuth()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchEmployeeProjects() {
    if (!idUtilisateur) {
      setError('Aucun utilisateur spécifié.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `${BASE_URL}/api/artisans/project/${idUtilisateur}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Token pour l'authentification
          },
        },
      )

      if (!res.ok) {
        const errorMessage = await res.text()
        throw new Error(
          errorMessage || 'Erreur lors de la récupération des projets.',
        )
      }

      const data = await res.json()
      setProjects(data.projects || []) // Assurez-vous que la réponse contient bien un tableau `projects`
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployeeProjects()
  }, [idUtilisateur])

  if (loading) return <p>Chargement des projets...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (projects.length === 0) return <p>Aucun projet trouvé.</p>

  return (
    <div>
      <div className="realisation-container">
        {projects.map((project, index) => (
          <div key={index} className="project">
            <p>
              <strong>Prix :</strong> {project.price} €
            </p>
            {project.attachments && project.attachments.length > 0 && (
              <>
                <strong>Photos</strong>
                <div className="project-image">
                  {project.attachments.map((attachment: string, i: number) => (
                    <div key={i}>
                      <img
                        src={`${BASE_URL}/uploads/${attachment}`}
                        alt={`Projet ${index}`}
                        style={{ maxWidth: '200px' }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
            <div>
              <button>Supprimer le projet</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Realisation
