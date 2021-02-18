import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyAoZ-1yoD6hTP3hR1WFAPSmEpjzWODZvtM",
    authDomain: "react-rym.firebaseapp.com",
    databaseURL: "https://react-rym.firebaseio.com",
    projectId: "react-rym",
    storageBucket: "react-rym.appspot.com",
    messagingSenderId: "604166040881",
    appId: "1:604166040881:web:20b0715d749d28de7d1410",
    measurementId: "G-MTHG9VY085"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

 let db = firebase.firestore().collection('favs')

export function getFavs(uid) {
  return db.doc(uid).get()
    .then(snap => {
      return snap.data().array
    })
}

export function updateDB( array, uid ) {
  return db.doc(uid).set({ array })
}

  export function singOutGoogle() {
    firebase.auth().signOut()
  }

  export function loginWithGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider()
      return firebase.auth().signInWithPopup(provider)
        .then(snap => snap.user)
  }
