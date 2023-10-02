import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAXLwNXt8ZHBKjSxEn5vAlx0h68N2CTkL4",
  authDomain: "vue-project-sns.firebaseapp.com",
  projectId: "vue-project-sns",
  storageBucket: "vue-project-sns.appspot.com",
  messagingSenderId: "612736006588",
  appId: "1:612736006588:web:906c1224ebe7eb57bcd3b9",
  measurementId: "G-PHMKERK8GM"
}

firebase.initializeApp(firebaseConfig)
export const firesotre = firebase.firestore()
