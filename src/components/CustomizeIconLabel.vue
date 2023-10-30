<template>
  <div
    class="iconTextContainer"
    :style="{
      '--labelMt': margin.top + 'px',
      '--labelMb': margin.bottom + 'px'
    }"
  >
    <div
      class="iconTSp"
      :style="{
        '--iconTextSpace': iconTextSp + 'px'
      }"
    >
      <font-awesome-icon
        :icon="[props.icon.type, props.icon.name]"
        :size="sz.icon"
        :style="{ color: clr }"
      />
    </div>
    <p class="textLabel" :style="{ '--textSize': sz.text, '--textColor': clr }">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  icon: { type: String, name: String },
  size: String,
  color: String,
  text: String,
  iconTextSpace: Number,
  MarginBottom: Number,
  MarginTop: Number
})

const text = ref(props.text ? props.text : "")

var sizeMap = new Map([
  ["2xs", "8px"],
  ["xs", "10px"],
  ["sm", "14px"],
  ["lg", "18px"],
  ["xl", "20px"],
  ["2xl", "28px"],
  ["1x", "0.8em"],
  ["2x", "1.5em"],
  ["3x", "2.5em"],
  ["4x", "3.5em"],
  ["5x", "4.5em"],
  ["6x", "5.5em"],
  ["7x", "6.5em"],
  ["8x", "7.5em"],
  ["9x", "8.5em"],
  ["10x", "9.5em"]
])

const sz = ref(
  props.size
    ? {
        icon: props.size,
        text: sizeMap.get(props.size)
      }
    : { icon: "xl", text: "20" }
)

const clr = ref(props.iconColor ? props.color : "white")
const iconTextSp = ref(props.iconTextSpace ? props.iconTextSpace : 25)
const margin = ref({
  bottom: props.MarginBottom ? props.MarginBottom : 30,
  top: props.MarginTop ? props.MarginTop : 30
})
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
.textLabel {
  font-size: var(--textSize);
  color: var(--textColor);
}
</style>
