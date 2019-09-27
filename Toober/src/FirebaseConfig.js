import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAxVpSyyNfdF0E34s0K9Jehp6ClOurXF8E",
    authDomain: "toobertestdatabase.firebaseapp.com",
    databaseURL: "https://toobertestdatabase.firebaseio.com",
    projectId: "toobertestdatabase",
    storageBucket: "toobertestdatabase.appspot.com",
    messagingSenderId: "1025155208883",
    appId: "1:1025155208883:web:0a739fd6b016fb471982c6",
    measurementId: "G-54P1VQV8P3"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;