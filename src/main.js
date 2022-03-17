import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import LoginPage from "./components/login/LoginPage.vue"
import ChatPage from "./components/chat/ChatPage.vue"
import SettingsPage from "./components/settings/SettingsPage.vue"
import App from "./App.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", component: LoginPage },
    { path: "/chat", component: ChatPage },
    { path: "/settings", component: SettingsPage }
  ]
})

const app = createApp(App)

app.use(router)

app.mount("#app")
