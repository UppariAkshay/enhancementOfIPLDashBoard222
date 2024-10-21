// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teamsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.fetchTeamsData()
    console.log('componentDidMount')
  }

  fetchTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const camelCaseData = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))

    this.setState({
      teamsList: camelCaseData,
      isLoading: false,
    })
  }

  displayLoading = () => (
    <div>
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  displayTeams = () => {
    const {teamsList} = this.state

    return (
      <ul className="iplTeamsContainer">
        {teamsList.map(eachItem => (
          <TeamCard key={eachItem.id} teamDetails={eachItem} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="homeContainer">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            alt="ipl logo"
            style={{height: '40px'}}
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          />
          <h1>Ipl Dashboard</h1>
        </div>
        {isLoading ? this.displayLoading() : this.displayTeams()}
      </div>
    )
  }
}

export default Home
