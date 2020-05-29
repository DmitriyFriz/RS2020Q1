import mapboxgl from '../../node_modules/mapbox-gl/dist/mapbox-gl.js';

export default setMapCenter;

mapboxgl.accessToken = 'pk.eyJ1IjoiZG1pdHJpeWZyaXoiLCJhIjoiY2thcGxzOWg2MDBkMTJzcHJxOTY1M3lhdSJ9.iTzcuTO4Sy2CrTeD7ghYHg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 10,
});

const marker = new mapboxgl.Marker();

function setMapCenter({ lng, lat }) {
  map.flyTo({ center: [lng, lat] });
  marker.setLngLat([lng, lat])
    .addTo(map);
}
