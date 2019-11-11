var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');
// Initialize Firebase for the application

export const firebaseConfig = {
  apiKey: "AIzaSyBcg_qECwUfEI5B84n79H7kvpMICvb5qWY",
  authDomain: "nice-rocks001.firebaseapp.com",
  databaseURL: "https://nice-rocks001.firebaseio.com",
  projectId: "nice-rocks001",
  storageBucket: "nice-rocks001.appspot.com",
  messagingSenderId: "572512032401",
  appId: "1:572512032401:web:d8f614c7e58deb25611130"
};

// // dotenv setup
// // .env
// FIREBASE_API_KEY=
// FIREBASE_AUTH_DOMAIN=
// FIREBASE_DATABASE_URL=
// FIREBASE_STORAGE_BUCKET=
// FIREBASE_MESSAGING_SENDER_ID=
//
// var config = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
// };
