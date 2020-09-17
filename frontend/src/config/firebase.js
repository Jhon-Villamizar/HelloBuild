import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAdJqME8opmLh5yQD6z5RtGm8ReBY4H1ws",
  authDomain: "genuine-grid-289704.firebaseapp.com",
  databaseURL: "https://genuine-grid-289704.firebaseio.com",
  projectId: "genuine-grid-289704",
  storageBucket: "genuine-grid-289704.appspot.com",
  messagingSenderId: "699451301641",
  appId: "1:699451301641:web:768d4a61047745299ebdd8"
};

firebase.initializeApp(config);

export default firebase;