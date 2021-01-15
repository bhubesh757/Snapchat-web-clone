// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2eZXBqJk_haIlNRtYBRhByZkoo7zxtRo",
  authDomain: "snapchat-clone-44409.firebaseapp.com",
  projectId: "snapchat-clone-44409",
  storageBucket: "snapchat-clone-44409.appspot.com",
  messagingSenderId: "744511364220",
  appId: "1:744511364220:web:9ca15ab9e47047b9167df9",
  measurementId: "G-B9S86J1LFF"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  // authentication 
  const auth = firebase.auth();
  // const login = firebase.login()
  const storage = firebase.storage();

  const provider = new firebase.auth.GoogleAuthProvider();
  
  export {db , auth , provider ,storage};

  export default firebase