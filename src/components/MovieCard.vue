<template>
    <div class="main__card-container">
      <v-hover v-slot="{ isHovering, props }">
        <v-card class="mx-auto" max-width="344" v-bind="props">
          <v-img class="card__image" cover :src="movie.poster.previewUrl"></v-img>
  
          <v-card-item>
            <v-card-title>
              <h2 class="text-h6 text-primary">{{ movie.name }}</h2>
            </v-card-title>
        <!-- <v-rating :value="3"></v-rating>-->  
            <v-card-subtitle>
              <span class="text-primary text-subtitle-2">{{ (movie.rating.kp).toFixed(1) }}</span>
            </v-card-subtitle>
            <v-card-subtitle>
              <span class="text-primary text-subtitle-2">{{ movie.year }}</span>
            </v-card-subtitle>
          </v-card-item>
          <v-overlay
            :model-value="isHovering"
            class="align-center justify-center"
            scrim="#036358"
            contained
          >
          <router-link :to="`/movie/${id}`">
            <v-btn variant="flat">See more info</v-btn>
          </router-link>
          </v-overlay>
        </v-card>
      </v-hover>
    </div>
   
  </template>
  <script>

  export default {
    props: {
      id: Number,
   //   name: String,
    //  rating: Number,
   //   year: Number,
    //  poster: String,
      movie: Object,
    },

    data: () => ({ 
      
     }),
  }
</script>

<style lang="scss" scoped>
@import '../assets/styles/style.scss';

.main__card-container {
  width: 200px;
}

.card__image {
  height: 300px;
  width: 100%;
}

</style>