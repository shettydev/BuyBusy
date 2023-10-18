
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLIOtQZJVmWf84gIkzCrIC3LWiiYPldzY",
  authDomain: "buybusy-725d6.firebaseapp.com",
  projectId: "buybusy-725d6",
  storageBucket: "buybusy-725d6.appspot.com",
  messagingSenderId: "822787402786",
  appId: "1:822787402786:web:d47efd209276c36291ee7b",
  measurementId: "G-FZ1J7G9KP4"
};

// ********* Initialize Firebase *********
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);


