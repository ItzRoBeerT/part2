import { useEffect, useState } from 'react';
import weatherService from '../services/weather';
import WeatherInfo from './WeatherInfo'

const CountryInfo = ({ country }) => {
	const [weather, setWeather] = useState(null);
	useEffect(() => {
		weatherService.getWeather(country.capital).then((data) => {
			setWeather(data);
		});
	}, [country]);

	console.log('weather:', weather);

	return (
		<div>
			<h2>{country.name.common}</h2>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>
			<p>Area: {country.area} km²</p>
			<h3>Languages</h3>
			<ul>
				{Object.values(country.languages).map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
			<WeatherInfo weather={weather} />
		</div>
	);
};

export default CountryInfo;
