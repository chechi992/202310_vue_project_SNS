import { createStore } from 'vuex'
import { FbService } from "./servcie/FbService"

const store = createStore({
    state: {
        userInfo: { uid: "", disPlayName: "", email: "", isEmailVerified: false },
        fbService: new FbService(),
    },
    mutations: {
        setUserInfo(state, user) {
            state.userInfo = user;
        },
    },
    actions: {

    },
});

export default store