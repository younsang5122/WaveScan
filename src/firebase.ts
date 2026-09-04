import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAb7I8Kooi27l56aE9cdO27o0HB4YsdjAg",
  authDomain: "wavescan-7c487.firebaseapp.com",
  projectId: "wavescan-7c487",
  storageBucket: "wavescan-7c487.firebasestorage.app",
  messagingSenderId: "193858643707",
  appId: "1:193858643707:web:1379f192f3f7621869325e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { signInWithPopup, firebaseSignOut, onAuthStateChanged };
