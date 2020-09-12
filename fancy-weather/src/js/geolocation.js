export default getPosition;

function getUserPosition() {
  const options = {
    enableHighAccuracy: true,
  };

  return new Promise(((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  }));
}

async function getPosition() {
  try {
    const { coords } = await getUserPosition();
    const { latitude, longitude } = coords;
    return { lat: latitude, lng: longitude };
  } catch {
    const defaultPosition = { lat: 53.902334, lng: 27.5618791 };
    return defaultPosition;
  }
}
