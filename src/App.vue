<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue'
import { useRootStore } from './stores/root';

onMounted(async () => {
    const rootStore = useRootStore();
    await rootStore.getMovies();
})

</script>

<template>
    <RouterView />
</template>

<style lang="scss">
@import './assets/styles/style.scss';

</style>

