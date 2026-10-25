<template>
  <UInput
    :id="id"
    ref="control"
    v-skeleton="skeleton"
    :name="name"
    :size="controlSize"
    :disabled="loading || disabled"
    :color="color"
    :highlight="highlight"
    :placeholder="placeholder"
    :aria-busy="loading || void 0"
    :model-value="inputValue"
    v-bind="$attrs"
    :ui="inputUi"
    :style="trailingWidth ? { paddingInlineEnd: `${trailingWidth}px` } : void 0"
    :inputmode="decimal === false || decimal === 0 ? 'numeric' : 'decimal'"
    @pointerdown="onPointerDown"
    @focus="onFocus"
    @keydown="startEditing"
    @input.capture="onInput"
    @update:model-value="onUpdate"
    @blur="onBlur"
  >
    <!-- 前置內容：使用端有傳才提供，未傳時保留 Nuxt UI 的 icon、leadingIcon、avatar -->
    <template v-if="slots.leading" #leading="slotProps">
      <slot name="leading" v-bind="slotProps" />
    </template>

    <template v-if="slots.default" #default="slotProps">
      <slot v-bind="slotProps" />
    </template>

    <!-- 單位、使用端的 trailing slot 與載入圖示依序靠右；右內距依實際寬度保留，數字不被遮住 -->
    <template v-if="unitText || loading || slots.trailing" #trailing="slotProps">
      <span ref="trailing" data-slot="suffix" :class="styles.suffix({ class: ui?.suffix })">
        <span
          v-if="unitText"
          data-testid="input-number-unit"
          data-slot="unit"
          :class="styles.unit({ class: ui?.unit })"
        >
          {{ unitText }}
        </span>
        <slot name="trailing" v-bind="slotProps" />
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
import { tv } from "@nuxt/ui/utils/tv";
import { mergeUi } from "../utils/ui";
import { useShuoMessages } from "../internal/useShuoLocale";
import { vSkeleton } from "../directives/skeleton";
import { formatNumberDisplay, getDecimalPlaces, toNumberText } from "../utils/number";
import { isNumberDraft, mapNumberInputPosition } from "../utils/number-input";
import { BUILT_IN_DEFAULTS } from "../utils/component-defaults";
import { useShuoComponentProps } from "../internal/useShuoComponentProps";
import { useControlSize } from "../internal/useControlSize";
const BUILTIN_UI = { root: "w-full min-w-0", base: "text-right" };
const theme = tv({
  slots: {
    suffix: "flex items-center gap-1.5",
    unit: "form-input-number-unit text-dimmed whitespace-nowrap"
  }
});
defineOptions({ inheritAttrs: false });
const props = defineProps({
  id: { type: String, required: false },
  name: { type: String, required: false },
  size: { type: null, required: false },
  disabled: { type: Boolean, required: false, default: void 0 },
  color: { type: null, required: false },
  highlight: { type: Boolean, required: false, default: void 0 },
  placeholder: { type: String, required: false },
  skeleton: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  unit: { type: [Boolean, String], required: false, default: BUILT_IN_DEFAULTS.inputNumber.unit },
  thousandSeparator: { type: Boolean, required: false, default: BUILT_IN_DEFAULTS.inputNumber.thousandSeparator },
  decimal: { type: [Boolean, Number], required: false, default: false },
  ui: { type: Object, required: false }
});
const modelValue = defineModel({ type: [Number, null] });
const slots = defineSlots();
const appConfig = useAppConfig();
const resolved = useShuoComponentProps("inputNumber", props);
const controlSize = useControlSize("inputNumber", props);
const focused = ref(false);
const inputValue = ref(formatNumberDisplay(modelValue.value, props.decimal, resolved.thousandSeparator));
let pendingInput;
let pointerSelecting = false;
let editTimer;
const control = useTemplateRef("control");
const trailing = useTemplateRef("trailing");
const trailingWidth = ref(0);
let trailingObserver;
const messages = useShuoMessages();
const unitText = computed(() => resolved.unit === true ? messages.value.inputNumber.unit : resolved.unit || "");
const inputUi = computed(() => {
  const { suffix: _suffix, unit: _unit, ...ui } = props.ui ?? {};
  return mergeUi(BUILTIN_UI, ui);
});
const styles = theme();
const loadingIconSize = computed(
  () => ({ xs: "size-4", sm: "size-4", md: "size-5", lg: "size-5", xl: "size-6" })[controlSize.value]
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
  inputValue.value = formatNumberDisplay(modelValue.value, props.decimal, resolved.thousandSeparator);
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
watch([modelValue, () => props.decimal, () => resolved.thousandSeparator], ([value], previous) => {
  if (!focused.value) {
    inputValue.value = formatNumberDisplay(value, props.decimal, resolved.thousandSeparator);
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
defineExpose({ inputRef: computed(() => control.value?.inputRef ?? null) });
</script>
