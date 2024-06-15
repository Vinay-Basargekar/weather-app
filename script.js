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
			const processedData = processWeatherData(data);
			updateWeatherLocation(processedData);
		})
		.catch((error) => {
			console.error("Error fetching the Weather Report", error);
			alert("Failed to fetch the Weather report. Please try again later.");
		});
}

function processWeatherData(data) {
	return {
		city: data.location.name,
		country: data.location.country,
		temperature: data.current.temp_c,
		humidity: data.current.humidity,
		feelsLike: data.current.feelslike_c,
	};
}

function updateWeatherLocation(weatherData) {
	const cityElement = document.querySelector(".weather-data__location .city");
	const countryElement = document.querySelector(
		".weather-data__location .country"
	);
	const locationElement = document.querySelector(".weather-data__location");

	cityElement.innerText = `${weatherData.city},`;
	countryElement.innerText = weatherData.country;

	if (weatherData.country.length < 10) {
		locationElement.style.fontSize = "3rem";
	} else {
		locationElement.style.fontSize = "1.7rem";
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
