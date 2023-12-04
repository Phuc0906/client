// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBG2wHeFtCVBQhkdqJ8x6lj2saftPBGhMc",
    authDomain: "levelup-ai.firebaseapp.com",
    projectId: "levelup-ai",
    storageBucket: "levelup-ai.appspot.com",
    messagingSenderId: "592041395365",
    appId: "1:592041395365:web:7e1a0cac88c6bb0379b94c",
    measurementId: "G-NZ3PL6FXXG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
