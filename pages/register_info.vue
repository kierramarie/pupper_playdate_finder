<template>
  <v-card class="d-flex flex-column mx-auto" style="padding: 30px" max-width="500">
    <h2 style="padding-bottom:30px;">Register - Your Information</h2>
    <v-form ref="form">
      <v-text-field v-model="form.username" label="Username"></v-text-field>
      <v-text-field
        v-model="form.password"
        label="Password"
        type="password"
      ></v-text-field>
      <v-text-field v-model="form.email" label="Email"></v-text-field>
      <v-text-field v-model="form.parentName" label="Your Name"></v-text-field>
      <div>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.parentBirthday"
              label="Your Birthday"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.parentBirthday"
            :active-picker.sync="activePicker"
            :max="
              new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)
            "
            min="1950-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>
      </div>
      <div class="d-flex">
        <v-text-field v-model="form.city" label="City" style="padding-right:10px"></v-text-field>
        <v-text-field v-model="form.valtio" label="State" style="padding-left:10px"></v-text-field>
      </div>
      <v-btn class="mr-4" @click="validate"> Next </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "RegisterPageInfo",
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        parentName: "",
        parentBirthday: "",
        city: "",
        valtio: "",
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      activePicker: null,
      menu: false,
    };
  },
  created() {
    this.form.username = this.getUsername();
    this.form.password = this.getPassword();
    this.form.email = this.getEmail();
    this.form.parentName = this.getParentName();
    this.form.parentBirthday = this.getParentBirthday();
    this.form.city = this.getCity();
    this.form.valtio = this.getValtio();
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      this.$store.commit("register/setUsername", this.form.username);
      this.$store.commit("register/setPassword", this.form.password);
      this.$store.commit("register/setEmail", this.form.email);
      this.$store.commit("register/setParentName", this.form.parentName);
      this.$store.commit(
        "register/setParentBirthday",
        this.form.parentBirthday
      );
      this.$store.commit("register/setCity", this.form.city);
      this.$store.commit("register/setState", this.form.valtio);
      this.$router.push("/register_pet");
    },

    getUsername() {
      return this.$store.state.register.username;
    },

    getPassword() {
      return this.$store.state.register.password;
    },

    getEmail() {
      return this.$store.state.register.email;
    },

    getParentName() {
      return this.$store.state.register.parentName;
    },

    getParentBirthday() {
      return this.$store.state.register.parentBirthday;
    },

    getCity() {
      return this.$store.state.register.city;
    },

    getValtio() {
      return this.$store.state.register.valtio;
    },

    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>
