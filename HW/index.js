//Function to update the current day, date and time
function formatDate(now) {
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = week[now.getDay()];
  let date = now.getDate();
  let mth = month[now.getMonth()];
  let year = now.getFullYear();
  let time = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  let currDay = document.querySelector("#day");
  //console.log(currDay);
  let currDate = document.querySelector("#date");
  //console.log(currDate);
  let currTime = document.querySelector("#time");
  //console.log(currTime);
  currDay.innerHTML = day;
  currDate.innerHTML = `${date} ${mth} ${year}`;
  currTime.innerHTML = time;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function returnDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let dd = date.getDate() + 1;
  let mm = date.getMonth() + 1;
  let forecastDate = `${dd}/${mm}`;

  return forecastDate;
}

function showWeather(response) {
  let temperatureElement = document.querySelector("#currTemp");
  let cityElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#tempIcon");

  celsiusTemperature = response.data.main.temp;
  console.log(celsiusTemperature);

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  console.log(response.data.coord);
  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#place").value;
  let apiKey = "48571143cbf4c6549c7ce57d24d91240";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function retrievePosition(position) {
  let apiKey = "48571143cbf4c6549c7ce57d24d91240";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function retrievePosition1() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function getForecast(coord) {
  let apiKey = "48571143cbf4c6549c7ce57d24d91240";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col forecast-col">
        <span class="card" style="width: 6rem">
        <div class="card-header">
       <strong>${formatDay(forecastDay.dt)}</strong>
       <br />
       ${returnDate(forecastDay.dt)}
       </div>
       <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
          alt=""
          class = "center"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
  </span>
</div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function convertCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currTemp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
retrievePosition1();

let curButton = document.querySelector(".btn-info");
curButton.addEventListener("click", retrievePosition1);

let celsiusTemperature = null;

let now = new Date();
formatDate(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
form.addEventListener("DOMContentLoaded", search);

let fahButton = document.querySelector("#fah");
fahButton.addEventListener("click", convertFahrenheit);
let celButton = document.querySelector("#cel");
celButton.addEventListener("click", convertCelcius);
