<template>
  <UInput
    :id="id"
    ref="control"
    v-skeleton="skeleton"
    class="w-full min-w-0"
    :name="name"
    :size="size"
    :disabled="loading || disabled"
    :color="color"
    :highlight="highlight"
    :placeholder="placeholder"
    :aria-busy="loading || void 0"
    :model-value="inputValue"
    :ui="{ base: 'text-right' }"
    :style="trailingWidth ? { paddingInlineEnd: `${trailingWidth}px` } : void 0"
    :inputmode="decimal === false || decimal === 0 ? 'numeric' : 'decimal'"
    @pointerdown="onPointerDown"
    @focus="onFocus"
    @keydown="startEditing"
    @input.capture="onInput"
    @update:model-value="onUpdate"
    @blur="onBlur"
  >
    <!-- 單位與載入圖示依序靠右；右內距依實際寬度保留，數字不被遮住 -->
    <template v-if="unitText || loading" #trailing>
      <span ref="trailing" class="flex items-center gap-1.5">
        <span
          v-if="unitText"
          data-testid="input-number-unit"
          class="form-input-number-unit text-dimmed whitespace-nowrap"
        >
          {{ unitText }}
        </span>
        <UIcon
          v-if="loading"
          :name="appConfig.ui.icons.loading"
          data-slot="loading"
          class="form-input-number-loading text-dimmed shrink-0 animate-spin"
          :class="loadingIconSize"
          aria-hidden="true"
        />
      </span>
    </template>
  </UInput>
</template>

<script setup>
import { getShuoMessages } from "../utils/messages";
import { vSkeleton } from "../directives/skeleton";
import { formatNumberDisplay, getDecimalPlaces, toNumberText } from "../utils/number";
import { isNumberDraft, mapNumberInputPosition } from "../utils/number-input";
const props = defineProps({
  id: { type: String, required: false },
  name: { type: String, required: false },
  size: { type: null, required: false, default: "lg" },
  disabled: { type: Boolean, required: false, default: void 0 },
  color: { type: null, required: false },
  highlight: { type: Boolean, required: false, default: void 0 },
  placeholder: { type: String, required: false },
  skeleton: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  unit: { type: [Boolean, String], required: false, default: false },
  thousandSeparator: { type: Boolean, required: false, default: true },
  decimal: { type: [Boolean, Number], required: false, default: false }
});
const modelValue = defineModel({ type: [Number, null] });
const appConfig = useAppConfig();
const focused = ref(false);
const inputValue = ref(formatNumberDisplay(modelValue.value, props.decimal, props.thousandSeparator));
let pendingInput;
let pointerSelecting = false;
let editTimer;
const control = useTemplateRef("control");
const trailing = useTemplateRef("trailing");
const trailingWidth = ref(0);
let trailingObserver;
const unitText = computed(() => props.unit === true ? getShuoMessages().inputNumber.unit : props.unit || "");
const loadingIconSize = computed(
  () => ({ xs: "size-4", sm: "size-4", md: "size-5", lg: "size-5", xl: "size-6" })[props.size ?? "lg"]
);
const clearPendingSelection = () => {
  clearTimeout(editTimer);
  editTimer = void 0;
  pointerSelecting = false;
  window.removeEventListener("pointerup", finishPointerSelection);
  window.removeEventListener("pointercancel", finishPointerSelection);
};
const startEditing = () => {
  const input = pendingInput;
  if (!input) return;
  pendingInput = void 0;
  clearPendingSelection();
  if (document.activeElement !== input) return;
  const text = toNumberText(modelValue.value);
  const start = mapNumberInputPosition(input.value, input.selectionStart ?? 0, text);
  const end = mapNumberInputPosition(input.value, input.selectionEnd ?? 0, text);
  const direction = input.selectionDirection ?? "none";
  inputValue.value = text;
  input.value = text;
  input.setSelectionRange(start, end, direction);
};
const finishPointerSelection = () => {
  clearPendingSelection();
  editTimer = setTimeout(startEditing, 0);
};
const onPointerDown = (event) => {
  if (focused.value || event.button !== 0 || !(event.target instanceof HTMLInputElement)) return;
  pointerSelecting = true;
  window.addEventListener("pointerup", finishPointerSelection);
  window.addEventListener("pointercancel", finishPointerSelection);
};
const parseNumber = (value) => {
  if (!/\d/.test(value)) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};
const onInput = (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  const value = input.value;
  if (isNumberDraft(value, props.decimal)) return;
  const cursor = input.selectionStart ?? inputValue.value.length;
  const offset = value.length - inputValue.value.length;
  input.value = inputValue.value;
  const position = Math.max(0, cursor - offset);
  input.setSelectionRange(position, position);
};
const onUpdate = (value) => {
  inputValue.value = value;
  modelValue.value = parseNumber(value);
};
const onFocus = (event) => {
  focused.value = true;
  if (!(event.target instanceof HTMLInputElement)) return;
  pendingInput = event.target;
  if (!pointerSelecting) editTimer = setTimeout(startEditing, 0);
};
const onBlur = () => {
  pendingInput = void 0;
  clearPendingSelection();
  focused.value = false;
  const places = getDecimalPlaces(props.decimal);
  if (modelValue.value != null && places !== void 0) {
    modelValue.value = Number(modelValue.value.toFixed(places));
  }
  inputValue.value = formatNumberDisplay(modelValue.value, props.decimal, props.thousandSeparator);
};
const measureTrailing = () => {
  const input = control.value?.inputRef;
  if (!input) return;
  const content = trailing.value;
  trailingWidth.value = content ? Math.ceil(input.getBoundingClientRect().right - content.getBoundingClientRect().left + 6) : parseFloat(getComputedStyle(input).paddingLeft);
};
watch(
  modelValue,
  (value) => {
    if (value === null || typeof value === "number" && Number.isFinite(value)) return;
    if (value !== void 0) console.warn("[ShuoInputNumber] modelValue \u578B\u5225\u4E0D\u7B26\uFF0C\u5DF2\u6E05\u7A7A\uFF1A", value);
    modelValue.value = null;
  },
  { immediate: true }
);
watch([modelValue, () => props.decimal, () => props.thousandSeparator], ([value], previous) => {
  if (!focused.value) {
    inputValue.value = formatNumberDisplay(value, props.decimal, props.thousandSeparator);
  } else if (value !== parseNumber(inputValue.value) || props.decimal !== previous[1]) {
    inputValue.value = toNumberText(value);
  }
});
watch(trailing, (element, previous) => {
  if (previous) trailingObserver?.unobserve(previous);
  if (element) trailingObserver?.observe(element);
  measureTrailing();
});
onMounted(() => {
  trailingObserver = new ResizeObserver(measureTrailing);
  if (trailing.value) trailingObserver.observe(trailing.value);
  measureTrailing();
});
onBeforeUnmount(() => {
  pendingInput = void 0;
  clearPendingSelection();
  trailingObserver?.disconnect();
});
</script>
