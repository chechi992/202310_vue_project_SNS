<template>
  <div class="flex-row flex items-center mb-[10px]">
    <div class="mr-[15px]">
      <font-awesome-icon :icon="[iconType, iconName]" :size="sz" :style="{ color: clr }" />
    </div>
    <p :class="textAtr">{{ labelText }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  iconType: String,
  iconName: String,
  size: String,
  color: String,
  labelText: String,
})
const iconType = ref(props.iconType ? props.iconType : "fas")
const iconName = ref(props.iconName ? props.iconName : "house")
const labelText = ref(props.labelText ? props.labelText : "")
const sz = ref(props.size ? props.size : 'xl')
const clr = ref(props.iconColor ? props.color : "white")
const textAtr = ref("text-" + clr.value + " " + "text-" + sz.value)
</script>

<style></style>
