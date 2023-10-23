import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVyT9E8OAVoG9COXUYXBHhmp2bB2WKAfA",
  authDomain: "control-produccion-da559.firebaseapp.com",
  projectId: "control-produccion-da559",
  storageBucket: "control-produccion-da559.appspot.com",
  messagingSenderId: "40740312485",
  appId: "1:40740312485:web:220055f6ea0b5510b9844c"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);