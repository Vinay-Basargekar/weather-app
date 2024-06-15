let loc = "Pune";
var WeatherInfo = [];

function getLocation(loc) {
	const url = `https://api.weatherapi.com/v1/current.json?key=37e89417ac3c48998ff32705241406&q=${loc}`;
	WeatherAPI(url);
}

function WeatherAPI(url) {
	fetch(url, { mode: "cors" })
		.then((response) => {
			return response.json();
		})
		.then((res) => {
			const processedData = processData(res);
			WeatherInfo.push(processedData);
			console.log(WeatherInfo);
		})
		.catch((error) => {
			console.error("Error fetching the Weather Report", error);
			alert("Failed to fetch the Weather report. Please try again later.");
		});
}

function processData(data) {
	return {
		location: data.location.name,
		country: data.location.country,
		temperature: data.current.temp_c,
		humidity: data.current.humidity,
		feelsLike: data.current.feelslike_c,
	};
}

getLocation(loc);
