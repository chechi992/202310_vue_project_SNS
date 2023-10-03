import { createRouter, createWebHistory } from "vue-router"

import LoginPage from "../Components/LoginPage.vue"
import MainPage from "../Components/MainPage.vue"

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage
  },
  {
    path: "/LoginPage",
    name: "LoginPage",
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
