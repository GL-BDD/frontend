/**
 * Component for adding a certification.
 *
 * @component
 * @example
 * return (
 *   <AddCertification onSuccess={() => console.log('Certification added!')} />
 * )
 *
 * @param {Object} props - Component props
 * @param {Function} [props.onSuccess] - Optional callback for when the certification is successfully added
 *
 * @returns {JSX.Element} The rendered component
 *
 * @remarks
 * This component allows users to add a certification by providing a name and a PDF file.
 * It uses the `useAuth` hook to retrieve the user's token for authentication.
 * The form data is submitted to the API endpoint specified in the environment variable `VITE_API_URL`.
 *
 * @throws {Error} If the API request fails, an error message is displayed.
 */
import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import './addcertification.css'

interface AddCertificationProps {
  onSuccess?: () => void // Callback facultatif pour signaler le succès
}

const AddCertification: React.FC<AddCertificationProps> = ({ onSuccess }) => {
  const [certificateName, setCertificateName] = useState('')
  const [certificateDate, setCertificateDate] = useState('')
  const [attachments, setAttachments] = useState<File[]>([]) // Pour gérer plusieurs fichiers
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuth()
  const BASE_URL = import.meta.env.VITE_API_URL

  // Gestion des fichiers uploadés
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files)) // Convertir FileList en tableau
    }
  }

  // Validation des fichiers (format et taille)
  const validateFiles = (): boolean => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg']
    for (const file of attachments) {
      if (!validImageTypes.includes(file.type)) {
        setError(
          'Tous les fichiers doivent être des images (JPEG, JPG ou PNG).',
        )
        return false
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Chaque fichier ne doit pas dépasser 5 Mo.')
        return false
      }
    }
    return true
  }

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation des champs
    if (!certificateName || !certificateDate || attachments.length === 0) {
      setError('Veuillez remplir tous les champs !')
      return
    }

    if (!validateFiles()) return // Stop si les fichiers ne sont pas valides

    if (!token) {
      setError('Token manquant. Veuillez vous connecter.')
      return
    }

    setError(null)
    setSuccess(null)
    setLoading(true)

    const formData = new FormData()
    formData.append('certification_name', certificateName)
    formData.append('issue_date', certificateDate)
    attachments.forEach((file) => formData.append('attachment', file)) // Ajouter chaque fichier
    console.log(formData)
    try {
      const response = await fetch(`${BASE_URL}/api/artisans/certifications`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
      }

      // Réinitialiser les champs après succès
      setCertificateName('')
      setCertificateDate('')
      setAttachments([])
      setSuccess('Certification ajoutée avec succès !')
      onSuccess?.()
    } catch (error: any) {
      setError(error.message || 'Une erreur inconnue est survenue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-certification-form">
      <h1>Ajouter une Certification</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <div>
        <label htmlFor="certificateName">Nom du Certificat</label>
        <input
          type="text"
          id="certificateName"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="certificateDate">Date du Certificat</label>
        <input
          type="date"
          id="certificateDate"
          value={certificateDate}
          onChange={(e) => setCertificateDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="attachments">Images du Certificat</label>
        <input
          type="file"
          id="attachments"
          accept="image/*"
          multiple // Permettre plusieurs fichiers
          onChange={handleFileChange}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Envoi en cours...' : 'Ajouter la Certification'}
      </button>
    </form>
  )
}

export default AddCertification
