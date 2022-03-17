<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
//import ChatPage from "./components/chat/ChatPage.vue";

export default {
  name: "App",
  components: {
  },
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
</style>
