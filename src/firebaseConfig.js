import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

export const firebaseConfig = {
  apiKey: "AIzaSyAXLwNXt8ZHBKjSxEn5vAlx0h68N2CTkL4",
  authDomain: "vue-project-sns.firebaseapp.com",
  projectId: "vue-project-sns",
  storageBucket: "vue-project-sns.appspot.com",
  messagingSenderId: "612736006588",
  appId: "1:612736006588:web:906c1224ebe7eb57bcd3b9",
  measurementId: "G-PHMKERK8GM"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
