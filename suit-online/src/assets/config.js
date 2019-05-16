
import * as firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyD3pDawLP3DHj3D8fGUA23iZZuOT0ly2tU",
  authDomain: "rps-hacktiv8.firebaseapp.com",
  databaseURL: "https://rps-hacktiv8.firebaseio.com",
  projectId: "rps-hacktiv8",
  storageBucket: "rps-hacktiv8.appspot.com",
  messagingSenderId: "525684810443",
  appId: "1:525684810443:web:55dab42f1e0c8f40"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

var db = firebase.firestore()

export default db