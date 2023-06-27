// import firebase from "firebase";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDhuwVn6EGJcsYUIEP8MKQoc1qEjfe-g6Y",
    authDomain: "clone-e9ba1.firebaseapp.com",
    projectId: "clone-e9ba1",
    storageBucket: "clone-e9ba1.appspot.com",
    messagingSenderId: "977625282273",
    appId: "1:977625282273:web:96bf960716ef2d6bc129a0",
    measurementId: "G-X24LBHNZRR"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };