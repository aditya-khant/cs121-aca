import firebase from 'firebase';
import "firebase/auth";

const app  = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "toober-cs121.firebaseapp.com",
  databaseURL: "https://toober-cs121.firebaseio.com",
  projectId: "toober-cs121",
  storageBucket: "toober-cs121.appspot.com",
  messagingSenderId: "1043077781547",
  appId: "1:1043077781547:web:1f8291a8f0e47d0faf326e",
  measurementId: "G-4H706LE0PM"
});

export default app;