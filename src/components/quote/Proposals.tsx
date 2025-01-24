import { Link } from 'react-router-dom'

export default function Proposals({proposals}) {
    
  return (
    <div>{proposals.map((proposal) => (
        <Link to={`/project-proposals/${proposal.project_id}`}>
        <div className="proposal">
          <p>{proposal?.description}</p>
          <p>{proposal?.price}</p>
          <p>{proposal?.client_username}</p>
          {!proposal?.attachment ? (
            <p>no attachments</p>
          ) : (
            <img className="proposal-image" src={proposal.attachment} />
          )}
        </div>
        </Link>
      ))}</div>
  )
}
