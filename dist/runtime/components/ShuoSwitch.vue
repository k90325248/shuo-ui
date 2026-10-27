<template>
  <!-- 文字省略時顯示完整內容；外層頂端對齊，避免開關改變基線而使所在行高跳動 -->
  <ShuoTooltip
    :text="labelText"
    :delay-duration="0"
    :disabled="skeleton || !isTruncated"
    :open="!skeleton && isTruncated && tooltipOpen"
    @update:open="tooltipOpen = $event"
  >
    <span
      ref="root"
      data-slot="wrapper"
      :class="styles.wrapper({ class: ui?.wrapper })"
      @mouseenter="showTooltip"
      @mouseleave="tooltipOpen = false"
      @focusin="showTooltip"
      @focusout="tooltipOpen = false"
    >
      <!-- 處理中先顯示切換後的值；成功才更新綁定值，失敗回到原值 -->
      <USwitch
        :id="id"
        v-skeleton="skeleton"
        :model-value="shownValue"
        :label="labelText"
        :name="name"
        :size="controlSize"
        :color="resolved.color"
        :loading="loading || pending"
        :loading-icon="resolved.loadingIcon"
        :disabled="pending || disabled"
        :aria-busy="loading || pending || void 0"
        v-bind="$attrs"
        :ui="switchUi"
        class="form-switch"
        :class="`form-switch--${controlSize}`"
        @update:model-value="onUpdate"
        @change="onChange"
      >
        <!-- 取代顯示文字，與 USwitch 相同 -->
        <template v-if="slots.label" #label="labelProps">
          <slot name="label" v-bind="labelProps" />
        </template>
        <!-- 取代說明文字，與 USwitch 相同 -->
        <template v-if="slots.description" #description="descriptionProps">
          <slot name="description" v-bind="descriptionProps" />
        </template>
      </USwitch>
    </span>
  </ShuoTooltip>
</template>

<script setup>
import { tv } from "@nuxt/ui/utils/tv";
import { useTruncatedText } from "../composables/useTruncatedText";
import { vSkeleton } from "../directives/skeleton";
import { useShuoComponentProps } from "../internal/useShuoComponentProps";
import { useControlSize } from "../internal/useControlSize";
import { runToggleAction } from "../internal/toggle-action";
import { mergeUi } from "../utils/ui";
import ShuoTooltip from "./ShuoTooltip.vue";
const theme = tv({ slots: { wrapper: "inline-flex w-fit max-w-full min-w-0 align-top" } });
defineOptions({ inheritAttrs: false });
const props = defineProps({
  id: { type: String, required: false },
  name: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: void 0 },
  color: { type: null, required: false },
  size: { type: null, required: false },
  label: { type: String, required: false, default: void 0 },
  loading: { type: Boolean, required: false, default: false },
  loadingIcon: { type: null, required: false },
  skeleton: { type: Boolean, required: false, default: false },
  action: { type: Function, required: false, default: void 0 },
  ui: { type: Object, required: false, default: void 0 }
});
const emit = defineEmits(["change"]);
const modelValue = defineModel({ type: [Boolean, String, Number], ...{ default: false } });
const slots = defineSlots();
const resolved = useShuoComponentProps("switch", props);
const controlSize = useControlSize("switch", props);
const root = useTemplateRef("root");
const pending = ref(false);
const pendingValue = ref();
let startValue;
let changeEvent;
const labelText = computed(() => props.label ?? "");
const switchUi = computed(() => {
  const { wrapper: _wrapper, ...ui } = props.ui ?? {};
  return mergeUi(
    {
      root: "w-fit max-w-full min-w-0 h-(--form-switch-height,var(--form-switch-size-height)) items-center",
      wrapper: "min-w-0",
      label: "block truncate"
    },
    ui
  );
});
const styles = theme();
const { isTruncated, tooltipOpen, showTooltip } = useTruncatedText(root, labelText, '[data-slot="label"]');
const shownValue = computed(
  () => pending.value && modelValue.value === startValue ? pendingValue.value : modelValue.value
);
const onUpdate = (value) => {
  const action = props.action;
  if (!action) {
    modelValue.value = value;
    return;
  }
  return runToggleAction(value, action, {
    start: (next) => {
      startValue = modelValue.value;
      pendingValue.value = next;
      pending.value = true;
    },
    commit: (next) => {
      modelValue.value = next;
      if (changeEvent) emit("change", changeEvent);
    },
    finish: () => {
      pending.value = false;
      changeEvent = void 0;
    },
    isStale: () => modelValue.value !== startValue
  });
};
const onChange = (event) => {
  if (props.action) changeEvent = event;
  else emit("change", event);
};
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
.form-switch {
  --form-switch-size-height: 2.25rem;
}
.form-switch--xs {
  --form-switch-size-height: 1.5rem;
}
.form-switch--sm {
  --form-switch-size-height: 1.75rem;
}
.form-switch--md {
  --form-switch-size-height: 2rem;
}
.form-switch--xl {
  --form-switch-size-height: 2.5rem;
}
.form-switch {
  --form-switch-line-height: 1.25rem;
}
.form-switch--xs, .form-switch--sm {
  --form-switch-line-height: 1rem;
}
.form-switch--xl {
  --form-switch-line-height: 1.5rem;
}
.form-switch:has([data-slot=description]) {
  height: auto;
  min-height: var(--form-switch-height, var(--form-switch-size-height));
  align-items: flex-start;
  padding-block: calc((var(--form-switch-height, var(--form-switch-size-height)) - var(--form-switch-line-height)) / 2);
}
</style>
