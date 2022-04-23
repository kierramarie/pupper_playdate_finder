<template>
  <v-container>
    <v-card
      class="d-flex flex-column mx-auto"
      style="padding: 30px"
      max-width="700"
    >
      <v-card-title>{{ receiver_name }}</v-card-title>
      <v-row v-if="user_num === 2">
        <v-col>
          <v-list>
            <div v-for="mess in other_messages" :key="mess.message">
              <v-card color="background">
              <v-list-item>
                {{mess.message}}
              </v-list-item>
              </v-card>
              <v-list-item></v-list-item>
            </div>
          </v-list>
        </v-col>
        <v-col>
          <v-list>
            <div v-for="mess in user_messages" :key="mess.message">
              <v-list-item></v-list-item>
              <v-card color="secondary">
                <v-list-item>
                {{mess.message}}
                </v-list-item>
              </v-card>
            </div>
          </v-list>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col>
          <v-list>
            <div v-for="mess in other_messages" :key="mess.message">
              <v-list-item></v-list-item>
              <v-card color="background">
              <v-list-item>
                {{mess.message}}
              </v-list-item>
              </v-card>
              
            </div>
          </v-list>
        </v-col>
        <v-col>
          <v-list>
            <div v-for="mess in user_messages" :key="mess.message">
              <v-card color="secondary">
                <v-list-item>
                {{mess.message}}
                </v-list-item>
              </v-card>
              <v-list-item></v-list-item>
            </div>
          </v-list>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" sm="8">
          <v-text-field v-model="message" style="padding-top:25px" solo></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn width="75px" color="accent" class="mr-4" @click="sendMessage()" depressed block>Send</v-btn>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn width="75px" color="primary" class="mr-4" @click="getChats" depressed block>Refresh</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ChatView",
  data() {
    return {
      user_messages: this.$store.state.chats.currentMessages,
      other_messages: this.$store.state.chats.otherMessages,
      receiver_name: this.$store.state.chats.otherName,
      user_num: this.$store.state.chats.currentNum,
      other_num: this.$store.state.chats.otherNum,
      message: "",
      chat_id: this.$route.params._chat_id,
    };
  },
  methods: {
    async getChats() {
      const chat = await axios.get("api/chats/" + this.$route.params._chat_id);
      if (this.user_num === 1) {
        this.$store.commit("chats/setCurrentMessages", chat.data.user1_messages)
        this.$store.commit("chats/setOtherMessages", chat.data.user2_messages)
      }
      else {
        this.$store.commit("chats/setCurrentMessages", chat.data.user2_messages)
        this.$store.commit("chats/setOtherMessages", chat.data.user1_messages)
      }
      if (this.receiver_name === "") {
        if (this.other_num === 1) {
          this.receiver_name = chat.user1_name;
        } else {
          this.receiver_name = chat.user2_name;
        }
      }
    },

    async sendMessage() {
      if (this.user_messages === undefined || this.user_messages === null) {
        this.user_messages = [{ message: this.message }];
      } else {
        this.$store.commit("chats/addCurrentMessage",{message: this.message});
      }
      let data = {};
      if (this.user_num === 1) {
        data = { user1_messages: this.user_messages };
      } else {
        data = { user2_messages: this.user_messages };
      }
      const result = await axios.put("../api/chats/" + this.$store.state.chats.currentChatId + "/send", data);
      if (result.status === 200) {
        this.message = "";
      }
    },
  },
  computed: {
    async getUser() {
      const user = await this.$store.dispatch("users/retrieveUser");
      return await user;
    },
  },
};
</script>
