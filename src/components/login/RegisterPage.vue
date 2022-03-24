<template>
  <div class="full-height">
    <the-centered-flex>
      <div class="container-login">
        <label for="">Login</label>
        <input ref="login" class="input" type="text" />
        <label for="">Password</label>
        <input ref="password" type="password" class="input" />
        <button @click="registerUser($refs.login.value, $refs.password.value)" class="button">Login</button>
      </div>
    </the-centered-flex>
  </div>
</template>

<script>
import TheCenteredFlex from "../shared/TheCenteredFlex.vue"
import axios from 'axios'

export default {
  inject: ['setCurrentUser', 'currentUser'],
  components: { TheCenteredFlex },
  methods: {
    registerUser(login, password) {
      axios.post('https://localhost:5001/api/v1/auth/', { login: login, password: password })
        .then(response => { this.$router.push("/chat") })
        .catch(err => console.error(err.message))
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
