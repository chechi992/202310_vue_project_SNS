import { createStore } from "vuex"
import { accountState } from "./state/accountState"

const store = createStore({
  modules: {
    accountState: accountState
  }
})

export default store
