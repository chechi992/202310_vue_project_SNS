<template>
  <div class="">
    <button v-bind:class="[buttondefaultStyle]" @click="toLoginView">toLoginPage</button>
    <button v-bind:class="[buttondefaultStyle]" @click="toSettingView">toSettingPage</button>

    <h3>Count:{{ count }}</h3>
    <button v-bind:class="[buttondefaultStyle]" @click="countPlus">
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

const buttondefaultStyle = "text-white  m-4 p-2 rounded-md bg-gray_500"

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

<style scoped>
</style>
