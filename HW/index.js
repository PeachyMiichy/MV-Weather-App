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

function showWeather(response) {
  let temperatureElement = document.querySelector("#currTemp");
  let cityElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  celsiusTemperature = response.data.main.temp;
  console.log(celsiusTemperature);

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
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

let curButton = document.querySelector(".btn-info");
curButton.addEventListener("click", retrievePosition1);

let now = new Date();
formatDate(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
form.addEventListener("click", search);
