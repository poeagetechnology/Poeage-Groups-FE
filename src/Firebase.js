import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxKgVd4kupaWKo319giKKRvXDlxapJwe0",
  authDomain: "poeage-group.firebaseapp.com",
  projectId: "poeage-group",
  storageBucket: "poeage-group.firebasestorage.app",
  messagingSenderId: "699797857061",
  appId: "1:699797857061:web:886103421533af669570cc",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);