// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
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
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
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
        competingTeamLogo: eachData.competing_team_logo,
        firstInnings: eachData.first_innings,
        secondInnings: eachData.second_innings,
        matchStatus: eachData.match_status,
      })),
    }
    console.log('teamMatchesComponent')
    console.log(dataInCamelCase)

    this.setState({
      teamInfo: dataInCamelCase,
      isLoading: false,
    })
  }

  displayLatestMatches = () => {
    const {teamInfo} = this.state
    const {latestMatchDetails, recentMatches} = teamInfo

    return (
      <>
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        <ul>
          {recentMatches.map(eachMatch => (
            <MatchCard key={eachMatch.id} allMatches={eachMatch} />
          ))}
        </ul>
      </>
    )
  }

  displayLoading = () => (
    <div>
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading, teamInfo} = this.state
    const {teamBannerUrl} = teamInfo

    return (
      <div className="teamMatchesContainer">
        <img alt="team banner" src={teamBannerUrl} />
        <h1>Latest Matches</h1>
        {isLoading ? this.displayLoading() : this.displayLatestMatches()}
      </div>
    )
  }
}

export default TeamMatches
