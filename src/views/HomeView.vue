<template>
  <div class="w-[1250px] m-auto p-0 flex">
    <div class="w-[250px] border-r-[1px] border-gray_800 h-screen fixed">asdasd</div>

    <div class="w-[850px] h-screen ml-[250px]">
      <button v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]" @click="toSettingView">
        toSettingPage
      </button>
      <button v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]" @click="signOut">
        Sign out
      </button>
      <button
        v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]"
        v-if="!store.state.userInfo.emailVerified"
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
import { ref, onMounted } from "vue"
import { useStore } from "vuex"
import { indexUserInfo } from "../router/index"

const store = useStore()
const count = ref(0)
//ルーターメソッド初期化
const router = useRouter()
//カスタマイズ属性
const buttonCustomizaStyleAttribute = ref({ margin: 10, padding: 10, background_color: "#f43f5e" })
//カスタマイズ
// eslint-disable-next-line no-unused-vars
const customizeStyle = ({ margin: m, padding: p, background_color: bcolor }) => {
  return "text-white " + "m-[10px] " + "p-[10px] " + "rounded-md " + "bg-[#f43f5e] " + "h-[100px]"
}

onMounted(() => {
  store.state.userInfo = indexUserInfo
  console.log("User is logined:", store.state.userInfo)
})

/**
 * ユーザログアウト
 */
const signOut = async () => {
  await store.state.fbService.signOutAccount().then(() => {
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
