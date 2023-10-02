<script setup>
/* import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue' */
</script>


<template>
  <body>
    <div class="container">
      <header>
        <h1>
          Nodon
        </h1>
        <div class="social_tabs">
          <span class="social_login">
            他のアカウントでログイン
          </span>
          <div class="social_tabs_twitter">
            <img src="" alt="twitter">
            <span>Twitter</span>
          </div>
          <div class="social_tabs_Google">
            <img src="" alt="twitter">
            <span>Twitter</span>
          </div>
          <div class="social_tabs_twitter">
            <img src="" alt="twitter">
            <span>Twitter</span>
          </div>
        </div>
      </header>

      <main>
        <div class="login_wrapper">
          <span class="login_title">
            メールでログイン
          </span>
          <div class="login_box">
            <div class="login_email_input"></div>
            <div class="login_password_input"></div>
            <a href="##" class="login_forgot_password"><span>
              パスワードを忘れた場合
            </span></a>
          </div>
          <div class="register_button">ユーザー登録</div>
          <div class="login_button">ログイン</div>
        </div>
      </main>
    </div>
  </body>
</template>

<style scoped lang="scss">
#app {
  max-width: 1920px;
  margin: 0;
  padding: 0;
}

body, html {
  margin: 0;
  padding: 0;
}


.container {
  max-width: 1920px;
  background-color: #2a2a2a;
  height: 100%;
}
</style>