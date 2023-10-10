<template>
  <div>
    <h1
      class="mt-10 text-6xl font-bold leading-9 tracking-tight tracking-wide text-center text-white Titan_One"
    >
      UserSettingPage
    </h1>
    <button class="text-white" @click="toHomeView">toHomeView</button>
     <!--  <button class="text-white" @click="SignOut" v-if="isLoggedIn">Sign out</button> -->
  </div>
</template> 

<script setup>
import { useRoute, useRouter } from "vue-router"
import { onMounted, ref } from "vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const isLoggedIn = ref(false)
let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

//router初期化
const router = useRouter()
const route = useRoute()
console.log("route", route.params)

/**
 * ホームページへ遷移
 */
const toHomeView = () => {
  router.push({ name: "HomePage" })
}
</script>

<style scoped></style>






