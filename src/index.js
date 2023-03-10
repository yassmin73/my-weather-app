function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let cityElement = document.querySelector("#city");
  
    cityElement.innerHTML = searchInput.value;
    let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);

  }
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [ "Sun", "Mon", "Tue", "Wed", "Thu","Fri", "Sat" ];
  
    return days[day];
  }
  
  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#weather-forecast");

  

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6 ) {
      forecastHTML = forecastHTML + ` <div class="col-2">
      <div class="card h-100">
        <h3 class="card-title">${formatDay(forecastDay.dt)}</h3>
        
        <div class="card-body">
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" class="forecast" />
          <div class="high-temperature">${Math.round(
            forecastDay.temp.max
          )}° </div>
          <div class="low-temperature"> ${Math.round(
            forecastDay.temp.min
          )}°</div>
        </div>
      </div>
    </div>
      `; 
          }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  
  function showTemperature(response) {
    console.log(response.data.main.temp);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature-input");
    temperatureElement.innerHTML = `${temperature}`;
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].main;
    let locationElement = document.querySelector("#city");
    locationElement.innerHTML = response.data.name;
    let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
 
  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  getForecast(response.data.coord);
  }
  
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", search);
  
  let now = new Date();
  let currentDate = document.querySelector(".card-text-1");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  currentDate.innerHTML = `${day} ${hours}:${minutes}`;
  
  function defaultDisplay(city) {
    let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);

  }
  defaultDisplay("Tokyo"); 

