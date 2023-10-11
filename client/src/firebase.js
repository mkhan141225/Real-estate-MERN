// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-7c444.firebaseapp.com",
  projectId: "mern-estate-7c444",
  storageBucket: "mern-estate-7c444.appspot.com",
  messagingSenderId: "374490094701",
  appId: "1:374490094701:web:6d5d0684d24ef0a2873364"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);