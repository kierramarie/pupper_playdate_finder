<template>
  <v-container v-if="loaded">
    <v-card
      class="d-flex flex-column mx-auto"
      style="padding: 30px"
      max-width="800"
    >
        <v-card-title>Update Your Profile</v-card-title>
        <v-form>
            <v-text-field v-model="form.parent_name" label="Your Name"></v-text-field>
            <v-text-field v-model="form.email" label="Email"></v-text-field>
            <v-text-field v-model="form.pet_name" label="Pet Name"></v-text-field>
            <v-textarea v-model="form.bio" label="Bio"></v-textarea>
            <div class="d-flex">
                <v-text-field v-model="form.city" label="City" style="padding-right:10px"></v-text-field>
                <v-text-field v-model="form.state" label="State" style="padding-left:10px"></v-text-field>
            </div>
            <v-btn color="accent" @click="update">Update</v-btn>
            <v-btn @click="back">Back</v-btn>
        </v-form>
    </v-card>
  </v-container>
  <v-container v-else>
      <h3>Loading</h3>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileEditPage",
  data() {
    return {
      userId: this.$store.state.users.userId,
      user: {},
      loaded: false,
      form: {
          parent_name: "",
          email: "",
          pet_name: "",
          bio: "",
          city: "",
          state: ""
      }
    };
  },
  async fetch() {
    const result = await axios.get("/api/users/" + this.userId);
    this.user = result.data;
    this.form.parent_name = this.user.parent_name;
    this.form.email = this.user.email;
    this.form.pet_name = this.user.pet_name;
    this.form.bio = this.user.bio;
    this.form.city = this.user.city;
    this.form.state = this.user.state;
    this.loaded = true
  },
  methods: {
      async update() {
          const result = await axios.patch("/api/users/" + this.userId, {
              parent_name: this.form.parent_name,
              email: this.form.email,
              pet_name: this.form.pet_name,
              bio: this.form.bio,
              city: this.form.city,
              state: this.form.state
          });
          this.$router.push("/profile")
      },
      back() {
          this.$router.push("/profile")
      }
  }
};
</script>