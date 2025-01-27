// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6QzDIrWe0I5NFl8C8t4BqpU5fAkIo9WM",
  authDomain: "react-app-62b99.firebaseapp.com",
  projectId: "react-app-62b99",
  storageBucket: "react-app-62b99.firebasestorage.app",
  messagingSenderId: "1355297493",
  appId: "1:1355297493:web:445d38f9bd99028df5a85c",
  measurementId: "G-83FX4QZCJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth=getAuth(app)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db=getFirestore(app)