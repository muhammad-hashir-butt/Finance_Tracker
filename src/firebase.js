import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyArfhnUjEA_xikAupAFGQOdP6_F6VSWxLU",
  authDomain: "financetracker-ae1d5.firebaseapp.com",
  projectId: "financetracker-ae1d5",
  storageBucket: "financetracker-ae1d5.firebasestorage.app",
  messagingSenderId: "1016024580908",
  appId: "1:1016024580908:web:228704e6c3c00ec371a289"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);