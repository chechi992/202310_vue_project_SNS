<template>
  <button @click="toHome">toHome</button>

  <html class="h-full bg-gray-700">
    <body class="h-full">
      <div class="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 class="mt-10 text-6xl font-bold leading-9 tracking-tight text-center text-yellow-200">
            Nodon
          </h1>
        </div>

        <div class="mx-auto mt-5 social_tabs_wrapper max-w-800">
          <span class="block text-sm text-gray-200 social_login"> 他のアカウントでログイン </span>
          <div class="flex gap-5 px-5 py-2 social_tabs bg-slate-600">
            <div class="flex items-center gap-4 p-2 bg-gray-700 social_tabs_twitter">
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
              <span class="font-mono text-slate-300">Twitter</span>
            </div>
            <div class="flex items-center gap-4 p-2 bg-gray-700 social_tabs_Google">
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
              <span class="font-mono text-slate-300">Google</span>
            </div>
            <div class="flex items-center gap-4 p-2 bg-gray-700 social_tabs_facebook">
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
              <span class="font-mono text-slate-300">Facebook</span>
            </div>
          </div>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
                >Email address</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required=""
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                  >Password</label
                >
                <div class="text-sm">
                  <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"
                    >Forgot password?</a
                  >
                </div>
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required=""
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p class="mt-10 text-sm text-center text-gray-500">
            Not a member?
            {{ " " }}
            <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >Start a 14 day free trial</a
            >
          </p>
        </div>
      </div>
    </body>
  </html>
</template>

<script>
export default {
  name: "LoginPage",
  mounted: function () {
    console.log(this.$route.params)
  },
  methods: {
    toHome: function () {
      this.$router.push({
        name: "HomePage",
        params: { user: "taro", age: 33 }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.social_tabs_wrapper {
  text-align: center; /* Center the text */
}

.social_tabs {
  display: flex; /* Use flexbox to create a horizontal layout */
  justify-content: center; /* Center the child elements horizontally */
}

.social_tabs img {
  /* Your styling for the images */
}

.social_tabs span {
  display: block; /* Make the span a block element */
}
</style>
