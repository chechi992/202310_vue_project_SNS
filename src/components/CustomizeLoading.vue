<template>
  <div>
    <loading v-model:active="isLoading" />
  </div>
</template>
  
  <script setup>
import Loading from "vue-loading-overlay"
import { ref } from "vue"


const props = defineProps(['isloading'])

console.log("CustomizeLoading.vue isloading",props.isloading);

const isLoading = ref(props.isloading)
</script>
  <style>
</style>
  