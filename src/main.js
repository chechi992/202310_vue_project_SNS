import "./assets/main.css"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index"
import { createStore } from 'vuex'
import { FbService } from "./servcie/FbService"

import "./assets/tailwind.css"
/* import the fontawesome  */
import { library } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
import { faUserSecret} from "@fortawesome/free-solid-svg-icons"


const store = createStore({
  state: {
    userInfo: { uid: "", disPlayName: "", email: "", isEmailVerified: false },
    fbService: new FbService(),
    count: 0,
  },
  mutations: {
    plus(state) {
      state.count++;
    }
  },
  actions: {
    increment(store, count) {
      setTimeout(() => {
        store.commit("plus", count)
      }, 2000)
    }
  },
});



/* add icons to the library */
library.add(faUserSecret)

createApp(App).use(router).use(store).mount("#app")
