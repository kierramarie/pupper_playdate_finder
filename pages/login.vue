<template>
  <v-card
    class="d-flex flex-column mx-auto"
    style="padding: 30px"
    max-width="500"
  >
    <h2 style="padding-bottom:30px;">Login</h2>
    <v-form ref="form">
      <v-text-field v-model="form.username" label="Username"></v-text-field>
      <v-text-field
        v-model="form.password"
        label="Password"
        type="password"
      ></v-text-field>
      <v-btn color="success" class="mr-4" @click="login"> Submit </v-btn>
      <v-btn class="mr-4" @click="register">Register</v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "LoginPage",
  // middleware: 'loginCheck',
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  created() {
    const isAuthenticated =
      this.$store.state.users.userId != null &&
      this.$store.state.users.userId != ""
        ? true
        : false;
    if (isAuthenticated) {
      this.$router.push("/");
    }
  },
  methods: {
    login() {
      this.$store.dispatch("users/login", {
        username: this.form.username,
        password: this.form.password,
      });
    },
    register() {
      this.$router.push("/register_info");
    },
  },
  computed: {
    user() {
      return this.$store.state.users.user;
    },
  },
};
</script>
