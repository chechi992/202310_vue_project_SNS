<template>
    <p id="modal-message" class="modal__message">{{ message }}</p>
    <button>確認</button>
  </template>
         
  <script setup>
  import { ref } from "vue"
  const message = ref("message")
  </script>
       
     <style scoped>
  </style>