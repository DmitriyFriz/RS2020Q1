export { getLocationData, getCoordinateData };

const opencageKey = '23e52a2d9b934240a2f92b890c311ee7';

async function getLocationData(location, language) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${location}
    &key=${opencageKey}&limit=1&language=${language}`;

  const response = await fetch(url);
  const json = await response.json();

  const locationData = json.results[0];
  return handleLocationData(locationData);
}

async function getCoordinateData({ lat, lng }, language) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}
    &key=${opencageKey}&limit=1&language=${language}`;

  const response = await fetch(url);
  const json = await response.json();

  const locationData = json.results[0];
  return handleLocationData(locationData);
}

function handleLocationData(locationData) {
  const {
    city, town, county, village, state, country,
  } = locationData.components;
  const { lat, lng } = locationData.geometry;
  const timeZone = locationData.annotations.timezone.name;

  let { lat: formatLat, lng: formatLng } = locationData.annotations.DMS;
  formatLat = `${formatLat.slice(0, 7)} ${formatLat.slice(-1)}`;
  formatLng = `${formatLng.slice(0, 7)} ${formatLng.slice(-1)}`;

  const locationName = `${city || town || county || village || state || ''}, ${country}`;
  return {
    lat, lng, locationName, timeZone, formatLat, formatLng,
  };
}
