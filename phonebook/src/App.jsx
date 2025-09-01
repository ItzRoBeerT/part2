import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', phone: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');
	const [filter, setFilter] = useState('');

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

			<div>
				filter shown with <input value={filter} onChange={handleFilterChange} />
			</div>

			<h3>Add a new</h3>
			<form onSubmit={addNumber}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newPhone} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{filteredNumbers.map((person) => (
					<li key={person.name}>
						{person.name} {person.phone}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
