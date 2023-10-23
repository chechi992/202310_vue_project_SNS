import { createStore } from 'vuex'
import { AuthService } from "./servcie/AuthService"
import { FbService } from "./servcie/FbService"

const store = createStore({
    state: {
        userInfo: { uid: "", name: "", email: "", isEmailVerified: false },
        AuthService: new AuthService(),
        FbService: new FbService(),
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