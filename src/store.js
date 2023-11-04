import { createStore } from "vuex"
import { AuthService } from "./servcie/AuthService"
import { FbService } from "./servcie/FbService"

const store = createStore({
  state: {
    userInfo: { uid: "", name: "", email: "", isEmailVerified: false },
    AuthService: new AuthService(),
    FbService: new FbService(),
    screenInfo: { width: 0, height: 0 }
  },
  mutations: {
    getScreenInfo(state) {
      state.screenInfo = {
        ...state.screenInfo,
        width: window.innerWidth,
        height: window.innerHeight
      }
    },
    setUserInfo(state, user) {
      state.userInfo = user
    }
  },
  actions: {}
})

export default store
