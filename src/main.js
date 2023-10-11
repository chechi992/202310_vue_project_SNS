import "./assets/main.css"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index"
import "./assets/tailwind.css"
/* import the fontawesome  */
import { library } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
import { faUserSecret } from "@fortawesome/free-solid-svg-icons"
/* add icons to the library */
library.add(faUserSecret)

createApp(App).use(router).mount("#app")
