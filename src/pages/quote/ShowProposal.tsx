import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
const BASE_URL = import.meta.env.VITE_API_URL;
export default function ShowProposal() {
    const [isLoading, setIsLoading] = useState(true);
    const types = ["projet","metre","heure"]
    const [proposal, setProposal] = useState({})
      const [formData, setFormData] = useState({
        prix: 0,
        type: types[0], // Default to the first specialization
      })

    const { proposalId } = useParams()
    const { token } = useAuth()
    const fetchProposal = async (id: string) => {
        setIsLoading(true)
        if(!token) return null
        try {
            const res = await axios.get(`${BASE_URL}/api/projects/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })

            if(res.data) setProposal(res.data.project)
            console.log(res.data)
        } catch (e) {
            console.error(e.message)
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchProposal(proposalId)
    },[token])

    const handleQuoteSubmission = async(e)=>{
        e.preventDefault()
        try{

            const response = await axios.post(
                `${BASE_URL}/api/quotes`,
                {quote:formData.prix,type:formData.type,proposalId:proposal.project_id},
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            console.log(response)
        }catch(error){
            console.error(error)
        }
    }

    const handleChange = async(e)=>{
        const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    }

  return (
    <div>
        {isLoading ?
        (<h1>Data is loading ... ! please wait</h1>)
        :
        <div>
            {proposal &&(
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
                        <input type="number" id="prix" name="prix" required value={formData.prix} onChange={handleChange}/>
                        <label htmlFor="type">pour: </label>
                        <select id="type" name="type" required value={formData.type} onChange={handleChange}>
                          <option value="projet">projet</option>
                          <option value="metre">metre</option>
                          <option value="heure">heure</option>
                        </select>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                </>
            )
            }
        </div>
        }
    </div>
  )
}
