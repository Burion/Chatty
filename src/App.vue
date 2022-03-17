<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
//import ChatPage from "./components/chat/ChatPage.vue";
import { computed } from 'vue'

export default {
  name: "App",
  data() { 
    return {
      currentUser: { 
        login: '',
        name: 'Vlad Buriak',
        password: '123456768', 
        status: 'online'
      }
    }
  },
  methods: {
    setCurrentUser(login) {
      this.currentUser = {
        login: login,
        status: 'offline'
      }

      this.$router.push('/chat')
    }
  },
  provide() {
    return { 
      currentUser: computed(() => this.currentUser),
      setCurrentUser: this.setCurrentUser
    }
  }
};
</script>

<style>
.container {
  margin: auto;
  width: 1280px;
  padding: 10px;
  height: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.circle-img-size-1 {
  background-image: url(https://memepedia.ru/wp-content/uploads/2020/03/gigachad-1-768x432.jpg);
  height: 40px;
  width: 40px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}

.circle-img-size-2 {
  background-image: url(https://memepedia.ru/wp-content/uploads/2020/03/gigachad-1-768x432.jpg);
  height: 50px;
  width: 50px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}

.text-regular {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: rgb(70, 70, 70);
}

.text-small {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: rgb(70, 70, 70);
  font-size: 8pt;
}

.text-semi-small {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: rgb(70, 70, 70);
  font-size: 10pt;
}

.button {
  border-radius: 5px;
  margin: 0;
  background-color: transparent;
  border: none;
  outline: 1px solid rgb(162, 162, 238);
  width: 100%;
  height: 40px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12pt;
}

.button:hover {
  background-color: rgb(162, 162, 238);
  color: white;
  cursor: pointer;
}

.button-gray {
  border-radius: 5px;
  margin: 0;
  background-color: transparent;
  border: none;
  outline: 1px solid #ccc;
  width: 100%;
  height: 40px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12pt;
}

.button-gray:hover {
  background-color: #ccc;
  color: white;
  cursor: pointer;
}

.input {
  border: solid 1px rgb(185, 185, 185);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12pt;
  display: block;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  box-sizing: border-box;
  text-indent: 5px;
}

.input:focus {
  outline: none;
}

.flex-end-5 {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 5px;
}
</style>
