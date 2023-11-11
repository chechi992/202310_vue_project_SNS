import { createStore } from "vuex"
import { accountState } from "./states/accountState"
import { userState } from "./states/userState"

const store = createStore({
  modules: {
    accountState: accountState,
    userState:userState
  }
})

export default store
