/**
 * ShowProposal component fetches and displays a proposal based on the proposalId from the URL parameters.
 * It also allows the user to submit a quote for the proposal.
 *
 * @component
 * @example
 * return (
 *   <ShowProposal />
 * )
 *
 * @returns {JSX.Element} The ShowProposal component.
 *
 * @remarks
 * This component uses the `useEffect` hook to fetch the proposal data when the component mounts or when the token changes.
 * It uses the `useState` hook to manage the loading state, proposal data, and form data for the quote submission.
 *
 * @function fetchProposal
 * @param {string} id - The ID of the proposal to fetch.
 * @returns {Promise<void>} A promise that resolves when the proposal data is fetched.
 *
 * @function handleQuoteSubmission
 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
 * @returns {Promise<void>} A promise that resolves when the quote is submitted.
 *
 * @function handleChange
 * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The input change event.
 * @returns {void}
 *
 * @typedef {Object} Proposal
 * @property {string} client_username - The username of the client.
 * @property {string} proposal - The proposal title.
 * @property {string} description - The proposal description.
 *
 * @typedef {Object} FormData
 * @property {number} prix - The price of the quote.
 * @property {string} type - The type of the quote (projet, metre, heure).
 */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
const BASE_URL = import.meta.env.VITE_API_URL
export default function ShowProposal() {
  const [isLoading, setIsLoading] = useState(true)
  const types = ['projet', 'metre', 'heure']
  const [proposal, setProposal] = useState({})
  const [formData, setFormData] = useState({
    prix: 0,
    type: types[0], // Default to the first specialization
  })

  const { proposalId } = useParams()
  const { token } = useAuth()
  const fetchProposal = async (id: string) => {
    setIsLoading(true)
    if (!token) return null
    try {
      const res = await axios.get(`${BASE_URL}/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data) setProposal(res.data.project)
      console.log(res.data)
    } catch (e) {
      console.error(e.message)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchProposal(proposalId)
  }, [token])

  const handleQuoteSubmission = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${BASE_URL}/api/quotes`,
        {
          quote: formData.prix,
          type: formData.type,
          proposalId: proposal.project_id,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = async (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div>
      {isLoading ? (
        <h1>Data is loading ... ! please wait</h1>
      ) : (
        <div>
          {proposal && (
            <>
              <div>
                <h1>{proposal?.client_username}</h1>
                <h2>{proposal?.proposal}</h2>
                <p>{proposal?.description}</p>
              </div>
              <div>
                <form onSubmit={handleQuoteSubmission}>
                  <h2>ajouter une quotation</h2>
                  <label htmlFor="prix">prix: </label>
                  <input
                    type="number"
                    id="prix"
                    name="prix"
                    required
                    value={formData.prix}
                    onChange={handleChange}
                  />
                  <label htmlFor="type">pour: </label>
                  <select
                    id="type"
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="projet">projet</option>
                    <option value="metre">metre</option>
                    <option value="heure">heure</option>
                  </select>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
