// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAE_tZN1JkUdEwLsni3I_J6tewrgEXz2o8",
    authDomain: "masterarbeit-mira.firebaseapp.com",
    projectId: "masterarbeit-mira",
    storageBucket: "masterarbeit-mira.appspot.com",
    messagingSenderId: "209195860589",
    appId: "1:209195860589:web:73ed1e5a8cc453b81b3564",
    measurementId: "G-5QEQE6NVJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);