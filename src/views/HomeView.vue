<template>
  <div v-show="account.state.isLoading" class="w-screen h-screen flex justify-center items-center">
    <Loading />
  </div>
  <div v-show="!account.state.isLoading" class="mainBar">
    <div class="leftBar">
      <div v-if="leftBarForPC" class="leftTop">
        <IconLabel
          v-if="leftBarForPC"
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
            v-if="leftBarForPC"
            :mode="'button'"
            :icon="item.icon"
            :text="item.text"
            :margin="{ all: 20 }"
            :padding="{ left: 15, vertical: 8 }"
            :borderRadius="30"
            @onChange="onChange"
            :args="item.args"
            :bgColor="'transparent'"
          />
        </template>
      </div>
      <div v-if="leftBarForPC" class="leftBottom" @click="showSettingBar">
        <div class="userIcon" />
        <div class="userInfoBar">
          <p>userName</p>
          <p>qqqq@gmail.comasdasdasd</p>
        </div>
        <font-awesome-icon icon="ellipsis" :style="{ color: 'white' }" />
      </div>
      <div v-if="!leftBarForPC" class="leftTopForSmallSize">
        <font-awesome-icon class="title" icon="leaf" :size="'2xl'" :style="{ color: 'white' }" />
        <div v-for="item in leftBarItems" :key="item.icon.name" ref="smallSizeIcons">
          <font-awesome-icon
            class="icon"
            :icon="[item.icon.type, item.icon.name]"
            :size="'xl'"
            :style="{ color: 'white' }"
            @click="onChange(item.args)"
          />
          <div v-show="item.focus" class="itemsHint" :style="{ '--pos': item.pos + 'px' }">
            {{ item.text }}
          </div>
        </div>
      </div>
      <div v-if="!leftBarForPC" class="leftBottomForSmallSize">
        <div class="userIcon" @click="showSettingBar" />
      </div>
      <div v-show="settingBarIsOpen" class="settingBar">
        <template v-for="item in settingBarItems" :key="item.icon.name">
          <IconLabel
            :mode="'button'"
            :icon="item.icon"
            :text="item.text"
            :margin="{ top: 15 }"
            :padding="{ left: 40 }"
            :size="'sm'"
            @onChange="item.onChange"
            :bgColor="'transparent'"
          />
        </template>
      </div>
    </div>

    <div class="middleBar">
      <button
        class="text-white"
        :style="{ margin: '0 0 0 20px', backgroundColor: '#673AB7', padding: '0 0 0 20px' }"
        v-if="!account.state.accountInfo.emailVerified"
      >
        未完成信箱認證
      </button>

      <button
        v-bind:class="'text-white m-[10px] p-[10px] rounded-md bg-[#f43f5e] h-[100px]'"
        @click="showModal"
      >
        {{ "showModal" }}
      </button>

      <IconLabel
        :mode="'input'"
        :icon="{ type: 'fas', name: 'envelope' }"
        :margin="{ vertical: 30, right: 30 }"
        :padding="{ all: 5 }"
        :placeholder="'Enter message'"
        @input="onInput"
        :borderRadius="5"
      />
      <div class="w-[150px] ml-[100px] bg-tahiti py-96">asdsadsa</div>
    </div>

    <div class="rightBar">asdsadsa</div>
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
import { ref, onMounted, onUpdated } from "vue"
import Loading from "@/components/Customizeloading.vue"
import Modal from "../components/CustomizeModal.vue"
import IconLabel from "../components/CustomizeIconLabel.vue"


const account = { state: store.state.accountState, path: "accountState/" }
const settingBarIsOpen = ref(false)
const modalIsOpen = ref(false)
const leftBarItems = ref([
  {
    icon: { type: "fas", name: "house" },
    text: "ホーム",
    args: { message: "ホーム" },
    pos: 145,
    focus: false
  },
  {
    icon: { type: "fas", name: "magnifying-glass" },
    text: "検索",
    args: { message: "検索" },
    pos: 215,
    focus: false
  },
  {
    icon: { type: "fas", name: "users-line" },
    text: "看板",
    args: { message: "看板" },
    pos: 285,
    focus: false
  },
  {
    icon: { type: "fas", name: "comment" },
    text: "お知らせ",
    args: { message: "お知らせ" },
    pos: 355,
    focus: false
  }
])
const settingBarItems = ref([
  {
    icon: { type: "fas", name: "user-gear" },
    text: "個人情報設定",
    onChange: () => {
      toSettingView()
      console.log("個人情報設定")
    }
  },
  {
    icon: { type: "fas", name: "right-from-bracket" },
    text: "ログアウト",
    onChange: () => {
      store.dispatch(account.path + "logout")
    }
  }
])
const smallSizeIcons = ref(null)
const leftBarForPC = ref(account.state.screenInfo.width >= 1200 ? true : false)
const listenerIsEvent = ref(false)

