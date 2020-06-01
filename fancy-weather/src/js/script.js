import setMapCenter from './map.js';
import getPosition from './geolocation.js';
import LocalDate from './date.js';
import { getLocationData, getCoordinateData } from './geocoding.js';
import { getCurrentWeather, getForecastWeather } from './weather.js';
import weatherTranslate from './data/weather.translate.js';
import weatherIcons from './data/weather.icon.js';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');
const latContainer = document.getElementById('lat');
const lngContainer = document.getElementById('lng');
const temperatureToday = document.getElementById('temperature-today');
const descriptionWeather = document.getElementById('description-weather');
const feelsLike = document.getElementById('feels-like');
const windSpd = document.getElementById('wind-spd');
const humidity = document.getElementById('humidity');
const todayWeatherIcon = document.querySelector('.today-weather-icon');

const currentTime = document.querySelector('.current-time');
const currentDay = document.querySelector('.current-day');
const futureWeekdays = document.querySelectorAll('.future-weekday');
const locationContainer = document.querySelector('.location');
const summaryWeather = document.querySelectorAll('[data-summary-weather]');
const temperatureForecast = document.querySelectorAll('[data-temperature-forecast]');
const forecastIcon = document.querySelectorAll('.forecast-icon');
const appWrapper = document.querySelector('.app-wrapper');

const unitsGroup = document.querySelector('.units-group');
const unitButtons = document.querySelectorAll('.button-units');
const degreeC = 'C';
const degreeF = 'F';
let unit = localStorage.getItem('unitWeather');
unit = (unit === null) ? degreeC : unit;

const languagePage = 'en';

let currentWeather = null;
let forecastWeather = null;
let locationData = null;

const localDate = new LocalDate({ currentDay, currentTime, futureWeekdays });

async function init() {
  try {
    setFirstSettings(unit);

    const locationCoordinate = await getPosition();

    locationData = await getCoordinateData(locationCoordinate, languagePage);
    currentWeather = await getCurrentWeather(locationData);
    forecastWeather = await getForecastWeather(locationData);

    localDate.timeZone = locationData.timeZone;
    setInterval(localDate.setTime.bind(localDate), 1000);

    updatePageData(locationData);
    updatePageWeather({
      currentWeather,
      forecastWeather,
      language: languagePage,
      unit,
    });
  } catch (error) {
    alert(error);
  } finally {
    appWrapper.classList.add('app-opacity');
  }
}

searchButton.addEventListener('click', async () => {
  const location = searchInput.value.trim();
  if (location.length) {
    try {
      locationData = await getLocationData(location, languagePage);
      currentWeather = await getCurrentWeather(locationData);
      forecastWeather = await getForecastWeather(locationData);

      updatePageData(locationData);
      updatePageWeather({
        currentWeather,
        forecastWeather,
        language: languagePage,
        unit,
      });
      searchForm.reset();
    } catch (error) {
      alert(error);
    }
  }
});

function setFirstSettings(unit) {
  unitButtons.forEach((item) => {
    const button = item;
    if (button.dataset.value === unit) button.classList.add('units-active');
  });
}

function updatePageData(locationData) {
  locationContainer.textContent = locationData.locationName;
  latContainer.textContent = locationData.formatLat;
  lngContainer.textContent = locationData.formatLng;
  setMapCenter(locationData);
  localDate.timeZone = locationData.timeZone;
  localDate.setDay();
  localDate.setFutureWeekdays();
}

function updatePageWeather({
  currentWeather, forecastWeather, language, unit,
}) {
  descriptionWeather.textContent = weatherTranslate[language][currentWeather.code];
  let temperature = Number(currentWeather.temperature);
  let feelTemperature = Number(currentWeather.feelsLike);
  if (unit === degreeF) {
    temperature = convertToFahrenheit(temperature);
    feelTemperature = convertToFahrenheit(feelTemperature);
  }
  temperatureToday.textContent = temperature;
  feelsLike.textContent = feelTemperature;
  windSpd.textContent = currentWeather.windSpd;
  humidity.textContent = currentWeather.humidity;
  todayWeatherIcon.src = weatherIcons[currentWeather.icon];

  temperatureForecast.forEach((item, index) => {
    const temperatureContainer = item;
    let temperature = Number(forecastWeather[index].temperature);
    if (unit === degreeF) {
      temperature = convertToFahrenheit(temperature);
    }
    temperatureContainer.textContent = temperature;
    forecastIcon[index].src = weatherIcons[forecastWeather[index].icon];
  });
}

unitsGroup.addEventListener('click', (event) => {
  const selectedButton = event.target;
  if (!selectedButton.classList.contains('units-active')) {
    unit = selectedButton.dataset.value;
    localStorage.setItem('unitWeather', unit);
    unitButtons.forEach((item) => {
      const button = item;
      button.classList.remove('units-active');
    });
    selectedButton.classList.add('units-active');
    changeTemperature({
      currentWeather,
      forecastWeather,
      unit,
    });
  }
});

function changeTemperature({ currentWeather, forecastWeather, unit }) {
  let temperature = Number(currentWeather.temperature);
  let feelTemperature = Number(currentWeather.feelsLike);
  if (unit === degreeF) {
    temperature = convertToFahrenheit(temperature);
    feelTemperature = convertToFahrenheit(feelTemperature);
  }
  temperatureToday.textContent = temperature;
  feelsLike.textContent = feelTemperature;
  temperatureForecast.forEach((item, index) => {
    const temperatureContainer = item;
    let temperature = Number(forecastWeather[index].temperature);
    if (unit === degreeF) {
      temperature = convertToFahrenheit(temperature);
    }
    temperatureContainer.textContent = temperature;
  });
}

function convertToFahrenheit(temperature) {
  return Math.round(temperature * (9 / 5) + 32);
}

init();
