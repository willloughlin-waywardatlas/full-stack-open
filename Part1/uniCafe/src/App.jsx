import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const StatisticLine = (props) => {
  return(
    <tr>
      <th>{props.text}</th>
      <td>{props.value}</td>
    </tr>
  )
  
}

const Statistics = ({ratings,all,average,positive}) => {
  return(
    <>
    <h1>Statistics</h1>
    {all?(
      <table>
        <tbody>
          <StatisticLine text="Good" value={ratings.good}/>
          <StatisticLine text="Neutral" value={ratings.neutral}/>
          <StatisticLine text="Bad" value={ratings.bad}/>
          <StatisticLine text="All" value={all}/>
          <StatisticLine text="Average" value={average}/>
          <StatisticLine text="Positive" value={positive+' %'}/>
        </tbody>
      </table>
    ) : (
      <p>No feedback given</p>
    )}
    </>
  )
}



const App = () => {
  const [ratings, setRatings] = useState({
    good:0, 
    neutral:0, 
    bad:0
  })

  const all = ratings.good + ratings.neutral + ratings.bad
  const average = !ratings.good && !ratings.bad ? 0 : (ratings.good - ratings.bad) / all
  const positivePercent =  ratings.good ? ratings.good / all * 100: 0


  const rateGood = () => {
    setRatings({ ...ratings, good: ratings.good + 1 })
  }

  const rateNeutral = () => {
    setRatings({ ...ratings, neutral: ratings.neutral + 1 })
  }

  const rateBad = () => {
    setRatings({ ...ratings, bad: ratings.bad + 1 })
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={rateGood} text='good'/>
      <Button onClick={rateNeutral} text='neutral'/>
      <Button onClick={rateBad} text='bad'/>
      <Statistics ratings={ratings} all={all} average={average} positive={positivePercent}/>
    </div>
  )
}

export default App