import { createApp } from 'vue'

// Vuetify
import './assets/styles/style.scss'
import './assets/styles/globals.scss'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
})

// router
import router from './router'

//pinia
import { createPinia } from 'pinia'

const app = createApp(App).use(router).use(vuetify).use(createPinia()).mount('#app');


