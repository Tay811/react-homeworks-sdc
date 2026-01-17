import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAl_FigxoAP-dbBYv3f6zzgZlVqr608rY",
  authDomain: "react-75b38.firebaseapp.com",
  projectId: "react-75b38",
  storageBucket: "react-75b38.firebasestorage.app",
  messagingSenderId: "15560813340",
  appId: "1:15560813340:web:0f5dff4639aca3e73c28d9",
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const db: Firestore = getFirestore(app);

export default app;
