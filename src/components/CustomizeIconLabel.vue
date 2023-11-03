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
      '--hoverBgColor': myHoverBgColor,
      '--hoverPointer': cursortype
    }"
    @click="onChange"
    v-if="mode === 'button' || mode === 'label'"
  >
    <div class="iconTSp" :style="{ '--iconTextSpace': labelAttr.iconTextSp + 'px' }">
      <font-awesome-icon
        :icon="[props.icon.type, props.icon.name]"
        :size="labelAttr.size.icon"
        :style="{ color: labelAttr.color }"
      />
    </div>
    <p
      class="textLabel"
      :style="{ '--textSize': labelAttr.size.text + 'px', '--textColor': labelAttr.color }"
    >
      {{ labelAttr.text }}
    </p>
  </div>

  <div
    class="inputTextContainer"
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
      '--backgroundColor': myBgColor
    }"
    v-else-if="mode === 'input'"
  >
    <div class="iconTSp" :style="{ '--iconTextSpace': labelAttr.iconTextSp + 'px' }">
      <font-awesome-icon
        :icon="[props.icon.type, props.icon.name]"
        :size="labelAttr.size.icon"
        :style="{ color: labelAttr.color }"
      />
    </div>
    <input
      class="inputLabel"
      :placeholder="placeholder"
      :style="{
        '--textWidth':
          (Number(labelAttr.size.text) + labelAttr.iconTextSp + myPadding.left).toString() + 'px',
        '--textColor': labelAttr.color,
        '--textSize': labelAttr.size.text - 3 + 'px'
      }"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"
const sizeMap = new Map([
  ["2xs", "10"],
  ["xs", "12"],
  ["sm", "16"],
  ["lg", "20"],
  ["xl", "22"],
  ["2xl", "32"],
  ["1x", "16"],
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
const props = defineProps({
  icon: { type: Object, name: Object },
  margin: {
    top: Number,
    bottom: Number,
    left: Number,
    right: Number,
    vertical: Number,
    horizontal: Number,
    all: Number
  },
  padding: {
    top: Number,
    bottom: Number,
    left: Number,
    right: Number,
    vertical: Number,
    horizontal: Number,
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
  args: Object
})

const labelAttr = ref({
  text: props.text ? props.text : "",
  size: props.size
    ? { icon: props.size, text: sizeMap.get(props.size) }
    : { icon: "lg", text: sizeMap.get("lg") },
  color: props.color ? props.color : "white",
  iconTextSp: props.iconTextSpace ? props.iconTextSpace : 13
})

let myBgColor = ref(null)
let myHoverBgColor = ref(null)
let cursortype =ref('default')
if (props.mode === "input") {
  myBgColor = ref(props.bgColor ? props.bgColor : "#4A4A4A")
} else if (props.mode === "button") {
  cursortype.value ='pointer';
  myBgColor = ref(props.bgColor ? props.bgColor : "#4A4A4A")
  myHoverBgColor = ref(props.hoverBgColor ? props.hoverBgColor : "#93a1e9")
}
const borderRadius = ref(props.borderRadius ? props.borderRadius : 5)
const myMargin = ref({ bottom: 0, top: 0, left: 0, right: 0 })
const myPadding = ref({ bottom: 0, top: 0, left: 0, right: 0 })

const placeholder = ref(props.placeholder ? props.placeholder : "")

if (props.margin) {
  if (props.margin.all) {
    myMargin.value = {
      ...myMargin.value,
      top: props.margin.all,
      bottom: props.margin.all,
      left: props.margin.all,
      right: props.margin.all
    }
  }
  if (props.margin.vertical) {
    myMargin.value = {
      ...myMargin.value,
      top: props.margin.vertical,
      bottom: props.margin.vertical
    }
  }
  if (props.margin.horizontal) {
    myMargin.value = {
      ...myMargin.value,
      left: props.margin.horizontal,
      right: props.margin.horizontal
    }
  }
  myMargin.value = {
    ...myMargin.value,
    ...props.margin
  }
}
if (props.padding) {
  if (props.padding.all) {
    myPadding.value = {
      ...myPadding.value,
      top: props.padding.all,
      bottom: props.padding.all,
      left: props.padding.all,
      right: props.padding.all
    }
  }
  if (props.padding.horizontal) {
    myMargin.value = {
      ...myPadding.value,
      left: props.padding.horizontal,
      right: props.padding.horizontal
    }
  }
  if (props.padding.vertical) {
    myPadding.value = {
      ...myPadding.value,
      top: props.padding.vertical,
      bottom: props.padding.vertical
    }
  }
  myPadding.value = {
    ...myPadding.value,
    ...props.padding
  }
}

const emit = defineEmits(["onChange"])
const onChange = () => {
  emit("onChange", props.args)
}
</script>

<style scoped lang="scss">
.iconTextContainer {
  display: flex;
  align-items: center;
  margin: var(--labelMt) var(--labelMr) var(--labelMb) var(--labelMl);
  padding: var(--labelPt) var(--labelPr) var(--labelPb) var(--labelPl);
  background-color: var(--backgroundColor);
  border-radius: var(--borderRadius);

  &:hover {
    background-color: var(--hoverBgColor);
    cursor: var(--hoverPointer);
  }
}
.inputTextContainer {
  display: flex;
  align-items: center;
  margin: var(--labelMt) var(--labelMr) var(--labelMb) var(--labelMl);
  padding: var(--labelPt) var(--labelPr) var(--labelPb) var(--labelPl);
  background-color: var(--backgroundColor);
  border-radius: var(--borderRadius);
}
.iconTSp {
  margin-right: var(--iconTextSpace);
}
.textLabel {
  font-size: var(--textSize);
  color: var(--textColor);
}
.inputLabel {
  width: calc(100% - var(--textWidth));
  border: none;
  background-color: transparent;
  color: var(--textColor);
  font-size: var(--textSize);
  &:focus {
    outline: none;
  }
}
</style>
