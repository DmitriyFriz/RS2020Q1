import setMapCenter from './map.js';
import getPosition from './geolocation.js';
import LocalDate from './date.js';
import { getLocationData, getCoordinateData } from './geocoding.js';
import { getCurrentWeather, getForecastWeather } from './weather.js';
import weatherTranslate from './data/weather.translate.js';
import weatherIcons from './data/weather.icon.js';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
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

const languagePage = 'en';

const localDate = new LocalDate({ currentDay, currentTime, futureWeekdays });

async function init() {
  const locationCoordinate = await getPosition();
  const locationData = await getCoordinateData(locationCoordinate, languagePage);

  localDate.timeZone = locationData.timeZone;
  setInterval(localDate.setTime.bind(localDate), 1000);

  updatePageData(locationData);

  const currentWeather = await getCurrentWeather(locationData);
  const forecastWeather = await getForecastWeather(locationData);
  updatePageWeather(currentWeather, forecastWeather, languagePage);
}

searchButton.addEventListener('click', async () => {
  const location = searchInput.value.trim();
  if (location.length) {
    try {
      const locationData = await getLocationData(location, languagePage);
      updatePageData(locationData);

      const currentWeather = await getCurrentWeather(locationData);
      const forecastWeather = await getForecastWeather(locationData);
      updatePageWeather(currentWeather, forecastWeather, languagePage);
    } catch (error) {
      alert(error);
    }
  }
});

function updatePageData(locationData) {
  locationContainer.textContent = locationData.locationName;
  latContainer.textContent = locationData.formatLat;
  lngContainer.textContent = locationData.formatLng;
  setMapCenter(locationData);
  localDate.timeZone = locationData.timeZone;
  localDate.setDay();
  localDate.setFutureWeekdays();
}

function updatePageWeather(currentWeather, forecastWeather, language) {
  descriptionWeather.textContent = weatherTranslate[language][currentWeather.code];
  temperatureToday.textContent = currentWeather.temperature;
  feelsLike.textContent = currentWeather.feelsLike;
  windSpd.textContent = currentWeather.windSpd;
  humidity.textContent = currentWeather.humidity;
  todayWeatherIcon.src = weatherIcons[currentWeather.icon];

  temperatureForecast.forEach((item, index) => {
    const temperatureContainer = item;
    temperatureContainer.textContent = forecastWeather[index].temperature;
    forecastIcon[index].src = weatherIcons[forecastWeather[index].icon];
  });
}

init();
