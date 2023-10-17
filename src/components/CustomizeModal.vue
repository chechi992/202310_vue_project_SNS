<template>
 <div id="modal">
    <div id="modal-content" class="modal">
      <p id="modal-message" class="modal__message">{{ message }}</p>
    </div>
    <div id="modal-overlay"></div>
  </div>
</template>
    
  <script setup>
import { ref, defineProps} from "vue"




const props = defineProps({
  message: {
    type: String
  },
})

const message = ref(props.message)

</script>
  
<style scoped>
.modal {
  padding: 10px 20px;
  background: #faebd7;
  z-index: 2;
  display: block;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}

.modal__message {
  margin-top: 10px;
  color: black;
}

#modal-overlay {
  z-index: 1;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>