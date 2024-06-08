function getWeather() {
    var city = document.getElementById("cityInput").value;
    var apiUrl = "https://city-weather-app-423809a004f4.herokuapp.com/api/v1/weather/" + city;

    if(!checkCity(city))
    {
        console.log("City does not exist:", error);
        alert("City Does not exist , Enter a correct city name.");
    }
    
    else
    {
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
            alert("Error fetching weather data.Please Try Again");
        });
    }
}

function checkCity(city) 
{
    return fetch('Cities.txt')
        .then(response => response.text())
        .then(data => {
            const cities = data.split('\n').map(city => city.trim());
            return cities.includes(city);
        })
        .catch(error => {
            console.error('Error fetching the cities file:', error);
            return false;
        });
}