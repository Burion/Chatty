<template>
  <the-centered-flex v-if="localStorageHandler.isAuthenticated()">
    <label>Hello {{userHandler.getCurrentUserInfo().name}}! You are already authenticated. Please, head to </label>
    <label>
      <router-link to="/chat">chat</router-link>
    </label>
    <label>or you can</label>
    <button @click="logout">Log out</button>
  </the-centered-flex>
  <div v-else class="full-height">
    <the-centered-flex>
      <div class="container-login">
        <label for="">Login</label>
        <input ref="login" class="input" type="text" />
        <label for="">Password</label>
        <input ref="password" type="password" class="input" />
        <button v-if="isLoggingIn" disabled @click="login($refs.login.value, $refs.password.value)" class="button">Please wait...</button>
        <button v-else @click="login($refs.login.value, $refs.password.value)" class="button">Login</button>
        <error-card v-show="invalidCredentials">Invalid credentials</error-card>
      </div>
    </the-centered-flex>
  </div>
</template>

<script>
import ErrorCard from "../shared/ErrorCard.vue"
import TheCenteredFlex from "../shared/TheCenteredFlex.vue"
import axios from "axios"
import LocalStorageHandler from "../../handlers/LocalStorageHandler"
import UserHandler from "../../handlers/UserHandler"

export default {
  inject: ['setCurrentUser', 'currentUser'],
  components: { TheCenteredFlex, ErrorCard },
  data() {
    return {
      isLoggingIn: false,
      invalidCredentials: false,
      localStorageHandler: new LocalStorageHandler(),
      userHandler: new UserHandler()
    }
  },
  mounted() {
    
  },
  methods: {
    login(login, password) {
      const model = { 
        login: login, 
        password: password 
      }

      this.isLoggingIn = true

      axios.post("https://localhost:5001/api/v1/auth/login", model)
        .then(response => {
          this.isLoggingIn = false

          if (response.data.message == 'Error') {
            this.invalidCredentials = true
            
            return
          }
          
          localStorage.setItem("jwt", response.data.accessToken) 
          
          this.$router.push("/chat") 
        }
      )
    },
    logout() {
      this.localStorageHandler.unAuthenticate()
      this.$forceUpdate()
    }
  }
}
</script>

<style>
.full-height {
  height: 80vh;
  width: 100%;
}

.container-flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.container-login {
  display: grid;
  gap: 5px;
  width: 400px;
  grid-template-columns: auto;
  grid-template-rows: auto;
}
</style>
