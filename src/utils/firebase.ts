// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAd31J76raaq1_43THsZsZXbJ1-80qOuw",
  authDomain: "dash-board-31c98.firebaseapp.com",
  projectId: "dash-board-31c98",
  storageBucket: "dash-board-31c98.firebasestorage.app",
  messagingSenderId: "810793455728",
  appId: "1:810793455728:web:817568cc221abccddee4b5",
  measurementId: "G-TLJY9BVL01",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
