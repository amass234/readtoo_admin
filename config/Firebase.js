import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/messaging';

let config = {
  apiKey: "AIzaSyDFEKXM3NRxBWzKl-vJz0kyexdlkKNRDew",
  authDomain: "readtoo-base.firebaseapp.com",
  databaseURL: "https://readtoo-base.firebaseio.com",
  projectId: "readtoo-base",
  storageBucket: "readtoo-base.appspot.com",
  messagingSenderId: "757860296116"
};

const Firebase = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export default Firebase;