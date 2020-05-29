import setMapCenter from './map.js';
import getPosition from './geolocation.js';

async function init() {
  const locationCoordinate = await getPosition();
  setMapCenter(locationCoordinate);
}

init();
