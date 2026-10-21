<template>
  <UTooltip
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
      v-model="modelValue"
      v-skeleton="skeleton"
      :items="items"
      :orientation="resolvedOrientation"
      :size="size"
      :name="name"
      :disabled="loading || disabled"
      :color="color"
      :highlight="highlight"
      :aria-busy="loading || void 0"
      class="form-radio-group w-fit max-w-full min-w-0"
      :class="`form-radio-group--${size}`"
      :data-orientation="resolvedOrientation"
      :data-layout="orientation"
      label-key="label"
      value-key="value"
      v-bind="$attrs"
      :ui="groupUi"
      @pointermove="showOptionTooltip"
      @pointerleave="closeTooltip"
      @focusin="showOptionTooltip"
      @focusout="closeTooltip"
    >
      <!-- 選項文字 -->
      <template #label="{ item }">
        <span data-choice-label>{{ item.label }}</span>

        <!-- 載入中以同尺寸轉圈圖示蓋住選項按鈕；按鈕改為透明以保留位置與無障礙屬性 -->
        <UIcon
          v-if="loading && !skeleton"
          data-slot="loading"
          :name="appConfig.ui.icons.loading"
          class="text-dimmed pointer-events-none absolute top-1/2 left-0 size-(--choice-indicator-size) -translate-y-1/2 animate-spin"
          aria-hidden="true"
        />
      </template>
    </URadioGroup>
  </UTooltip>
</template>

<script setup>
import { vSkeleton } from "../directives/skeleton";
import { useChoiceGroup } from "../composables/useChoiceGroup";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  id: { type: String, required: false },
  name: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: void 0 },
  color: { type: null, required: false },
  highlight: { type: Boolean, required: false, default: void 0 },
  skeleton: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  items: { type: Array, required: true },
  orientation: { type: String, required: false, default: "auto" },
  breakpoint: { type: null, required: false, default: "md" },
  size: { type: null, required: false, default: "lg" },
  ui: { type: Object, required: false }
});
const modelValue = defineModel({ type: String });
const appConfig = useAppConfig();
const choiceProps = {
  get orientation() {
    return props.orientation === "grid" ? "vertical" : props.orientation;
  },
  get breakpoint() {
    return props.breakpoint;
  },
  get items() {
    return props.items;
  }
};
const {
  resolvedOrientation,
  tooltipReference,
  tooltipText,
  isTruncated,
  tooltipOpen,
  showOptionTooltip,
  closeTooltip
} = useChoiceGroup(choiceProps);
const groupUi = computed(() => {
  const ui = { ...props.ui };
  if (props.orientation === "grid") ui.fieldset = withClass(ui.fieldset, "grid grid-cols-1");
  if (props.loading) {
    ui.item = withClass(ui.item, "relative");
    ui.base = withClass(ui.base, "opacity-0");
  }
  return ui;
});
const withClass = (value, extra) => typeof value === "function" ? (defaults) => [extra, value(defaults)] : [extra, value];
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
/** 單選與複選群組的排列、尺寸及文字省略樣式。 */
.form-radio-group {
  --choice-control-height: 2.25rem;
  --choice-indicator-size: 1.125rem;
}
.form-radio-group[data-layout=grid] {
  width: 100%;
}
.form-radio-group :deep([data-slot='wrapper']) {
  width: auto;
  min-width: 0;
}
.form-radio-group :deep([data-slot='label']) {
  width: fit-content;
  max-width: 100%;
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
.form-radio-group :deep([data-slot='fieldset']) {
  min-width: 0;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.form-radio-group :deep([data-slot='item']) {
  min-width: 0;
  text-align: start;
  width: fit-content;
  max-width: 100%;
}
.form-radio-group [data-choice-label] {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.form-radio-group[data-orientation=horizontal] :deep([data-slot='fieldset']) {
  height: var(--choice-control-height);
  align-items: center;
  column-gap: 0.5rem;
}
.form-radio-group[data-orientation=horizontal] :deep([data-slot='item']) {
  min-width: calc(var(--choice-indicator-size) + 0.25rem);
  flex: 0 1 auto;
  align-items: center;
}
.form-radio-group[data-orientation=horizontal] :deep([data-slot='wrapper']) {
  width: auto;
  margin-inline-start: 0.25rem;
}
.form-radio-group[data-layout=grid] :deep([data-slot='item']) {
  min-height: var(--choice-control-height);
  align-items: center;
}
</style>
