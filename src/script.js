let today = new Date();
let date = document.querySelector("#date");
let hour = today.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = today.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let weekDay = weekDays[today.getDay()];

date.innerHTML = `${weekDay} ${hour}:${minute}`;
function displayWeather(response) {
  console.log(response.data)
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#todayHigh").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#todayLow").innerHTML = Math.round(response.data.main.temp_min);
}
function search(city) {
  let apiKey = "05d9d7923ffdfb53fdfae4f1f915dae5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function find(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  search(city);
}

let selectCity = document.querySelector("#searchCity");
selectCity.addEventListener("submit", find);

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = 23;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let apiKey = "05d9d7923ffdfb53fdfae4f1f915dae5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
let currentCityButton = document.querySelector("#currentCityButton");
currentCityButton.addEventListener("click", getCurrentCity);

search("Lisbon");