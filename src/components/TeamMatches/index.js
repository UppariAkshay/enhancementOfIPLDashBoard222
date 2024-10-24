// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import Piechart from '../Piechart'
import './index.css'

class TeamMatches extends Component {
  state = {isLoading: true, teamInfo: {}}

  componentDidMount() {
    this.fetchTeamMatches()
  }

  fetchTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    console.log(data)

    const dataInCamelCase = {
      team_banner_url: data.team_banner_url,
      latestMatchDetails: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamlogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(eachData => ({
        umpires: eachData.umpires,
        result: eachData.result,
        manOfTheMatch: eachData.man_of_the_match,
        id: eachData.id,
        date: eachData.date,
        venue: eachData.venue,
        competingTeam: eachData.competing_team,
        competing_team_logo: eachData.competing_team_logo,
        firstInnings: eachData.first_innings,
        secondInnings: eachData.second_innings,
        matchStatus: eachData.match_status,
      })),
    }
    console.log('teamMatchesComponent')
    console.log(response)

    if (response.ok === true) {
      this.setState({
        teamInfo: dataInCamelCase,
        isLoading: false,
      })
    }
  }

  displayLatestMatches = () => {
    const {teamInfo} = this.state
    const {latestMatchDetails, recentMatches} = teamInfo

    return (
      <>
        <img alt="team banner" src={teamInfo.team_banner_url} />
        <h1>Latest Matches</h1>
        {this.displayStatistics()}
        <ul className="latestMatchCard">
          <li>
            <li>
              <p>{latestMatchDetails.competing_team}</p>
              <p>{latestMatchDetails.date}</p>
            </li>
            <li>
              <p>{latestMatchDetails.venue}</p>
              <p>{latestMatchDetails.result}</p>
            </li>
          </li>
          <img
            alt={`latest match ${latestMatchDetails.competing_team}`}
            src={latestMatchDetails.competing_team_logo}
          />
          <li>
            <p>First Innings</p>
            <p>{latestMatchDetails.firstInnings}</p>
            <p>Second Innings</p>
            <p>{latestMatchDetails.secondInnings}</p>
            <p>Man of the Match</p>
            <p>{latestMatchDetails.manOfTheMatch}</p>
            <p>Umpires</p>
            <p>{latestMatchDetails.umpires}</p>
          </li>
        </ul>
        <ul>
          {recentMatches.map(eachMatch => (
            <MatchCard key={eachMatch.id} allMatches={eachMatch} />
          ))}
        </ul>
      </>
    )
  }

  displayLoading = () => (
    <div testid="loader">
      {' '}
      <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
    </div>
  )

  onClickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  displayStatistics = () => {
    const {teamInfo} = this.state

    return <Piechart teamInfo={teamInfo} />
  }

  render() {
    const {isLoading, teamInfo} = this.state
    const {team_banner_url} = teamInfo

    return (
      <div className="teamMatchesContainer">
        {isLoading ? this.displayLoading() : this.displayLatestMatches()}
        <button onClick={this.onClickBack}>Back</button>
      </div>
    )
  }
}

export default TeamMatches
