import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDNwH47dDFv_1GmjOiK_Rf9Il8wdIoskY8",
    authDomain: "drive498react.firebaseapp.com",
    projectId: "drive498react",
    storageBucket: "drive498react.appspot.com",
    messagingSenderId: "177008015194",
    appId: "1:177008015194:web:bbd69f5559848858d62563"
  };
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
