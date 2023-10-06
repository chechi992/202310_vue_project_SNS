import { createRouter, createWebHistory } from "vue-router"

import LoginView from "../views/LoginView.vue"
import HomeView from "../views/HomeView.vue"
import UserSettingView from "../views/UserSettingView.vue"
import RegisterView from "../views/RegisterView.vue"

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginView
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
