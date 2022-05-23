<template>
  <div class="container-chat">
    <div class="container-list-chats">
      <input
        type="text"
        v-model="searchInput"
        class="input"
        @keydown.enter="searchUsers"
        placeholder="@ + user name to search among all users"
      />
      <div v-if="!searchInput.startsWith('@')">
        <div v-if="getChatsList().length == 0" class="container-flex-center">
          <div class="chat-last-message">We couldn't find contacts</div>
        </div>
        <div v-else class="list-chats">
          <chat-item
            v-for="chat in chats"
            :key="chat.userLogin"
            :chat="chat"
            :isSelected="selectedChat ? chat.userLogin == selectedChat.userLogin : false"
          >
          </chat-item>
        </div>
      </div>
      <div v-else>
        <div v-if="loadingUsersSearch" class="container-flex-center">
          <div class="loader"></div>
        </div>
        <div v-else-if="searchedUsers.length > 0" class="list-chats">
          <chat-item
            v-for="chat in searchedUsers"
            :key="chat"
            :chat="chat"
            :isSelected="selectedChat ? chat.userLogin == selectedChat.userLogin : false"
          >
          </chat-item>
        </div>
        <div v-else class="container-flex-center">
          <div class="chat-last-message">No results</div>
        </div>
      </div>
      <router-link to="/settings">
        <button class="button-gray">Settings</button>
      </router-link>
    </div>
    <div class="container-chat-controls">
      <the-centered-flex v-if="!selectedChat">
        Select chat to start conversation
      </the-centered-flex>
      <div v-else class="container-header-canvas">
        <the-chat-header :chat="selectedChat"></the-chat-header>
        <the-centered-flex v-if="messages.length == 0">
          You haven't had conversation with this user before
        </the-centered-flex>
        <div v-show="messages.length != 0" class="chat-canvas" ref="chat">
          <message-item
            v-for="message in messages"
            :key="message"
            :message="message"
            :isMyMessage="isMyMessage"
          ></message-item>
        </div>
      </div>
      <div class="container-input-comment">
        <input
          ref="input"
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
import ChatItem from "./ChatItem.vue"
import TheCenteredFlex from "../shared/TheCenteredFlex.vue"
import MessageItem from "./MessageItem.vue"
import TheChatHeader from "./TheChatHeader.vue"
import axios from 'axios'

export default {
  name: "ChatPage",
  components: {
    ChatItem,
    TheCenteredFlex,
    MessageItem,
    TheChatHeader,
  },
  data() {
    return {
      inputMessage: "",
      messages: [],
      chats: [],
      searchInput: "",
      selectedChat: null,
      searchedUsers: [],
      loadingUsersSearch: false
    }
  },
  mounted() {
    axios.get(`https://localhost:5001/api/v1/chats/vlad`, { 
      headers: { 
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidmxhZG9zIiwibmJmIjoiMTY1MzExOTQ5MSIsImV4cCI6IjE2NTMyOTIyOTEifQ.SZandYqDgL3gsGjNyWCVgbe8LmMLegWtmfcpy_C4Lk8" 
      }})
      .then(response => { this.chats = response.data.data })
  },
  methods: {
    sendMessage() {
      const today = new Date()
      const hours = today.getHours()
      const minutes = today.getMinutes()
      const date = `${hours}:${minutes}`

      const message = {
        text: this.inputMessage,
        author: this.currentUser.value.login,
        isEdited: false,
        time: date,
      }

      this.inputMessage = ""
      this.messages.push(message)
      const height = this.$refs.chat.scrollHeight
      this.$refs.chat.scrollTop = height
      
      axios.post(`https://localhost:5001/api/v1/messages/`, 
        message, { 
          headers: { 
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidmxhZG9zIiwibmJmIjoiMTY1MzExOTQ5MSIsImV4cCI6IjE2NTMyOTIyOTEifQ.SZandYqDgL3gsGjNyWCVgbe8LmMLegWtmfcpy_C4Lk8" 
          }
        })
    },
    isMyMessage(author) {
      return author === this.currentUser.value.login
    },
    searchUsers()
    {
      if (this.searchInput.startsWith('@')) {
        this.loadingUsersSearch = true

        axios.get(`https://localhost:5001/api/v1/chats/`, { 
          params: { 
            searchQuery: this.searchInput.substring(1, this.searchInput.length - 1)
          }})
          .then(response => {
            this.loadingUsersSearch = false
            
            if (response.data.message != 'Error') {
              this.searchedUsers = response.data.data
            }
          })
      }
    },
    getChatsList() {
      if (this.searchInput.startsWith('@')) {
        return
      }
      else {
        let regex = new RegExp(this.searchInput, "i")

        return this.chats.filter((i) => i.name.match(regex))
      }

    },
    selectChat(login) {
      this.selectedChat = this.chats.find((c) => c.userLogin == login)

      axios.get(`https://localhost:5001/api/v1/messages/${login}`)
        .then(response => this.messages = response.data)
    }, 
    selectSearchedUser(login) {
      this.selectedChat = this.searchedUsers.find(c => c.userLogin == login)

      axios.get(`https://localhost:5001/api/v1/messages/${login}`)
        .then(response => this.messages = response.data.data)
    }
  },
  provide() {
    return {
      selectChat: this.selectChat,
      selectedChat: this.selectedChat,
      selectSearchedUser: this.selectSearchedUser
    }
  },
  inject: ['currentUser']
}
</script>

<style scoped>
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr 40px;
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

.list-user-search {
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

.container-input-comment {
  display: grid;
  align-content: flex-end;
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

.loader {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid rgb(199, 199, 255);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
