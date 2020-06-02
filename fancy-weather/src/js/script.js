import setMapCenter from './map.js';
import getPosition from './geolocation.js';
import LocalDate from './date.js';
import { getLocationData, getCoordinateData } from './geocoding.js';
import { getCurrentWeather, getForecastWeather } from './weather.js';
import weatherTranslate from './data/weather.translate.js';
import weatherIcons from './data/weather.icon.js';
import dataTranslate from './data/translate.data.js';

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
const latLngSignature = document.querySelectorAll('[data-coordinates]');
const temperatureForecast = document.querySelectorAll('[data-temperature-forecast]');
const forecastIcon = document.querySelectorAll('.forecast-icon');
const appWrapper = document.querySelector('.app-wrapper');

const degreeC = 'C';
const degreeF = 'F';
let unit = localStorage.getItem('unitWeather');
unit = (unit === null) ? degreeC : unit;
const unitsGroup = document.querySelector('.units-group');
const unitButtons = document.querySelectorAll('.button-units');

const defaultLanguage = 'en';
let languagePage = localStorage.getItem('languageWeather');
languagePage = (languagePage === null) ? defaultLanguage : languagePage;
const dropState = document.querySelector('.drop-state');
const dropGroup = document.querySelector('.dropdown-content');
const dropButtons = document.querySelectorAll('.drop-button');

let currentWeather = null;
let forecastWeather = null;
let locationData = null;
const localDate = new LocalDate({ currentDay, currentTime, futureWeekdays });

async function init() {
  try {
    setFirstSettings(unit, languagePage);

    const locationCoordinate = await getPosition();

    locationData = await getCoordinateData(locationCoordinate, languagePage);
    currentWeather = await getCurrentWeather(locationData);
    forecastWeather = await getForecastWeather(locationData);

    localDate.timeZone = locationData.timeZone;
    localDate.language = languagePage;
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

function setFirstSettings(unit, language) {
  unitButtons.forEach((item) => {
    const button = item;
    if (button.dataset.value === unit) button.classList.add('units-active');
  });

  setLanguageStaticElements(language);
  dropButtons.forEach((item) => {
    const button = item;
    if (button.dataset.language === language) button.classList.add('drop-button-active');
  });
  dropState.textContent = language.toUpperCase();
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
    changeTemperatureUnits({
      currentWeather,
      forecastWeather,
      unit,
    });
  }
});

function changeTemperatureUnits({ currentWeather, forecastWeather, unit }) {
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

dropGroup.addEventListener('click', (event) => {
  const selectedButton = event.target;
  if (!selectedButton.classList.contains('drop-button-active')) {
    languagePage = selectedButton.dataset.language;
    localStorage.setItem('languageWeather', languagePage);
    dropButtons.forEach((item) => {
      const button = item;
      button.classList.remove('drop-button-active');
    });
    selectedButton.classList.add('drop-button-active');
    dropState.textContent = languagePage.toUpperCase();
    changePageLanguage(languagePage);
  }
});

async function changePageLanguage(language) {
  try {
    locationData = await getCoordinateData(locationData, languagePage);
    locationContainer.textContent = locationData.locationName;
    localDate.language = language;
    localDate.setDay();
    localDate.setFutureWeekdays();
    descriptionWeather.textContent = weatherTranslate[language][currentWeather.code];
    setLanguageStaticElements(language);
  } catch (error) {
    alert(error);
  }
}

function setLanguageStaticElements(language) {
  searchButton.textContent = dataTranslate.buttonSearch[language];
  searchInput.placeholder = dataTranslate.searchPlaceholder[languagePage];
  latLngSignature.forEach((item, index) => {
    const container = item;
    container.textContent = dataTranslate.latLng[language][index];
  });
  summaryWeather.forEach((item, index) => {
    const container = item;
    container.textContent = dataTranslate.summaryWeather[language][index];
  });
}

init();
