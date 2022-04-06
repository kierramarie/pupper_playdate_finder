<template>
    <v-card>
      <v-container align-items="center">
        <v-row>
          <v-col>
            <v-card-title>{{user.pet_name}}</v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-img :src="image" alt="profile pic placeholder" max-height="150" max-width="150"></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-text>{{user.location}}</v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-text>{{user.bio}}</v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3" md="4">
            <v-btn icon color="green" @click="like">
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3" md="4">
            <v-btn icon color="red" @click="dislike">
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
</template>

<script>
import image from "/assets/profile-placeholder.png"

export default {
  name: 'FeedPerson',
  data: function() {
      return {
          image: image,
          liked: false
      }
  },
  props: {
    user: Object
  },
  methods: {
      like() {
          this.liked = true
          this.$emit("liked", this.liked)
      },

        dislike() {
            this.liked = false
            this.$emit("disliked", this.liked)
        }
  }
}
</script>
