import firebase from 'firebase';
import "firebase/auth";

const app  = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "tooberdatabaseuse.firebaseapp.com",
  databaseURL: "https://tooberdatabaseuse.firebaseio.com",
  projectId: "tooberdatabaseuse",
  storageBucket: "tooberdatabaseuse.appspot.com",
  messagingSenderId: "1068632627328",
  appId: "1:1068632627328:web:37062820035a58af82ae65",
  measurementId: "G-WR7MRVXCLZ"
});

export default app;