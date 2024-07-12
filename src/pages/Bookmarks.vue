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

.button {
  background-color: $primary-color;
  color: $text-color;
  border-radius: 50px;
  padding: 10px;
  font-size: 18px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.main {
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

</style>