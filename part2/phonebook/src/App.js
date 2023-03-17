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
      .then(response => {
        setPersons(response.data)
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
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
        })
    };
  };

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

      <Persons peopleToShow={peopleToShow} />
    </div>
  );
};

export default App;