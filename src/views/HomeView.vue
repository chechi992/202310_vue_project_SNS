<template>
  <div>
    <button
      class="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      @click="toLoginPage"
    >
      toLoginPage
    </button>
  </div>
</template>

<script>
import { useRouter } from "vue-router"

export default {
  name: "HomeView",
  setup() {

    //router初期化
    const router = useRouter()
    
    /**
     * ログインページへ遷移
     */
    const toLoginPage = () => {
      router.push({ name: "LoginPage" })
    }

    return {
      toLoginPage
    }
  }
}
</script>

<style scoped>
</style>
