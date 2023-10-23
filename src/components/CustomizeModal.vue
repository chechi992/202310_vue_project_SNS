<template>
  <div v-if="props.modalIsOpen" id="modal">
    <div id="modal-content" class="modal">
      <button v-if="closeButtonNeed" @click="showModal" class="closecontainer">
        <div class="closebutton">X</div>
      </button>
      <ModalBody/>
    </div>
    <div ref="sample" id="modal-overlay"></div>
  </div>
</template>
    
  <script setup>
import { computed, defineAsyncComponent } from "vue"
const emit = defineEmits(["showModalChange"])
const props = defineProps({
  modalIsOpen:Boolean,
  closeButtonNeed: Boolean,
  bodyPath: String
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
  padding: 0 5px 5px 5px;
  background: #faebd7;
  z-index: 2;
  display: block;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
.closecontainer {
 width: 100%;
 display: flex;
 justify-content: flex-end;
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