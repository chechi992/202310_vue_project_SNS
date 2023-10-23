<template>
  <div>
    <h1
      class="mt-10 text-6xl font-bold leading-9 tracking-tight tracking-wide text-center text-white Titan_One"
    >
      UserSettingPage
    </h1>
    <div>
      <div>
        <label for="email" class="text-white">User Email: {{ store.state.userInfo.email }}</label>
      </div>
      <div>
        <label for="displayName" class="text-white">User Name: </label>
        <span v-if="!editing" class="text-white">{{ store.state.userInfo.name }}</span>
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
import { useRoute } from "vue-router"
import { ref, onMounted } from "vue"
import store from "../store"
import router from "../router"

//router初期化
const route = useRoute()
console.log("route", route.params)
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
onMounted(async () => {
  console.log("User is logined:", store.state.userInfo)
  const userData = await store.state.FbService.getDataByDocName("users", store.state.userInfo.uid)

  if (userData) {
    // 更新名字
    store.state.userInfo.name = userData.name
    // 更新 editedDisplayName
    editedDisplayName.value = userData.name
  }
})

/**
 * 開始編輯，故一開始為true
 */
const startEditing = () => {
  editing.value = true
  editedDisplayName.value = store.state.userInfo.name
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
  editedDisplayName.value = store.state.userInfo.name
}

/**
 * 更新userprofile
 */
const updateUserProfile = async () => {
  try {
    await store.state.FbService.updateDataByDocName("users",store.state.userInfo.uid , editedDisplayName.value)
    // 將 indexUserInfo.name 設置為新的名稱

    let tmpUserInfo = store.state.userInfo
    tmpUserInfo.name = editedDisplayName.value
    store.commit("setUserInfo", tmpUserInfo);

    console.log("User profile updated successfully!", editedDisplayName.value)
  } catch (error) {
    console.error("Error updating user profile:", error)
  }
}

/**
 * ホームページへ遷移
 */
const toHomeView = () => {
  router.push({ name: "HomePage" })
}
</script>

<style scoped></style>
