<template>
  <div v-if="props.modalIsOpen" id="modal">
    <div id="modal-content" class="modal">
      <button v-if="closeButtonNeed" @click="showModal" class="close">X</button>
      <ModalBody />
    </div>
    <div ref="sample" id="modal-overlay"></div>
  </div>
</template>
    
  <script setup>
import { computed, defineAsyncComponent,ref,onMounted } from "vue"
const emit = defineEmits(["showModalChange"])
const props = defineProps({
  modalIsOpen:Boolean,
  closeButtonNeed: Boolean,
  bodyPath: String
})
const sample = ref(null)
onMounted(() => {
      console.log(sample.value);
    })


const ModalBody = computed(() =>
  defineAsyncComponent(() => import(/* @vite-ignore */ props.bodyPath))
)

const showModal = () => {
  emit("showModalChange")
}
</script>
  
<style scoped>
.modal {
  padding: 10px;
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
.close {
  position: absolute;
  top: 0px;
  right: 10px;
}

#modal-overlay {
  z-index: 1;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background-color: rgba(43, 43, 43, 0.2);
}
</style>