<template>
  <div
    class="iconTextContainer"
    :style="{
      '--labelMt': myMargin.top + 'px',
      '--labelMb': myMargin.bottom + 'px',
      '--labelMl': myMargin.left + 'px',
      '--labelMr': myMargin.right + 'px',
      '--labelPt': myPadding.top + 'px',
      '--labelPb': myPadding.bottom + 'px',
      '--labelPl': myPadding.left + 'px',
      '--labelPr': myPadding.right + 'px',
      '--borderRadius': borderRadius + 'px',
      '--backgroundColor': myBgColor,
      '--hoverBgColor': myHoverBgColor
    }"
    @click="onChange"
    v-if="mode === 'button' || mode === 'label'"
  >
    <div class="iconTSp" :style="{ '--iconTextSpace': iconTextSp + 'px' }">
      <font-awesome-icon :icon="['fas', props.icon.name]" :size="sz.icon" :style="{ color: clr }" />
    </div>
    <p class="textLabel" :style="{ '--textSize': sz.text + 'px', '--textColor': clr }">
      {{ text }}
    </p>
  </div>

  <div
    class="iconTextContainer"
    :style="{
      '--labelMt': myMargin.top + 'px',
      '--labelMb': myMargin.bottom + 'px',
      '--labelMl': myMargin.left + 'px',
      '--labelMr': myMargin.right + 'px',
      '--labelPt': myPadding.top + 'px',
      '--labelPb': myPadding.bottom + 'px',
      '--labelPl': myPadding.left + 'px',
      '--labelPr': myPadding.right + 'px',
      '--borderRadius': borderRadius + 'px',
      '--backgroundColor': myBgColor,
      '--hoverBgColor': myHoverBgColor
    }"
    v-else-if="mode === 'input'"
  >
    <div class="iconTSp" :style="{ '--iconTextSpace': iconTextSp + 'px' }">
      <font-awesome-icon :icon="['fas', props.icon.name]" :size="sz.icon" :style="{ color: clr }" />
    </div>
    <input
      class="inputLabel"
      :placeholder="placeholder"
      :style="{
        '--textSize': (Number(sz.text) + iconTextSp + myPadding.left).toString() + 'px',
        '--textColor': clr
      }"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  icon: { type: Object, name: Object },
  margin: {
    top: Number,
    bottom: Number,
    left: Number,
    right: Number,
    vertical: Number,
    all: Number
  },
  padding: {
    top: Number,
    bottom: Number,
    left: Number,
    right: Number,
    vertical: Number,
    all: Number
  },
  size: String,
  color: String,
  text: String,
  iconTextSpace: Number,
  borderRadius: Number,
  bgColor: String,
  hoverBgColor: String,
  mode: String,
  placeholder: String,
  modelValue: String
})

const text = ref(props.text ? props.text : "")
var sizeMap = new Map([
  ["2xs", "8"],
  ["xs", "10"],
  ["sm", "14"],
  ["lg", "18"],
  ["xl", "20"],
  ["2xl", "28"],
  ["1x", "12.8"],
  ["2x", "24"],
  ["3x", "40"],
  ["4x", "56"],
  ["5x", "72"],
  ["6x", "88"],
  ["7x", "104"],
  ["8x", "120"],
  ["9x", "136"],
  ["10x", "152"]
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
let myBgColor = ref(null)
if (props.mode !== "label") {
  myBgColor = ref(props.bgColor ? props.bgColor : "#4A4A4A")
}
let myHoverBgColor = ref(myBgColor.value)
if (props.mode === "button") {
  myHoverBgColor = ref(props.hoverBgColor ? props.hoverBgColor : "#93a1e9")
}
const borderRadius = ref(props.borderRadius ? props.borderRadius : 5)
const iconTextSp = ref(props.iconTextSpace ? props.iconTextSpace : 10)
const placeholder = ref(props.placeholder ? props.placeholder : "")
const myMargin = ref({ bottom: 0, top: 0, left: 0, right: 0 })
const myPadding = ref({ bottom: 0, top: 0, left: 0, right: 0 })

if (props.margin) {
  myMargin.value = {
    ...myMargin.value,
    ...props.margin
  }
  if (props.margin.vertical) {
    myMargin.value = {
      ...myMargin.value,
      top: props.margin.vertical,
      bottom: props.margin.vertical
    }
  }
  if (props.margin.all) {
    myMargin.value = {
      ...myMargin.value,
      top: props.margin.vertical,
      bottom: props.margin.vertical,
      left: props.margin.vertical,
      right: props.margin.vertical
    }
  }
}
if (props.padding) {
  myPadding.value = {
    ...myPadding.value,
    ...props.padding
  }
  if (props.padding.vertical) {
    myPadding.value = {
      ...myPadding.value,
      top: props.padding.vertical,
      bottom: props.padding.vertical
    }
  }
  if (props.padding.all) {
    myPadding.value = {
      ...myPadding.value,
      top: props.padding.all,
      bottom: props.padding.all,
      left: props.padding.all,
      right: props.padding.all
    }
  }
}

const emit = defineEmits(["onChange"])
const onChange = () => {
  emit("onChange")
}
</script>

<style scoped>
.iconTextContainer {
  display: flex;
  align-items: center;
  margin: var(--labelMt) var(--labelMr) var(--labelMb) var(--labelMl);
  padding: var(--labelPt) var(--labelPr) var(--labelPb) var(--labelPl);
  background-color: var(--backgroundColor);
  border-radius: var(--borderRadius);
}

.iconTextContainer:hover {
  background-color: var(--hoverBgColor);
}

.iconTSp {
  margin-right: var(--iconTextSpace);
}
.textLabel {
  font-size: var(--textSize);
  color: var(--textColor);
}
.inputLabel {
  width: calc(100% - var(--textSize));
  border: none;
  background-color: transparent;
  color: var(--textColor);
}
.inputLabel:focus {
  outline: none;
}
</style>
