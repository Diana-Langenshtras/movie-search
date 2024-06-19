<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify } from '@mdi/js';

import MovieCard from '../components/MovieCard.vue'

import { useRootStore } from '../stores/root';
import { storeToRefs } from 'pinia';

export default {
    components: {
        SvgIcon, MovieCard,
    },
    data() {
        return {
            path: mdiMagnify,
            search: '',
            todos: [],
            movies: [],
        }
    },
    computed: {
        moviesByTitle() {
            return this.movies.filter(movie => movie.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1)
        },
    },
    beforeMount() {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => {
            this.todos = json;
        })
    },
    created() {
      const rootStore = useRootStore();
      rootStore.getMovies();
      const {movies} = storeToRefs(rootStore);
      this.movies = movies;
      console.log(movies);
    },
}
</script>

<template>
    <v-card
    class="pa-4"
    height="300px"
    img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
    flat
  >
    <v-toolbar dense floating>
      <v-text-field
        hide-details
        single-line
        v-model="search"
      ></v-text-field>

      <v-btn icon>
        <svg-icon type="mdi" :path="path"></svg-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
  <ul>
    <li v-for="movie in moviesByTitle" :key="movie.id">{{ movie.name }}</li>
  </ul>
  <MovieCard></MovieCard>
</template>

<style lang="scss" scoped>
@import '../assets/styles/style.scss';

.button {
  padding: 20px;
  margin-top: 100px;
  font-size: 30px;
}

</style>