<script>
/* import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue' */

import {ref} from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const msg = ref('Hello Vue 3 + Vite')

    return {
      msg
    }
  }
}  
</script>


<template>
  <img alt="Vue logo" src="./assets/logo.png">

  <HelloWorld msg="Hello Vue 3 + Vite"/>

</template>
<style scoped lang="scss">
/* #app {
  max-width: 1920px;
  margin: 0;
  padding: 0;
}

body, html {
  margin: 0;
  padding: 0;
}


.container {
  max-width: 1920px;
  background-color: #2a2a2a;
  height: 100%;
} */
</style>