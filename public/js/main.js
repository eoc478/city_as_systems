import { db } from './firebase.js';
import { ref, push } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js';

const consentBtn = document.getElementById("consentBtn");
const statusText = document.getElementById("status");

consentBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    statusText.textContent = "Geolocation not supported by your browser.";
    return;
  }

  statusText.textContent = "Locating you... PUBLIC FILE";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      // Save to localStorage for immediate client use
      localStorage.setItem("userLocation", JSON.stringify({ latitude, longitude }));

      try {
        // Push to Firebase Realtime Database under `locations/`
        const locationsRef = ref(db, 'locations');
        await push(locationsRef, { latitude, longitude, timestamp });
        console.log('location saved to firebase', { latitude, longitude });
        console.log(data.val());
      } catch (err) {
        console.error('Failed to save location to Firebase:', err);
      }

      // Navigate to the map page regardless of DB success
      window.location.href = "map.html"; // Go to map page
    },
    (error) => {
      statusText.textContent = "Location permission denied or unavailable.";
    }
  );

});
