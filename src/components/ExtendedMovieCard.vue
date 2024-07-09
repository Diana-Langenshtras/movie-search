<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClockTimeFourOutline } from '@mdi/js';
import { mdiCalendarBlankOutline } from '@mdi/js';
import { mdiStarOutline } from '@mdi/js';

import StarRating from 'vue-star-rating'

import { useRootStore } from '../stores/root';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { watch } from 'vue'
import { ref } from 'vue';

    const route = useRoute()
    const rootStore = useRootStore();
    rootStore.getMovies();
    const {movies} = storeToRefs(rootStore);
    const {savesAndRatings} = storeToRefs(rootStore);

    const pathTime = mdiClockTimeFourOutline;
    const pathDate = mdiCalendarBlankOutline;
    const pathRate = mdiStarOutline;
    const rating = ref(rootStore.savesAndRatings[route.params.id].rating);
    const active = ref(rootStore.savesAndRatings[route.params.id].save);
    const buttonText = ref('Добавить в закладки');

    function handleClick() {
        active.value = !active.value;
        if (active.value) buttonText.value = 'Добавлено';
        else buttonText.value = 'Добавить в закладки';
        rootStore.updateSaves(active.value, route.params.id);
        console.log(rootStore.savesAndRatings);
    }

    watch(rating, () => {
        rootStore.updateRatings(active.value, rating.value, route.params.id)
        console.log(rootStore.savesAndRatings)   
      })

</script>

<!--<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClockTimeFourOutline } from '@mdi/js';
import { mdiCalendarBlankOutline } from '@mdi/js';
import { mdiStarOutline } from '@mdi/js';

import { mapState } from 'pinia';
import { useRootStore } from '../stores/root';
import { storeToRefs } from 'pinia';

import StarRating from 'vue-star-rating'

export default {
    components: {
        SvgIcon, StarRating,
    },
    data() {
        return {
            pathTime: mdiClockTimeFourOutline,
            pathDate: mdiCalendarBlankOutline,
            pathRate: mdiStarOutline,
        //    movies: [],
       //     savesAndRatings: [],
            rating: 5,
            active: false,
            buttonText: 'Добавить в закладки'
        }
    },
    methods: {
        handleClick() {
            let flag = true;
            this.active = !this.active;
            if (this.active) this.buttonText = 'Добавлено';
            else this.buttonText = 'Добавить в закладки';
            this.savesAndRatings.forEach((item) => {
                if (item.id === this.$route.params.id) 
                {
                    item.save = this.active;
                    flag = false;
                }
            })
            if (flag) this.savesAndRatings.push({
                id: this.$route.params.id,
                rating: 0,
                save: this.active,
            })
            console.log(this.savesAndRatings)
        },
    },
    created() {
    /*  const rootStore = useRootStore();
      rootStore.getMovies();
      const {movies} = storeToRefs(rootStore);
      this.movies = movies;
      const {savesAndRatings} = storeToRefs(rootStore);
      this.savesAndRatings = savesAndRatings;
      console.log(movies);*/
    },
    computed: {
        ...mapState(useRootStore, ['movies']),
        ...mapState(useRootStore, ['savesAndRatings']),
    },
    watch: {
      rating(){
        let flag = true;
        this.savesAndRatings.forEach((item) => {
                if (item.id === this.$route.params.id) 
                {
                    item.rating = this.rating;
                    flag = false;
                }
            })
            if (flag) this.savesAndRatings.push({
                id: this.$route.params.id,
                rating: this.rating,
                save: this.active,
            })
            console.log(this.savesAndRatings)
            
      },    
    },   
}
</script>-->

<template>
<!--    <main class="main"  :style="{ backgroundImage: `url(${movies[$route.params.id].poster.url})`}">-->
<!--   <main class="main" :style="{'background-color':`${movies[$route.params.id].color}`}">-->
    <main class="main">
        <div class="main__container">
            <img class="main__img" :src="movies[route.params.id]?.poster.url" :alt="`Постер фильма '${movies[route.params.id]?.name}'`">
            <star-rating v-model:rating="rating" :increment="0.5" :max-rating="10" :star-size="20"/>
            <button class="button" @click="handleClick" :style="{
                backgroundColor: active ? '#ffd055' : '#002677',
                color: active ? 'black' : 'white',
            }">
          <!--  <span v-if="!state.active">Добавить в закладки</span>
            <span v-else>Добавлено</span> -->
                {{buttonText}}
            </button> 
        </div>
        <section class="main__description">
            <h1>{{ movies[route.params.id]?.name }}</h1>
            <h2>{{ movies[route.params.id]?.shortDescription }}</h2>
            <div class="description__info">
                <span class="description__item">
                    <svg-icon type="mdi" :path="pathTime"></svg-icon>
                    {{ movies[route.params.id]?.movieLength }}
                </span>
                <span class="description__item">
                    <svg-icon type="mdi" :path="pathDate"></svg-icon>
                    {{ movies[route.params.id]?.year }}
                </span>
                <span class="description__item">
                    <svg-icon type="mdi" :path="pathRate"></svg-icon>
                    {{ (movies[route.params.id]?.rating.kp)?.toFixed(1) }}
                </span>    
            </div>
            <p>{{ rootStore.movies[route.params.id]?.description }}</p>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import '../assets/styles/style.scss';

.vue-star-rating[data-v-f675a548]{
    justify-content: center;
}
.button {
  background-color: $button-color;
  color: $text-color;
  border-radius: 50px;
  padding: 10px;
  font-size: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.main {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 100px;
    margin: 0 auto;
    padding: 100px 100px;
}

.main__container{
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 20px;
}

.main__img {
    width: 100%;
}

.main__description {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.description__info {
    display: flex;
    flex-direction: row;
    gap: 20px;
    font-size: 18px;
}

.description__item {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
}

.item__text {
    
}

@media (width <= 768px) {
    .main {
        grid-template-columns: 1fr;
        grid-template-rows: auto 2fr;
        gap: 50px;
        padding: 50px 50px;
    }
    .description__info {
        font-size: 14px;
    }
    .main__img {
        width: 60%;
        justify-self: center;
      //  height: 100%;
    }
  }

</style>

