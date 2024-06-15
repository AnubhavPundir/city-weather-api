$(".btn").click(function() 
 {
    var city = document.getElementById("cityInput").value;
    var apiUrl = "https://city-weather-app-423809a004f4.herokuapp.com/api/v1/weather/" + city;
       fetch(apiUrl).then(response => response.json())
       .then(data => 
        {
            if(data && (data.details!=null || data.temprature!= null || data.humidity!= null ))
            {
            document.getElementById("weatherDetails").classList.remove("hidden");
            document.getElementById("weatherDescription").innerText = "Weather: " + data.details;
            document.getElementById("temperature").innerText = "Temperature: " + data.temprature + "°C";
            document.getElementById("humidity").innerText = "Humidity: " + data.humidity + "%";

            // Set weather icon based on weather type
            var weatherIcon = document.getElementById("weatherIcon");
            if (data.weather.includes("Clear")) {
                weatherIcon.innerHTML = '<img src="weatherIcons/clear.png" alt="Clear">';
            } else if (data.weather.includes("Clouds")) {
                weatherIcon.innerHTML = '<img src="weatherIcons/clouds.png" alt="Clouds">';
            } else if (data.weather.includes("Rain")) {
                weatherIcon.innerHTML = '<img src="weatherIcons/rain.png" alt="Rain">';
            }
            else if (data.weather.includes("Hazy")) {
            weatherIcon.innerHTML = '<img src="weatherIcons/hazy.png" alt="Hazy">';
            }

            var tempratureIcon = document.getElementById("tempratureIcon");
            if (data.temprature <= 10) 
            {
                tempratureIcon.innerHTML = '<img src="weatherIcons/cold.png" alt="Cold">';
            } 
            else if (data.temprature > 10 && data.temprature <= 28)
            {
                tempratureIcon.innerHTML = '<img src="weatherIcons/temp.png" alt="Normal">';
            } 
            else
            {
                tempratureIcon.innerHTML = '<img src="weatherIcons/hot.png" alt="Hot">';
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
           }
           else
           {
            alert("No data found for the entered city : "+ city + " , Please enter correct city" );
           }
        })
})      

