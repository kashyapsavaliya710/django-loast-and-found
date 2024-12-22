import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDN_sJI1rDKdkgXam-R9y-tjqVPSa2AeZQ",
  authDomain: "lost-and-found-0.firebaseapp.com",
  projectId: "lost-and-found-0",
  storageBucket: "lost-and-found-0.appspot.com",
  messagingSenderId: "245444891626",
  appId: "1:245444891626:web:81f1077f2cb7dd0d2c5893"
};

const app = initializeApp(firebaseConfig);

// Get Firestore and Storage references
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
