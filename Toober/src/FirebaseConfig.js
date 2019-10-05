import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "fir-tutorialchat-70cc4.firebaseapp.com",
  databaseURL: "https://fir-tutorialchat-70cc4.firebaseio.com",
  projectId: "fir-tutorialchat-70cc4",
  storageBucket: "fir-tutorialchat-70cc4.appspot.com",
  messagingSenderId: "441844295635",
  appId: "1:441844295635:web:1024895ac820b72a727126"
};

firebase.initializeApp(firebaseConfig);
export default firebase;