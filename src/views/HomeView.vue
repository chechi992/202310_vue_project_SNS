<template>
  <div v-show="isLoading" class="w-screen h-screen flex justify-center items-center">
    <Loading />
  </div>
  <div v-show="!isLoading" class="w-[1250px] m-auto p-0 flex">
    <div class="w-[250px] border-r-[1px] border-gray_800 h-screen fixed">
      <div class="title">Nodon</div>

      <IconLabel
        :mode="'label'"
        :icon="{ type: 'fas', name: 'house' }"
        :text="'ホーム'"
        :margin="{ vertical: 20 }"
        :padding="{ left: 10, vertical: 5 }"
      />
           
      <IconLabel
        :mode="'input'"
        :icon="{ type: 'fas', name: 'envelope' }"
        :margin="{ vertical: 30 }"
        :padding="{ left: 10, vertical: 5 }"
        :placeholder="'Enter message'"
        :size="'lg'"
        @textChange="change"
      />
      <IconLabel
        :mode="'button'"
        :icon="{ type: 'fas', name: 'magnifying-glass' }"
        :text="'検索'"
        :margin="{ right: 20 }"
        :padding="{ left: 10, vertical: 10 }"
        @onChange="onChange"
      />
    </div>

    <div class="w-[750px] h-screen ml-[250px]">
      <button :class="[customizeStyle()]" @click="toSettingView">toSettingPage</button>
      <button :class="[customizeStyle()]" @click="signOut">Sign out</button>
      <button
        class="text-white"
        :style="{ margin: marginstyle, backgroundColor: '#673AB7', padding: marginstyle }"
        v-if="!store.state.userInfo.emailVerified"
      >
        未完成信箱認證
      </button>
      <h3 class="text-white">Count:{{ count }}</h3>

      <button v-bind:class="[customizeStyle()]" @click="showModal">
        {{ "showModal" }}
      </button>

      <div class="w-[150px] ml-[100px] bg-tahiti py-96">asdsadsa</div>
    </div>

    <div class="w-[150px] h-screen fixed ml-[1000px] border-l-[1px] border-gray_800">asdsadsa</div>
  </div>
  <Modal
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
import Loading from "@/components/Customizeloading.vue"
import Modal from "../components/CustomizeModal.vue"
import IconLabel from "../components/CustomizeIconLabel.vue"

const count = ref(0)

//ロディングフラグ
const isLoading = ref(true)
const modalIsOpen = ref(false)

//カスタマイズ
const customizeStyle = () => {
  return "text-white " + "m-[10px] " + "p-[10px] " + "rounded-md " + "bg-[#f43f5e] " + "h-[100px]"
}

const marginstyle = ref("0 0 0 20px")

onMounted(() => {
  console.log("User is logined:", store.state.userInfo)
  isLoading.value = false
})

const showModal = () => {
  modalIsOpen.value = !modalIsOpen.value
}

const change = () => {
  console.log("button clicked");
}

const onChange=()=>{
  console.log("button clicked");
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
