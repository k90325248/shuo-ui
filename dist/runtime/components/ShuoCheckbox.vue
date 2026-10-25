<template>
  <!-- 文字省略時顯示完整內容；外層頂端對齊，避免勾選圖示改變基線而使所在行高跳動 -->
  <UTooltip
    :text="label"
    :delay-duration="0"
    :disabled="skeleton || !isTruncated"
    :open="!skeleton && isTruncated && tooltipOpen"
    @update:open="tooltipOpen = $event"
  >
    <span
      ref="root"
      data-testid="checkbox-root"
      data-slot="wrapper"
      :class="styles.wrapper({ class: ui?.wrapper })"
      @mouseenter="showTooltip"
      @mouseleave="tooltipOpen = false"
      @focusin="showTooltip"
      @focusout="tooltipOpen = false"
    >
      <UCheckbox
        :id="id"
        v-model="modelValue"
        v-skeleton="skeleton"
        :label="label"
        :true-value="resolved.trueValue"
        :false-value="resolved.falseValue"
        :value="String(resolved.trueValue)"
        :size="controlSize"
        :name="name"
        :disabled="loading || disabled"
        :color="color"
        :aria-busy="loading || void 0"
        v-bind="omitChoiceAttrs($attrs)"
        :ui="checkboxUi"
        class="form-checkbox"
        :class="`form-checkbox--${controlSize}`"
      >
        <!-- 文字旁的附加內容（例如輸入框）；點擊非互動區域不會改變勾選 -->
        <template v-if="slots.append" #label>
          <span :id="labelId" data-choice-label>{{ label }}</span>
          <span data-choice-append @click="onAppendClick">
            <slot name="append" v-bind="appendProps" />
          </span>
        </template>
      </UCheckbox>

      <!-- 載入中以同尺寸轉圈圖示蓋住勾選框；勾選框改為透明以保留位置與無障礙屬性 -->
      <UIcon
        v-if="loading && !skeleton"
        data-slot="loading"
        :name="appConfig.ui.icons.loading"
        class="text-dimmed pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 animate-spin"
        :class="loadingIconSize"
        aria-hidden="true"
      />
    </span>
  </UTooltip>
</template>

<script setup>
import { useTruncatedText } from "../composables/useTruncatedText";
import { getShuoMessages } from "../utils/messages";
import { vSkeleton } from "../directives/skeleton";
import { useChoiceAppend } from "../composables/useChoiceAppend";
import { tv } from "@nuxt/ui/utils/tv";
import { mergeUi } from "../utils/ui";
import { BUILT_IN_DEFAULTS } from "../utils/component-defaults";
import { useShuoComponentProps } from "../internal/useShuoComponentProps";
import { useControlSize } from "../internal/useControlSize";
import { omitChoiceAttrs } from "../internal/choice-attrs";
const theme = tv({ slots: { wrapper: "relative inline-flex w-fit max-w-full min-w-0 align-top" } });
defineOptions({ inheritAttrs: false });
const props = defineProps({
  id: { type: String, required: false },
  name: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: void 0 },
  color: { type: null, required: false },
  skeleton: { type: Boolean, required: false },
  label: { type: String, required: false, default: () => getShuoMessages().checkbox.label },
  trueValue: { type: [String, Number, Boolean], required: false, default: BUILT_IN_DEFAULTS.checkbox.trueValue },
  falseValue: { type: [String, Number, Boolean], required: false, default: BUILT_IN_DEFAULTS.checkbox.falseValue },
  loading: { type: Boolean, required: false },
  size: { type: null, required: false },
  ui: { type: Object, required: false }
});
const modelValue = defineModel({ type: [String, Number, Boolean], ...{ required: true } });
const slots = defineSlots();
const appConfig = useAppConfig();
const resolved = useShuoComponentProps("checkbox", props);
const controlSize = useControlSize("checkbox", props);
const root = useTemplateRef("root");
const labelId = `${useId()}-label`;
const labelText = computed(() => props.label);
const loadingIconSize = computed(
  () => ({ xs: "size-3", sm: "size-3.5", md: "size-4", lg: "size-4.5", xl: "size-5" })[controlSize.value]
);
const checkboxUi = computed(() => {
  const { wrapper: _wrapper, ...ui } = props.ui ?? {};
  return mergeUi(
    {
      root: "w-fit max-w-full min-w-0 h-(--form-checkbox-height,var(--form-checkbox-size-height)) items-center",
      label: "truncate",
      base: props.loading ? "opacity-0" : void 0
    },
    ui
  );
});
const styles = theme();
const { formDisabled, onAppendClick, activate } = useChoiceAppend(() => root.value, {
  enabled: () => !!slots.append,
  source: () => props.label
});
const isChecked = computed(() => modelValue.value === resolved.trueValue);
const appendProps = computed(() => ({
  checked: isChecked.value,
  disabled: !!(props.loading || props.disabled || formDisabled.value),
  labelId,
  check: () => {
    if (!isChecked.value) activate(labelId);
  }
}));
const { isTruncated, tooltipOpen, showTooltip } = useTruncatedText(
  root,
  labelText,
  slots.append ? "[data-choice-label]" : '[data-slot="label"]'
);
</script>

<style scoped>
@charset "UTF-8";
/**
 * 選項文字旁附加內容（例如輸入框）的排列。
 * label 改為橫向排列且不裁切，避免使用端主題的 truncate 切掉輸入框與選項按鈕的 focus 外框；文字省略仍由 [data-choice-label] 處理。
 */
/** 單選與複選群組的尺寸變數及文字省略樣式；排列與寬度寫在元件的內建 ui，可由使用端覆寫。 */
.form-checkbox {
  --form-checkbox-size-height: 2.25rem;
}
.form-checkbox--xs {
  --form-checkbox-size-height: 1.5rem;
}
.form-checkbox--sm {
  --form-checkbox-size-height: 1.75rem;
}
.form-checkbox--md {
  --form-checkbox-size-height: 2rem;
}
.form-checkbox--xl {
  --form-checkbox-size-height: 2.5rem;
}
.form-checkbox [data-choice-label] {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.form-checkbox :deep([data-slot='item']:has([data-choice-append])) {
  align-items: center;
}
.form-checkbox :deep([data-slot='label']:has(> [data-choice-append])) {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  overflow: visible;
  cursor: default;
}
.form-checkbox :deep([data-slot='label']:has(> [data-choice-append])) [data-choice-label] {
  flex-shrink: 0;
  cursor: pointer;
}
.form-checkbox [data-choice-append] {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
}
.form-checkbox [data-choice-append] > * {
  min-width: 0;
}
</style>
