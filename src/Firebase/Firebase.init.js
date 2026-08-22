import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApD6lS9JNfxtqCbWred8qDqA6YWT0xm-g",
  authDomain: "zestro-aa1be.firebaseapp.com",
  projectId: "zestro-aa1be",
  storageBucket: "zestro-aa1be.firebasestorage.app",
  messagingSenderId: "984634363310",
  appId: "1:984634363310:web:4320b43c8e4b4dd1b14c3f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);