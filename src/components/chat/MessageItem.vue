<template>
  <div
    class="container-message"
    :class="{
      others: !isMyMessage(message.author),
      own: isMyMessage(message.author),
    }"
  >
    <div v-show="!isMyMessage(message.author)" class="circle-img-size-1"></div>
    <div class="message-bubble">
      <div class="grid-auto-rows-5">
        {{ message.text }}
        <div class="flex-end-5">
          <div v-if="message.isEdited" class="text-small">Edited</div>
          <div class="text-small">
            {{ message.time }}
          </div>
        </div>
      </div>
    </div>
    <div v-show="isMyMessage(message.author)" class="circle-img-size-1"></div>
  </div>
</template>

<script>
export default {
  props: ["message", "isMyMessage"],
};
</script>

<style scoped>
.container-message {
  height: auto;
  gap: 10px;
  margin: 0 5px 0 5px;
}

.others {
  display: flex;
  justify-content: start;
}

.own {
  display: flex;
  flex-direction: row;
  justify-content: end;
}

.message-bubble {
  background-color: rgb(199, 199, 255);
  border-radius: 10px;
  width: auto;
  max-width: 50%;
  height: auto;
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(128, 128, 128, 0.26);
}
</style>