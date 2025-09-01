const WeatherInfo = ({ weather }) => {
	if (!weather) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h2>Weather in {weather.name}</h2>
			<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
			<p>Temperature: {weather.main.temp} °C</p>
			<p>Humidity: {weather.main.humidity} %</p>
			<p>Wind Speed: {weather.wind.speed} m/s</p>
		</div>
	);
};

export default WeatherInfo;
