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
      class="relative inline-flex w-fit max-w-full min-w-0 align-top"
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
        :true-value="trueValue"
        :false-value="falseValue"
        :value="String(trueValue)"
        :size="size"
        :name="name"
        :disabled="loading || disabled"
        :color="color"
        :highlight="highlight"
        :aria-busy="loading || void 0"
        v-bind="$attrs"
        :ui="checkboxUi"
        class="form-checkbox w-fit max-w-full min-w-0"
        :class="`form-checkbox--${size}`"
      />

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
defineOptions({ inheritAttrs: false });
const props = defineProps({
  id: { type: String, required: false },
  name: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: void 0 },
  color: { type: null, required: false },
  highlight: { type: Boolean, required: false, default: void 0 },
  skeleton: { type: Boolean, required: false },
  label: { type: String, required: false, default: () => getShuoMessages().checkbox.label },
  trueValue: { type: [String, Number, Boolean], required: false, default: 1 },
  falseValue: { type: [String, Number, Boolean], required: false, default: 0 },
  loading: { type: Boolean, required: false },
  size: { type: null, required: false, default: "lg" }
});
const modelValue = defineModel({ type: [String, Number, Boolean], ...{ required: true } });
const attrs = useAttrs();
const appConfig = useAppConfig();
const root = useTemplateRef("root");
const labelText = computed(() => props.label);
const loadingIconSize = computed(
  () => ({ xs: "size-3", sm: "size-3.5", md: "size-4", lg: "size-4.5", xl: "size-5" })[props.size ?? "lg"]
);
const checkboxUi = computed(() => {
  const ui = attrs.ui;
  return props.loading ? { ...ui, base: `opacity-0 ${ui?.base ?? ""}` } : ui;
});
const { isTruncated, tooltipOpen, showTooltip } = useTruncatedText(root, labelText, '[data-slot="label"]');
</script>

<style scoped>
.form-checkbox {
  --form-checkbox-size-height: 2.25rem;
  height: var(--form-checkbox-height, var(--form-checkbox-size-height));
  align-items: center;
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
.form-checkbox :deep([data-slot='label']) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
