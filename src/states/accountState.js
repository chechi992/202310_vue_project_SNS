import { AuthService } from "../servcies/AuthService"
import router from "../router"
import { FbService } from "../servcies/FbService"

const authService = new AuthService()
const fbService = new FbService()

export const accountState = {
  namespaced: true,
  state: {
    accountInfo: { uid: "", email: "", isEmailVerified: false },
    isLoading: false,
    errMessage: "",
    registerErrMsg: "",
    //↓screenInfo 先不要管
    screenInfo: { width: window.innerWidth, height: window.innerHeight }
  },
  mutations: {
    //↓getScreenInfo 先不要管
    getScreenInfo(state) {
      state.screenInfo = {
        ...state.screenInfo,
        width: window.innerWidth,
        height: window.innerHeight
      }
    },
    loading(state) {
      state.isLoading = true
    },
    logout(state) {
      state.accountInfo = { uid: "", isEmailVerified: false }
    },
    loginSuccess(state, { accountInfo }) {
      state.accountInfo = accountInfo
      state.isLoading = false
    },
    loginFail(state, msg) {
      state.errMessage = msg
      state.isLoading = false
    },
    registerFail(state, msg) {
      state.registerErrMsg = msg
      state.isLoading = false
    }
  },
  actions: {
    async register({ commit }, { registerInfo }) {
      commit("loading")
      const registerResult = await authService.registerAccount(registerInfo)
      if (registerResult) {
        await authService.sendVerificationMail(registerResult)
        const loginInfo = { email: registerInfo.email, pwd: registerInfo.pwd }
        const loginResult = await authService.singnInAccount(loginInfo)
        if (loginResult.uid) {
          const userInfo = await fbService.getDataByDocName("users", loginResult.uid)
          commit("userState/setUserInfo", { userInfo: userInfo }, { root: true })
          commit("loginSuccess", { accountInfo: loginResult })
          router.push({ name: "HomePage" })
        } else {
          commit("loginFail", loginResult)
        }
      } else {
        commit("registerFail", registerResult)
      }
    },

    async login({ commit }, { loginInfo }) {
      commit("loading")
      const loginResult = await authService.singnInAccount(loginInfo)
      if (loginResult.uid) {
        const userInfo = await fbService.getDataByDocName("users", loginResult.uid)
        commit("userState/setUserInfo", { userInfo: userInfo }, { root: true })
        commit("loginSuccess", { accountInfo: loginResult })
        router.push({ name: "HomePage" })
      } else {
        commit("loginFail", loginResult)
      }
    },

    logout({ commit }) {
      authService.signOutAccount()
      commit("logout")
      router.push({ name: "LoginPage" })
    }
  }
}
