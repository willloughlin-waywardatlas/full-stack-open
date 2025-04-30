import { useState, useEffect } from 'react'
import personService from './services/person'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState({content:'Lorem Ipsum', class:'inActive'})

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const newPerson = {
      name:newName,
      number:newNumber,
    }
    const existingContact = persons.find((el) => el.name === newName)
    if(existingContact){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingContact.id,newPerson)
          .then(response => {
            setPersons(persons.map(p => p.id === existingContact.id ? response.data : p))
            setNewName('')
            setNewNumber('')
            setMessage({content:`${newPerson.name} updated`, class:'success'})
            setTimeout(() => {
              setMessage({content:`${newPerson.name} updated`, class:'inActive'})
            },5000)
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setMessage({content:`Added ${newPerson.name}`, class:'success'})
          setTimeout(() => {
            setMessage({content:`Added ${newPerson.name}`, class:'inActive'})
          },5000)
        })
    }
  }

  const removeContact = (target) => {
    if (window.confirm(`Delete ${target.name}?`)) {
      personService
        .remove(target.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== target.id))
        })
        .catch(error => {
          setMessage({content:`The contact '${target.name}' has already been deleted from the server`, class:'error'})
          setTimeout(() => {
            setMessage({content:`The contact '${target.name}' has already been deleted from the server`, class:'inActive'})
          },5000)
          setPersons(persons.filter(p => p.id !== target.id))
        })
    }
  }

  const handleInputChange = (event) => {
    switch (event.target.name) {
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
      <Notification message={message}/>
      <Filter inputVal={newFilter} handleInputChange={handleInputChange}/>
      <h3>Add new contact</h3>
      <PersonForm name={newName} number={newNumber} onSubmit={addContact} handleInputChange={handleInputChange}/>
      <h2>Contacts</h2>
      <GetContacts persons={persons} filter={newFilter} removeContact={removeContact}/>
    </div>
  )
}

const GetContacts = ({persons, filter, removeContact}) => {
  const lowerCaseQuery = filter ? filter.toLowerCase() : null
  const peopleToShow = 
    filter ? 
    persons.filter(person => person.name.toLowerCase().includes(lowerCaseQuery)) 
    :[...persons]
  const contacts  = peopleToShow.map((person) => {
    return (
      <div key={person.id}>
        {person.name} {person.number} <button onClick={() => removeContact(person)}>Delete</button>
      </div>
    )
  });

  return (
    <>
      {contacts}
    </>
  )
}

const Filter = ({inputVal, handleInputChange}) => {
  return(
    <div>
      Search contact names which contain <input value={inputVal} onChange={handleInputChange} name='filter'/>
    </div>
  )
}

const PersonForm = ({name, number, onSubmit, handleInputChange}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        Name: <input value={name} onChange={handleInputChange} name='newName'/>
      </div>
      <div>
        Number: <input value={number} onChange={handleInputChange} name='newNumber'/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Notification = ({message}) => {
  return (
    <div className={`notification ${message.class}`}>
      <p>{message.content}</p>
    </div>
  )
}

export default App