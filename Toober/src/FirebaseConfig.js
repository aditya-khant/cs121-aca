import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "chatpoc-ad7c2.firebaseapp.com",
  databaseURL: "https://chatpoc-ad7c2.firebaseio.com",
  projectId: "chatpoc-ad7c2",
  storageBucket: "chatpoc-ad7c2.appspot.com",
  messagingSenderId: "956577952304",
  appId: "1:956577952304:web:41445bad53598406d4f3f5"
};

firebase.initializeApp(firebaseConfig);
export default firebase;