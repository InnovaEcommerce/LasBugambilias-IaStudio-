import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Initialize Firestore specifying the databaseId from our configuration file
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Test the connection in a non-blocking way on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'settings', 'images'));
    console.log("Firebase Firestore initialized and tested successfully.");
  } catch (error) {
    console.warn("Optional connection check message (this is normal if settings doc hasn't been saved yet):", error);
  }
}
testConnection();
