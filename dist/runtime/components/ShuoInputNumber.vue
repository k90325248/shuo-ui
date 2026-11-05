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
    v-bind="{ ...$attrs, ...spinbuttonAttrs }"
    :ui="inputUi"
    :style="paddingStyle"
    :inputmode="decimal === false || decimal === 0 ? 'numeric' : 'decimal'"
    @pointerdown="onPointerDown"
    @focus="onFocus"
    @keydown="onKeydown"
    @input.capture="onInput"
    @update:model-value="onUpdate"
    @blur="onBlur"
  >
    <!-- 前置內容：水平排列的減少按鈕在最左側，使用端的 leading slot 接在後面；左內距依實際寬度保留 -->
    <template v-if="horizontalButtons" #leading="slotProps">
      <span ref="leading" data-slot="prefix" :class="styles.prefix({ class: ui?.prefix })">
        <span data-slot="decrement" :class="styles.decrement({ class: ui?.decrement })">
          <UButton
            :icon="decrementIcon"
            :color="buttonColor"
            variant="link"
            :size="controlSize"
            :class="styles.button()"
            tabindex="-1"
            :disabled="!canDecrement"
            :aria-label="messages.inputNumber.decrement"
            @pointerdown="onButtonDown($event, -1)"
            @click="onButtonClick($event, -1)"
          />
        </span>
        <slot name="leading" v-bind="slotProps" />
      </span>
    </template>
    <!-- 前置內容：使用端有傳才提供，未傳時保留 Nuxt UI 的 icon、leadingIcon、avatar -->
    <template v-else-if="slots.leading" #leading="slotProps">
      <slot name="leading" v-bind="slotProps" />
    </template>

    <template v-if="slots.default" #default="slotProps">
      <slot v-bind="slotProps" />
    </template>

    <!-- 單位、使用端的 trailing slot、載入圖示與增加按鈕依序靠右；右內距依實際寬度保留，數字不被遮住 -->
    <template v-if="unitText || loading || slots.trailing || showButtons" #trailing="slotProps">
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
        <!-- 水平排列：增加按鈕在最右側 -->
        <span v-if="horizontalButtons" data-slot="increment" :class="styles.increment({ class: ui?.increment })">
          <UButton
            :icon="incrementIcon"
            :color="buttonColor"
            variant="link"
            :size="controlSize"
            :class="styles.button()"
            tabindex="-1"
            :disabled="!canIncrement"
            :aria-label="messages.inputNumber.increment"
            @pointerdown="onButtonDown($event, 1)"
            @click="onButtonClick($event, 1)"
          />
        </span>
        <!-- 垂直排列：增加、減少按鈕上下疊放在最右側 -->
        <span v-else-if="showButtons" data-slot="buttons" :class="styles.buttons({ class: ui?.buttons })">
          <span data-slot="increment" :class="styles.increment({ class: ui?.increment })">
            <UButton
              :icon="incrementIcon"
              :color="buttonColor"
              variant="link"
              size="xs"
              :class="styles.button({ vertical: true, size: controlSize })"
              tabindex="-1"
              :disabled="!canIncrement"
              :aria-label="messages.inputNumber.increment"
              @pointerdown="onButtonDown($event, 1)"
              @click="onButtonClick($event, 1)"
            />
          </span>
          <span data-slot="decrement" :class="styles.decrement({ class: ui?.decrement })">
            <UButton
              :icon="decrementIcon"
              :color="buttonColor"
              variant="link"
              size="xs"
              :class="styles.button({ vertical: true, size: controlSize })"
              tabindex="-1"
              :disabled="!canDecrement"
              :aria-label="messages.inputNumber.decrement"
              @pointerdown="onButtonDown($event, -1)"
              @click="onButtonClick($event, -1)"
            />
          </span>
        </span>
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
import { canStepNumber, resolveNumberStep, stepNumber } from "../utils/number-step";
import { formOptionsInjectionKey } from "@nuxt/ui/composables";
import { isPropDefined } from "../internal/prop-defined";
import { BUILT_IN_DEFAULTS } from "../utils/component-defaults";
import { useShuoComponentProps } from "../internal/useShuoComponentProps";
import { useControlSize } from "../internal/useControlSize";
const BUILTIN_UI = { root: "w-full min-w-0", base: "text-right" };
const theme = tv({
  slots: {
    suffix: "flex items-center gap-1.5",
    unit: "form-input-number-unit text-dimmed whitespace-nowrap",
    prefix: "flex items-center gap-1.5",
    buttons: "flex flex-col justify-center",
    increment: "flex items-center",
    decrement: "flex items-center",
    // 按鈕不進 Tab 順序；長按連續增減時避免選取文字與觸控選單。
    button: "touch-manipulation select-none"
  },
  variants: {
    // 垂直排列的兩個按鈕疊放在輸入框高度內，圖示依尺寸縮小。
    vertical: {
      true: { button: "p-0" }
    },
    size: {
      xs: { button: "" },
      sm: { button: "" },
      md: { button: "" },
      lg: { button: "" },
      xl: { button: "" }
    }
  },
  compoundVariants: [
    { vertical: true, size: ["xs", "sm"], class: { button: "[&>[data-slot=leadingIcon]]:size-3" } },
    { vertical: true, size: ["md", "lg"], class: { button: "[&>[data-slot=leadingIcon]]:size-3.5" } },
    { vertical: true, size: "xl", class: { button: "[&>[data-slot=leadingIcon]]:size-4" } }
  ]
});
const REPEAT_DELAY = 400;
const REPEAT_INTERVAL = 60;
const PAGE_STEPS = 10;
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
  step: { type: Number, required: false, default: void 0 },
  min: { type: Number, required: false, default: void 0 },
  max: { type: Number, required: false, default: void 0 },
  buttons: { type: Boolean, required: false, default: BUILT_IN_DEFAULTS.inputNumber.buttons },
  orientation: { type: String, required: false, default: BUILT_IN_DEFAULTS.inputNumber.orientation },
  ui: { type: Object, required: false }
});
const modelValue = defineModel({ type: [Number, null] });
const slots = defineSlots();
const appConfig = useAppConfig();
const resolved = useShuoComponentProps("inputNumber", props);
const controlSize = useControlSize("inputNumber", props);
const instance = getCurrentInstance();
const formOptions = inject(formOptionsInjectionKey, void 0);
const focused = ref(false);
const inputValue = ref(formatNumberDisplay(modelValue.value, props.decimal, resolved.thousandSeparator));
let pendingInput;
let pointerSelecting = false;
let editTimer;
const control = useTemplateRef("control");
const trailing = useTemplateRef("trailing");
const trailingWidth = ref(0);
let trailingObserver;
const leading = useTemplateRef("leading");
const leadingWidth = ref(0);
let repeatTimer;
const messages = useShuoMessages();
const unitText = computed(() => resolved.unit === true ? messages.value.inputNumber.unit : resolved.unit || "");
const inputUi = computed(() => {
  const {
    suffix: _suffix,
    unit: _unit,
    prefix: _prefix,
    buttons: _buttons,
    increment: _increment,
    decrement: _decrement,
    ...ui
  } = props.ui ?? {};
  const builtin = {
    ...BUILTIN_UI,
    ...horizontalButtons.value ? { leading: "ps-1" } : {},
    ...showButtons.value ? { trailing: "pe-1" } : {}
  };
  return mergeUi(builtin, ui);
});
const styles = theme();
const stepConfig = computed(() => resolveNumberStep(props.step, props.decimal, props.min, props.max));
const showButtons = computed(() => !!resolved.buttons);
const horizontalButtons = computed(() => showButtons.value && resolved.orientation !== "vertical");
const steppable = computed(
  () => showButtons.value || ["step", "min", "max"].some((key) => isPropDefined(instance?.vnode.props, key))
);
const interactionDisabled = computed(
  () => !!(props.disabled || props.loading || props.skeleton || formOptions?.value.disabled)
);
const canIncrement = computed(
  () => !interactionDisabled.value && canStepNumber(modelValue.value, 1, stepConfig.value.min, stepConfig.value.max)
);
const canDecrement = computed(
  () => !interactionDisabled.value && canStepNumber(modelValue.value, -1, stepConfig.value.min, stepConfig.value.max)
);
const incrementIcon = computed(
  () => horizontalButtons.value ? appConfig.ui.icons.plus : appConfig.ui.icons.chevronUp
);
const decrementIcon = computed(
  () => horizontalButtons.value ? appConfig.ui.icons.minus : appConfig.ui.icons.chevronDown
);
const buttonColor = computed(() => props.color ?? "primary");
const spinbuttonAttrs = computed(() => {
  if (!steppable.value) return {};
  return {
    "role": "spinbutton",
    "aria-valuenow": modelValue.value ?? void 0,
    "aria-valuemin": stepConfig.value.min,
    "aria-valuemax": stepConfig.value.max
  };
});
const paddingStyle = computed(() => {
  const style = {};
  if (trailingWidth.value) style.paddingInlineEnd = `${trailingWidth.value}px`;
  if (horizontalButtons.value && leadingWidth.value) style.paddingInlineStart = `${leadingWidth.value}px`;
  return Object.keys(style).length ? style : void 0;
});
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
const stepBy = (count) => {
  if (interactionDisabled.value) return false;
  const { step, min, max, places } = stepConfig.value;
  if (!canStepNumber(modelValue.value, count > 0 ? 1 : -1, min, max)) return false;
  const next = stepNumber(modelValue.value, count, { step, min, max, places });
  if (next === modelValue.value) return false;
  commitValue(next);
  return true;
};
const setTo = (value) => {
  if (value === void 0 || interactionDisabled.value || value === modelValue.value) return;
  commitValue(value);
};
const commitValue = (value) => {
  const input = control.value?.inputRef;
  if (!input) return;
  startEditing();
  input.value = toNumberText(value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
};
const onKeydown = (event) => {
  startEditing();
  if (!steppable.value || event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return;
  const { min, max } = stepConfig.value;
  const actions = {
    ArrowUp: () => stepBy(1),
    ArrowDown: () => stepBy(-1),
    PageUp: () => stepBy(PAGE_STEPS),
    PageDown: () => stepBy(-PAGE_STEPS),
    Home: min === void 0 ? void 0 : () => setTo(min),
    End: max === void 0 ? void 0 : () => setTo(max)
  };
  const action = actions[event.key];
  if (!action) return;
  event.preventDefault();
  action();
};
const stopRepeat = () => {
  clearTimeout(repeatTimer);
  repeatTimer = void 0;
  window.removeEventListener("pointerup", stopRepeat);
  window.removeEventListener("pointercancel", stopRepeat);
};
const onButtonDown = (event, direction) => {
  if (event.button !== 0) return;
  event.preventDefault();
  stopRepeat();
  if (!stepBy(direction)) return;
  const repeat = () => {
    repeatTimer = stepBy(direction) ? setTimeout(repeat, REPEAT_INTERVAL) : void 0;
  };
  repeatTimer = setTimeout(repeat, REPEAT_DELAY);
  window.addEventListener("pointerup", stopRepeat);
  window.addEventListener("pointercancel", stopRepeat);
};
const onButtonClick = (event, direction) => {
  if (event.detail === 0) stepBy(direction);
};
const measureTrailing = () => {
  const input = control.value?.inputRef;
  if (!input) return;
  const content = trailing.value;
  trailingWidth.value = content ? Math.ceil(input.getBoundingClientRect().right - content.getBoundingClientRect().left + 6) : parseFloat(getComputedStyle(input).paddingLeft);
  const prefix = leading.value;
  leadingWidth.value = prefix ? Math.ceil(prefix.getBoundingClientRect().right - input.getBoundingClientRect().left + 6) : 0;
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
watch(
  () => stepConfig.value.warnings.join("\n"),
  () => {
    for (const warning of stepConfig.value.warnings) console.warn(`[ShuoInputNumber] ${warning}`);
  },
  { immediate: true }
);
watch(interactionDisabled, (disabled) => {
  if (disabled) stopRepeat();
});
watch(leading, (element, previous) => {
  if (previous) trailingObserver?.unobserve(previous);
  if (element) trailingObserver?.observe(element);
  measureTrailing();
});
watch(trailing, (element, previous) => {
  if (previous) trailingObserver?.unobserve(previous);
  if (element) trailingObserver?.observe(element);
  measureTrailing();
});
onMounted(() => {
  trailingObserver = new ResizeObserver(measureTrailing);
  if (trailing.value) trailingObserver.observe(trailing.value);
  if (leading.value) trailingObserver.observe(leading.value);
  measureTrailing();
});
onBeforeUnmount(() => {
  pendingInput = void 0;
  clearPendingSelection();
  stopRepeat();
  trailingObserver?.disconnect();
});
defineExpose({ inputRef: computed(() => control.value?.inputRef ?? null) });
</script>
