import { useEffect } from 'react';
import { useState } from 'react';
import countriesServices from './services/countries';
import Countries from './components/Countries';

function App() {
	const [searchTerm, setSearchTerm] = useState('');
	const [countries, setCountries] = useState([]);
	const [allCountries, setAllCountries] = useState([]);

	useEffect(() => {
		if (allCountries.length === 0) {
			countriesServices.getAll().then((data) => {
				setAllCountries(data);
			});
		}

		if (searchTerm) {
			const filteredCountries = allCountries.filter((country) =>
				country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setCountries(filteredCountries);
		} else {
			setCountries([]);
		}
	}, [searchTerm]);

	console.log('Countries:', countries);
	console.log('All Countries:', allCountries);

	return (
		<>
			<h1>Countries</h1>
			<div>
				find countries <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			</div>
			<Countries countries={countries} />
		</>
	);
}

export default App;
