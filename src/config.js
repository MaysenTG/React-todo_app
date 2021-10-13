// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP1GdbXPwcY74MVGgXkCCPeOlMwO7k9OE",
  authDomain: "reacttodolistdb.firebaseapp.com",
  databaseURL: "https://reacttodolistdb-default-rtdb.firebaseio.com/user001",
  projectId: "reacttodolistdb",
  storageBucket: "reacttodolistdb.appspot.com",
  messagingSenderId: "663259047651",
  appId: "1:663259047651:web:23c195c828a480a678c7d6",
  measurementId: "G-ZVT04LWNKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  
export default getFirestore();