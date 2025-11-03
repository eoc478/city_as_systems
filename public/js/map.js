import { db } from './firebase.js';
import { ref, onValue } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js';

// Initialize map centered on NYC
// const map = L.map("map").setView([40.7359, -73.9911], 13);

// Add OpenStreetMap tiles
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution: '&copy; OpenStreetMap contributors'
// }).addTo(map);

// Pigeon icon definitions
const pigeonIcons = {
  classic: L.icon({
    iconUrl: "assets/pigeonIcon.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -10],
  }),
  brown: L.icon({
    iconUrl: "assets/pigeonIcon-brown.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -10],
  }),
  black: L.icon({
    iconUrl: "assets/pigeonIcon-black.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -10],
  }),
  wtf: L.icon({
    iconUrl: "assets/pigeonIcon-wtf.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -10],
  })
};
const pigeonName = localStorage.getItem("pigeonName");

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

  // Loop through each saved location 
  Object.keys(data).forEach((key) => {
    const { latitude, longitude, pigeonType, pigeonName } = data[key];
    // console.log('Processing location:', key, { latitude, longitude, pigeonType, pigeonName });

    if (latitude && longitude) {
      if (!pigeonType || !pigeonIcons[pigeonType]) {
        console.warn(`Invalid or missing pigeon type: ${pigeonType}, falling back to classic`);
      }
      
      // Use the saved pigeon type or fallback to classic
      const icon = pigeonIcons[pigeonType] || pigeonIcons.classic;
      // console.log(`Using icon for type: ${pigeonType}`, icon);
      
      L.marker([latitude, longitude], { icon })
        .addTo(map)
        .bindPopup(`${pigeonName}`);
    }
  });
});
