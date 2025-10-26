// Initialize map centered on NYC
const map = L.map("map").setView([40.7359, -73.9911], 13);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Get user location from localStorage
const savedLocation = localStorage.getItem("userLocation");

if (savedLocation) {
  const { latitude, longitude } = JSON.parse(savedLocation);

  // Custom pigeon icon
  const pigeonIcon = L.icon({
    iconUrl: "assets/pigeonIcon.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -10],
  });

  // Add marker
  L.marker([latitude, longitude], { icon: pigeonIcon })
    .addTo(map)
    .bindPopup("coo")
    .openPopup();

  // Center map on user
  map.setView([latitude, longitude], 15);
  console.log('Latitude:', latitude, 'Longitude', longitude, "using main file");
} else {
  // No location data
  alert("No location data found. Please go back and allow access.");
}
