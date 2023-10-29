<template>
  <div v-show="isLoading" class="w-screen h-screen flex justify-center items-center">
    <customize-loading />
  </div>
  <div v-show="!isLoading" class="w-[1250px] m-auto p-0 flex">
    <div class="w-[250px] border-r-[1px] border-gray_800 h-screen fixed">
      asdasd
      <IconLabel :iconType="'fas'" :iconName="'house'" :labelText="'ホーム'" />
      <IconLabel :iconType="'fas'" :iconName="'magnifying-glass'" :labelText="'検索'" />
    </div>

    <div class="w-[850px] h-screen ml-[250px]">
      <button v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]" @click="toSettingView">
        toSettingPage
      </button>
      <button v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]" @click="signOut">
        Sign out
      </button>
      <button class="btn" v-if="!store.state.userInfo.emailVerified">未完成信箱認證</button>

      <h3 class="text-white">Count:{{ count }}</h3>

      <button v-bind:class="[customizeStyle(buttonCustomizaStyleAttribute)]" @click="showModal">
        {{ "showModal" }}
      </button>

      <div class="w-[150px] ml-[100px] bg-tahiti py-96">asdsadsa</div>
    </div>

    <div class="w-[150px] h-screen fixed ml-[1000px] border-l-[1px] border-gray_800">asdsadsa</div>
  </div>
  <CustomizeModal
    :modalIsOpen="modalIsOpen"
    :closeButtonNeed="true"
    @showModalChange="showModal"
    bodyPath="../components/Modalbodys/ModalBodySample.vue"
  />
</template>

<script setup>
import store from "../store"
import router from "../router"
import { ref, onMounted } from "vue"
import CustomizeLoading from "../components/Customizeloading.vue"
import CustomizeModal from "../components/CustomizeModal.vue"
import IconLabel from "../components/IconLabel.vue"

const count = ref(0)
//ロディングフラグ
const isLoading = ref(true)
const modalIsOpen = ref(false)
//カスタマイズ属性
const buttonCustomizaStyleAttribute = ref({ margin: 10, padding: 10, background_color: "#f43f5e" })
//カスタマイズ
// eslint-disable-next-line no-unused-vars
const customizeStyle = ({ margin: m, padding: p, background_color: bcolor }) => {
  return "text-white " + "m-[10px] " + "p-[10px] " + "rounded-md " + "bg-[#f43f5e] " + "h-[100px]"
}

onMounted(() => {
  console.log("User is logined:", store.state.userInfo)
  isLoading.value = false
})

const showModal = () => {
  modalIsOpen.value = !modalIsOpen.value
}

/**
 * ユーザログアウト
 */
const signOut = async () => {
  await store.state.AuthService.signOutAccount().then(() => {
    router.push({ name: "LoginPage" })
  })
}

/**
 * ユーザ設定ページへ遷移
 */
const toSettingView = () => {
  router.push({ name: "UserSettingPage", params: { user: "taro", age: 33 } })
}
</script>

<style scoped>
.btn {
  @apply font-bold py-2 px-4 rounded bg-tahiti;
}
</style>
