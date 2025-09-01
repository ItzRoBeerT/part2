import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phoneService from './services/phonebook';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');
	const [filter, setFilter] = useState('');

	useEffect(() => {
		console.log('Effect');
		phoneService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
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
			phoneService.create(newPerson).then((response) => {
				setPersons([...persons, response]);
				setNewName('');
				setNewPhone('');
				console.log('Person added:', response);
			});
		} else {
			if (personExists.phone !== newPerson.phone) {
				if (
					window.confirm(
						`${personExists.name} is already added to phonebook, replace the old number with the new one`
					)
				) {
					phoneService.updatePerson(personExists.id, newPerson).then((updatedPerson) => {
						console.log('updated Person', updatedPerson);

						setPersons(persons.map((person) => (person.id === updatedPerson.id ? updatedPerson : person)));
						setNewName('');
						setNewPhone('');
					});
				}
			} else alert(`${newName} is already added to phonebook`);
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

	const handleDelete = (id) => {
		window.confirm('Are you sure you want to delete this contact?') &&
			phoneService.deletePerson(id).then(() => {
				setPersons(persons.filter((person) => person.id !== id));
			});
	};

	const filteredNumbers = filter ? persons.filter((person) => person.name.toLowerCase().includes(filter)) : persons;

	console.log('Filtered numbers:', filteredNumbers);
	console.log('All persons:', persons);

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
			<Persons persons={filteredNumbers} handleDelete={handleDelete} />
		</div>
	);
};

export default App;
