import firebase from 'firebase/app';
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQegAH5vT-oHBxP1rcY7fPSes4U1X_CKc",
  authDomain: "callypso-c1252.firebaseapp.com",
  projectId: "callypso-c1252",
  storageBucket: "callypso-c1252.appspot.com",
  messagingSenderId: "227027166660",
  appId: "1:227027166660:web:f90c7a125d96c7504cb091",
  measurementId: "G-XLP3195JF1"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase