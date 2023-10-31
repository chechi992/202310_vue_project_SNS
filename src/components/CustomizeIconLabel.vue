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
  >
    <div class="iconTSp" :style="{ '--iconTextSpace': iconTextSp + 'px' }">
      <font-awesome-icon
        :icon="['fas', props.icon.name]"
        :size="sz.icon"
        :style="{ color: clr }"
      />
    </div>
    <p
      v-if="mode === 'button' || mode === 'label'"
      class="textLabel"
      :style="{ '--textSize': sz.text + 'px', '--textColor': clr }"
    >
      {{ text }}
    </p>
    <input
      v-else-if="mode === 'input'"
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
  placeholder: String
})

const text = ref(props.text ? props.text : "")
var sizeMap = new Map([
  ["2xs", "8"],
  ["xs", "10"],
  ["sm", "14"],
  ["lg", "18"],
  ["xl", "20"],
  ["2xl", "28"]
  // ["1x", "0.8em"],
  // ["2x", "1.5em"],
  // ["3x", "2.5em"],
  // ["4x", "3.5em"],
  // ["5x", "4.5em"],
  // ["6x", "5.5em"],
  // ["7x", "6.5em"],
  // ["8x", "7.5em"],
  // ["9x", "8.5em"],
  // ["10x", "9.5em"]
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
    myMargin.value.top = props.margin.vertical
    myMargin.value.bottom = props.margin.vertical
  }
  if (props.margin.all) {
    myMargin.value.top = props.margin.all
    myMargin.value.bottom = props.margin.all
    myMargin.value.right = props.margin.all
    myMargin.value.left = props.margin.all
  }
}
if (props.padding) {
  myPadding.value = {
    ...myPadding.value,
    ...props.padding
  }
  if (props.padding.vertical) {
    myPadding.value.top = props.padding.vertical
    myPadding.value.bottom = props.padding.vertical
  }
  if (props.padding.all) {
    myPadding.value.top = props.padding.all
    myPadding.value.bottom = props.padding.all
    myPadding.value.right = props.padding.all
    myPadding.value.left = props.padding.all
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
