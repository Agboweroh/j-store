// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

import {
	getAuth,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC-e2VrK8WP11iisBDtIemMM2mvK13scnU",
	authDomain: "j-store-6ea64.firebaseapp.com",
	projectId: "j-store-6ea64",
	storageBucket: "j-store-6ea64.appspot.com",
	messagingSenderId: "531269672647",
	appId: "1:531269672647:web:9efefc038a40dfd343a8e2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signinWithGooglePoppUp = () =>
	signInWithPopup(auth, googleProvider);
export const db = getFirestore();
// create user
export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
	if (!userAuth) return;
	const userDocRef = doc(db, "users", userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
        ...additionalInformation
			});
		} catch (error) {
			console.log("there was an error creating the user", error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};
