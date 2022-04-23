<template>
  <v-container v-if="loaded">
    <v-card
      class="d-flex flex-column mx-auto"
      style="padding: 30px"
      max-width="800"
    >
      <v-card-title>Your Profile</v-card-title>
      <v-card-text>Name: {{ user.parent_name }}</v-card-text>
      <v-card-text>Email: {{ user.email }}</v-card-text>
      <v-card-text>Birthday: {{ user.parent_birthday }}</v-card-text>
      <v-card-text>Location: {{ user.city }}, {{ user.state }}</v-card-text>

      <v-card-title>Your Pet</v-card-title>
      <v-card-text>Name: {{ user.pet_name }}</v-card-text>
      <v-card-text>Birthday: {{ user.pet_birthday }}</v-card-text>
      <v-card-text>Bio: {{ user.bio }}</v-card-text>

      <v-btn color="accent" class="mr-4" width="100px" @click="edit" depressed>Edit</v-btn>
    </v-card>
  </v-container>
  <v-container v-else>
      <h3>Loading</h3>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfilePage",
  data() {
    return {
      userId: this.$store.state.users.userId,
      user: {},
      loaded: false
    };
  },
  async fetch() {
    const result = await axios.get("/api/users/" + this.userId);
    this.user = result.data;
    this.loaded = true;
  },
  methods: {
      edit() {
          this.$router.push("/profile_edit")
      }
  }
};
</script>