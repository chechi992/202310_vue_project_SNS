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
import { createStore } from 'vuex'
import { FbService } from "../src/Service/FbService"

const store = createStore({
  state: {
    userInfo: { uid: "", disPlayName: "", email: "", isEmailVerified: false },
    fbService: new FbService()
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },

});



/* add icons to the library */
library.add(faUserSecret)

createApp(App).use(router).use(store).mount("#app")
