import  { useEffect,useState } from 'react'
import {useAuth} from '../../context/AuthContext'
import axios from 'axios'
import './quote.css'

const BASE_URL = import.meta.env.VITE_API_URL;


export default function projectProposals() {
    const {user,token}=useAuth()
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
                  'Authorization': `Bearer ${token}`,
                },
              }
          )
          const data = res.data.projects
          setProposalsBySpecialization(data)
          const res2 = await axios.get(
            `${BASE_URL}/api/projects/?artisanId=${user?.id}`,
            {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              }
          )
          const data2 = res2.data.projects
          setProposalsById(data2)
          console.log("fetched successfully",data,data2)
          setLoading(false)
        } catch (e) {
          setLoading(false)
        }
      }
    
      useEffect(() => {
        fetchProposals()
      }, [token])
      if(user && user.role!=='artisan'){
        return (
            <>unauthorized</>
        )
      }
  return (
      <div className="employeespage container grid-container">
        {loading ? (
          <h1>Data is loading ... ! please wait</h1>
        ) : (
          <>
            {proposalsById.length > 0 && (
                <div className='proposals-container'>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Proposals for you
                </h3>
                {proposalsById.map((proposal) => (
                  <div className='proposal'>
                  <p>{proposal?.description}</p>
                  
                    </div>
                ))}
                </div>
            )}
            {proposalsBySpecialization.length > 0 && (
                <div className='proposals-container'>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Proposals by specialization
                </h3>
                {proposalsBySpecialization.map((proposal) => (
                    <div className='proposal'>
                  <p>{proposal?.description}</p>
                  {!proposal?.attachment ?  <p>no attachments</p>:<img className='proposal-image' src={proposal.attachment} />}

                    </div>
                ))}
                </div>
            )}
          </>
        )}
        
      </div>
    )
}
