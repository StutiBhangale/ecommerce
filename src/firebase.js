import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6TDB2UcTTUjVG4rJBdf7lZJmOXOq6gYQ",
  authDomain: "ecommerce-a442a.firebaseapp.com",
  projectId: "ecommerce-a442a",
  storageBucket: "ecommerce-a442a.appspot.com",
  messagingSenderId: "205030449261",
  appId: "1:205030449261:web:23bda1c6e6cc4b89ec9f64",
  measurementId: "G-LJT08GDE04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

export const db = getFirestore(app);
