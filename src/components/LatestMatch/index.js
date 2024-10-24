// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    date,
    venue,
    result,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatchDetails

  return (
    <div>
      <ul>
        <li>
          <p>{competingTeam}</p>
          <p>{date}</p>
        </li>
        <li>
          <p>{venue}</p>
          <p>{result}</p>
        </li>
      </ul>
      <img
        alt={`latest match ${latestMatchDetails.competingTeam}`}
        src={latestMatchDetails.competingTeamlogo}
      />
      <div>
        <p>First Innings</p>
        <p>{firstInnings}</p>
        <p>Second Innings</p>
        <p>{secondInnings}</p>
        <p>Man of the Match</p>
        <p>{manOfTheMatch}</p>
        <p>Umpires</p>
        <p>{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
