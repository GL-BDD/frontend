import { useParams } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { useEffect, useState } from 'react'
import './realisation.css'

type Userid = {}
type RealisationProps = {
  user: Userid
}

const Realisation: React.FC<RealisationProps> = ({ user }) => {
  const BASE_URL = import.meta.env.VITE_API_URL
  const { idUtilisateur } = useParams<{ idUtilisateur: string }>()
  const { token } = useAuth()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fonction pour récupérer les projets
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
            Authorization: `Bearer ${token}`,
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
      setProjects(data.projects || [])
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour supprimer un projet
  async function handleDeleteProject(projectId: string) {
    if (!idUtilisateur) {
      setError('Aucun utilisateur spécifié.')
      return
    }

    try {
      const res = await fetch(`${BASE_URL}/api/artisans/project/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const errorMessage = await res.text()
        throw new Error(
          errorMessage || 'Erreur lors de la suppression du projet.',
        )
      }

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId),
      )

      alert('Projet supprimé avec succès.')
      //le nouveau contenue des projets
      await fetchEmployeeProjects()
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la suppression.')
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
              <p>{project.date}</p>
              <strong>Prix :</strong> {project.price} da
              <p>{project.description}</p>
            </p>
            {project.attachments && project.attachments.length > 0 && (
              <>
                {/* <strong>Photos</strong> */}
                <div className="project-image">
                  {/* {project.attachments.map((attachment: string, i: number) => (
                    <div key={i}>
                      <img
                        src={attachment.attachment}
                        alt={`Projet ${index}`}
                        style={{ maxWidth: '200px' }}
                      />
                    </div>
                  ))} */}
                </div>
              </>
            )}
            <div>
              <button
                onClick={() =>
                  handleDeleteProject(project.portfolio_project_id)
                }
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                Supprimer le projet
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Realisation
