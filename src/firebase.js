// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCYXcibxc2c8zgzrzu6aEdz43oA3RvbvLw",
  authDomain: "brainshub00.firebaseapp.com",
  projectId: "brainshub00",
  storageBucket: "brainshub00.firebasestorage.app",
  messagingSenderId: "305087704913",
  appId: "1:305087704913:web:dbf6b7df9bb553e3c26d70"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore=getFirestore(app);
export { firestore };
