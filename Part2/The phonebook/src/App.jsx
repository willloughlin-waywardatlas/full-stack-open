import { useState } from 'react'

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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

export default App