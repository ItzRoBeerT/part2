import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');
	const [filter, setFilter] = useState('');

	useEffect(() => {
		console.log('Effect');
		axios.get('http://localhost:3001/persons').then((response) => {
			console.log('promise fulfilled');
			setPersons(response.data);
		});
	}, []);

	const addNumber = (event) => {
		event.preventDefault();

		const newPerson = {
			name: newName,
			phone: newPhone,
		};
		const personExists = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
		console.log('personExists', personExists);

		if (!personExists) {
			setPersons([...persons, newPerson]);
			setNewName('');
			setNewPhone('');
			axios.post('http://localhost:3001/persons', newPerson).then((response) => {
				console.log('Person added:', response.data);
			});
		} else {
			alert(`${newName} is already added to phonebook`);
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewPhone(event.target.value);
	};

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const filteredNumbers = filter ? persons.filter((person) => person.name.toLowerCase().includes(filter)) : persons;

	return (
		<div>
			<h2>Phonebook</h2>

			<Filter filter={filter} onChange={handleFilterChange} />

			<h3>Add a new</h3>

			<PersonForm
				onSubmit={addNumber}
				newName={newName}
				newPhone={newPhone}
				onNameChange={handleNameChange}
				onPhoneChange={handleNumberChange}
			/>

			<h3>Numbers</h3>
			<Persons persons={filteredNumbers} />
		</div>
	);
};

export default App;
