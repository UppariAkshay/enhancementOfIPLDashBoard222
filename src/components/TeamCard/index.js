// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, teamImageUrl} = teamDetails

  return (
    <li className="teamCardLi">
      <Link to={`/team-matches/${id}`}>
        <img alt={name} style={{height: '200px'}} src={teamImageUrl} />
        <p>{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
