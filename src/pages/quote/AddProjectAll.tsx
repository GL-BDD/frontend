/**
 * AddProject component allows users to add a new project by filling out a form.
 * The form includes fields for description, specialization, images, start date, end date, and price per unit.
 * The component handles form submission, including file uploads, and sends the data to the server.
 *
 * @component
 *
 * @example
 * <AddProject />
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component requires the user to be authenticated. If the user is not authenticated, a message is displayed.
 *
 * @function
 * @name AddProject
 *
 * @typedef {Object} FormData
 * @property {string} description - The description of the project.
 * @property {string} specialization - The specialization required for the project.
 * @property {File[]} images - The images related to the project.
 *
 * @typedef {Object} AuthContext
 * @property {string} token - The authentication token.
 * @property {boolean} isAuthenticated - The authentication status.
 *
 * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e - The change event for form inputs.
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event for file input.
 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
 *
 * @throws {Error} If the project submission fails.
 *
 * @requires useState
 * @requires axios
 * @requires useNavigate
 * @requires useAuth
 * @requires './addprojectall.css'
 */
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './addprojectall.css'
const BASE_URL = import.meta.env.VITE_API_URL

const specializations = ['électricien', 'plombier', 'peintre']
const unite = ['projet', 'metre', 'jour', 'heure']

const AddProject: React.FC = () => {
  const { token, isAuthenticated } = useAuth()

  const [formData, setFormData] = useState({
    description: '',
    specialization: specializations[0], // Default to the first specialization
    start_date: '',
    end_date: '',
    image: '',
    prix : 0,
    unit: unite[0], // Default to the first unit
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('description', formData.description)
      formDataToSend.append('specialization', formData.specialization)
      formDataToSend.append('start_date', formData.datedebut)
      formDataToSend.append('end_date', formData.datefin)
      formDataToSend.append('attachment', formData.image[0])
      formDataToSend.append('price', formData.prix)
      formDataToSend.append('unit', formData.unit)
      const response = await axios.post(
        `${BASE_URL}/api/projects/all`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      console.log('Project added:', response.data)
      navigate('/') // Redirect to home or another page after successful submission
    } catch (err: any) {
      console.error('Error adding project:', err)
      setError('Failed to add project. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  if (!isAuthenticated) {
    return <div>You are not logged in</div>
  }

  return (
    <div className="container ">
      <div className="addprojectall-page">
        <h2>Ajouter Votre Projet</h2>
        <h4>
          Décrivez vos besoins, partagez des photos et laissez nos experts
          s'occuper du reste.
        </h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="description">Entrer votre Description </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="specialization">Choisisser Specialization</label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="images">Ajouter des Images</label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div className="datedebut">
            <label htmlFor="">Date de Début</label>
            <input type="date" id="datadebut" name="datedebut" onChange={handleChange} />
          </div>
          <div className="datefin">
            <label htmlFor="">Date de Fin</label>
            <input type="date" id="datefin" name="datefin" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="prix">Prix par unité</label>
            <select id="prix" name="unit" required onChange={handleChange}>
              {unite.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            <input
              type="number"
              id="prix"
              name="prix"
              placeholder="choisir un prix"
              onChange={handleChange}
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <div className="button">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Envoyer le projet'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddProject
