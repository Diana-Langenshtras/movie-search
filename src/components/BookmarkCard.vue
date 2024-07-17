<template>
    <v-card class="card">
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title class="text-h5"> {{ movie?.name }} </v-card-title>

                <v-card-subtitle class="description__info">
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
                </v-card-subtitle>

                <v-card-actions>
                    <v-btn
                        class="ms-2 button"
                        size="small"
                        @click="deleteItem(movie?.id)"
                        :style="{
                            backgroundColor: rootStore.savesAndRatings[movie?.id].save ? '#ffd055' : '#240090',
                            color: rootStore.savesAndRatings[movie?.id].save ? 'black' : 'white',
                        }"
                    >
                        <span v-if="rootStore.savesAndRatings[movie?.id].save">сохранено</span>
                        <span v-else>не сохранено</span>
                    </v-btn>
                </v-card-actions>
            </div>

            <v-avatar class="ma-3 img" rounded="0" size="125">       
                <v-img 
                    :src="movie?.poster.previewUrl" :alt="`Постер фильма '${movie?.name}'`"
                ></v-img>
            </v-avatar>
        </div>
    </v-card>
</template>


<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { useRootStore } from '../stores/root';
import { ref } from 'vue';
import { mdiClockTimeFourOutline, mdiCalendarBlankOutline, mdiStarOutline } from '@mdi/js';

    const pathTime = mdiClockTimeFourOutline;
    const pathDate = mdiCalendarBlankOutline;
    const pathRate = mdiStarOutline;
    const rootStore = useRootStore();

    const props = defineProps({
      id: Number,
      movie: Object,
    })
    
    function deleteItem(index) {
        console.log(index);
        rootStore.deleteSave(index);
        console.log(rootStore.savesAndRatings)
    }

</script>

<style lang="scss" scoped>
@import '../assets/styles/style.scss';

.button {
    background-color: $second-text-color;
    color: black;
}

.vue-star-rating[data-v-f675a548]{
    justify-content: center;
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

.card {
    background-color: $secondary-bg-color;
    color: $text-color;
    height: 400px !important;
}

.img{
    height: 160px !important;
}

@media (width <= 768px) {
    
  }

</style>

