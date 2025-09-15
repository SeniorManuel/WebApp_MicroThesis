// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYEkslFkAI6Q2Yu0Wc-AnC61Cb7q2uDTU",
  authDomain: "microvision-9bb94.firebaseapp.com",
  projectId: "microvision-9bb94",
  storageBucket: "microvision-9bb94.firebasestorage.app",
  messagingSenderId: "72145022613",
  appId: "1:72145022613:web:ea975c1bee8bdc48e3f59c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db};