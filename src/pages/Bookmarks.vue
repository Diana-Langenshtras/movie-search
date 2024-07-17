<template>
    <main class="main">
        <h1 class="main__title">Закладки и оценки</h1>
        <div class="main__button-container">
          <button class="button" @click="sortParam='year'">
              Год
            <svg-icon type="mdi" :path="pathDate"></svg-icon>    
          </button>
          <button class="button" @click="sortParam='rating'">
              Рейтинг
            <svg-icon type="mdi" :path="pathRate"></svg-icon>    
          </button>
          <button class="button" @click="sortParam='timekeeping'">
              Время
            <svg-icon type="mdi" :path="pathTime"></svg-icon>    
          </button>
        </div>
        <ul class="main__list">
          <li class="main__item" v-for="(movie,index) in bookmarksMovies"><BookmarkCard 
              :key="index"
              :id="Number(movie.id)"
              :movie="movie"
            >
          </BookmarkCard></li>
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

    const sortByYear = (d1, d2) => (d1.year > d2.year) ? 1 : -1;
    const sortByRating = (d1, d2) => (d1.rating.kp > d2.rating.kp) ? -1 : 1;
    const sortByTime = (d1, d2) => (d1.movieLength > d2.movieLength) ? 1 : -1;
    const rootStore = useRootStore();
    rootStore.getMovies();
    const sortParam = ref ('');
    const pathTime = mdiClockTimeFourOutline;
    const pathDate = mdiCalendarBlankOutline;
    const pathRate = mdiStarOutline;

    const bookmarksMovies = computed(() => {
        const array = [];
        rootStore.movies.map(el => {
            if (el.id in rootStore.savesAndRatings)
            {
                array.push(el);
            }
        })
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
@import '../assets/styles/style.scss';

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