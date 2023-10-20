import { createRouter, createWebHistory } from "vue-router"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebaseConfig"
import UserSettingView from "../views/UserSettingView.vue"
import RegisterView from "../views/RegisterView.vue"
import LoginView from "../views/LoginView.vue"
import HomeView from "../views/HomeView.vue"

export let indexUserInfo = { uid: "", disPlayName: "", email: "", isEmailVerified: false }
const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginView
  },
  {
    path: "/Home",
    name: "HomePage",
    component: HomeView
  },
  {
    path: "/Setting",
    name: "UserSettingPage",
    component: UserSettingView
  },
  {
    path: "/Register",
    name: "RegisterPage",
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//遷移前に処理する(router.push使ったら、触発する)
router.beforeEach(async (to, from, next) => {
  console.log("beforeEach to", to);
  console.log("beforeEach from", from);

  if (!indexUserInfo.uid) {
    await authStateChanged()
      .then((result) => {
        if (result.uid) {
          //LoginPageにいて、ユーザログインしてる場合 → HomePageへ遷移
          if (from.fullPath === "/" && to.fullPath === "/" ) 
            router.push({ name: "HomePage" })
        }
        if (!result) {
          //例外
          if (to.fullPath === "/Register"  || from.fullPath === "/Register") 
            console.log("登録画面");
          //LoginPageにいなくて、ユーザログインしていない場合 → LoginPageへ遷移
          else if (to.fullPath === "/" && from.fullPath !== "/") {
            router.push({ name: "LoginPage" })
            console.log("Not Found Account");
          }
        }
      })
  }

  //遷移ためnext()を使用する;
  next();
})

/**
 * ユーザログイン有無確認する(async化になる)
 * @returns ある場合ユーザ情報返す、ない場合false
 */
const authStateChanged = () => {
  let result
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        indexUserInfo = {
          ...indexUserInfo,
          ...user
        }
        result = indexUserInfo
        console.log("indexUserInfo", indexUserInfo)
      } else 
        result = false
        
      resolve(result)
    })
  })
}

export default router
