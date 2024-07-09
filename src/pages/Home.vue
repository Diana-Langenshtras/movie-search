<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify } from '@mdi/js';
import { mdiClockTimeFourOutline } from '@mdi/js';
import { mdiCalendarBlankOutline } from '@mdi/js';
import { mdiStarOutline } from '@mdi/js';
import { mdiChevronRight } from '@mdi/js';
import { mdiChevronLeft } from '@mdi/js';

import MovieCard from '../components/MovieCard.vue'

import { useRootStore } from '../stores/root';
import { storeToRefs } from 'pinia';

export default {
    components: {
        SvgIcon, 
        MovieCard,
    },
    data() {
        return {
            pathSearch: mdiMagnify,
            pathTime: mdiClockTimeFourOutline,
            pathDate: mdiCalendarBlankOutline,
            pathRate: mdiStarOutline,
            pathNext: mdiChevronRight,
            pathPrev: mdiChevronLeft,
            search: '',
            movies: [],
            page: 1,
            sortParam: '',
            hasNextPage: true,
        }
    },
    computed: {
        sortedMovies () {
          const start = (this.page - 1) * 15;
          const end = this.page * 15;
          this.hasNextPage = this.movies.length > end;
          if (this.search !== '') {
            return this.movies.filter(movie => movie.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1).slice(start, end);
          }
          else{
            switch(this.sortParam){
                case 'year': {
                  console.log( this.movies.sort(sortByYear).slice(start, end))
                  return this.movies.sort(sortByYear).slice(start, end);
                }
                case 'rating': {
                  return this.movies.sort(sortByRating).slice(start, end);
                }
                case 'timekeeping': {
                  return this.movies.sort(sortByTime).slice(start, end);
                }
                default: return this.movies.slice(start, end);
            }
          }
        },
    },
    created() {
      const rootStore = useRootStore();
      rootStore.getMovies();
      const {movies} = storeToRefs(rootStore);
      this.movies = movies;
      console.log(movies);
    },
    watch: {
      sortParam(){
        this.page = 1;
      },
      search(){
        this.page = 1;
      },
    }
}

const sortByYear = (d1, d2) => (d1.year > d2.year) ? 1 : -1;
const sortByRating = (d1, d2) => (d1.rating.kp > d2.rating.kp) ? -1 : 1;
const sortByTime = (d1, d2) => (d1.movieLength > d2.movieLength) ? 1 : -1;
</script>

<template>
  <main class="main">
    <v-card class="main__card-search" flat >
      <v-toolbar class="card__toolbar" dense floating>
        <v-text-field
          single-line
          class="card__input"
          v-model="search"
          hide-details="auto"
          bg-color="#151c2c"
          color="#002677"
        >
        </v-text-field>
        <v-btn class="button card__button" icon>
          <svg-icon type="mdi" :path="pathSearch"></svg-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <div class="main__buttons">
      <div class="main__button-container">
        <button class="button" v-if="page > 1" @click="page = page - 1">
            назад
            <svg-icon type="mdi" :path="pathPrev"></svg-icon> 
        </button>
        <button class="button" v-if="hasNextPage" @click="page = page + 1">
            вперед
            <svg-icon type="mdi" :path="pathNext"></svg-icon>   
        </button>
      </div>

      <div class="main__button-container">
        <button class="button" @click="sortParam='year'">
            year
          <svg-icon type="mdi" :path="pathDate"></svg-icon>    
        </button>
        <button class="button" @click="sortParam='rating'">
            rating
          <svg-icon type="mdi" :path="pathRate"></svg-icon>    
        </button>
        <button class="button" @click="sortParam='timekeeping'">
            timekeeping
          <svg-icon type="mdi" :path="pathTime"></svg-icon>    
        </button>
      </div>
    </div>

    <ul class="main__list">
    <!--  <li class="main__item" v-for="(movie,index) in moviesByTitle"><MovieCard 
          :key="index"
          :id="index"
          :name="movie.name"
          :rating="movie.rating.kp"
          :year="movie.year"
          :poster="movie.poster.previewUrl"
          :movie="movie"
        ></MovieCard></li>-->
        <li class="main__item" v-for="(movie,index) in sortedMovies"><MovieCard 
          :key="index"
          :id="Number(movie.id)"
          :movie="movie"
        >
        {{ console.log(sortedMovies) }}
      </MovieCard></li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
@import '../assets/styles/style.scss';

.button {
  background-color: $button-color;
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

.main__list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 40px;
  column-gap: 20px;
  align-items: stretch;
}

.main__item {
  
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
  //height: auto !important;
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