import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//NOTE: this config does not contain any private/secret info
const firebaseConfig = {
  apiKey: "AIzaSyBcg_qECwUfEI5B84n79H7kvpMICvb5qWY",
  authDomain: "nice-rocks001.firebaseapp.com",
  databaseURL: "https://nice-rocks001.firebaseio.com",
  projectId: "nice-rocks001",
  storageBucket: "nice-rocks001.appspot.com",
  messagingSenderId: "572512032401",
  appId: "1:572512032401:web:d8f614c7e58deb25611130"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore();
export const currentUser = firebase.auth().currentUser;

export const initFirebase = (callback) => {
  return firebase.auth().onAuthStateChanged(function(currentUser) {
    if (!currentUser) {
      attempSignInFromRedirect();
    }
    callback(firebase, currentUser);
  });
};


export const signInWithRedirect = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithRedirect(provider);
};

export const signOut = () => {
  firebase.auth().signOut().then(() => location.reload());
};

export const getCurrentUser = () => firebase.auth().currentUser;

const attempSignInFromRedirect = () => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      const user = result.user;
    }).catch(function(error) {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  });
};
