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
  
  getForecast (response.data.coord)

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

function getForecast(coordinates) {
  let apiKey = "05d9d7923ffdfb53fdfae4f1f915dae5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeekForecast);
  axios.get(apiUrl).then(displayHourForecast);
}

function formatHourForecast (timestamp) {
  let time = new Date(timestamp * 1000);
  let forecastHour = time.getHours();
  let forecastHours = [
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];
  return forecastHours[forecastHour];
}

function displayHourForecast (response) {
let hourForecast = response.data.hourly;
let hourForecastElement = document.querySelector ("#hourforcast")
let hourForecastHTML = `<div class=row>`;
hourForecast.forEach(function (hourForecastTime, index) {
  if (index < 6) {
  hourForecastHTML = hourForecastHTML +
  `
  <div class="col-2">
    <p class="hourforcast-time"> ${formatHourForecast(hourForecastTime.dt)}</p>
    <img src="https://openweathermap.org/img/wn/${hourForecastTime.weather[0].icon}@2x.png"
          alt=""
          class="timeimg" />
    <p class="hourforcast-temp">${Math.round(hourForecastTime.temp)}°</p>
  </div>
`;
  }
});
hourForecastHTML = hourForecastHTML + `</div>`;
hourForecastElement.innerHTML = hourForecastHTML;
console.log (hourForecastHTML);
}

function formatWeekDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
}

function displayWeekForecast (response) {
  let weekForecast = response.data.daily;
  let weekForecastElement = document.querySelector ("#weekForecast")
  let weekForecastHTML = `<div class=row>`;
  weekForecast.forEach(function (weekForecastDay, index ) {
    if (index < 6) {
    weekForecastHTML = weekForecastHTML +
    `
    <div class="col-3">
    <p class="week-forcast-day"> ${formatWeekDay(weekForecastDay.dt)}</p> </div>
                <div class="col-3">
                  <img src="https://openweathermap.org/img/wn/${weekForecastDay.weather[0].icon}@2x.png"
                  alt=""
                  class="weekimg" />
                </div>
                <div class="col-3"> <p class="week-forcecast-max">${Math.round(weekForecastDay.temp.max)}°</p></div>
                <div class="col-3"> <p class="week-forcecast-min">${Math.round (weekForecastDay.temp.min)}°</p></div>
                `;
              }
              });
  weekForecastHTML = weekForecastHTML + `</div>`;
  weekForecastElement.innerHTML = weekForecastHTML;
}


