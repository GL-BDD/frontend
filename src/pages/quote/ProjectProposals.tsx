/**
 * Component that fetches and displays project proposals for an artisan user.
 *
 * This component fetches proposals based on the user's specialization and ID,
 * and displays them in separate sections. If the user is not an artisan, an
 * unauthorized message is shown.
 *
 * @component
 * @example
 * return (
 *   <ProjectProposals />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * - Uses `useAuth` to get the current user and token.
 * - Fetches proposals from the API using `axios`.
 * - Displays loading state while fetching data.
 * - Displays proposals in two sections: by specialization and by user ID.
 *
 * @function fetchProposals
 * Fetches proposals from the API based on the user's specialization and ID.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the data is fetched.
 *
 * @throws Will set loading to false if an error occurs during the fetch.
 *
 * @hook useEffect
 * Fetches proposals when the component mounts or when the token changes.
 *
 * @state {Array} proposalsById - Proposals fetched based on the user's ID.
 * @state {Array} proposalsBySpecialization - Proposals fetched based on the user's specialization.
 * @state {boolean} loading - Indicates whether the data is currently being fetched.
 */
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import './quote.css'
import Proposals from '../../components/quote/Proposals'
const BASE_URL = import.meta.env.VITE_API_URL

export default function projectProposals() {
  const { user, token } = useAuth()
  const [proposalsById, setProposalsById] = useState([])
  const [proposalsBySpecialization, setProposalsBySpecialization] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchProposals() {
    try {
      setLoading(true)
      const res = await axios.get(
        `${BASE_URL}/api/projects/?specialization=${user?.specialization}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const data = res.data.projects
      setProposalsBySpecialization(data)
      const res2 = await axios.get(
        `${BASE_URL}/api/projects/?artisanId=${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const data2 = res2.data.projects
      setProposalsById(data2)
      console.log('fetched successfully', data, data2)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProposals()
  }, [token])
  if (user && user.role !== 'artisan') {
    return <>unauthorized</>
  }
  return (
    <div className="employeespage container grid-container">
      {loading ? (
        <h1>Data is loading ... ! please wait</h1>
      ) : (
        <>
          {proposalsById.length > 0 && (
            <div className="proposals-container">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Proposals for you
              </h3>
              {proposalsById.map((proposal) => (
                <div className="proposal">
                  <p>{proposal?.description}</p>
                </div>
              ))}
            </div>
          )}
          {proposalsBySpecialization.length > 0 && (
            <div className="proposals-container">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Proposals by specialization
              </h3>
              <Proposals proposals={proposalsBySpecialization} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
