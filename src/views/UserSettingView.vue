<template>
  <div>
    <h1
      class="mt-10 text-6xl font-bold leading-9 tracking-tight tracking-wide text-center text-white Titan_One"
    >
      UserSettingPage
    </h1>
    <div>
      <div>
        <label for="email" class="text-white">User Email: {{ userRef.email }}</label>
      </div>
      <div>
        <label for="displayName" class="text-white">User Name: </label>
        <span v-if="!editing" class="text-white">{{ userRef.name }}</span>
        <input v-if="editing" v-model="editedDisplayName" />
        <button
          v-if="editing"
          class="text-white"
          @click="completeEditing"
          v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]"
        >
          Complete
        </button>
        <button
          v-if="editing"
          class="text-white"
          @click="cancelEditing"
          v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]"
        >
          Cancel
        </button>
      </div>
    </div>
    <button
      class="text-white"
      v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]"
      @click="startEditing"
    >
      Edit Profile
    </button>
    <button
      class="text-white"
      v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]"
      @click="toHomeView"
    >
      toHomeView
    </button>
    <!-- <button class="text-white" @click="SignOut" v-if="isLoggedIn">Sign out</button> -->
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"

import { ref, onMounted, watch } from "vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"

const userRef = ref({ email: "", name: "" })
const editing = ref(false)
const editedDisplayName = ref("")

//カスタマイズ属性
const buttonCustomizaStyleAttribute = { margin: 10, padding: 10, background_color: "#f43f5e" }
//カスタマイズ
const customizeStyle = ({ margin: m, padding: p, background_color: bcolor }) => {
  return (
    "text-white " + "m-[" + m + "px] " + "p-[" + p + "px] " + "rounded-md " + "bg-[" + bcolor + "] "
  )
}

/**
 * 抓取用戶資料
 */
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
      editedDisplayName.value = userRef.value.name
    }
  })

  /**
   * 監聽editedDisplayName的變化，並確保在取消編輯時退回原始值
   */
  watch(editedDisplayName, (newValue, oldValue) => {
    console.log(oldValue)
    if (!editing.value && newValue !== userRef.value.name) {
      editedDisplayName.value = userRef.value.name
    }
  })
})

/**
 * 開始編輯，故一開始為true
 */
const startEditing = () => {
  editing.value = true
  editedDisplayName.value = userRef.value.name
}

/**
 * 完成編輯
 */
const completeEditing = () => {
  editing.value = false
  updateUserProfile()
}
/**
 * 取消編輯
 */
const cancelEditing = () => {
  editing.value = false
  editedDisplayName.value = userRef.value.name
}

/**
 * 更新userprofile
 */
const updateUserProfile = async () => {
  try {
    const user = userRef.value
    const db = getFirestore()
    const userDocRef = doc(db, "users", user.uid)

    await updateDoc(userDocRef, {
      name: editedDisplayName.value
    })

    userRef.value = {
      ...userRef.value,
      name: editedDisplayName.value
    }
    console.log("User profile updated successfully!", editedDisplayName.value)
  } catch (error) {
    console.error("Error updating user profile:", error)
  }
}

/**
 * 確認login與否
 */
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
