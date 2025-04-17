// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFHTw9fhT4RE191f83YaCmabj6PA1xmpg",
  authDomain: "vite-contex.firebaseapp.com",
  projectId: "vite-contex",
  storageBucket: "vite-contex.firebasestorage.app",
  messagingSenderId: "7964658006",
  appId: "1:7964658006:web:d62fbc9d5db88d7fdc6ef7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
