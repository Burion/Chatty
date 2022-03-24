<template>
  <div class="chat-header">
    <div class="circle-img-size-1"></div>
    <div class="grid-auto-rows-0">
      <div class="chat-name">{{ chat.name }}</div>
      <!-- <div class="text-semi-small">{{ user.status }}</div> -->
    </div>
  </div>
</template>

<script>
export default {
    props: ['chat']
};
</script>

<style>
</style>