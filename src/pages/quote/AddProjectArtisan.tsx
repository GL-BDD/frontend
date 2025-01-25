/**
 * AddProjectArtisan component allows users to submit a project request by providing
 * a description, images, start and end dates, and price per unit.
 *
 * @component
 * @example
 * return (
 *   <AddProjectArtisan />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component uses the `useParams` hook to get the artisan ID from the URL,
 * the `useAuth` hook to get authentication information, and the `useNavigate` hook
 * to navigate to different routes.
 *
 * @function
 * @name AddProjectArtisan
 *
 * @requires useState
 * @requires useParams
 * @requires useNavigate
 * @requires axios
 * @requires useAuth
 *
 * @constant {string} BASE_URL - The base URL for the API.
 * @constant {string[]} specializations - List of specializations.
 * @constant {string[]} unite - List of units for pricing.
 *
 * @param {Object} formData - The form data containing description and images.
 * @param {string} formData.description - The description of the project.
 * @param {File[]} formData.images - The images of the project.
 * @param {string} error - The error message if the project submission fails.
 * @param {boolean} isLoading - The loading state of the form submission.
 *
 * @event handleChange - Handles changes to the input fields.
 * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e - The change event.
 *
 * @event handleFileChange - Handles changes to the file input field.
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
 *
 * @event handleSubmit - Handles the form submission.
 * @param {React.FormEvent<HTMLFormElement>} e - The form event.
 *
 * @throws Will throw an error if the project submission fails.
 *
 * @returns {JSX.Element} The rendered component.
 */
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
const BASE_URL = import.meta.env.VITE_API_URL

import './addprojectartisan.css'
const specializations = ['électricien', 'plombier', 'peintre']
const unite = ['Projet Complet', 'Par mètre', 'Par jour', 'Par heure']
export default function AddProjectArtisan() {
  const { artisanId } = useParams()
  const { token, isAuthenticated } = useAuth()

  const [formData, setFormData] = useState({
    description: '',
    images: [] as File[],
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
        images: Array.from(e.target.files),
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
      formDataToSend.append('artisan_id', artisanId)
      formData.images.forEach((image) => {
        formDataToSend.append('images', image)
      })
      const response = await axios.post(
        `${BASE_URL}/api/projects`,
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
    <div className="container">
      <div className="addprojectartisan-page">
        <h2>Demander Un devis</h2>
        <h4>
          Pour demander un devis veuillez envoyer des informations et des images
          sur votre projet
        </h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="images">Images</label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div className="datedebut">
            <label htmlFor="datedebut">Date de Début</label>
            <input type="date" id="datadebut" name="datedebut" />
          </div>
          <div className="datefin">
            <label htmlFor="datefin">Date de Fin</label>
            <input type="date" id="datefin" name="datefin" />
          </div>
          <div>
            <label htmlFor="prix">Prix par unité</label>
            <select id="prix" name="prix" required>
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
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <div className="button">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Add Project'}
          </button>
        </div>
      </div>
    </div>
  )
}
