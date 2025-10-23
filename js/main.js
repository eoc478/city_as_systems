const consentBtn = document.getElementById("consentBtn");
const statusText = document.getElementById("status");

consentBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    statusText.textContent = "Geolocation not supported by your browser.";
    return;
  }

  statusText.textContent = "Locating you...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      localStorage.setItem("userLocation", JSON.stringify({ latitude, longitude }));
      window.location.href = "map.html"; // Go to map page
    },
    (error) => {
      statusText.textContent = "Location permission denied or unavailable.";
    }
  );
});
