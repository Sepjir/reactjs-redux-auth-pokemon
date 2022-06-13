import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBn6fTRsNSBNAQkTsEaJe3dpWwy6ujC18Q",
    authDomain: "reactjs-poke-auth.firebaseapp.com",
    projectId: "reactjs-poke-auth",
    storageBucket: "reactjs-poke-auth.appspot.com",
    messagingSenderId: "827528844721",
    appId: "1:827528844721:web:bb280ba76b9fb35c181990"
};

  firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth()
  const db = firebase.firestore()
  const storage = firebase.storage()

  export {auth, firebase, db, storage}