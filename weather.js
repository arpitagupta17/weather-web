const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "5268665cf13eeb148119d10d8ee6c9c8";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === "404") {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("City not found");
            return;
        }

        // Show weather info
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        // Update DOM elements
        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/h`;

        // Change weather image based on condition
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "assets/cloud.jpg";
                break;
            case 'Clear':
                weather_img.src = "assets/clear.jpg";
                break;
            case 'Rain':
                weather_img.src = "assets/rain.jpg";
                break;
            case 'Mist':
                weather_img.src = "assets/mist.jpg";
                break;
            case 'Snow':
                weather_img.src = "assets/snow.jpg";
                break;
            default:
                weather_img.src = "assets/sun1.jpg";
        }

        console.log(weather_data);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city !== "") {
        checkWeather(city);
    }
});
