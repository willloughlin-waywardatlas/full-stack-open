import { useState } from 'react'
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const MostVoted = ({anecdotes,leadIndex}) => {
  if(leadIndex != -1){
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[leadIndex]}</p>
      </div>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [data, setData] = useState({
    selection:0,
    votes:[0,0,0,0,0,0,0,0]
  })

  const randomAnecdote = () => {
    const max = anecdotes.length
    const index = Math.floor(Math.random() * max)
    setData({...data, selection:index})
  }

  const vote = () => {
    const votes = [...data.votes]
    votes[data.selection] ++
    setData({...data, votes:votes})
  }

  const getLeader = () => {
    const highestValue = Math.max(...data.votes)
    const index = data.votes.indexOf(highestValue)
    return highestValue ? index : -1
  }

  return (
    <div>
      <p>{anecdotes[data.selection]}</p>
      <p>has {data.votes[data.selection]} votes</p>
      <Button onClick={vote} text='Vote 👍'/>
      <Button onClick={randomAnecdote} text='Random anecdote 🔄'/>
      <MostVoted anecdotes={anecdotes} leadIndex={getLeader()}/>
    </div>
  )
}

export default App