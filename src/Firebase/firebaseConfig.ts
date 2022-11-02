// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Config from "react-native-config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: Config.FIREBASE_API_KEY,
	authDomain: Config.FIREBASE_AUTH_DOMAIN,
	projectId: Config.FIREBASE_PROJECT_ID,
	storageBucket: Config.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
	appId: Config.FIREBASE_APP_ID,
	measurementId: Config.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
