import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "tooberdatabaseuse.firebaseapp.com",
  databaseURL: "https://tooberdatabaseuse.firebaseio.com",
  projectId: "tooberdatabaseuse",
  storageBucket: "tooberdatabaseuse.appspot.com",
  messagingSenderId: "1068632627328",
  appId: "1:1068632627328:web:37062820035a58af82ae65",
  measurementId: "G-WR7MRVXCLZ"
};

firebase.initializeApp(firebaseConfig);
export default firebase;