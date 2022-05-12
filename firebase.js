import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuDyT0omgNrkhls259vBomIPku-eZhTYU",
  authDomain: "docs-clone-78f96.firebaseapp.com",
  projectId: "docs-clone-78f96",
  storageBucket: "docs-clone-78f96.appspot.com",
  messagingSenderId: "519270210776",
  appId: "1:519270210776:web:f20758ab15ea1a37d2cbad",
  measurementId: "G-F1DMKWQMXN"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db =getFirestore(app)
export const auth=getAuth()
export const authProvider = new GoogleAuthProvider();
