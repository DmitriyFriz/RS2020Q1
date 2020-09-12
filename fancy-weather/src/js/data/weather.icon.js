import clearDay from '../../../assets/img/weather/clear-day.svg';
import clearNight from '../../../assets/img/weather/clear-night.svg';
import partlyCloudyDay from '../../../assets/img/weather/partly-cloudy-day.svg';
import partlyCloudyNight from '../../../assets/img/weather/partly-cloudy-night.svg';
import cloudy from '../../../assets/img/weather/cloudy.svg';
import mist from '../../../assets/img/weather/mist.svg';
import partlyCloudyDaySnow from '../../../assets/img/weather/partly-cloudy-day-snow.svg';
import partlyCloudyNightSnow from '../../../assets/img/weather/partly-cloudy-night-snow.svg';
import snow from '../../../assets/img/weather/snow.svg';
import partlyCloudyDayRain from '../../../assets/img/weather/partly-cloudy-day-rain.svg';
import partlyCloudyNightRain from '../../../assets/img/weather/partly-cloudy-night-rain.svg';
import rain from '../../../assets/img/weather/rain.svg';
import partlyCloudyDayHail from '../../../assets/img/weather/partly-cloudy-day-hail.svg';
import partlyCloudyNightHail from '../../../assets/img/weather/partly-cloudy-night-hail.svg';
import partlyCloudyDayDrizzle from '../../../assets/img/weather/partly-cloudy-day-drizzle.svg';
import partlyCloudyNightDrizzle from '../../../assets/img/weather/partly-cloudy-night-drizzle.svg';
import drizzle from '../../../assets/img/weather/drizzle.svg';
import thunderstorms from '../../../assets/img/weather/thunderstorms.svg';
import wind from '../../../assets/img/weather/wind.svg';


const weatherIcons = {
  c01d: clearDay,
  c01n: clearNight,
  c02d: partlyCloudyDay,
  c02n: partlyCloudyNight,
  c03d: partlyCloudyDay,
  c03n: partlyCloudyNight,
  c04d: cloudy,
  c04n: cloudy,

  a01d: mist,
  a01n: mist,
  a02d: mist,
  a02n: mist,
  a03d: mist,
  a03n: mist,
  a04d: mist,
  a04n: mist,
  a05d: mist,
  a05n: mist,
  a06d: mist,
  a06n: mist,

  s01d: partlyCloudyDaySnow,
  s01n: partlyCloudyNightSnow,
  s02d: snow,
  s02n: snow,
  s03d: snow,
  s03n: snow,
  s04d: partlyCloudyDaySnow,
  s04n: partlyCloudyNightSnow,
  s05d: snow,
  s05n: snow,
  s06d: snow,
  s06n: snow,

  r01d: partlyCloudyDayRain,
  r01n: partlyCloudyNightRain,
  r02d: partlyCloudyDayRain,
  r02n: partlyCloudyNightRain,
  r03d: rain,
  r03n: rain,
  r04d: rain,
  r04n: rain,
  r05d: rain,
  r05n: rain,
  r06d: rain,
  r06n: rain,

  f01d: partlyCloudyDayHail,
  f01n: partlyCloudyNightHail,

  d01d: partlyCloudyDayDrizzle,
  d01n: partlyCloudyNightDrizzle,
  d02d: partlyCloudyDayDrizzle,
  d02n: partlyCloudyNightDrizzle,
  d03d: drizzle,
  d03n: drizzle,

  t01d: thunderstorms,
  t01n: thunderstorms,
  t02d: thunderstorms,
  t02n: thunderstorms,
  t03d: thunderstorms,
  t03n: thunderstorms,
  t04d: thunderstorms,
  t04n: thunderstorms,
  t05d: thunderstorms,
  t05n: thunderstorms,

  u00d: wind,
  u00n: wind,
};

export default weatherIcons;
