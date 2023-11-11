<template>
  <div class="flex flex-col-reverse p-5 m-auto min-[475px]:flex-row">
    <div
      class="hidden sm:w-1/4 sm:block first-letter:8w-1/4 border-r-[1px] border-gray_800 h-screen"
    >
      <div class="lg:hidden">
        <button class="block lg:hidden">☰</button>
      </div>
      <div class="hidden lg:block">
        <h2 class="text-xl font-semibold">設定</h2>
        <ul class="mt-4">
          <li class="mb-2">個人情報設定</li>
          <li class="mb-2">電話設定</li>
          <li class="mb-2">說明</li>
        </ul>
      </div>
    </div>

    <div v-show="user.state.isLoading" class="w-screen h-screen flex justify-center items-center">
      <Loading />
    </div>
    <div v-show="!user.state.isLoading" class="sm:w-1/2">
      <div class="w-auto">
        <div class="px-3 py-5 mx-6 mt-16 bg-gray_500">
          <div class="flex flex-col gap-3 form_group">
            <div class="flex flex-col flex-grow">
              <label class="block mb-2 text-white">メールアドレス</label>
              <label for="email" class="flex-grow p-2 text-white bg-gray_800">{{
                user.state.userInfo.email
              }}</label>
            </div>
            <div class="flex flex-col flex-grow">
              <label class="block mb-2 text-white">ユーザ名</label>
              <span v-if="!isEditing" class="p-2 text-white bg-gray_800">{{
                user.state.userInfo.name
              }}</span>
              <input
                v-if="isEditing"
                class="p-2 bg-white text-gray_800"
                v-model="editedDisplayName"
              />
            </div>
          </div>
        </div>
        <div class="mt-3 form_group">
          <button
            v-if="isEditing"
            class="text-white"
            @click="completeEditing"
            v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]"
          >
            Complete
          </button>
          <button
            v-if="isEditing"
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
    </div>
    <div v-show="!user.state.isLoading" class="">
      <div class="form_group">
        <div class="flex flex-col items-center gap-4">
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
import Loading from "@/components/Customizeloading.vue"

//router初期化
const route = useRoute()
console.log("route", route.params)
const isEditing = ref(false)
const editedDisplayName = ref("")
const account = { state: store.state.accountState, path: "accountState/" }
const user = { state: store.state.userState, path: "userState/" }

//カスタマイズ属性
const buttonCustomizaStyleAttribute = { margin: 10, padding: 10, background_color: "#f43f5e" }
//カスタマイズ
const customizeStyle = ({ margin: m, padding: p, background_color: bcolor }) => {
  return (
    "text-white " + "m-[" + m + "px] " + "p-[" + p + "px] " + "rounded-md " + "bg-[" + bcolor + "] "
  )
}

onMounted(async () => {
  console.log("User is logined:", account.state.accountInfo, "userInfo:", user.state.userInfo)
})

/**
 * 開始編輯，故一開始為true
 */
const startEditing = () => {
  isEditing.value = true
  editedDisplayName.value = user.state.userInfo.name
}

/**
 * 取消編輯
 */
const cancelEditing = () => {
  isEditing.value = false
  editedDisplayName.value = user.state.userInfo.name
}
/**
 * 完成編輯
 */
const completeEditing = async () => {
  isEditing.value = false
  store.dispatch(user.path + "updateUserInfo", {
    uid: account.state.accountInfo.uid,
    updateInfo: editedDisplayName.value
  })
}

/**
 * ホームページへ遷移
 */
const toHomeView = () => {
  router.push({ name: "HomePage" })
}
</script>

<style scoped></style>
