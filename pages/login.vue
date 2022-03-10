<template>
  <v-form ref="form">
    <v-container align-items="center">
      <v-row>
        <v-col cols="3" md="4">
          <v-text-field v-model="form.username" label="Username"></v-text-field>
        </v-col>
        <v-col cols="3" md="4">
          <v-text-field v-model="form.password" label="Password" type="password"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" md="4">
          <v-btn
            color="success"
            class="mr-4"
            @click="login"
          >
          Submit
          </v-btn>
          <v-btn class="mr-4" @click="register">Register</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>

export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
      login () {
        this.$store.dispatch('users/login', {
            username: this.form.username,
            password: this.form.password
      })
    },
      register () {
        this.$router.push('/register');
    }
  },
  computed: {
      user () {
        return this.$store.state.users.user
    }
  }
};
</script>
