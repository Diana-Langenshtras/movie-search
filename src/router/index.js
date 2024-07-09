import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import ExtendedMovieCard from '../components/ExtendedMovieCard.vue'
import Bookmarks from '../pages/Bookmarks.vue'

const routes = [
  { name: "start", path: '/', component: Home},
  { name: "movie", path: '/movie/:id', component: ExtendedMovieCard },
  { name: "bookmarks", path: '/bookmarks', component: Bookmarks },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router