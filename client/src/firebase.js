// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "registration-react-db640.firebaseapp.com",
  projectId: "registration-react-db640",
  storageBucket: "registration-react-db640.appspot.com",
  messagingSenderId: "148846451357",
  appId: "1:148846451357:web:9c7728f0bea9bc1fcc1274"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);