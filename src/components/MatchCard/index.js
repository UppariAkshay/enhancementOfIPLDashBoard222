// Write your code here
const MatchCard = props => {
  const {allMatches} = props
  const {competingTeam, result, matchStatus} = allMatches

  return (
    <li>
      <img
        alt={`competing team ${allMatches.competingTeam}`}
        src={allMatches.competingTeamLogo}
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
