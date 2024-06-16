const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");

searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const city = searchInput.value;
	getLocation(city);
	searchInput.value = "";
});

function getLocation(city) {
	const apiKey = "37e89417ac3c48998ff32705241406";
	const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
	fetchWeatherData(url);
}

function fetchWeatherData(url) {
	fetch(url, { mode: "cors" })
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			const processedData = processWeatherData(data);
			console.log(processedData);
			updateWeatherLocation(processedData);
			updateWeather(processedData);
		})
		.catch((error) => {
			console.error("Error fetching the Weather Report", error);
			alert("Failed to fetch the Weather. Please try again later.");
		});
}

function processWeatherData(data) {
	return {
		city: data.location.name,
		country: data.location.country,
		temperature: data.current.temp_c,
		condition: data.current.condition.text,
		humidity: data.current.humidity,
		feelsLike: data.current.feelslike_c,
		wind: data.current.wind_kph,
	};
}

function updateWeather(weatherData) {
	const temperatureElement = document.querySelector(".temp");
	const conditionElement = document.querySelector(".condition");
	const humidityElement = document.querySelector(".hum");
	const feelsLikeElement = document.querySelector(".feels");
	const windElement = document.querySelector(".speed");

	conditionElement.innerText = weatherData.condition;
	temperatureElement.innerText = `${weatherData.temperature}°C`;
	humidityElement.innerText = `${weatherData.humidity}%`;
	feelsLikeElement.innerText = `${weatherData.feelsLike}°C`;
	windElement.innerText = `${weatherData.wind} km/h`;
}

function updateWeatherLocation(weatherLocData) {
	const cityElement = document.querySelector(".weather-data__location .city");
	const countryElement = document.querySelector(
		".weather-data__location .country"
	);
	const locationElement = document.querySelector(".weather-data__location");

	cityElement.innerText = `${weatherLocData.city},`;
	countryElement.innerText = weatherLocData.country;

	if (weatherLocData.country.length < 10) {
		locationElement.style.fontSize = "3rem";
	} else {
		locationElement.style.fontSize = "2rem";
	}
}

function updateDateTime() {
	const dateElement = document.querySelector(".date-and-time .date");
	const timeElement = document.querySelector(".date-and-time .time");
	const now = new Date();

	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const formattedDate = now.toLocaleDateString("en-US", options);
	const formattedTime = now.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});

	dateElement.innerText = formattedDate;
	timeElement.innerText = formattedTime;
}
updateDateTime();
