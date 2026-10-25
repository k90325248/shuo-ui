<template>
  <!-- 沿用 Nuxt UI 提示；觸控長按的監聽經 $attrs 落在觸發元素 -->
  <UTooltip v-bind="triggerAttrs" :open="shown" :disabled="disabled" @update:open="setOpen">
    <!-- 使用端傳入的插槽原樣轉給 UTooltip -->
    <template v-for="name in slotNames()" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </UTooltip>
</template>

<script setup>
import { mergeProps } from "vue";
import { BUILT_IN_DEFAULTS } from "../utils/component-defaults";
import { useShuoComponentProps } from "../internal/useShuoComponentProps";
import { usePointerModality } from "../internal/pointer-modality";
const LONG_PRESS_DELAY = 500;
const MOVE_TOLERANCE = 10;
defineOptions({ inheritAttrs: false });
const props = defineProps({
  open: { type: Boolean, required: false, default: void 0 },
  defaultOpen: { type: Boolean, required: false, default: false },
  disabled: { type: Boolean, required: false, default: false },
  touch: { type: Boolean, required: false, default: BUILT_IN_DEFAULTS.tooltip.touch }
});
const emit = defineEmits(["update:open"]);
const slots = defineSlots();
const attrs = useAttrs();
const resolved = useShuoComponentProps("tooltip", props);
const touchModality = usePointerModality();
const innerOpen = ref(props.defaultOpen);
const touchOpened = ref(false);
let pressTimer;
let pressStart = { x: 0, y: 0 };
let suppressClick = false;
const shown = computed(() => {
  if (!(props.open ?? innerOpen.value)) return false;
  return !resolved.touch || !touchModality.value || touchOpened.value;
});
const triggerAttrs = computed(() => {
  if (!resolved.touch) return attrs;
  return mergeProps(attrs, {
    "data-shuo-tooltip-touch": "",
    "onPointerdown": onPointerdown,
    "onPointermove": onPointermove,
    "onPointerup": cancelPress,
    "onPointercancel": cancelPress,
    "onContextmenu": onContextmenu,
    "onClickCapture": onClickCapture,
    "onPointerleaveCapture": onPointerleaveCapture
  });
});
const slotNames = () => Object.keys(slots);
const setOpen = (value) => {
  if (!value) touchOpened.value = false;
  innerOpen.value = value;
  emit("update:open", value);
};
const cancelPress = () => {
  clearTimeout(pressTimer);
  pressTimer = void 0;
};
const onPointerdown = (event) => {
  suppressClick = false;
  cancelPress();
  if (event.pointerType !== "touch") return;
  pressStart = { x: event.clientX, y: event.clientY };
  pressTimer = setTimeout(() => {
    pressTimer = void 0;
    if (props.disabled) return;
    suppressClick = true;
    touchOpened.value = true;
    setOpen(true);
  }, LONG_PRESS_DELAY);
};
const onPointermove = (event) => {
  if (!pressTimer || event.pointerType !== "touch") return;
  if (Math.hypot(event.clientX - pressStart.x, event.clientY - pressStart.y) > MOVE_TOLERANCE) cancelPress();
};
const onContextmenu = (event) => {
  if (pressTimer || suppressClick) event.preventDefault();
};
const onClickCapture = (event) => {
  if (!suppressClick) return;
  suppressClick = false;
  event.preventDefault();
  event.stopImmediatePropagation();
};
const onPointerleaveCapture = (event) => {
  if (event.pointerType === "touch") event.stopImmediatePropagation();
};
onBeforeUnmount(cancelPress);
</script>

<style>
@media (hover: none) {
  [data-shuo-tooltip-touch] {
    -webkit-touch-callout: none;
    user-select: none;
  }
  [data-shuo-tooltip-touch] :where(input, textarea, [contenteditable]) {
    user-select: text;
  }
}
</style>
