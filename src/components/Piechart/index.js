import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const colours = ['#4287f5', '#42f551', '#eb7f13']

const Piechart = props => {
  const {teamInfo} = props
  const {recentMatches} = teamInfo

  const getValue = matchResult => {
    const matchResultList = recentMatches.filter(
      eachMatch => eachMatch.matchStatus === matchResult,
    )
    return matchResultList.length
  }

  const data = [
    {result: 'Lost', value: getValue('Lost')},
    {result: 'Won', value: getValue('Won')},
    {result: 'Drawn', value: getValue('Drawn')},
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          cx="70%"
          cy="40%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="value"
        >
          {data.map(eachResult => (
            <Cell fill={colours[data.indexOf(eachResult)]} />
          ))}
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default Piechart
