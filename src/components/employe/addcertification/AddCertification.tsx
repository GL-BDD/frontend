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
  onSuccess?: () => void // Optional callback for when the certification is successfully added
}

const AddCertification: React.FC<AddCertificationProps> = ({ onSuccess }) => {
  const [certificateName, setCertificateName] = useState('')
  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { token } = useAuth() // Récupérer le token utilisateur via le hook
  const BASE_URL = import.meta.env.VITE_API_URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!certificateName || !certificateFile) {
      setErrorMessage('Both the certificate name and file are required.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    const formData = new FormData()
    formData.append('name', certificateName)
    formData.append('pdf', certificateFile)

    try {
      const response = await fetch(`${BASE_URL}/api/artisans/certifications`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le header d'authentification
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload certification.')
      }

      setCertificateName('')
      setCertificateFile(null)
      onSuccess?.()
      alert('Certification added successfully!')
    } catch (error) {
      setErrorMessage(error.message || 'An unknown error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-certification-form">
      <h1>Add Certification</h1>

      {errorMessage && <p>{errorMessage}</p>}

      <div>
        <label htmlFor="certificateName">Nom de Certificat</label>
        <input
          type="text"
          id="certificateName"
          placeholder="le nom de votre certificat"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="certificateFile">PDF du Certificat</label>
        <input
          type="file"
          id="certificateFile"
          accept="application/pdf"
          onChange={(e) => setCertificateFile(e.target.files?.[0] || null)}
          required
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Add Certification'}
      </button>
    </form>
  )
}

export default AddCertification
