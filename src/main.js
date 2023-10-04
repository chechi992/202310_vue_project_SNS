import "./assets/main.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

import "./assets/tailwind.css"

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core"

/* import font awesome icon component */ /* 
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
 */
/* import specific icons */

import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"

import { faUserSecret } from "@fortawesome/free-solid-svg-icons"

/* add icons to the library */
library.add(faUserSecret)

createApp(App).use(router).mount("#app")
