<template>
    <div v-show="isLoading" class="w-screen h-screen flex justify-center items-center" >
    <customize-loading/>
  </div>
  <div v-show="!isLoading" class="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h1
        class="mt-10 text-6xl font-bold leading-9 tracking-tight tracking-wide text-center text-white Titan_One"
      >
        Nodon
      </h1>
    </div>

    <div class="max-[475px]:w-full mx-auto mt-8 text-center sm:w-auto social_tabs_wrapper">
      <span class="block text-sm text-white social_login Baloo"> 他のアカウントでログイン </span>
      <!-- 475px的時候改成flex-col -->
      <div
        class="flex max-[475px]:flex-col gap-5 px-5 py-2 sm:flex-row sm:max-w-lg social_tabs bg-gray_500"
      >
        <div class="flex items-center justify-center gap-4 p-2 bg-gray_800 social_tabs_twitter">
          <!-- Twitter -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2 h-7"
            fill="currentColor"
            style="color: #1da1f2"
            viewBox="0 0 24 24"
          >
            <path
              d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
            />
          </svg>
          <span class="self-end leading-tight text-white Baloo">Twitter</span>
        </div>
        <div class="flex items-center justify-center gap-4 p-2 bg-gray_800 social_tabs_Google">
          <!-- Google -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7"
            fill="currentColor"
            style="color: #ea4335"
            viewBox="0 0 24 24"
          >
            <path
              d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
              fill-rule="evenodd"
              clip-rule="evenodd"
            />
          </svg>
          <span class="self-end leading-tight text-white Baloo">Google</span>
        </div>
        <div class="flex items-center justify-center gap-4 p-2 bg-gray_800 social_tabs_facebook">
          <!-- Facebook -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7"
            fill="currentColor"
            style="color: #1877f2"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
            />
          </svg>
          <span class="self-end leading-tight text-white Baloo">Facebook</span>
        </div>
      </div>
    </div>

    <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-lg">
      <span class="flex justify-center p-3 text-xs text-white login_title"> メールでログイン </span>
      <form class="p-5 space-y-6 bg-gray_500" action="#" method="POST">
        <div>
          <div class="mt-2">
            <input
              placeholder="メールアドレス"
              v-model="loginInfo.email"
              type="email"
              autocomplete="email"
              required=""
              class="block w-full p-2 text-white border-0 rounded shadow-sm bg-gray_800 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="mt-2">
            <input
              placeholder="パスワード"
              v-model="loginInfo.pwd"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="block w-full p-2 text-white border-0 rounded shadow-sm bg-gray_800 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <!-- 錯誤訊息 -->
        <p v-if="errMsg" class="text-red">{{ errMsg }}</p>

        <a href="##" class="text-right login_forgot_password"
          ><span class="block mt-3 text-sm text-white"> パスワードを忘れた場合 </span></a
        >
      </form>

      <div class="flex justify-end gap-2 mt-3">
        <button
          @click="toRegisterView"
          type="submit"
          class="flex justify-center px-3 py-1 text-sm font-semibold leading-6 text-white rounded-md shadow-sm w-25 hover:bg-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          ユーザー登録
        </button>
        <button
          @click="SignIn"
          type="submit"
          class="flex justify-center px-3 py-1 text-sm font-semibold leading-6 text-white rounded-md shadow-sm w-25 hover:bg-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          ログイン
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { ref } from "vue"
import CustomizeLoading from "../components/CustomizeLoading.vue"

const store = useStore()
const router = useRouter()
//インプット:ID, Password
const loginInfo = ref({ email: "", pwd: "" })
//エラーメッセージ
const errMsg = ref()
//ロディングフラグ
const isLoading = ref(false)

/**
 * 登録画面遷移へ
 */
const toRegisterView = () => {
  router.push({ name: "RegisterPage" })
}

/**
 * ログイン処理する
 */
const SignIn = () => {
  isLoading.value = true;
  store.state.fbService.singnInAccount(loginInfo)
  .then((result) => {
    if (result.uid) {
      router.push({ name: "HomePage" })
    } else {
      errMsg.value = result;
      console.error("SignIn Err", result)
      isLoading.value = false;
    }
  })
}
</script>

<style scoped lang="scss">
.Titan_One {
  font-family: "Titan One";
}

.Baloo {
  font-family: "Baloo Tammudu 2";
}
</style>
