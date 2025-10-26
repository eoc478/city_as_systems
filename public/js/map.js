import { db } from './firebase.js';
import { ref, onValue } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js';

// Initialize map centered on NYC
const map = L.map("map").setView([40.7359, -73.9911], 13);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Custom pigeon icon
const pigeonIcon = L.icon({
  iconUrl: "assets/pigeonIcon.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -10],
});

// Reference the "locations" path in Firebase
const locationsRef = ref(db, "locations");

// Listen for any updates in the database
onValue(locationsRef, (snapshot) => {
  const data = snapshot.val();

  if (!data) {
    console.log("No location data found in Firebase.");
    return;
  }

  // Clear all existing markers (optional, if you reload frequently)
  // If you plan to add markers only once, you can skip this
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Loop through each saved location (like Daniel’s example)
  Object.keys(data).forEach((key) => {
    const { latitude, longitude} = data[key];

    if (latitude && longitude) {
      L.marker([latitude, longitude], { icon: pigeonIcon })
        .addTo(map)
        .bindPopup(`🕊 Pigeon spotted at:<br>Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
    }
  });
});
