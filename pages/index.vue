<template>
  <v-form ref="form">
    <v-container align-items="center">
      <v-row>
        <v-col cols="3" md="4">
          <v-text-field v-model="form.username" label="Username"> </v-text-field>
        </v-col>
        <v-col cols="3" md="4">
          <v-text-field v-model="form.password" label="Password" type="password"> </v-text-field>
        </v-col>
        <v-col cols="3" md="4">
          <v-text-field v-model="form.email" :rules="emailRules" label="Email">
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
import axios from 'axios';

export default {
  name: "IndexPage",
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: ""
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
        let data = {
          username: this.form.username,
          password: this.form.password,
          email: this.form.email
        }
        axios.post("/api/users", data)
          .then(response => this.userId = response.data.id)
          .catch(error => {
            this.errorMessage = error.message;
            console.log(data);
            console.error("There was an error!", error);
            console.error(response)
        });
      }
  }
};
</script>
