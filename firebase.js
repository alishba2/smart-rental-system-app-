// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB3EZqxM73d1aN7ddSnyVKRpV-umswoBGA",
    authDomain: "fyp-srs.firebaseapp.com",
    projectId: "fyp-srs",
    storageBucket: "fyp-srs.appspot.com",
    messagingSenderId: "99698953760",
    appId: "1:99698953760:android:ac0ffc41cfbc4ac7a97645",
    measurementId: "G-measurement-id"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
