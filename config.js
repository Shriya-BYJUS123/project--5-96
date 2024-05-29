import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCM9zdZKwUbK3y0ZgjOLx_folxChX-QgVM",
    authDomain: "eventplanningapp-c519f.firebaseapp.com",
    databaseURL: "https://eventplanningapp-c519f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "eventplanningapp-c519f",
    storageBucket: "eventplanningapp-c519f.appspot.com",
    messagingSenderId: "189270452060",
    appId: "1:189270452060:web:961b6d54670f4a6f5fc399"
  };
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app)
  export default db