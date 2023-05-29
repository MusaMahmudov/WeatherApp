let moon = document.getElementById("wrapper");
let sun = document.getElementsByClassName("stateIcon")[0];

async function getData(url) {
  try {
    let data = await fetch(url);
    return data.json();
  } catch {
    alert("Error");
  }
}

let search = document.getElementsByTagName("input")[0];
let searchBtn = document.getElementsByClassName("searchBtn")[0];
let currentUrl =
  "http://api.weatherapi.com/v1/forecast.json?key=56b25a787f6f4e4e90372918232805&q=Baku&days=7&aqi=no&alerts=no";
let form = document.getElementsByTagName("form")[0];
getData(currentUrl).then((data) => {
  allShow(data);
});
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  currentUrl = `http://api.weatherapi.com/v1/forecast.json?key=56b25a787f6f4e4e90372918232805&q=${search.value}&days=7&aqi=no&alerts=no`;
  getData(currentUrl)
    .then((data) => {
      allShow(data);
    })
    .catch(() => {
      alert("error");
      form.reset();
    });
});
function allShow(data) {
  dayTime(data);
  currentTemperatureShow(data);
  realFeelShow(data);
  windSpeedShow(data);
  cityShow(data);
  uvShow(data);
  humidityShow(data);
  humidityShow2(data);
  todayForecastTimeShow(data);
  sevenDaysForecastShow(data);
}

let currentTemperature =
  document.getElementsByClassName("currentTemperature")[0];
let realFeel = document.getElementsByClassName("realFeel")[0];
let windSpeed = document.getElementsByClassName("windSpeed")[0];

function currentTemperatureShow(data) {
  currentTemperature.innerHTML = `${Math.round(data.current.temp_c)}°C`;
}

function realFeelShow(data) {
  realFeel.innerHTML = `${Math.round(data.current.feelslike_c)}°C`;
}
function windSpeedShow(data) {
  windSpeed.innerHTML = `${data.current.wind_kph}km/h`;
}

let city = document.getElementsByClassName("city")[0];

function cityShow(data) {
  let cityName = data.location.name;
  city.innerHTML = `${cityName}`;
}
let UV = document.getElementsByClassName("UV")[0];
function uvShow(data) {
  UV.innerHTML = `${data.current.uv}`;
}
let humidity = document.getElementsByClassName("humidity")[0];
function humidityShow(data) {
  humidity.innerHTML = `${data.current.humidity}%`;
}
let humidity2 = document.getElementsByClassName("humidity2")[0];
function humidityShow2(data) {
  humidity2.innerHTML = `Humidity:${data.current.humidity}%`;
}
let todayForecastHourTimes = document.getElementsByClassName("timeTemp");
function todayForecastTimeShow(data) {
  let timeData = data.forecast.forecastday[0].hour;
  let count = 6;
  for (let i = 0; i < todayForecastHourTimes.length; i++) {
    todayForecastHourTimes[i].innerHTML = `${Math.round(
      timeData[count].temp_c
    )}°C`;
    count += 3;
  }
}

let sevenDaysForecastTemp = document.getElementsByTagName("h2");
let days = document.getElementsByClassName("7days");

function sevenDaysForecastShow() {
  getData(currentUrl).then((data) => {
    for (let i = 0; i < days.length; i++) {
      days[i].innerHTML = `${data.forecast.forecastday[i].date}`;
      sevenDaysForecastTemp[i].innerHTML = `${Math.round(
        data.forecast.forecastday[i].day.maxtemp_c
      )}/${Math.round(data.forecast.forecastday[i].day.mintemp_c)}`;
    }
  });
}

function dayTime(data) {
  let date = data.current.last_updated;
  let index = date.indexOf(":");
  let hour = date.slice(index - 2, index);
  if (hour.at(0) == 0) {
    hour = hour.charAt(1);
  }
  if (hour > 20 || hour < 6) {
    moon.classList.remove("hidden");
    sun.classList.add("hidden");
  } else {
    moon.classList.add("hidden");
    sun.classList.remove("hidden");
  }
}

// function showTime() {
//   let date = new Date();
//   let hour = date.getHours();
//   let minute = date.getMinutes();
//   let second = date.getSeconds();
//   liveTime.innerHTML = `${hour}:${minute}:${second}`;
// }
// setInterval(showTime, 1000);
