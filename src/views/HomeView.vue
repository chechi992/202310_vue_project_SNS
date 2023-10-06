<template>
  <div class="">
    <button v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]" @click="toLoginView">toLoginPage</button>
    <button v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]" @click="toSettingView">toSettingPage</button>

    <h3 class="text-white" >Count:{{ count }}</h3>
    <button v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]" @click="countPlus">
      {{ "CountAdd" }}
    </button>
    <div class="bg-tahiti py-96 w-1/2">asdsadsa</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { ref } from "vue"

const count = ref(0)
//ルーター初期化
const router = useRouter()

// const buttondefaultStyle = "text-white m-[10px] p-[10px] rounded-md bg-[#f43f5e]"

//カスタマイズ属性
const buttonCustomizaStyleAttribute = { margin: 10, padding: 10, background_color: "#f43f5e" }
//カスタマイズ
const customizeStyle = ({ margin: m, padding: p, background_color: bcolor }) => {
  return "text-white " +
    "m-[" + m + "px] " +
    "p-[" + p + "px] " + 
    "rounded-md " +
    "bg-[" + bcolor + "] ";
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
  router.push({ name: "UserSettingPage" })
}

/**
 * CountPlus
 */
const countPlus = () => {
  count.value++
}
</script>
