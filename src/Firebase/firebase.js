// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGfrkmHtMJ0533eyyTKZ_YaeQVkUNWNtY",
  authDomain: "e-commerce-6aae4.firebaseapp.com",
  databaseURL:
    "https://e-commerce-6aae4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "e-commerce-6aae4",
  storageBucket: "e-commerce-6aae4.appspot.com",
  messagingSenderId: "371418567069",
  appId: "1:371418567069:web:117f3f455ec04142631f74",
  measurementId: "G-4GW7F5RTTX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
