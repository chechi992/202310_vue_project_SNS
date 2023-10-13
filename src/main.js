import "./assets/main.css"
import { createApp, provide,ref } from "vue"
import App from "./App.vue"
import router from "./router/index"
import "./assets/tailwind.css"
/* import the fontawesome  */
import { library } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
import { faUserSecret } from "@fortawesome/free-solid-svg-icons"
import { createStore } from 'vuex'

const store = createStore({
  state: {
    count: 5
  },
  getters: {
    getCounter(state) { return state.count }
  },
  mutations: {
    increment(state) {
      state.count += 1
    },
    decrement(state) {
      state.count -= 1
    }
  },
  actions: {
  },

});

const refValue = ref(7);

/* add icons to the library */
library.add(faUserSecret)

export const app = createApp({
  ...App,
  setup() {
    provide("store", store),
    provide("refValue",refValue)
  }
}).use(router).mount("#app")
