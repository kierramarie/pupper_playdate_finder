<template>
  <v-card class="d-flex flex-column mx-auto" style="padding:30px;" max-width="500">
    <h2 style="padding-bottom:30px;">Register - Pet Profile</h2>
    <v-form ref="form">
      <v-text-field v-model="form.petName" label="Tell Us Your Pet's Name">
      </v-text-field>
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
              v-model="form.petBirthday"
              label="Your Pet's Birthday"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.petBirthday"
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
      <v-textarea
        v-model="form.bio"
        label="Bio"
      ></v-textarea>
      <v-btn class="mr-4" @click="back"> Back </v-btn>
      <v-btn color="secondary" class="mr-4" @click="validate"> Register </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "RegisterPageInfo",
  data() {
    return {
      form: {
        petName: "",
        petBirthday: "",
        bio: ""
      },
      activePicker: null,
      menu: false,
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  created() {
    this.form.petName = this.getPetName();
    this.form.petBirthday = this.getPetBirthday();
    this.form.bio = this.getBio();
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      this.$store.commit("register/setPetName", this.form.petName);
      this.$store.commit("register/setPetBirthday", this.form.petBirthday);
      this.$store.commit("register/setBio", this.form.bio);
      this.$store.dispatch("register/register");
    },

    back() {
      this.$router.push("/register_info");
    },

    getPetName() {
      return this.$store.state.register.petName;
    },

    getPetBirthday() {
      return this.$store.state.register.petBirthday;
    },

    getBio() {
      return this.$store.state.register.bio;
    },

    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>
