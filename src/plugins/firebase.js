import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// import 'firebase/storage';
// import 'firebase/firebase-app';
// import 'firebase/firebase-storage';
import 'firebase/firebase-database';


export const firebaseApp = firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: "newyear-fd592.firebaseapp.com",
  databaseURL: "https://newyear-fd592-default-rtdb.firebaseio.com",
  projectId: "newyear-fd592",
  storageBucket: "newyear-fd592.appspot.com",
  messagingSenderId: "168583325158",
  appId: "1:168583325158:web:d1421898592e9b70322227",
  measurementId: "G-Z784FRKH36"
});
