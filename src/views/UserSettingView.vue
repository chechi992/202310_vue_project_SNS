<template>
    <div>
      <button
        class="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="toHomeView"
      >
      toHomeView
      </button>
    </div>
  </template>
  
  <script>
  import { useRouter } from "vue-router"
  
  export default {
    name: "UserSettingView",
    setup() {
  
      //router初期化
      const router = useRouter()
      
      /**
       * ホームページへ遷移
       */
      const toHomeView = () => {
        router.push({ name: "HomePage" })
      }
  
      return {
        toHomeView
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  