<template>
  <div class="Container">
    <p id="modal-message" class="modal__message">{{ message }}</p>
    <button>確認</button>
  </div>
</template>
       
     <script setup>
import { ref } from "vue"
const message = ref("message")
</script>
     
   <style scoped>
.Container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 300px;
  height: 150px;
}
</style>