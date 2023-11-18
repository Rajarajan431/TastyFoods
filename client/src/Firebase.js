// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tasty-food-f4127.firebaseapp.com",
  projectId: "tasty-food-f4127",
  storageBucket: "tasty-food-f4127.appspot.com",
  messagingSenderId: "704343525372",
  appId: "1:704343525372:web:2a1bd126d4e48dae175479"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

