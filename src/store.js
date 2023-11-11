import { createStore } from "vuex"
import { accountState } from "./states/accountState"

const store = createStore({
  modules: {
    accountState: accountState
  }
})

export default store
