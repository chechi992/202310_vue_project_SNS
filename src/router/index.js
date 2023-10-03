import { createRouter, createWebHistory } from "vue-router"

import LoginPage from "../Components/LoginPage.vue"
import HomeView from "../views/HomeView.vue"


const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage
  },
  {
    path: "/Home",
    name: "HomeView",
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
