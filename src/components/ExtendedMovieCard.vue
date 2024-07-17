<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClockTimeFourOutline, mdiCalendarBlankOutline, mdiStarOutline } from '@mdi/js';

import StarRating from 'vue-star-rating'

import { useRootStore } from '../stores/root';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { watch } from 'vue'
import { computed } from 'vue';
import { ref } from 'vue';

import MovieCard from '../components/MovieCard.vue'

    const route = useRoute()
    const rootStore = useRootStore();
    rootStore.getMovies();
    const pathTime = mdiClockTimeFourOutline;
    const pathDate = mdiCalendarBlankOutline;
    const pathRate = mdiStarOutline;
    const rating = rootStore.savesAndRatings[route.params.id]?.rating ? ref(rootStore.savesAndRatings[route.params.id].rating) : ref(5);
    const active = rootStore.savesAndRatings[route.params.id]?.save ? ref(rootStore.savesAndRatings[route.params.id].save) : ref(false);
    const buttonText = ref('Добавить в закладки');

    function match(str1, str2){
        let tmpValue = 0;
        let minLength = str1.length;
        if(str1.length > str2.length){
            minLength = str2.length;
        }	
        let maxLength = str1.length;
        if(str1.length < str2.length){
            maxLength = str2.length;
        }
        for(let i = 0; i < minLength; i++) {
            if(str1[i] == str2[i]) {
                tmpValue++;
            }
        }
        let weight = tmpValue / maxLength;
        return (weight * 100);
    }

    const movie = computed(() => getMovie(route.params.id));

    function getMovie(id) {
        return rootStore.movies.find(movie => movie?.id === id);
    }

    watch(movie, current => {}, { immediate: true })

    const similarMovies = computed(() => {
        const array = [];
        rootStore.movies.map(el => {
            if (10 < match(String(movie.value.shortDescription), String(el.shortDescription)) && match(String(movie.value.shortDescription), String(el.shortDescription)) < 100)
             {   
                array.push(el);
             }
        })
        console.log(array);
        return array;
    });

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

<template>
<!--    <main class="main"  :style="{ backgroundImage: `url(${movies[$route.params.id].poster.url})`}">-->
<!--   <main class="main" :style="{'background-color':`${movies[$route.params.id].color}`}">-->
    <main class="main">
        <section class="main__section">
            <div class="main__container">
                <img class="main__img" :src="movie?.poster.url" :alt="`Постер фильма '${movie?.name}'`">
                <star-rating v-model:rating="rating" :increment="0.5" :max-rating="10" :star-size="20"/>
                <button class="button" @click="handleClick" :style="{
                    backgroundColor: active ? '#ffd055' : '#240090',
                    color: active ? 'black' : 'white',
                }">
                    {{buttonText}}
                </button> 
            </div>
            <div class="main__description">
                <h1>{{ movie?.name }}</h1>
                <h2>{{ movie?.shortDescription }}</h2>
                <div class="description__info">
                    <span class="description__item">
                        <svg-icon type="mdi" :path="pathTime"></svg-icon>
                        {{ movie?.movieLength }}
                    </span>
                    <span class="description__item">
                        <svg-icon type="mdi" :path="pathDate"></svg-icon>
                        {{ movie?.year }}
                    </span>
                    <span class="description__item">
                        <svg-icon type="mdi" :path="pathRate"></svg-icon>
                        {{ (movie?.rating.kp)?.toFixed(1) }}
                    </span>    
                </div>
                <p>{{ movie?.description }}</p>
            </div>
        </section>
        <section class="main__recommendation">
            <h2 class="recommendation__title">Рекомендуем посмотреть</h2>
            <ul class="recommendation__list">
                <li class="recommendation__item" v-for="(movie,index) in similarMovies">
                    <MovieCard 
                        class="card"
                        :key="index"
                        :id="Number(movie.id)"
                        :movie="movie"
                        >
                        {{ console.log(movie) }}
                    </MovieCard>
                </li>
            </ul>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import '../assets/styles/style.scss';

.vue-star-rating[data-v-f675a548]{
    justify-content: center;
}

.main {
    padding: 50px 100px;
}

.main__section {
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 100px;
    row-gap: 50px;
    margin: 0 auto;
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
    align-items: center;
}

.main__recommendation {
    display: flex;
    flex-direction: column;
    align-content: center;
    padding-top: 30px;
    gap: 30px;
    flex-wrap: wrap;
}

.recommendation__title {
    color: $secondary-color;
    font-size: 40px;
    text-align: center;
}

.recommendation__list {
    display: flex;
    flex-direction: row;
    gap: 50px;
    flex-wrap: wrap;
}

.card {
    width: 250px;
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

