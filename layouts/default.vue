<template>
  <v-app light :style="{background: $vuetify.theme.themes.light.background}">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      color="white"
      fixed
      app
    >
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :href="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          no-action
          prepend-icon="mdi-chat"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Chats</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="chat in chats"
            :key="chat.title"
            style="padding-left:5px;"
          >
            <v-list-item-title><v-btn plain style="width:100%;" @click="openChat(chat)">{{chat.title}}</v-btn></v-list-item-title>

          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      color="primary"
      fixed
      app
    >
      <v-app-bar-nav-icon v-if="isLoggedIn" @click.stop="drawer = !drawer" />

      <v-toolbar-title color="#FFFFFF" v-text="title" />

      <v-spacer></v-spacer>

      <v-btn v-if="isLoggedIn" v-on:click="logout">Logout</v-btn>
      <v-btn v-else v-on:click="login">Login</v-btn>

    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-account',
          title: 'Profile',
          to: '/profile'
        }
        //{
        //  icon: 'mdi-cog-outline',
        //  title: 'Settings',
        //  to: '/settings'
        //}
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Pupper Playdate Finder',
      chats: []
    }
  },

  async fetch() {
    await this.getChats()
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    async logout () {
      await this.$store.dispatch('users/logout')
      this.$router.push('/login')
    },

    async getChats() {
      const result = await axios.post('api/chats/getUserChats', {user_id: this.$store.state.users.userId })
      const user = await axios.get('api/users/' + this.$store.state.users.userId )
      let data = []
      result.data.forEach(res => {
        let chat_info = user.data.chats.find(obj => obj.chat_id === res.chat_id)
        let num = chat_info.num
        if (num === 1) {
          data.push({title: res.user2_name, link: '/chats/' + res.chat_id, chat_id: res.chat_id})
        }
        else {
          data.push({title: res.user1_name, link: '/chats/' + res.chat_id, chat_id: res.chat_id})
        }
      })
      if (data.length === 0) {
        this.chats = [{title: "No chats currently", link:""}]
      }
      else {
        this.chats = data
      }
    },

    async openChat(chat) {
      const user = await axios.get('api/users/' + this.$store.state.users.userId)
      var chat_info = user.data.chats.find(
        (item) => item.chat_id === chat.chat_id
      );
      let user_num = chat_info.num;
      const retrievedChat = await axios.get("api/chats/" + chat.chat_id);
      this.$store.commit("chats/setCurrentNum", user_num)
      if (user_num === 1) {
        this.$store.commit("chats/setOtherNum", 2);
        this.$store.commit("chats/setCurrentMessages", retrievedChat.data.user1_messages)
        this.$store.commit("chats/setOtherMessages", retrievedChat.data.user2_messages)
      } else {
        this.$store.commit("chats/setOtherNum", 1);
        this.$store.commit("chats/setCurrentMessages", retrievedChat.data.user2_messages)
        this.$store.commit("chats/setOtherMessages", retrievedChat.data.user1_messages)
      }
      this.$store.commit("chats/setCurrentChatId", chat.chat_id)
      this.$store.commit("chats/setOtherName", chat.title)
      this.$router.push(chat.link)
      this.drawer = !this.drawer
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.users.userId != null && this.$store.state.users.userId != "" ? true : false
    }
  }
}
</script>
