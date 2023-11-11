export const userState = {
  namespaced: true,
  state: {
    postsList:[],
    isLoading: false
  },
  mutations: {
    getAllPost(state, posts) {
      state.postsList = posts
    }
  },
  actions: {}
}
