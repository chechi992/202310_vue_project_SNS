<template>
  <div v-show="!isLoading" class="w-[1250px] m-auto p-0 flex">
    <div class="w-[250px] border-r-[1px] border-gray_800 h-screen fixed">asdasd</div>

    <div class="w-[600px] h-screen ml-[250px] border-gray_800">
      <div class="w-auto">
        <div class="px-3 py-5 mx-6 mt-16 bg-gray_500">
          <div class="flex flex-col gap-3 form_group">
            <div class="flex flex-col flex-grow">
              <label class="block mb-2 text-white">メールアドレス</label>
              <label for="email" class="flex-grow p-2 text-white bg-gray_800">{{
                store.state.userInfo.email
              }}</label>
            </div>
            <div class="flex flex-col flex-grow">
              <label class="block mb-2 text-white">ユーザ名</label>
              <span v-if="!editing" class="p-2 text-white bg-gray_800">{{
                store.state.userInfo.name
              }}</span>
              <input
                v-if="editing"
                class="p-2 bg-white text-gray_800"
                v-model="editedDisplayName"
              />
            </div>
          </div>
          <div class="mt-3 form_group">
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
          </div>
        </div>

        <!-- <button class="text-white" @click="SignOut" v-if="isLoggedIn">Sign out</button> -->
      </div>
    </div>

    <div class="w-[250px] h-screen fixed ml-[900px] border-l-[1px] border-gray_800">
      <div class="form_group">
        <div class="flex flex-col items-start gap-4">
          <div class="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-full">
            <!-- 放置icon -->
            <img src="" alt="User Icon" class="w-12 h-12 rounded-full" />
          </div>
          <input type="file" id="userImage" name="userImage" class="hidden" />
          <label
            for="userImage"
            class="flex justify-center px-3 py-1 text-sm font-semibold leading-6 text-white rounded-md shadow-sm w-25 bg-purple hover:bg-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            画像アップロード
          </label>
        </div>
      </div>
    </div>
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
    await store.state.FbService.updateDataByDocName(
      "users",
      store.state.userInfo.uid,
      editedDisplayName.value
    )
    // 將 indexUserInfo.name 設置為新的名稱

    let tmpUserInfo = store.state.userInfo
    tmpUserInfo.name = editedDisplayName.value
    store.commit("setUserInfo", tmpUserInfo)

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
