import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchQ, setSearchQ] = useState('');

  useEffect(() => {
    personService.getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else if (newName === '' || newNumber === '') {
      alert('please fill in both boxes!');
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
    };
  };

  const delPerson = (person) => {
    const check = window.confirm(`Delete ${person.name} from your phonebook?`);
    if (check) {
      personService.remove(person.id)
        .then(() => {
          setPersons(persons.filter(per => per.id !== person.id))
        })
    }
  }

  const peopleToShow = searchQ === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchQ.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchQ={searchQ} setSearchQ={setSearchQ} />

      <h2>Add a new</h2>

      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>

      <Persons peopleToShow={peopleToShow} delPerson={delPerson} />
    </div>
  );
};

export default App;