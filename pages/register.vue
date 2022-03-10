<template>
  <v-form ref="form">
    <v-container align-items="center">
      <v-row>
        <v-col cols="3" md="4">
          <v-text-field v-model="form.username" label="Username"> </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" md="4">
          <v-text-field v-model="form.password" label="Password" type="password"> </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" md="4">
          <v-text-field v-model="form.email" label="Email">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" md="4">
          <v-text-field v-model="form.parentName" label="Your Name">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" md="4">
          <v-text-field v-model="form.parentBirthday" label="Please enter your birthday">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" md="4">
          <v-btn
            color="success"
            class="mr-4"
            @click="validate"
          >
          Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        parentName: "",
        parentBirthday: ""
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    };
  },
  methods: {
      validate () {
        this.$refs.form.validate()
        this.$store.commit("register/setUsername", this.form.username);
        this.$store.commit("register/setPassword", this.form.password);
        this.$store.commit("register/setEmail", this.form.email);
        this.$store.commit("register/setParentName", this.form.parentName);
        this.$store.commit("register/setParentBirthday", this.form.parentBirthday);
        this.$router.push('/register');
      }
  }
};
</script>
