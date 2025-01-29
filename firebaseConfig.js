import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAJkuiQEgCgFLd2Uts4b8H6Pwx6izHChkE",
    authDomain: "fpaexpo.firebaseapp.com",
    projectId: "fpaexpo",
    storageBucket: "fpaexpo.firebasestorage.app",
    messagingSenderId: "769791255019",
    appId: "1:769791255019:web:38bb03c9d305632797f9ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage Persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };