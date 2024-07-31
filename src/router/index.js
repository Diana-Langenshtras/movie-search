import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import ExtendedMovieCard from '../components/ExtendedMovieCard.vue'
import BookmarksPage from '../pages/BookmarksPage.vue'

const routes = [
  { name: "start", path: '/', component: HomePage},
  { name: "movie", path: '/movie/:id', component: ExtendedMovieCard },
  { name: "bookmarks", path: '/bookmarks', component: BookmarksPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router