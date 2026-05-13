// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCqfUjbGOhk7plWt5-WeHgNrcv3W1E4oWs",

  authDomain: "slicehub-73000.firebaseapp.com",

  projectId: "slicehub-73000",

  storageBucket: "slicehub-73000.firebasestorage.app",

  messagingSenderId: "818756827357",

  appId: "1:818756827357:web:6bfb92695b3dcbd6520334"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore so we can use them in our components
export const auth = getAuth(app);
export const db = getFirestore(app);