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
    <UCheckboxGroup
      :id="id"
      ref="group"
      v-model="groupValue"
      v-skeleton="skeleton"
      :items="options"
      :orientation="resolvedOrientation"
      :size="controlSize"
      :name="name"
      :disabled="loading || disabled"
      :color="color"
      :aria-busy="loading || void 0"
      class="form-checkbox-group"
      :class="`form-checkbox-group--${controlSize}`"
      :data-orientation="resolvedOrientation"
      :data-layout="resolved.orientation"
      label-key="label"
      value-key="value"
      :roving-focus="false"
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

      <!-- 選項文字 -->
      <template #label="{ item }">
        <span :id="labelIdOf(item.value)" data-choice-label>{{ item.label }}</span>

        <!-- 選項文字旁的附加內容（例如輸入框）；點擊非互動區域不會改變勾選 -->
        <span v-if="slots['item-append']" data-choice-append @click="onAppendClick">
          <slot name="item-append" v-bind="appendProps(item)" />
        </span>

        <!-- 載入中以同尺寸轉圈圖示蓋住選項按鈕；按鈕改為透明以保留位置與無障礙屬性 -->
        <UIcon
          v-if="loading && !skeleton"
          data-slot="loading"
          :name="appConfig.ui.icons.loading"
          class="text-dimmed pointer-events-none absolute top-1/2 left-0 size-(--choice-indicator-size) -translate-y-1/2 animate-spin"
          aria-hidden="true"
        />
      </template>
    </UCheckboxGroup>
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
  orientation: { type: String, required: false, default: BUILT_IN_DEFAULTS.checkboxGroup.orientation },
  breakpoint: { type: null, required: false, default: BUILT_IN_DEFAULTS.checkboxGroup.breakpoint },
  size: { type: null, required: false },
  ui: { type: Object, required: false }
});
const modelValue = defineModel({ type: Array, ...{ required: true } });
const slots = defineSlots();
const appConfig = useAppConfig();
const baseId = useId();
const group = useTemplateRef("group");
const resolved = useShuoComponentProps("checkboxGroup", props);
const controlSize = useControlSize("checkboxGroup", props);
const propSource = useShuoPropSource("checkboxGroup");
const resolvedLabelKey = computed(() => resolved.labelKey ?? BUILT_IN_DEFAULTS.checkboxGroup.labelKey);
const resolvedValueKey = computed(() => resolved.valueKey ?? BUILT_IN_DEFAULTS.checkboxGroup.valueKey);
const options = computed(
  () => props.items.map(
    (item) => typeof item === "string" ? { label: item, value: item } : {
      ...item,
      label: getByPath(item, resolvedLabelKey.value),
      value: getByPath(item, resolvedValueKey.value),
      description: void 0
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
  "ShuoCheckboxGroup",
  "checkboxGroup",
  () => ({
    items: props.items,
    labelKey: resolvedLabelKey.value,
    valueKey: resolvedValueKey.value
  }),
  propSource
);
const groupValue = computed({
  get: () => Array.isArray(modelValue.value) ? modelValue.value : [],
  set: (value) => {
    modelValue.value = value;
  }
});
const groupUi = computed(
  () => mergeUi(
    getChoiceGroupUi({
      orientation: resolvedOrientation.value,
      grid: resolved.orientation === "grid",
      loading: !!props.loading
    }),
    resolved.ui
  )
);
const labelIdOf = (value) => `${baseId}-label-${options.value.findIndex((item) => item.value === value)}`;
const appendProps = (item) => {
  const option = options.value.find((option2) => option2.value === item.value);
  const labelId = labelIdOf(option.value);
  return {
    item: option,
    checked: groupValue.value.includes(option.value),
    disabled: !!(option.disabled || props.loading || props.disabled || formDisabled.value),
    labelId,
    check: () => {
      if (!groupValue.value.includes(option.value)) activate(labelId);
    }
  };
};
</script>

<style scoped>
@charset "UTF-8";
/**
 * 選項文字旁附加內容（例如輸入框）的排列。
 * label 改為橫向排列且不裁切，避免使用端主題的 truncate 切掉輸入框與選項按鈕的 focus 外框；文字省略仍由 [data-choice-label] 處理。
 */
/** 單選與複選群組的尺寸變數及文字省略樣式；排列與寬度寫在元件的內建 ui，可由使用端覆寫。 */
.form-checkbox-group {
  --choice-control-height: 2.25rem;
  --choice-indicator-size: 1.125rem;
}
.form-checkbox-group--xs {
  --choice-control-height: 1.5rem;
  --choice-indicator-size: 0.75rem;
}
.form-checkbox-group--sm {
  --choice-control-height: 1.75rem;
  --choice-indicator-size: 0.875rem;
}
.form-checkbox-group--md {
  --choice-control-height: 2rem;
  --choice-indicator-size: 1rem;
}
.form-checkbox-group--xl {
  --choice-control-height: 2.5rem;
  --choice-indicator-size: 1.25rem;
}
.form-checkbox-group [data-choice-label] {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.form-checkbox-group :deep([data-slot='item']:has([data-choice-append])) {
  align-items: center;
}
.form-checkbox-group :deep([data-slot='label']:has(> [data-choice-append])) {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  overflow: visible;
  cursor: default;
}
.form-checkbox-group :deep([data-slot='label']:has(> [data-choice-append])) [data-choice-label] {
  flex-shrink: 0;
  cursor: pointer;
}
.form-checkbox-group [data-choice-append] {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
}
.form-checkbox-group [data-choice-append] > * {
  min-width: 0;
}
</style>
