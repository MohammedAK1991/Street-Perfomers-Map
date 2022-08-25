// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQegAH5vT-oHBxP1rcY7fPSes4U1X_CKc",
  authDomain: "callypso-c1252.firebaseapp.com",
  projectId: "callypso-c1252",
  storageBucket: "callypso-c1252.appspot.com",
  messagingSenderId: "227027166660",
  appId: "1:227027166660:web:f90c7a125d96c7504cb091",
  measurementId: "G-XLP3195JF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);