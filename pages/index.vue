<template>
    <v-container align-items="center">
      <v-row>
        <v-col cols="3" md="4">
          The logged in user is {{user}}
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  name: "IndexPage",
  middleware: 'auth',
  data() {
    return {
    };
  },
  methods: {
      
  },
  computed: {
      user () {
        return this.$store.state.users.user
    }
  }
};
</script>
