<template>
  <div class="">
    <button class="text-white" @click="toLoginView">toLoginPage</button>
    <button class="text-white" @click="toSettingView">toSettingPage</button>

    <h3>Count:{{ count }}</h3>
    <button class="text-white" @click="countPlus">
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
