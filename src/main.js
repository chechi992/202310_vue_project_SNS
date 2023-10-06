import "./assets/main.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

import "./assets/tailwind.css"

/* import the fontawesome  */
import { library } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
import { faUserSecret } from "@fortawesome/free-solid-svg-icons"

/* add icons to the library */
library.add(faUserSecret)

/* firebase */

import { initializeApp } from "firebase/app"
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

initializeApp(firebaseConfig)

createApp(App).use(router).mount("#app")
