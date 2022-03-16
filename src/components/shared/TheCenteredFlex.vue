<template>
  <div class="container-flex-center">
    <div class="chat-last-message">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container-flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-last-message {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12pt;
  text-align: center;
  text-align: left;
  margin: 0;
}
</style>