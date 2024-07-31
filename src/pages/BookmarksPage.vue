<template>
    <main class="main">
        <h1 class="main__title">Закладки и оценки</h1>
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
        <ul class="main__list">
          <li class="main__item" v-for="movie in bookmarksMovies" :key="Number(movie.id)"><BookmarkCard 
              :id="Number(movie.id)"
              :movie="movie"
            />
          </li>
        </ul>
    </main>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClockTimeFourOutline, mdiCalendarBlankOutline, mdiStarOutline } from '@mdi/js';
import { useRootStore } from '../stores/root';

import { computed } from 'vue';
import { ref } from 'vue';

import BookmarkCard from '../components/BookmarkCard.vue'

    const sortByYear = (d1, d2) => d1.year - d2.year;
    const sortByRating = (d1, d2) => d2.rating.kp - d1.rating.kp;
    const sortByTime = (d1, d2) => d1.movieLength - d2.movieLength;
    const rootStore = useRootStore();
    const sortParam = ref ('');
    const pathTime = mdiClockTimeFourOutline;
    const pathDate = mdiCalendarBlankOutline;
    const pathRate = mdiStarOutline;

    const bookmarksMovies = computed(() => {
        const array = rootStore.movies.filter(el => el.id in rootStore.savesAndRatings);
        switch(sortParam.value){
            case 'year': {
                return array.sort(sortByYear);
              }
            case 'rating': {
                return array.sort(sortByRating);
              }
            case 'timekeeping': {
                return array.sort(sortByTime);
              }
            default: return array;
        }
    })  

</script>

<style lang="scss" scoped>

.main {
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.main__title {
  color: $secondary-color;
}

.main__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 40px;
  column-gap: 20px;
  align-items: stretch;
  padding-top: 30px;
}

.main__button-container {
  display: flex;
  gap: 10px;
}

</style>