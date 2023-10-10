<template>
  <div class="">
    <h1
      class="mt-10 text-6xl font-bold leading-9 tracking-tight tracking-wide text-center text-white Titan_One"
    >
      HomeView
    </h1>
    <button v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]" @click="toLoginView">
      toLoginPage
    </button>
    <button v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]" @click="toSettingView">
      toSettingPage
    </button>
    <button
      v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]"
      @click="SignOut"
      v-if="isLoggedIn"
    >
      Sign out
    </button>
    <!-- 簡單新增未完成信箱的按鈕 -->
    <button v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]" v-if="!isEmailVerified">
      未完成信箱認證
    </button>

    <h3 class="text-white">Count:{{ count }}</h3>
    <button v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]" @click="countPlus">
      {{ "CountAdd" }}
    </button>
    <div class="w-1/2 bg-tahiti py-96">asdsadsa</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { ref, onMounted } from "vue"
import { FbService } from "../Service/FbService"

const count = ref(0)
//ルーターメソッド初期化
const router = useRouter()
//Firebaseサービス初期化
const fbService = new FbService()

// const buttondefaultStyle = "text-white m-[10px] p-[10px] rounded-md bg-[#f43f5e]"

//カスタマイズ属性
const buttonCustomizaStyleAttribute = { margin: 10, padding: 10, background_color: "#f43f5e" }
//カスタマイズ
const customizeStyle = ({ margin: m, padding: p, background_color: bcolor }) => {
  return (
    "text-white " + "m-[" + m + "px] " + "p-[" + p + "px] " + "rounded-md " + "bg-[" + bcolor + "] "
  )
}

/**
 * 判斷登入登出與signout
 */
import { getAuth, onAuthStateChanged } from "firebase/auth"

const isLoggedIn = ref(false)

/**
 * 認證使用者驗證email與否
 */
const isEmailVerified = ref(false)

let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    console.log("user", user)
    if (user) {
      isLoggedIn.value = true
      // 檢查用戶是否已經通過身份驗證
      if (user.emailVerified) {
        // 用戶已通過身份驗證
        console.log("已完成身份認證")
        isEmailVerified.value = true
      } else {
        // 用戶未通過身份驗證
        console.log("未完成身份認證")
        isEmailVerified.value = false
      }
    } else {
      isLoggedIn.value = false
    }
  })
})

/**
 * ユーザログアウト
 */
const SignOut = async () => {
  await fbService.signOutAccount().then(() => {
    router.push({ name: "LoginPage" })
  })
}
/**
 * ログインページへ遷移
 */
const toLoginView = () => {
  router.push({ name: "LoginPage" })
}
/**
 * ユーザ設定ページへ遷移
 */
const toSettingView = () => {
  router.push({ name: "UserSettingPage", params: { user: "taro", age: 33 } })
}

/**
 * CountPlus
 */
const countPlus = () => {
  count.value++
}
</script>



<!-- <template>
  <div>UserSettingPage</div>
  <button @click="UserSettingPage">UserSettingPage</button>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
console.log("route", route.params);

function UserSettingPage() {
  router.push({
    name: "UserSettingPage",
    params: { user: "taro", age: 33 },
  });
}
</script>

<style scoped>
</style> -->

