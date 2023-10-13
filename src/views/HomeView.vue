<template>
  <div class="w-[1250px]  m-auto p-0  flex">
    <div class="w-[250px] border-r-[1px] border-gray_800 h-screen fixed ">asdasd</div>
    <div class="w-[850px] h-screen ml-[250px] ">
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
      <button
        v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]"
        v-if="!isEmailVerified"
      >
        未完成信箱認證
      </button>

      <h3 class="text-white">Count:{{ count }}</h3>
      <button v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]" @click="countPlus">
        {{ "CountAdd" }}
      </button>

      <div class="w-[150px] ml-[100px] bg-tahiti py-96">asdsadsa</div>
    </div>

    <div class="w-[150px] h-screen fixed ml-[1000px] border-l-[1px] border-gray_800">asdsadsa</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { ref, onMounted,inject } from "vue"
import { FbService } from "../Service/FbService"
import { getAuth, onAuthStateChanged } from "firebase/auth"
// import { useStore } from 'vuex'

const store = inject("store")
console.log(store.state.count);

const refValue = inject("refValue")
console.log(refValue.value);

// const store = useStore()
// console.log(store.state.count);
// console.log(store.getters.getCounter);
// store.commit('increment');
// console.log(store.state.count);

const count = ref(0)
//ルーターメソッド初期化
const router = useRouter()
//Firebaseサービス初期化
const fbService = new FbService()
//判斷登入登出與signout
const isLoggedIn = ref(false)
//認證使用者驗證email與否
const isEmailVerified = ref(false)
//カスタマイズ属性
const buttonCustomizaStyleAttribute = ref({ margin: 10, padding: 10, background_color: "#f43f5e" })
//カスタマイズ
const customizeStyle = ({ margin: m, padding: p, background_color: bcolor }) => {
  return (
    "text-white " +
    "m-[" +
    m +
    "px] " +
    "p-[" +
    p +
    "px] " +
    "rounded-md " +
    "bg-[" +
    bcolor +
    "] " +
    "h-[100px]"
  )
}

onMounted(() => {
  const auth = getAuth()
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


