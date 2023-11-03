<template>
  <div v-show="isLoading" class="w-screen h-screen flex justify-center items-center">
    <Loading />
  </div>
  <div v-show="!isLoading" class="w-[1250px] m-auto p-0 flex">
    <div class="w-[250px] border-r-[1px] border-gray_800 h-screen fixed">
      <IconLabel
        :mode="'label'"
        :icon="{ type: 'fas', name: 'leaf' }"
        :text="'Nodon'"
        :size="'2xl'"
        :margin="{ vertical: 25 }"
        :padding="{ left: 20 }"
        :iconTextSpace="20"
      />
      <template v-for="item in leftBarItems" :key="item.icon.name">
        <IconLabel
          :mode="'button'"
          :icon="item.icon"
          :text="item.text"
          :margin="{ all:20 }"
          :padding="{ left: 15, vertical: 8 }"
          :borderRadius="30"
          @onChange="onChange"
          :args="item.args"
          :bgColor="'transparent'"
        />
      </template>
      
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

      <button v-bind:class="[customizeStyle()]" @click="showModal">
        {{ "showModal" }}
      </button>

      <IconLabel
        :mode="'input'"
        :icon="{ type: 'fas', name: 'envelope' }"
        :margin="{ vertical: 30, right: 30 }"
        :padding="{ all: 5 }"
        :placeholder="'Enter message'"
        @input="onInput"
      />
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

//ロディングフラグ
const isLoading = ref(true)
const modalIsOpen = ref(false)
const leftBarItems = ref([
  {
    icon: { type: "fas", name: "house" },
    text: "ホーム",
    args: { message: "ホーム" }
  },
  {
    icon: { type: "fas", name: "magnifying-glass" },
    text: "検索",
    args: { message: "検索" }
  },
    {
    icon: { type: "fas", name: "users-line" },
    text: "看板",
    args: { message: "看板" }
  },
      {
    icon: { type: "fas", name: "ghost" },
    text: "お知らせ",
    args: { message: "お知らせ" }
  },
])

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

const onInput = (e) => {
  console.log(e.target.value)
}

const onChange = (data) => {
  console.log("button clicked", data)
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
