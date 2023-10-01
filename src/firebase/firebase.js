import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDRccd2tarLyaXpjOKqF_2YiraGnQHdaJQ",
    authDomain: "movieproject-e1e03.firebaseapp.com",
    databaseURL: "https://movieproject-e1e03-default-rtdb.firebaseio.com",
    projectId: "movieproject-e1e03",
    storageBucket: "movieproject-e1e03.appspot.com",
    messagingSenderId: "1005915548121",
    appId: "1:1005915548121:web:cb114a486b18f37c5f51c8"
  };
  const app = initializeApp(firebaseConfig);  
  export const auth=getAuth(app)