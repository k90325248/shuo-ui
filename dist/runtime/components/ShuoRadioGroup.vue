<template>
  <ShuoTooltip
    :text="tooltipText"
    :delay-duration="0"
    :reference="tooltipReference"
    :content="{ ariaLabel: tooltipText }"
    :disabled="skeleton || !isTruncated"
    :open="!skeleton && isTruncated && tooltipOpen"
    @update:open="tooltipOpen = $event"
  >
    <URadioGroup
      :id="id"
      ref="group"
      v-model="modelValue"
      v-skeleton="skeleton"
      :items="options"
      :orientation="resolvedOrientation"
      :size="controlSize"
      :name="name"
      :disabled="loading || disabled"
      :color="color"
      :variant="variant"
      :indicator="indicator"
      :aria-busy="loading || void 0"
      class="form-radio-group"
      :class="`form-radio-group--${controlSize}`"
      :data-orientation="resolvedOrientation"
      :data-layout="resolved.orientation"
      :data-variant="variant"
      :data-indicator="indicator"
      :data-color="color"
      label-key="label"
      value-key="value"
      v-bind="omitChoiceAttrs($attrs)"
      :ui="groupUi"
      @pointerdown="prepareOptionTooltip"
      @pointermove="showOptionTooltip"
      @pointerleave="closeTooltip"
      @focusin="showOptionTooltip"
      @focusout="closeTooltip"
    >
      <!-- 群組標題：沿用 Nuxt UI 的 legend slot，使用端有傳才提供 -->
      <template v-if="slots.legend" #legend>
        <slot name="legend" />
      </template>

      <!-- 選項文字：label slot 的內容放在省略文字層內，超出寬度時同樣截斷並以 Tooltip 顯示完整文字 -->
      <template #label="{ item }">
        <span :id="labelIdOf(item.value)" data-choice-label>
          <slot name="label" v-bind="itemProps(item)">{{ item.label }}</slot>
        </span>

        <!-- 選項文字旁的附加內容（例如輸入框）；點擊非互動區域不會改變選取 -->
        <span v-if="slots['item-append']" data-choice-append @click="onAppendClick">
          <slot name="item-append" v-bind="appendProps(item)" />
        </span>

        <!-- 載入中以同尺寸轉圈圖示蓋住選項按鈕；按鈕改為透明以保留位置與無障礙屬性，位置依外觀與按鈕位置調整 -->
        <UIcon
          v-if="loading && !skeleton"
          data-slot="loading"
          data-choice-loading
          :name="appConfig.ui.icons.loading"
          class="text-dimmed pointer-events-none size-(--choice-indicator-size) animate-spin"
          aria-hidden="true"
        />
      </template>

      <!-- 選項說明：使用端有傳才轉傳，沒有傳時沿用底層依 descriptionKey 顯示的文字 -->
      <template v-if="slots.description" #description="{ item }">
        <slot name="description" v-bind="itemProps(item)" />
      </template>
    </URadioGroup>
  </ShuoTooltip>
</template>

