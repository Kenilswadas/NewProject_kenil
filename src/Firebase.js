import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfwFdkI99e1AXrefHNmQ1KT6v8ED5owwc",
  authDomain: "first-react-project-4b2eb.firebaseapp.com",
  projectId: "first-react-project-4b2eb",
  storageBucket: "first-react-project-4b2eb.appspot.com",
  messagingSenderId: "1082953687221",
  appId: "1:1082953687221:web:b7e071f5b629fcb2281efc",
  measurementId: "G-X2SXFJ5V26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);
const auth = getAuth();

export {auth,app,db};