import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBib7eYHkXd1eLRD1lM8Q0PjtPWtNQGVWU",
  authDomain: "vue32025.firebaseapp.com",
  projectId: "vue32025",
  storageBucket: "vue32025.firebasestorage.app",
  messagingSenderId: "319763213199",
  appId: "1:319763213199:web:9376e09f3b90895541f9fa",
  measurementId: "G-TT497Z6L0Y"
};

initializeApp(firebaseConfig);

const auth = getAuth()

export {auth}