function getWeather() {
    var city = document.getElementById("cityInput").value;
    var apiUrl = "https://city-weather-app-423809a004f4.herokuapp.com/api/v1/weather/" + city;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("weatherDetails").classList.remove("hidden");
            document.getElementById("weatherDescription").innerText = "Weather: " + data.details;
            document.getElementById("temperature").innerText = "Temperature: " + data.temprature + "°C";
            document.getElementById("humidity").innerText = "Humidity: " + data.humidity + "%";

            // Set weather icon based on weather type
            var weatherIcon = document.getElementById("weatherIcon");
            if (data.weather === "Clear") {
                weatherIcon.innerHTML = '<img src="icons/clear.png" alt="Clear">';
            } else if (data.weather === "Clouds") {
                weatherIcon.innerHTML = '<img src="icons/clouds.png" alt="Clouds">';
            } else if (data.weather === "Rain") {
                weatherIcon.innerHTML = '<img src="icons/rain.png" alt="Rain">';
            }

            // Determine humidity comfort level
            var humidityLevel;
            if (data.humidity <= 55) {
                humidityLevel = "Dry and comfortable";
            } else if (data.humidity > 55 && data.humidity < 65) {
                humidityLevel = "Becoming 'sticky' with muggy evenings";
            } else {
                humidityLevel = "Lots of moisture in the air, becoming oppressive";
            }
            document.getElementById("humidity").innerText += " (" + humidityLevel + ")";
        })
        .catch(error => {
            console.log("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again later.");
        });
}