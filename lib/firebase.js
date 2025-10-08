import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ***** VAAHAN SURAKSHA *****
const firebaseConfig = {
    apiKey: "AIzaSyA6hPiCznDoKTgZQ-mI8jTUDI8tgNZrrx0",
    authDomain: "vahan-suraksha-d2181.firebaseapp.com",
    projectId: "vahan-suraksha-d2181",
    storageBucket: "vahan-suraksha-d2181.firebasestorage.app",
    messagingSenderId: "1056503336845",
    appId: "1:1056503336845:web:9f2f96bb4e0e0e761e77c4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 