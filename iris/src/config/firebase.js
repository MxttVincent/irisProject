// setup for firebase products

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsDGLvWJTHpFBf2pUZoNL9QEfmPe81Sz4",
  authDomain: "iris-pro.firebaseapp.com",
  databaseURL: "https://iris-pro.firebaseio.com",
  projectId: "iris-pro",
  storageBucket: "iris-pro.appspot.com",
  messagingSenderId: "239445951991",
  appId: "1:239445951991:web:9b035888b4ac6f057fdaf2",
  measurementId: "G-DQFV89EYG1"
};
firebase.initializeApp(firebaseConfig);

export default firebase
// // //