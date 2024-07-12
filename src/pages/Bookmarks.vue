<template>
    <main class="main">
        <h1>Закладки и оценки</h1>
        <ul class="main__list">
          <li class="main__item" v-for="(movie,index) in bookmarksMovies"><BookmarkCard 
              :key="index"
              :id="Number(movie.id)"
              :movie="movie"
            >
            {{ console.log(movie) }}
          </BookmarkCard></li>
        </ul>
    </main>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClockTimeFourOutline, mdiSortNumericVariant, mdiCalendarBlankOutline, mdiStarOutline } from '@mdi/js';
import StarRating from 'vue-star-rating'

import { useRootStore } from '../stores/root';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { watch } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';

import BookmarkCard from '../components/BookmarkCard.vue'

    const route = useRoute()
    const rootStore = useRootStore();
    rootStore.getMovies();
    const {movies} = storeToRefs(rootStore);
    const {savesAndRatings} = storeToRefs(rootStore);

    const bookmarksMovies = computed(() => {
        const array = [];
        rootStore.movies.map(el => {
            if (el.id in rootStore.savesAndRatings)
            {
                array.push(el);
            }
        })
        console.log(array)
        return array;
    });

</script>

<style lang="scss" scoped>
@import '../assets/styles/style.scss';

.main {
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

.main__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 40px;
  column-gap: 20px;
  align-items: stretch;
}

</style>