<script setup>
import { vSkeleton } from "../directives/skeleton";
import { mergeUi } from "../utils/ui";
import { getChoiceGroupUi, useChoiceGroup } from "../composables/useChoiceGroup";
import { getByPath } from "../utils/get-by-path";
import { useOptionKeysWarning } from "../internal/useOptionKeysWarning";
import { useChoiceAppend } from "../composables/useChoiceAppend";
import { BUILT_IN_DEFAULTS } from "../utils/component-defaults";
import { useShuoComponentProps, useShuoPropSource } from "../internal/useShuoComponentProps";
import { omitChoiceAttrs } from "../internal/choice-attrs";
import { useControlSize } from "../internal/useControlSize";
import ShuoTooltip from "./ShuoTooltip.vue";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  id: { type: String, required: false },
  name: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: void 0 },
  color: { type: null, required: false },
  skeleton: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  items: { type: Array, required: true },
  labelKey: { type: String, required: false },
  valueKey: { type: String, required: false },
  orientation: { type: String, required: false, default: BUILT_IN_DEFAULTS.radioGroup.orientation },
  breakpoint: { type: null, required: false, default: BUILT_IN_DEFAULTS.radioGroup.breakpoint },
  size: { type: null, required: false },
  variant: { type: String, required: false },
  indicator: { type: String, required: false },
  ui: { type: Object, required: false }
});
const modelValue = defineModel({ type: String });
const VARIANTS = ["list", "card"];
const INDICATORS = ["start", "end", "hidden"];
const slots = defineSlots();
const appConfig = useAppConfig();
const baseId = useId();
const group = useTemplateRef("group");
const resolved = useShuoComponentProps("radioGroup", props);
const controlSize = useControlSize("radioGroup", props);
const propSource = useShuoPropSource("radioGroup");
const resolvedLabelKey = computed(() => resolved.labelKey ?? BUILT_IN_DEFAULTS.radioGroup.labelKey);
const resolvedValueKey = computed(() => resolved.valueKey ?? BUILT_IN_DEFAULTS.radioGroup.valueKey);
const options = computed(
  () => props.items.map(
    (item) => typeof item === "string" ? { label: item, value: item } : {
      ...item,
      label: getByPath(item, resolvedLabelKey.value),
      value: getByPath(item, resolvedValueKey.value)
    }
  )
);
const choiceProps = {
  get orientation() {
    return resolved.orientation === "grid" ? "vertical" : resolved.orientation;
  },
  get breakpoint() {
    return resolved.breakpoint;
  },
  get items() {
    return options.value;
  }
};
const {
  resolvedOrientation,
  tooltipReference,
  tooltipText,
  isTruncated,
  tooltipOpen,
  showOptionTooltip,
  prepareOptionTooltip,
  closeTooltip
} = useChoiceGroup(choiceProps);
const { formDisabled, onAppendClick, activate } = useChoiceAppend(() => group.value?.$el, {
  enabled: () => !!slots["item-append"],
  source: () => options.value
});
useOptionKeysWarning(
  "ShuoRadioGroup",
  "radioGroup",
  () => ({
    items: props.items,
    labelKey: resolvedLabelKey.value,
    valueKey: resolvedValueKey.value
  }),
  propSource
);
const variant = computed(() => props.variant === "card" ? "card" : "list");
const indicator = computed(
  () => props.indicator && INDICATORS.includes(props.indicator) ? props.indicator : "start"
);
const groupUi = computed(
  () => mergeUi(
    getChoiceGroupUi({
      orientation: resolvedOrientation.value,
      grid: resolved.orientation === "grid",
      loading: !!props.loading,
      card: variant.value === "card",
      indicator: indicator.value
    }),
    resolved.ui
  )
);
const labelIdOf = (value) => `${baseId}-label-${options.value.findIndex((item) => item.value === value)}`;
const itemProps = (item) => {
  const option = options.value.find((option2) => option2.value === item.value);
  return {
    item: option,
    modelValue: modelValue.value,
    selected: modelValue.value === option.value
  };
};
const appendProps = (item) => {
  const option = options.value.find((option2) => option2.value === item.value);
  const labelId = labelIdOf(option.value);
  return {
    item: option,
    selected: modelValue.value === option.value,
    disabled: !!(option.disabled || props.loading || props.disabled || formDisabled.value),
    labelId,
    select: () => activate(labelId)
  };
};
watch(
  () => [props.variant, props.indicator],
  ([variantValue, indicatorValue]) => {
    if (variantValue !== void 0 && !VARIANTS.includes(variantValue)) {
      console.warn("[ShuoRadioGroup] variant \u53EA\u652F\u63F4 list\u3001card\uFF0C\u6539\u7528 list\uFF1A", variantValue);
    }
    if (indicatorValue !== void 0 && !INDICATORS.includes(indicatorValue)) {
      console.warn("[ShuoRadioGroup] indicator \u53EA\u652F\u63F4 start\u3001end\u3001hidden\uFF0C\u6539\u7528 start\uFF1A", indicatorValue);
    }
  },
  { immediate: true }
);
watch(
  modelValue,
  (value) => {
    if (typeof value === "string") return;
    if (value !== null && value !== void 0) console.warn("[ShuoRadioGroup] modelValue \u578B\u5225\u4E0D\u7B26\uFF0C\u5DF2\u6E05\u7A7A\uFF1A", value);
    modelValue.value = "";
  },
  { immediate: true }
);
</script>

<style scoped>
@charset "UTF-8";
/**
 * 選項文字旁附加內容（例如輸入框）的排列。
 * label 改為橫向排列且不裁切，避免使用端主題的 truncate 切掉輸入框與選項按鈕的 focus 外框；文字省略仍由 [data-choice-label] 處理。
 */
/**
 * 有說明文字時撐高：取消固定高度並頂端對齊，上下留白讓第一行文字仍落在原本高度的正中間，與沒有說明的欄位對齊；說明文字換行。
 * `$height` 為對齊輸入框的高度，`$line` 為文字行高（與 Nuxt UI 選項按鈕外框同高）。
 */
