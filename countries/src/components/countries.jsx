const Countries = ({ countries }) => {
	if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	} else if (countries.length === 1) {
		return (
			<div>
				<h2>{countries[0].name.common}</h2>
				<p>Capital: {countries[0].capital}</p>
				<p>Population: {countries[0].population}</p>
				<p>Area: {countries[0].area} km²</p>
				<h3>Languages</h3>
				<ul>
					{Object.values(countries[0].languages).map((language) => (
						<li key={language}>{language}</li>
					))}
				</ul>
				<img src={countries[0].flags.png} alt={`Flag of ${countries[0].name.common}`} />
			</div>
		);
	} else if (countries.length === 0) {
		return <p>No matches found</p>;
	}

	return (
		<ul>
			{countries.map((country) => (
				<li key={country.cca3}>{country.name.common}</li>
			))}
		</ul>
	);
};

export default Countries;
