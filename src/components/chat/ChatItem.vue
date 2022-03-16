<template>
  <div class="chat-item" :class="{ 'chat-item-selected': isSelected }">
    <div @click="selectChat(chat.id)" class="container-chat-item">
      <div class="circle-img-size-2"></div>
      <div class="container-chat-item-text">
        <div class="chat-name">
          {{ chat.name }}
        </div>
        <div class="chat-last-message">
          {{ chat.lastMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["chat", "isSelected"],
  data() {},
  methods: {},
  inject: ["selectChat", "selectedChat"],
};
</script>

<style>
.chat-item {
  background-color: rgb(233, 233, 252);
  height: 100%;
  width: 100%;
  border-radius: 15px;
  box-shadow: 2px 2px 5px rgba(128, 128, 128, 0.26);
  display: flex;
  justify-content: start;
}

.chat-item-selected {
  background-color: rgb(199, 199, 255);
}

.chat-item:hover {
  height: 100%;
  width: 100%;
  align-items: center;
  cursor: pointer;
}

.container-chat-item {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: 20px;
}

.container-chat-item-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>