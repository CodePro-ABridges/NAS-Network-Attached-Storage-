import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA5JCNBOrufoFcQrF9CmORTNPt_oGZfxHc",

  authDomain: "nas-file-management-system.firebaseapp.com",

  projectId: "nas-file-management-system",

  storageBucket: "nas-file-management-system.appspot.com",

  messagingSenderId: "83944332840",

  appId: "1:83944332840:web:d1019eeb19f76f63aedf1d",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
