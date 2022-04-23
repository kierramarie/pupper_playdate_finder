<template>
    <v-container v-if="!isLoading">
      <v-container v-if="users.length > 0">
        <FeedPerson :user="users[personIndex]" @liked="liked" @disliked="disliked"></FeedPerson>
      </v-container>
      <v-container v-else> 
        <h3>No more users left! Please check back later for more!</h3>
      </v-container>
    </v-container>
    <v-container v-else>
      <h3>Loading</h3>
    </v-container>
</template>

<script>
import FeedPerson from '~/components/FeedPerson.vue'
import axios from 'axios'

export default {
  name: "IndexPage",
  components: {
    FeedPerson
  },
  // middleware: 'auth',
  data() {
    return {
      personIndex: 0,
      users: [],
      isLoading: true,
      isLiked: null,
    };
  },
  async created() {
    await this.$store.dispatch('users/retrieveUser')
    const isAuthenticated = this.$store.state.users.userId != null && this.$store.state.users.userId != "" ? true : false
    if (!isAuthenticated) {
      this.$router.push('/login')
      return
    }
    const result = await axios.post('api/users/getNearby', { userId: this.userId } )
    this.users = result.data
    this.isLoading = false
  },
  methods: {
    async liked () {
      this.isLiked = true
      const result = await axios.post('api/liked/likeUser', { user_id: this.userId, liked_user_id: this.users[this.personIndex].user_id} )
      if (this.personIndex < this.users.length - 1) {
        this.personIndex += 1
      }
    },

    async disliked () {
      this.isLiked = false
      const result = await axios.post('api/liked/dislikeUser', { user_id: this.userId, disliked_user_id: this.users[this.personIndex].user_id} )
      if (this.personIndex < this.users.length - 1) {
        this.personIndex += 1
      }
    }
  },
  computed: {
    user () {
      return this.$store.users.user
    },
    userId () {
      return this.$store.state.users.userId
    }
  }
};
</script>
