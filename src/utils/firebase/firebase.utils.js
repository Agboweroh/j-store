// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth, 
    // signInWithRedirect,
    //  signinWithPoppUp,
      GoogleAuthProvider,
      signInWithPopup
    } from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,

} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-e2VrK8WP11iisBDtIemMM2mvK13scnU",
  authDomain: "j-store-6ea64.firebaseapp.com",
  projectId: "j-store-6ea64",
  storageBucket: "j-store-6ea64.appspot.com",
  messagingSenderId: "531269672647",
  appId: "1:531269672647:web:9efefc038a40dfd343a8e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account",

});


export const auth = getAuth();
export const signinWithGooglePoppUp =  ()=>signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth =  async (userAuth) =>{
  const userDocRef = doc(db,'users',userAuth.uid)
  console.log(userDocRef)
  const userSnapshot = await  getDoc(userDocRef)
  console.log(userSnapshot.exists())
   

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log('there was an error creating the user', error.message)
    }
    
  }

return userDocRef
}