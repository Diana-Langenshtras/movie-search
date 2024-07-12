import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import ExtendedMovieCard from '../components/ExtendedMovieCard.vue'

const routes = [
  { name: "start", path: '/', component: Home},
  { name: "movie", path: '/movie/:id', component: ExtendedMovieCard },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router