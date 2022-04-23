<template>
  <v-card
    class="d-flex flex-column mx-auto"
    style="padding: 30px"
    max-width="500"
  >
    
    <v-img
      :src="image"
      alt="profile pic placeholder"
      max-height="200"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3)"
    >
      <v-card-title>{{ user.pet_name }}</v-card-title>
    </v-img>
    <v-card-text v-if='user.city != null && user.state != null && user.city != "" && user.state != ""'>I'm from {{ user.city }}, {{ user.state }}!</v-card-text>
    <v-card-text style="padding-bottom:5px;">Bio:</v-card-text>
    <v-card-text style="padding-top:5px;">{{ user.bio }}</v-card-text>
    <div class="d-flex"> 
      <v-btn class="mx-2" color="accent" @click="dislike" fab large>
        <v-icon x-large color="white">mdi-thumb-down</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" color="primary" @click="like" fab large>
        <v-icon x-large color="white">mdi-thumb-up</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import image from "/assets/profile-placeholder.png";

export default {
  name: "FeedPerson",
  data: function () {
    return {
      image: image,
      liked: false,
    };
  },
  props: {
    user: Object,
  },
  methods: {
    like() {
      this.liked = true;
      this.$emit("liked", this.liked);
    },

    dislike() {
      this.liked = false;
      this.$emit("disliked", this.liked);
    },
  },
};
</script>
