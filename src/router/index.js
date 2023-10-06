import { createRouter, createWebHistory } from "vue-router"

import LoginPage from "../Components/LoginPage.vue"
import HomeView from "../views/HomeView.vue"
import UserSettingView from "../views/UserSettingView.vue"
import RegisterView from "../views/RegisterView.vue"

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage
  },
  {
    path: "/Home",
    name: "HomePage",
    component: HomeView
  },
  {
    path: "/Setting",
    name: "UserSettingPage",
    component: UserSettingView
  },
  {
    path: "/Register",
    name: "RegisterPage",
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
