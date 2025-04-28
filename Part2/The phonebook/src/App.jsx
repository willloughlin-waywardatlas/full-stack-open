import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    if(persons.find((el) => el.name === newName)){
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name:newName,
      number:newNumber,
      id:persons.length + 1
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const inputHandler = (event) => {
    switch (event.target.className) {
      case 'newName':
        setNewName(event.target.value)
        break
      case 'newNumber':
        setNewNumber(event.target.value)
        break
      case 'filter':
        setNewFilter(event.target.value)
        break
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter inputVal={newFilter} handler={inputHandler}/>
      <h3>Add new contact</h3>
      <PersonForm name={newName} number={newNumber} onSubmit={addContact} inputHandler={inputHandler}/>
      <h2>Contacts</h2>
      <GetContacts persons={persons} filter={newFilter}/>
    </div>
  )
}

const GetContacts = ({persons, filter}) => {
  const lowerCaseQuery = filter ? filter.toLowerCase() : null
  const peopleToShow = 
    filter ? 
    persons.filter(person => person.name.toLowerCase().includes(lowerCaseQuery)) 
    :[...persons]
  const contacts  = peopleToShow.map((person) => {
    return (
      <p key={person.id}>Name: {person.name} {person.number}</p>
    )
  });

  return (
    <>
      {contacts}
    </>
  )
}

const Filter = ({inputVal, handler}) => {
  return(
    <div>
      Search contact names which contain <input value={inputVal} onChange={handler} className='filter'/>
    </div>
  )
}

const PersonForm = ({name, number, onSubmit, inputHandler}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        Name: <input value={name} onChange={inputHandler} className='newName'/>
      </div>
      <div>
        Number: <input value={number} onChange={inputHandler} className='newNumber'/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default App