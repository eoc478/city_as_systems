// Import the functions you need from the Firebase CDN (browser modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrpxDlIFHkTegGwe-C_urqokuZsDeguQk",
  authDomain: "city-system-map.firebaseapp.com",
  databaseURL: "https://city-system-map-default-rtdb.firebaseio.com",
  projectId: "city-system-map",
  storageBucket: "city-system-map.firebasestorage.app",
  messagingSenderId: "706880271929",
  appId: "1:706880271929:web:54fa4de38a4fd2dd207fe8",
  measurementId: "G-GNHH0VRH05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Export the initialized objects so other modules can import them
export { app, analytics, db };

console.log("firebase initialized", app.name || '(default)');