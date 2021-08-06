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
  document.querySelector("#topimg").setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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

function displayWeekForecast () {
  let weekForecastElement = document.querySelector ("#weekForecast")
  let days = ["Thu", "Fri", "Sat", "Sun"];
  let weekForecastHTML = `<div class=row>`;
  days.forEach(function (day) {
    weekForecastHTML = weekForecastHTML +
    `
    <div class="col-3">
    <p class="week-forcast-day"> ${day}</p> </div>
                <div class="col-3">
                  <img src="img/Sun.png" alt="" class="weekimg" />
                </div>
                <div class="col-3"> <p class="week-forcecast-max">26°</p></div>
                <div class="col-3"> <p class="week-forcecast-min">8°</p></div>
                `;
  });
  weekForecastHTML = weekForecastHTML + `</div>`;
  weekForecastElement.innerHTML = weekForecastElement;
  console.log(weekForecastHTML);
}

function displayHourForecast () {
let hourForecastElement = document.querySelector ("#hourforcast")
let hours = ["10am", "11am", "12pm", "1pm"];
let hourForecastHTML = `<div class=row>`;
hours.forEach(function (time) {
  hourForecastHTML = hourForecastHTML +
  `
  <div class="col-2">
    <p class="hourforcast-time"> ${time}</p>
    <img src="img/Sun.png" alt="" class="timeimg" />
    <p class="hourforcast-temp">26°</p>
  </div>
`;
});
hourForecastHTML = hourForecastHTML + `</div>`;
hourForecastElement.innerHTML = hourForecastHTML;
console.log (hourForecastHTML)
}


displayWeekForecast ();
displayHourForecast ();