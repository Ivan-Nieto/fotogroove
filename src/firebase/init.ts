import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCpuPVb9AlzYRA1AmUeUMKshCnxvbJLUIs",
  authDomain: "photogruve.firebaseapp.com",
  projectId: "photogruve",
  storageBucket: "photogruve.appspot.com",
  messagingSenderId: "97713500895",
  appId: "1:97713500895:web:8818dd2b9b3f406848af6a",
  measurementId: "G-PZLYEVZ5SD",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
