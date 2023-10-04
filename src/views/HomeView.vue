<template>
  
  <div class="box-border h-20 w-screen p-4 bg-teal-200">
    <button
      class="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      @click="toLoginView"
    >
      toLoginPage
    </button>
    <button
      class="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      @click="toSettingView"
    >
      toSettingPage
    </button>
  </div>
  <h3>Count:{{ count }}</h3>
  <button
    class="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    @click="countPlus"
  >
    {{"CountAdd"}}
  </button>
</template>

<script>
import { useRouter } from "vue-router"
import { ref } from "vue"
export default {
  name: "HomeView",
  setup() {
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

    return {
      toLoginView,
      toSettingView,
      countPlus,
      count
    }
  }
}
</script>

<style scoped>
</style>
