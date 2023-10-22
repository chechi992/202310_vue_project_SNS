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

/**
 * 路由導航_米
 */
router.beforeEach(async (to, from, next) => {
  console.log("beforeEach to", to)
  console.log("beforeEach from", from)
  // 使用者未登入
  if (!indexUserInfo.uid) {
    try {
      const result = await authStateChanged()
      if (result.uid) {
        if (from.fullPath === to.fullPath && to.name !== "Home") {
          // 使用者已登入且從 LoginPage 到 HomePage，則使用 next({ name: "Home" }) 將路由導向到名稱為 "Home" 的路由。
          next({ name: "HomePage" })
        } else if (from.fullPath !== to.fullPath && to.name !== "Login") {
          // 使用者未登入，則使用 next({ name: "Login" }) 將路由導向到名稱為 "Login" 的路由。
          next({ name: "LoginPage" })
        } else {
          next() // 繼續原本的導航
        }
      } else {
        next() // 繼續原本的導航
      }
    } catch (error) {
      console.error("Error during authentication check:", error)
      next({ name: "LoginPage" }) // 錯誤時導航到 LoginPage
    }
  } else {
    // 如果使用者已登入，繼續導航
    next()
  }
})

/* //遷移前に処理する(router.push使ったら、触発する)
router.beforeEach(async (to, from, next) => {
  console.log("beforeEach to", to);
  console.log("beforeEach from", from);

  if (!indexUserInfo.uid) {
    await authStateChanged()
      .then((result) => {
        if (result.uid) {
          //LoginPageにいて、ユーザログインしてる場合 → HomePageへ遷移
          if (from.fullPath === to.fullPath) {
            router.push({ name: "HomePage" })
          }
        }
        if (!result) {
          console.log("Not Found Account");
          //LoginPageにいなくて、ユーザログインしていない場合 → LoginPageへ遷移
          if (to.fullPath !== from.fullPath) {
            router.push({ name: "LoginPage" })
          }
        }
      })
  }

  //遷移ためnext()を使用する;
  next();
}) */

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
      } else {
        result = false
      }
      resolve(result)
    })
  })
}

export default router
