<template>
  <div
    class="iconTextContainer"
    :style="{
      '--labelMt': labelMt + 'px',
      '--labelMb': labelMb + 'px'
    }"
  >
    <div
      class="iconTSp"
      :style="{
        '--iconTextSpace': iconTextSp + 'px'
      }"
    >
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
  iconTextSpace: Number,
  MarginBottom: Number,
  MarginTop: Number
})
const iconType = ref(props.iconType ? props.iconType : "fas")
const iconName = ref(props.iconName ? props.iconName : "house")
const labelText = ref(props.labelText ? props.labelText : "")
const sz = ref(props.size ? props.size : "xl")
const clr = ref(props.iconColor ? props.color : "white")
const textAtr = ref("text-" + clr.value + " " + "text-" + sz.value + "l")
const iconTextSp = ref(props.iconTextSpace ? props.iconTextSpace : 25)
const labelMb = ref(props.MarginBottom ? props.MarginBottom : 30)
const labelMt = ref(props.MarginTop ? props.MarginTop : 30)
</script>

<style scoped>
.iconTextContainer {
  display: flex;
  align-items: center;
  margin-top: var(--labelMt);
  margin-bottom: var(--labelMb);
}
.iconTSp {
  margin-right: var(--iconTextSpace);
}
</style>
