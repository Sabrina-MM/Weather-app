//All EventListener

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitCalculation);

let form = document.querySelector("#form-one");
form.addEventListener("submit", main); // Cuando apretamos el botton "search" empieza a funcionar esta function.

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusCalculation);

let button = document.querySelector("#button-current");
button.addEventListener("click", getCurrentPosition);

//.........................

function main(event) {
  event.preventDefault();
  setCountryTime();
  setHeading(getCity());
  callWeatherApi();
}
function getCity() {
  let searchBar = document.querySelector("#city-input");
  let suppliedCountry = searchBar.value;
  suppliedCountry = firstLetterToUpperCase(suppliedCountry);
  return suppliedCountry;
}

function setHeading(city) {
  let h1 = document.querySelector("#heading");
  h1.innerHTML = ` ${city}`;
}

function firstLetterToUpperCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function calculationTime() {
  let today = new Date();
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = today.getHours();
  if (hours >= 12) {
    hours = `${hours}:${minutes} `;
  } else {
    hours = `${hours}:${minutes} `;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];
  let result = ` ${day}  ${hours}`;
  return result;
}

function setCountryTime() {
  let h5 = document.querySelector("#week");
  let time = calculationTime();
  h5.innerHTML = time;
}

let mode = "celsius"; // variable outside the functions to track the "temperature mode F and C"
function fahrenheitCalculation(event) {
  event.preventDefault();
  if (mode !== "fahrenheit") {
    mode = "fahrenheit";
    let element = document.querySelector("#temperature");
    let tempNumber = element.innerHTML;
    let fahrenheitResult = (tempNumber * 9) / 5 + 32;
    let numberNoDecimal = Nodecimal(fahrenheitResult);
    element.innerHTML = numberNoDecimal;
  }
}

function Nodecimal(delateDecimal) {
  return Math.round(delateDecimal);
}

function celsiusCalculation(event) {
  event.preventDefault();
  if (mode !== "celsius") {
    mode = "celsius";
    let element = document.querySelector("#temperature");
    let celsiusNumber = element.innerHTML;
    let celsiusResult = (celsiusNumber - 32) / 1.8;
    let NoDecimal = Math.round(celsiusResult);
    element.innerHTML = NoDecimal;
  }
}
//..........................

function handlerWeather(response) {
  setHumidyty(response);
  setRealFeel(response);
  setWind(response);
  setWeatherImg(response);
  setTemperature(response);
  displayTime(response);
}

function displayTime(response) {
  let currentTime = document.querySelector("#week");
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function setTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
}

function callWeatherApi() {
  let apiKey = "5df05ec20f5c5b50f9ac557495988486";
  let city = getCity();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(handlerWeather); // make a GET request
}

function setHumidyty(response) {
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
}
function setRealFeel(response) {
  let realFeel = document.querySelector("#real-feel");

  realFeel.innerHTML = Math.round(response.data.main.feels_like);
}

function setWind(response) {
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

function setWeatherImg(response) {
  let howTheWetherIs = document.querySelector("#howTheWetherIs");
  howTheWetherIs.innerHTML = response.data.weather[0].main;
  // ChangeIconElemen
  let iconElement = document.querySelector("#img-center");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//..................geolocalitation....................

function handlerPosition(response) {
  setHeading(response.data.name);
  setHumidyty(response);
  setRealFeel(response);
  setWind(response);
  setWeatherImg(response);
  setTemperature(response);
}

function callApiPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "5df05ec20f5c5b50f9ac557495988486";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(handlerPosition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(callApiPosition);
}

//...........set time when you open the app.......................

function setWebCity() {
  let apiKey = "5df05ec20f5c5b50f9ac557495988486";
  let city = "London";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(handlerWeather);
}

setWebCity();
