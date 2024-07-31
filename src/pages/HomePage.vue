<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify, mdiClockTimeFourOutline, mdiCalendarBlankOutline, mdiStarOutline, mdiChevronRight, mdiChevronLeft } from '@mdi/js';

import MovieCard from '../components/MovieCard.vue'

import { useRootStore } from '../stores/root';
import { watch } from 'vue'
import { computed } from 'vue';
import { ref } from 'vue';

    const rootStore = useRootStore();
    const pathSearch = mdiMagnify;
    const pathTime = mdiClockTimeFourOutline;
    const pathDate = mdiCalendarBlankOutline;
    const pathRate = mdiStarOutline;
    const pathNext = mdiChevronRight;
    const pathPrev = mdiChevronLeft;
    const search = ref('');
    const page = ref(1);
    const sortParam = ref('');
    const hasNextPage = ref(true);
    const movies = computed(() => {return rootStore.movies});
    const sortByYear = (d1, d2) => d1.year - d2.year;
    const sortByRating = (d1, d2) => d2.rating.kp - d1.rating.kp;
    const sortByTime = (d1, d2) => d1.movieLength - d2.movieLength;
    
      const sortedMovies = computed(() => {
          const copyMovies = movies.value;
          const start = (page.value - 1) * 15;
          const end = page.value * 15;        
            switch(sortParam.value){
                case 'year': {
                  return (copyMovies.filter(movie => movie.name.toLowerCase().includes(search.value.toLowerCase()))).sort(sortByYear).slice(start, end);
                }
                case 'rating': {
                  return (copyMovies.filter(movie => movie.name.toLowerCase().includes(search.value.toLowerCase()))).sort(sortByRating).slice(start, end);
                }
                case 'timekeeping': {
                  return (copyMovies.filter(movie => movie.name.toLowerCase().includes(search.value.toLowerCase()))).sort(sortByTime).slice(start, end);
                }
                default: return ((movies.value).filter(movie => movie.name.toLowerCase().includes(search.value.toLowerCase()))).slice(start, end);
          }
      })
        
      watch(sortParam, () => {
        page.value = 1;
      })

      watch(search, () => {
        page.value = 1;
        hasNextPage.value = ((movies.value).filter(movie => movie.name.toLowerCase().includes(search.value.toLowerCase()))).length > page.value * 15;
      })
    
      watch(page, () => {
        hasNextPage.value = ((movies.value).filter(movie => movie.name.toLowerCase().includes(search.value.toLowerCase()))).length > page.value * 15;
      })

</script>

<template>
  <main class="main">
    <router-link class="link" :to="`/bookmarks`">
      <button class="button">Закладки и оценки</button>
    </router-link>
    <v-card class="main__card-search" flat >
      <v-toolbar 
        class="card__toolbar" 
        dense 
        floating>
          <v-text-field
            single-line
            class="card__input"
            v-model="search"
            hide-details="auto"
            bg-color="#202020"
            color="#002677"
          />
          <v-btn class="button card__button" icon>
            <svg-icon type="mdi" :path="pathSearch"/>
          </v-btn>
      </v-toolbar>
    </v-card>
    <div class="main__buttons">
      <div class="main__button-container">
        <button class="button" v-if="page > 1" @click="page = page - 1">
            Назад
            <svg-icon type="mdi" :path="pathPrev"/>
        </button>
        <button class="button" v-if="hasNextPage" @click="page = page + 1">
            Вперед
            <svg-icon type="mdi" :path="pathNext"/> 
        </button>
      </div>
      <div class="main__button-container">
        <button class="button" @click="sortParam='year'">
            Год
          <svg-icon type="mdi" :path="pathDate"/> 
        </button>
        <button class="button" @click="sortParam='rating'">
            Рейтинг
          <svg-icon type="mdi" :path="pathRate"/>
        </button>
        <button class="button" @click="sortParam='timekeeping'">
            Время
          <svg-icon type="mdi" :path="pathTime"/>  
        </button>
      </div>
    </div>
    <ul class="main__list">
        <li class="main__item" v-for="movie in sortedMovies" :key="Number(movie.id)">
          <MovieCard 
            :id="Number(movie.id)"
            :movie="movie"
          />
        </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>

.main {
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

.main__list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 40px;
  column-gap: 20px;
  align-items: stretch;
}

.main__card-search {
  width: 80%;
  padding: 10px 20px;
  background-color: $secondary-bg-color;
  border-radius: 50px;
}

.card__button {
  padding: 0;
}

.card__toolbar {
  border-radius: 50px;
  background-color: $secondary-bg-color;
  color: black;
}

.card__input {
  padding: 0 20px;
  background-color: transparent;
  color: $text-color;
}

.v-text-field input {
  font-size: 24px;
}

.main__buttons {
  display: flex;
  justify-content: space-between;
  padding: 0;
  width: 80%;
}

.main__button-container {
  display: flex;
  gap: 10px;
}

@media (width <= 1150px) {
    .main {
      padding: 50px 50px;
      gap: 20px;
    }
    .main__list {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
      row-gap: 20px;
      column-gap: 10px;
    }
  }

</style>