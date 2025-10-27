import { db } from './firebase.js';
import { ref, push } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js';

const consentBtn = document.getElementById("consentBtn");
const statusText = document.getElementById("status");
 

consentBtn.addEventListener("click", () => {
  const selectedRadio = document.querySelector('input[name="pigeonType"]:checked');
  const pigeonName = document.getElementById("pigeonName").value.trim();
  
  if (!selectedRadio) {
    statusText.textContent = "Please select a pigeon type first!";
    return;
  }

  if (!pigeonName) {
    alert("Please name your pigeon!");
    return;
  }
  
  const selectedPigeon = selectedRadio.value;
  console.log('Selected pigeon type:', selectedPigeon);
  
  if (!['classic', 'brown', 'black', 'wtf'].includes(selectedPigeon)) {
    console.error('Invalid pigeon type selected:', selectedPigeon);
    statusText.textContent = "Invalid pigeon type. Please try again.";
    return;
  }

  if (!navigator.geolocation) {
    statusText.textContent = "Geolocation not supported by your browser.";
    return;
  }

  statusText.textContent = "perching...";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      // Save to localStorage for immediate client use
      localStorage.setItem("userLocation", JSON.stringify({ latitude, longitude }));
      localStorage.setItem("userPigeon", selectedPigeon);
      localStorage.setItem("pigeonName", pigeonName);


      try {
        // Push to Firebase Realtime Database under `locations/`
        const locationsRef = ref(db, 'locations');
        const dataToSave = {
          latitude,
          longitude,
          pigeonType: selectedPigeon,
          pigeonName: pigeonName
        };
        await push(locationsRef, dataToSave);
        console.log('About to save to Firebase:', dataToSave);
        
        // Verify what was saved
        console.log('Successfully saved to Firebase with pigeon type:', selectedPigeon);
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