/** 各尺寸的文字行高，對應 Nuxt UI 選項按鈕外框（xs、sm 為 h-4，md、lg 為 h-5，xl 為 h-6）。 */
/** 單選與複選群組的尺寸變數及文字省略樣式；排列與寬度寫在元件的內建 ui，可由使用端覆寫。 */
.form-radio-group {
  --choice-control-height: 2.25rem;
  --choice-indicator-size: 1.125rem;
}
.form-radio-group--xs {
  --choice-control-height: 1.5rem;
  --choice-indicator-size: 0.75rem;
}
.form-radio-group--sm {
  --choice-control-height: 1.75rem;
  --choice-indicator-size: 0.875rem;
}
.form-radio-group--md {
  --choice-control-height: 2rem;
  --choice-indicator-size: 1rem;
}
.form-radio-group--xl {
  --choice-control-height: 2.5rem;
  --choice-indicator-size: 1.25rem;
}
.form-radio-group {
  --choice-line-height: 1.25rem;
}
.form-radio-group--xs, .form-radio-group--sm {
  --choice-line-height: 1rem;
}
.form-radio-group--xl {
  --choice-line-height: 1.5rem;
}
.form-radio-group [data-choice-label] {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.form-radio-group:not([data-variant=card])[data-orientation=horizontal]:has([data-slot=description]) {
  width: 100%;
}
.form-radio-group:not([data-variant=card])[data-orientation=horizontal] :deep([data-slot='fieldset']:has([data-slot='description'])) {
  width: 100%;
  height: auto;
  min-height: var(--choice-control-height);
  align-items: flex-start;
}
.form-radio-group:not([data-variant=card])[data-orientation=horizontal] :deep([data-slot='fieldset']:has([data-slot='description'])) > [data-slot=item] {
  height: auto;
  min-height: var(--choice-control-height);
  align-items: flex-start;
  padding-block: calc((var(--choice-control-height) - var(--choice-line-height)) / 2);
}
.form-radio-group:not([data-variant=card])[data-orientation=horizontal] :deep([data-slot='fieldset']:has([data-slot='description'])) > [data-slot=item]:has([data-slot=description]) {
  flex-grow: 1;
}
.form-radio-group:not([data-variant=card])[data-orientation=horizontal] :deep([data-slot='fieldset']:has([data-slot='description'])) > [data-slot=item]:has([data-slot=description]) > [data-slot=wrapper] {
  flex-grow: 1;
}
.form-radio-group:not([data-variant=card])[data-orientation=horizontal] :deep([data-slot='fieldset']:has([data-slot='description'])) [data-slot=description] {
  contain: inline-size;
}
.form-radio-group:not([data-variant=card])[data-layout=grid] :deep([data-slot='item']:has([data-slot='description'])) {
  height: auto;
  min-height: var(--choice-control-height);
  align-items: flex-start;
  padding-block: calc((var(--choice-control-height) - var(--choice-line-height)) / 2);
}
.form-radio-group :deep([data-slot='item']:has([data-choice-append])) {
  align-items: center;
}
.form-radio-group :deep([data-slot='label']:has(> [data-choice-append])) {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  overflow: visible;
  cursor: default;
}
.form-radio-group :deep([data-slot='label']:has(> [data-choice-append])) [data-choice-label] {
  flex-shrink: 0;
  cursor: pointer;
}
.form-radio-group [data-choice-append] {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
}
.form-radio-group [data-choice-append] > * {
  min-width: 0;
}
.form-radio-group [data-choice-loading] {
  position: absolute;
  top: 50%;
  inset-inline-start: 0;
  translate: 0 -50%;
}
.form-radio-group:is([data-indicator=end], [data-indicator=hidden]) [data-choice-loading] {
  inset-inline-start: auto;
  inset-inline-end: 0;
}
.form-radio-group[data-variant=card] {
  --choice-card-padding: 1rem;
}
.form-radio-group[data-variant=card].form-radio-group--xs {
  --choice-card-padding: 0.625rem;
}
.form-radio-group[data-variant=card].form-radio-group--sm {
  --choice-card-padding: 0.75rem;
}
.form-radio-group[data-variant=card].form-radio-group--md {
  --choice-card-padding: 0.875rem;
}
.form-radio-group[data-variant=card].form-radio-group--xl {
  --choice-card-padding: 1.125rem;
}
.form-radio-group[data-variant=card] [data-choice-loading] {
  top: calc(var(--choice-card-padding) + (var(--choice-line-height) - var(--choice-indicator-size)) / 2);
  inset-inline-start: var(--choice-card-padding);
  translate: none;
}
.form-radio-group[data-variant=card]:is([data-indicator=end], [data-indicator=hidden]) [data-choice-loading] {
  inset-inline-start: auto;
  inset-inline-end: var(--choice-card-padding);
}
.form-radio-group[data-variant=card][data-color=error] :deep([data-slot='item']:not(:has(:disabled))),
.form-radio-group[data-variant=card] :deep([data-slot='fieldset'][aria-invalid='true'] > [data-slot='item']:not(:has(:disabled))) {
  border-color: var(--ui-error);
}
.form-radio-group[data-variant=card] :deep([data-slot='item']:has(:disabled)) {
  background-color: var(--ui-form-disabled-bg);
}
.form-radio-group[data-variant=card] :deep([data-slot='item']:has(:disabled)):not(:has([data-state=checked])) {
  border-color: var(--ui-form-disabled-border);
}
.form-radio-group[data-variant=card] :deep([data-slot='item']:has(:disabled)) [data-slot=description] {
  color: var(--ui-form-disabled-text);
}
</style>
