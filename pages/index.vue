<template>
    <v-container v-if="!isLoading">
      <FeedPerson :user="users[personIndex]" @liked="liked" @disliked="disliked"></FeedPerson>
      <v-container v-if="isLiked === true">
        <p>You liked this pet!</p>
      </v-container>
      <v-container v-if="isLiked === false">
        <p>You disliked this pet!</p>
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
    liked () {
      this.isLiked = true
    },

    disliked () {
      this.isLiked = false
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    userId () {
      return this.$store.state.users.userId
    }
  }
};
</script>