onMounted(async () => {
  console.log("User is logined:", account.state.accountInfo, "userInfo:", account.state.userInfo)

  window.addEventListener("resize", () => {
    store.commit(account.path + "getScreenInfo")
    if (account.state.screenInfo.width >= 1200) {
      listenerIsEvent.value = false
      leftBarForPC.value = true
    } else {
      leftBarForPC.value = false
    }
  })
})

onUpdated(() => {
  if (!leftBarForPC.value && !listenerIsEvent.value) {
    for (let i = 0; i < smallSizeIcons.value.length; i++) {
      let barItemsPos = smallSizeIcons.value[i].firstChild.getBoundingClientRect().bottom + 5
      if (leftBarItems.value[i].pos !== barItemsPos) leftBarItems.value[i].pos = barItemsPos
      smallSizeIcons.value[i].firstChild.addEventListener("mouseenter", () => {
        leftBarItems.value[i].focus = true
      })
      smallSizeIcons.value[i].firstChild.addEventListener("mouseleave", () => {
        leftBarItems.value[i].focus = false
      })
    }
    listenerIsEvent.value = true
  }
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

const showSettingBar = () => {
  settingBarIsOpen.value = !settingBarIsOpen.value
}

/**
 * ユーザ設定ページへ遷移
 */
const toSettingView = () => {
  router.push({ name: "UserSettingPage", params: { user: "taro", age: 33 } })
}
</script>

<style scoped lang="scss">
.mainBar {
  width: 1250px;
  margin: auto;
  padding: 0px;
  display: flex;
}
.leftBar {
  width: 250px;
  border-right: solid 1px rgb(81, 80, 80);
  height: 100%;
  position: fixed;

  .settingBar {
    width: 220px;
    height: 90px;
    background-color: rgb(61, 61, 61);
    border-radius: 10px;
    position: absolute;
    left: 25px;
    bottom: 70px;
  }
}
.leftTop,
.leftTopForSmallSize {
  height: calc(100% - 60px);
  min-height: 310px;
  display: flex;
  flex-direction: column;
  .title {
    width: 50px;
    margin: 20px 0 30px 0px;
  }
  .icon {
    width: 50px;
    height: 30px;
    padding: 10px 0;
    margin: 5px 0 25px 0px;
    border-radius: 25px;
    // background-color: rgb(85, 85, 85);
    &:hover {
      cursor: pointer;
      background-color: rgb(85, 85, 85);
    }
  }
  .itemsHint {
    width: 50px;
    height: 23px;
    background-color: #4e4d4d;
    position: absolute;
    top: var(--pos);
    border-radius: 5px;
    font-size: 10px;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 600;
    display: flex;
  }
}
.leftBottom,
.leftBottomForSmallSize {
  height: 55px;
  display: flex;
  align-items: center;
  border-radius: 40px;
  margin: 0 20px 0 20px;
  &:hover {
    cursor: pointer;
    background-color: rgb(85, 85, 85);
  }
  .userIcon {
    width: 40px;
    height: 40px;
    background-color: rgb(47, 153, 228);
    border-radius: 20px;
    margin: 0 10px 0 10px;
  }
  .userInfoBar {
    width: calc(100% - 90px);
    margin-right: 5px;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      color: white;
      font-size: 14px;
    }
    p:nth-child(2) {
      color: rgb(146, 145, 145);
    }
  }
}
.middleBar {
  width: 750px;
  height: 100%;
  margin-left: 250px;
}
.rightBar {
  width: 150px;
  height: 100%;
  margin-left: 1000px;
  border-left: solid 1px rgb(66, 65, 65);
  position: fixed;
}
@media (max-width: 1200px) {
  .mainBar {
    width: 850px;
  }
  .leftBar {
    width: 100px;
  }
  .leftTopForSmallSize {
    align-items: center;
  }
  .middleBar {
    margin-left: 100px;
  }
  .rightBar {
    margin-left: 850px;
  }
}
</style>
