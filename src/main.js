import "./assets/main.css"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "./assets/tailwind.css"
/* import the fontawesome  */
import { library } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
import { faUserSecret } from "@fortawesome/free-solid-svg-icons"
/* add icons to the library */
library.add(faUserSecret)

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebaseConfig" // 你的 Firebase auth 實例
const app = createApp(App)

// 在 Vue 3 中，你可能需要使用 provide 和 inject 來全局訪問 auth 實例
app.provide("auth", auth)

// 在應用程序初始化時監聽用戶的身份狀態變化
onAuthStateChanged(auth, (user) => {
  if (user) {
    // 用戶已經登錄，可以執行相應的處理
    console.log("User is logged in:", user)

    // 在這裡你可以根據用戶的身份狀態進行相應的導航
    // 例如，如果用戶已經登錄，可以將其導向已驗證的頁面
    // 如果用戶未登錄，可以將其導向登錄頁面
    router.push({ name: "HomePage" }) // 導向已驗證的頁面
  } else {
    // 用戶未登錄或登出，可以執行相應的處理
    console.log("User is logged out")
  }
})

createApp(App).use(router).mount("#app")
