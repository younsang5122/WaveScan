import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAb7I8Kooi27l56aE9cdO27o0HB4YsdjAg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "wavescan-7c487.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "wavescan-7c487",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "wavescan-7c487.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "193858643707",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:193858643707:web:1379f192f3f7621869325e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { signInWithPopup, firebaseSignOut, onAuthStateChanged };
