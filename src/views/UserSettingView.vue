<template>
  <div>
    <h1
      class="mt-10 text-6xl font-bold leading-9 tracking-tight tracking-wide text-center text-white Titan_One"
    >
      UserSettingPage
    </h1>
    <div>
      <div>
        <label for="email">User Email: </label>
      </div>
      <div>
        <label for="displayName">User Name: </label>
      </div>
    </div>
    <button class="text-white" @click="updateUserProfile">Update Profile</button>
    <button class="text-white" @click="toHomeView">toHomeView</button>
    <!--  <button class="text-white" @click="SignOut" v-if="isLoggedIn">Sign out</button> -->
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"

import { ref, onMounted } from "vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"

const userRef = ref(null)

onMounted(() => {
  const auth = getAuth()
  const db = getFirestore()

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userRef.value = user
      console.log("User UID:", user.uid)
      const userDocRef = doc(db, "users", user.uid)
      console.log(userDocRef)
      const userDoc = await getDoc(userDocRef)
      console.log(userDoc.data())
      userRef.value = {
        ...userRef.value,
        ...userDoc.data()
      }
    }
  })
})

const updateUserProfile = async () => {
  const user = userRef.value

  // 更新用户信息
}

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
