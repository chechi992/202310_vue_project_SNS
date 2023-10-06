<template>
  <div>
    <button class="text-white" @click="toHomeView">toHomeView</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"

//router初期化
const router = useRouter()

/**
 * ホームページへ遷移
 */
const toHomeView = () => {
  router.push({ name: "HomePage" })
}
</script>

<style scoped></style>
