<template>
    <v-card class="card">
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title class="text-h5 card__title"> {{ movie?.name }} </v-card-title>
                <v-card-subtitle class="description__info">
                    <span class="description__item">
                        <svg-icon type="mdi" :path="pathTime"/>
                        {{ movie?.movieLength }}
                    </span>
                    <span class="description__item">
                        <svg-icon type="mdi" :path="pathDate"/>
                        {{ movie?.year }}
                    </span>
                    <span class="description__item">
                        <svg-icon type="mdi" :path="pathRate"/>
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
                <v-img :src="movie?.poster.previewUrl" :alt="`Постер фильма '${movie?.name}'`"/>
            </v-avatar>
        </div>
    </v-card>
</template>


<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { useRootStore } from '../stores/root';
import { mdiClockTimeFourOutline, mdiCalendarBlankOutline, mdiStarOutline } from '@mdi/js';

    const pathTime = mdiClockTimeFourOutline;
    const pathDate = mdiCalendarBlankOutline;
    const pathRate = mdiStarOutline;
    const rootStore = useRootStore();

    const props = defineProps({
        id: {
          type: Number,
          required: true,
        },
        movie: {
          type: Object,
          required: true,
        },
    })
    
    function deleteItem(index) {

        rootStore.deleteSave(index);
    }

</script>

<style lang="scss" scoped>

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
    min-height: 250px;
    padding: 10px;
}

.card__title {
    max-width: 250px;
    white-space: normal;
}

.img{
    height: 200px !important;
}

</style>

