function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let cityElement = document.querySelector("#city");
  
    cityElement.innerHTML = searchInput.value;
    let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
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
  
  function searchPosition(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }
  
  function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchPosition);
  }
  let currentButton = document.querySelector("#current-button");
  currentButton.addEventListener("click", getCurrentPosition);
  