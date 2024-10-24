// Write your code here
const MatchCard = props => {
  const {allMatches} = props
  const {competingTeam, result, matchStatus, competingTeamlogo} = allMatches

  return (
    <li>
      <img alt={`competing team ${competingTeam}`} src={competingTeamlogo} />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
