const weatherbitKey = '0bda22f9ceb94c2383aca8d333b7b973';
const weatherbit = 'https://api.weatherbit.io/v2.0/';

export { getCurrentWeather, getForecastWeather };

async function getCurrentWeather({ lat, lng }) {
  const url = `${weatherbit}current?&lat=${lat}&lon=${lng}&key=${weatherbitKey}`;

  const response = await fetch(url);
  const json = await response.json();

  const weatherInfo = json.data[0];

  let {
    temp: temperature, app_temp: feelsLike, wind_spd: windSpd, rh: humidity,
  } = weatherInfo;
  [temperature, feelsLike, windSpd, humidity] = [temperature, feelsLike, windSpd, humidity].map((item) => Math.round(item));

  const { icon, code } = weatherInfo.weather;

  return {
    temperature, feelsLike, windSpd, humidity, icon, code,
  };
}

async function getForecastWeather({ lat, lng }) {
  const url = `${weatherbit}forecast/daily?&lat=${lat}&lon=${lng}&days=4&key=${weatherbitKey}`;

  const response = await fetch(url);
  const json = await response.json();

  const weatherInfoArr = json.data;
  weatherInfoArr.shift();

  return weatherInfoArr.map((weatherInfo) => {
    const temperature = Math.round(weatherInfo.temp);
    const { icon } = weatherInfo.weather;
    return { temperature, icon };
  });
}
