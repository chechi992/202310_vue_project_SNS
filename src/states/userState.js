import { FbService } from "../servcies/FbService"
const fbService = new FbService()

export const userState = {
  namespaced: true,
  state: {
    userInfo: { uid: "", name: "", photoUrl: "", followUsersUid: [], firendsUid: [] },
    isLoading: false,
    errMessage: ""
  },
  mutations: {
    setUserInfo(state, { userInfo }) {
      state.userInfo = userInfo
    },
    loading(state) {
      state.isLoading = true
    },
    updateSuccess(state, { updateInfo }) {
      state.userInfo.name = updateInfo
      state.isLoading = false
    },
    updateFail(state) {
      state.isLoading = false
      state.errMessage = "err"
    }
  },
  actions: {
    async updateUserInfo({ commit }, { uid, updateInfo }) {
      commit("loading")
      try{
        await fbService.updateDataByDocName("users", uid, updateInfo)
        commit("updateSuccess", { updateInfo: updateInfo })
        console.log('updateSuccess :',updateInfo);
      }catch(e){
        commit("updateFail")
        console.log(e)
      }
    }
  }
}
