<template>
  <div>
    <loading :active="true">
      <div
        class="loadingio-spinner-rolling-gsde32607o6"
        :style="{
          '--loadingsize': size + 'px',
          '--bordersize': borderSize + 'px',
          '--color': color
        }"
      >
        <div class="ldio-i08mbc5ayj8">
          <div></div>
        </div>
      </div>
    </loading>
  </div>
</template>
  
<script setup>
import Loading from "vue-loading-overlay"
import { ref } from "vue"

const props = defineProps({
  size: {
    type: Number
  },
  borderSize: {
    type: Number
  },
  color: {
    type: String
  }
})

const size = ref(props.size ? props.size : 50)
const borderSize = ref(props.borderSize ? props.borderSize : 17)
const color = ref(props.color ? props.color : "#93a1e9")
</script>


<style>
@keyframes ldio-i08mbc5ayj8 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.ldio-i08mbc5ayj8 div {
  position: absolute;
  width: var(--loadingsize);
  height: var(--loadingsize);
  border: var(--bordersize) solid var(--color);
  border-top-color: transparent;
  border-radius: 50%;
}
.ldio-i08mbc5ayj8 div {
  animation: ldio-i08mbc5ayj8 1s linear infinite;
  top: 100px;
  left: 100px;
}
.loadingio-spinner-rolling-gsde32607o6 {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-i08mbc5ayj8 {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
</style>
  