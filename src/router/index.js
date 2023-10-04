import { createRouter, createWebHistory } from "vue-router"

import LoginPage from "../Components/LoginPage.vue"
import HomeView from "../views/HomeView.vue"
import UserSettingView from "../views/UserSettingView.vue"

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
