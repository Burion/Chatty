<template>
  <div class="full-height">
    <the-centered-flex>
      <div class="container-login">
        <label for="">Login</label>
        <input class="input" type="text" />
        <label for="">Password</label>
        <input type="password" class="input" />
        <button class="button">Login</button>
      </div>
    </the-centered-flex>
  </div>
</template>

<script>
import TheCenteredFlex from '../shared/TheCenteredFlex.vue'
export default {
  components: { TheCenteredFlex },}
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
