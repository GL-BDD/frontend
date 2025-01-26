/**
 * AddProjectForm component allows users to add a new project with a price and attachments.
 * It handles form submission, file uploads, and displays success or error messages.
 *
 * @component
 * @example
 * return (
 *   <AddProjectForm />
 * )
 *
 * @returns {JSX.Element} The rendered AddProjectForm component.
 *
 * @remarks
 * This component uses the `useAuth` hook to retrieve the user's token for authorization.
 * It also uses the `useState` hook to manage form state, including price, attachments, loading state, success, and error messages.
 *
 * @function handleFileChange
 * Handles the change event for the file input, converting the FileList to an array and updating the attachments state.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the file input.
 *
 * @function handleSubmit
 * Handles the form submission, validating the input, sending a POST request to the server, and updating the state based on the response.
 *
 * @param {React.FormEvent} e - The form submission event.
 *
 * @constant {string} BASE_URL - The base URL for the API, retrieved from environment variables.
 * @constant {string} token - The user's token, retrieved from the `useAuth` hook.
 * @constant {number | ''} price - The price of the project, managed by the `useState` hook.
 * @constant {File[]} attachments - The list of uploaded files, managed by the `useState` hook.
 * @constant {boolean} loading - The loading state, managed by the `useState` hook.
 * @constant {string | null} success - The success message, managed by the `useState` hook.
 * @constant {string | null} error - The error message, managed by the `useState` hook.
 */
import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import './addprojectfrom.css'
const AddProjectForm: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_API_URL // URL de base définie dans l'environnement
  const { token } = useAuth() // Récupérer le token utilisateur via le hook
  const [price, setPrice] = useState<number | ''>('')
  const [attachments, setAttachments] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Gestion des fichiers uploadés
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files)) // Convertir FileList en tableau
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!price || attachments.length === 0) {
      setError('Veuillez remplir tous les champs !')
      return
    }

    const formData = new FormData()
    formData.append('price', price.toString())
    attachments.forEach((file) => formData.append('attachments', file)) // Ajouter chaque fichier

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(`${BASE_URL}/api/artisans/project`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage || "Erreur lors de l'ajout du projet")
      }

      const data = await response.json()
      setSuccess('Projet ajouté avec succès !')
      setPrice('')
      setAttachments([])
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-project-form">
      <h2>Ajouter un projet réalisé</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="price">Prix du projet :</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Entrez le prix du projet"
          />
        </div>
        <div>
          <label htmlFor="attachments">Photos du projet :</label>
          <input
            type="file"
            id="attachments"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Ajout en cours...' : 'Ajouter le projet'}
          </button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  )
}

export default AddProjectForm
