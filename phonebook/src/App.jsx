import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas', phone: '040-1234567' }]);
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');

	const addNumber = (event) => {
		event.preventDefault();

		const newPerson = {
			name: newName,
      phone: newPhone
		};
		const personExists = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
		console.log('personExists', personExists);

		if (!personExists) {
			setPersons([...persons, newPerson]);
			setNewName('');
      setNewPhone('')
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

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addNumber}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newPhone} onChange={handleNumberChange}/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map((person) => (
					<li key={person.name}>{person.name} {person.phone}</li>
				))}
			</ul>
		</div>
	);
};

export default App;
