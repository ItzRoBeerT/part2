import { useState } from 'react';
import CountryInfo from './CountryInfo';

const Countries = ({ countries }) => {
	const [selectedCountry, setSelectedCountry] = useState(null);

	if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	} else if (countries.length === 1) {
		return <CountryInfo country={countries[0]} />;
	} else if (countries.length === 0) {
		return <p>No matches found</p>;
	}

	return (
		<>
			<ul>
				{countries.map((country) => (
					<li key={country.cca3}>
						{country.name.common} <button onClick={() => setSelectedCountry(country)}>Show</button>
					</li>
				))}
			</ul>
			{selectedCountry && <CountryInfo country={selectedCountry} />}
		</>
	);
};

export default Countries;
