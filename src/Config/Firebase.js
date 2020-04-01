import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBX8y2iWPMzYx35xmu_3f3XvEUflrb5rW0",
    authDomain: "iaya-org.firebaseapp.com",
    databaseURL: "https://iaya-org.firebaseio.com",
    projectId: "iaya-org",
    storageBucket: "iaya-org.appspot.com",
    messagingSenderId: "847382060501",
    appId: "1:847382060501:web:46e769cb58850be7a0715c",
    measurementId: "G-29RH9YCDWN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
