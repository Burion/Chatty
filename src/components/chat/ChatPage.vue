<template>
  <div class="container-chat">
    <div class="container-list-chats">
      <input
        type="text"
        v-model="searchInput"
        class="input"
        placeholder="@ + user name to search among all users"
      />
      <div v-if="getChatsList().length == 0" class="container-flex-center">
        <div class="chat-last-message">We couldn't find contacts</div>
      </div>
      <div v-else class="list-chats">
        <chat-item
          v-for="chat in getChatsList()"
          :key="chat"
          :chat="chat"
          :isSelected="chat.id == selectedChat"
        >
        </chat-item>
      </div>
    </div>
    <div class="container-chat-controls">
      <the-centered-flex v-if="!selectedChat">
        Select chat to start conversation
      </the-centered-flex>
      <div v-else ref="chatCanvas" class="container-header-canvas">
        <div class="chat-header">
          <div class="circle-img-size-1"></div>
          <div class="grid-auto-rows-0">
            <div class="chat-name">Vlad Buriak</div>
            <div class="text-semi-small">online</div>
          </div>
        </div>
        <the-centered-flex v-if="messages.length == 0">
          You haven't had conversation with this user before
        </the-centered-flex>
        <div v-else class="chat-canvas">
          <div
            v-for="message in messages"
            :key="message"
            class="container-message"
            :class="{
              others: !isMyMessage(message.author),
              own: isMyMessage(message.author),
            }"
          >
            <div
              v-show="!isMyMessage(message.author)"
              class="circle-img-size-1"
            ></div>
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
            <div
              v-show="isMyMessage(message.author)"
              class="circle-img-size-1"
            ></div>
          </div>
        </div>
      </div>
      <div class="container-input-comment">
        <input
          v-model="inputMessage"
          @keydown.enter="sendMessage"
          type="text"
          class="input"
        />
        <button @click="sendMessage" class="button">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import ChatItem from "./ChatItem.vue";
import TheCenteredFlex from "../shared/TheCenteredFlex.vue"

export default {
  name: "ChatPage",
  components: {
    ChatItem,
    TheCenteredFlex
  },
  data() {
    return {
      inputMessage: "",
      messages: [],
      chats: [
        {
          id: 123,
          name: "Vlad",
          lastMessage: "I wanted to tell you about everything",
        },
        {
          id: 1234,
          name: "Vlad",
          lastMessage: "I wanted to tell you about everything",
        },
      ],
      currentUser: "Vlad",
      searchInput: "",
      selectedChat: null,
    };
  },
  methods: {
    sendMessage() {
      const today = new Date();
      const hours = today.getHours();
      const minutes = today.getMinutes();
      const date = `${hours}:${minutes}`;

      const message = {
        text: this.inputMessage,
        author: "Vlad",
        isEdited: false,
        time: date,
      };

      this.inputMessage = "";
      this.messages.push(message);
      // this.$refs.chatCanvas.scrollTop = 0
    },
    isMyMessage(author) {
      return author === this.currentUser;
    },
    getChatsList() {
      let regex = new RegExp(this.searchInput, "i");

      return this.chats.filter((i) => i.name.match(regex));
    },
    selectChat(chatId) {
      this.selectedChat = chatId;
      console.log(this.selectedChat);
    },
  },
  provide() {
    return {
      selectChat: this.selectChat,
      selectedChat: this.selectedChat,
    };
  },
};
</script>

<style scoped>
.input {
  /* margin: 0 10px; */
  /* padding: 0 5px; */
  border: solid 1px rgb(185, 185, 185);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12pt;
  display: block;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  box-sizing: border-box;
}

.input:focus {
  outline: none;
}

.container-main {
  display: grid;
  grid-auto-columns: auto;
  grid-template-rows: auto auto;
  width: 100%;
  gap: 10px;
}

.container-author-page {
  display: grid;
  gap: 10px;
  grid-template-columns: auto;
  grid-template-rows: auto;
}

.inline-message {
  grid-column-start: 1;
  grid-column-end: 4;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12pt;
  text-align: center;
  margin: auto;
}

.container-chat {
  display: grid;
  grid-template-columns: 0.3fr 0.7fr;
  grid-auto-rows: 100%;
  gap: 20px;
  height: calc(95vh);
  width: 100%;
}

.container-list-chats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-chats {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 80px;
  height: 100%;
  gap: 10px;
  /* overflow-y: auto; */
  width: 100%;
}

.container-chat-controls {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.9fr 0.1fr;
  gap: 20px;
}

.container-flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-header-canvas {
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  gap: 20px;
  grid-template-rows: 60px auto;
  overflow: auto;
}

.chat-header {
  background-color: rgb(199, 199, 255);
  border-radius: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 15px;
}

.chat-canvas {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 10px;
  overflow-y: scroll;
}

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

.message-bubble {
  background-color: rgb(199, 199, 255);
  border-radius: 10px;
  width: auto;
  max-width: 50%;
  height: auto;
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(128, 128, 128, 0.26);
}

.chat-canvas::-webkit-scrollbar {
  width: 0.2em;
}

.chat-canvas::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.chat-canvas::-webkit-scrollbar-thumb {
  background-color: rgb(199, 199, 255);
  outline: 1px solid rgb(154, 157, 160);
}

.chat-name {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14pt;
  text-align: center;
  font-weight: 500;
  margin: 0;
  text-align: left;
}

.chat-last-message {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12pt;
  text-align: center;
  text-align: left;
  margin: 0;
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

.container-input-comment {
  display: grid;
  grid-template-columns: 0.9fr 0.1fr;
  grid-auto-rows: auto;
  gap: 10px;
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

.grid-auto-rows-5 {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  gap: 5px;
}

.grid-auto-rows-0 {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
}

.flex-end-5 {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 5px;
}
</style>
