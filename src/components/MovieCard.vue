<template>
    <div class="main__card-container">
      <v-hover v-slot="{ isHovering, props }">
        <v-card class="mx-auto main__card" max-width="344" v-bind="props">
          <v-img class="card__image" cover :src="movie.poster.previewUrl"></v-img>
  
          <v-card-item>
            <v-card-title>
              <h2 class="text-h6 text">{{ movie.name }}</h2>
            </v-card-title>
        <!-- <v-rating :value="3"></v-rating>-->  
            <v-card-subtitle class="card__info">
              <span class="text text-subtitle-1 card__item">{{ movie.year }}</span>
              <span class="text text-subtitle-1 card__item">
                <svg-icon type="mdi" :path="pathRate"></svg-icon>
                {{ (movie.rating.kp).toFixed(1) }}</span>     
            </v-card-subtitle>
          </v-card-item>
          <v-overlay
            :model-value="isHovering"
            class="align-center justify-center"
            scrim="#0b0f16"
            contained
          >
          <router-link class="link" :to="`/movie/${id}`">
            <v-btn class="button">Узнать больше</v-btn>
          </router-link>
          </v-overlay>
        </v-card>
      </v-hover>
    </div>
   
  </template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiStarOutline } from '@mdi/js';

  export default {
    props: {
      id: Number,
      movie: Object,
    },

    components: {
        SvgIcon, 
    },

    data() {
        return {
          pathRate: mdiStarOutline,
     }},
  }
</script>

<style lang="scss" scoped>
@import '../assets/styles/style.scss';

.main__card-container {
  width: 220px;
}

.main__card {
  background-color: $secondary-bg-color;
}

.text {
  color: $text-color;
}

.card__image {
  height: 300px;
  width: 100%;
}

.card__info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.card__item {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
}

</style>