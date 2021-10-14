import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCV2UFq2s53inW3Tp6uvf_xp5ESejxz8Jg",
  authDomain: "fs-e1bc0.firebaseapp.com",
  projectId: "fs-e1bc0",
  storageBucket: "fs-e1bc0.appspot.com",
  messagingSenderId: "55057648877",
  appId: "1:55057648877:web:1f058ae48d336b1b6a50e4",
  measurementId: "G-ZT86TLCXPT"
}

//initialising the firebase app.
const firebaseApp = firebase.initializeApp(firebaseConfig);

//initialise the firestore database
const db = firebaseApp.firestore();

//for authentication
const auth = firebase.auth();

export { db, auth };
