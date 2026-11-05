import {apiKey, apiUrl} from "./config.js";


const searchInput=document.querySelector(".search-input");
const searchIcon=document.querySelector(".search-icon");
const weatherIconImg=document.querySelector(".weather-icon-img");
const temperatureE1=document.querySelector(".temperature");
const cityNamE1=document.querySelector(".city-name");
const humidityE1=document.querySelector(".humidity-details span");
const windSpeedE1=document.querySelector(".wind-speed-details span");

function getWeatherImage(cloudiness) {
    if (cloudiness > 80) {
        return "img/clouds.png";
    } else if (cloudiness > 50) {
        return "img/drizzle.png";
    } else if (cloudiness > 20) {
        return "img/mist.png";
    } else if (cloudiness > 5) {
        return "img/clear.png";
    }else{
        return "img/clear.png";
    }
    
}

async function checkWeather(city) {
    try {
         const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);   
         if (!response.ok) throw new Error("City not found"); 
         const data = await response.json();
         cityNamE1.textContent = data.name;
         temperatureE1.textContent = `${Math.round(data.main.temp)}°C`;
         humidityE1.textContent = `${data.main.humidity}%`;
         windSpeedE1.textContent = `${data.wind.speed} km/h`;
         weatherIconImg.src = getWeatherImage(data.clouds.all);
         console.log({data});

    } catch (error) {

    }
}


searchIcon.addEventListener("click", () => {
    checkWeather(searchInput.value.trim());
    if (city) {
        checkWeather(city);
     } else {
        alert("Please enter a city name.");
    }
})

checkWeather("Vinnytsia");