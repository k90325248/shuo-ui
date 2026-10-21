<template>
  <UTooltip
    :text="selectedText"
    :delay-duration="0"
    :disabled="skeleton || !isTruncated || isMenuOpen"
    :open="!skeleton && isTruncated && !isMenuOpen && tooltipOpen"
    @update:open="tooltipOpen = $event"
  >
    <span
      ref="tooltipRoot"
      v-skeleton="skeleton"
      class="flex w-full min-w-0"
      @mouseenter="measure"
      @focusin="showTooltip"
      @focusout="tooltipOpen = false"
    >
      <USelectMenu
        :id="id"
        v-model="innerValue"
        :items="items"
        :multiple="multiple"
        :disabled="blocked"
        :open="!skeleton && !blocked && (open ?? isMenuOpen)"
        class="w-full min-w-0"
        :name="name"
        :size="size"
        :color="color"
        :highlight="highlight"
        :placeholder="placeholder"
        :loading="loading"
        trailing
        :aria-busy="loading || void 0"
        :search-input="{ placeholder: messages.selectMenu.searchPlaceholder }"
        :ui="{ value: 'min-w-0 truncate', placeholder: 'min-w-0 truncate' }"
        :label-key="resolvedLabelKey"
        :value-key="resolvedValueKey"
        v-bind="$attrs"
        @update:open="isMenuOpen = !skeleton && !blocked && $event"
      >
        <!-- 選項文字 -->
        <template #item-label="{ item }">
          {{ formatItem(item) }}
        </template>

        <!-- 已選取文字；空值沿用原元件的 placeholder，找不到對應選項時改顯示 placeholder 而非原始值 -->
        <template v-if="hasSelection" #default>
          <span v-if="selectedItems.length" data-slot="value" class="min-w-0 truncate">{{ selectedText }}</span>
          <span v-else data-slot="placeholder" class="text-dimmed min-w-0 truncate">{{ placeholder ?? "\xA0" }}</span>
        </template>

        <!-- 無選項提示 -->
        <template #empty>無可用選項</template>
      </USelectMenu>
    </span>
  </UTooltip>
</template>

<script setup>
import { get } from "lodash";
import { getShuoMessages } from "../utils/messages";
import { vSkeleton } from "../directives/skeleton";
import { useTruncatedText } from "../composables/useTruncatedText";
defineOptions({ inheritAttrs: false });
const messages = getShuoMessages();
const props = defineProps({
  id: { type: String, required: false },
  name: { type: String, required: false },
  size: { type: null, required: false, default: "lg" },
  color: { type: null, required: false },
  highlight: { type: Boolean, required: false, default: void 0 },
  placeholder: { type: String, required: false },
  open: { type: Boolean, required: false, default: void 0 },
  skeleton: { type: Boolean, required: false },
  items: { type: null, required: true },
  labelKey: { type: null, required: false },
  valueKey: { type: null, required: false },
  multiple: { type: null, required: false },
  format: { type: String, required: false, default: "{value}_{label}" },
  disabled: { type: Boolean, required: false, default: void 0 },
  loading: { type: Boolean, required: false },
  emptyValue: { type: [String, null], required: false, default: "" }
});
const modelValue = defineModel({ type: null });
const tooltipRoot = useTemplateRef("tooltipRoot");
const isMenuOpen = ref(false);
const innerValue = computed({
  get: () => props.multiple || !isEmptyValue(modelValue.value) ? modelValue.value : void 0,
  set: (value) => {
    modelValue.value = props.multiple || !isEmptyValue(value) ? value : props.emptyValue;
  }
});
const resolvedLabelKey = computed(() => props.labelKey ?? "label");
const resolvedValueKey = computed(() => props.valueKey ?? "value");
const blocked = computed(() => props.loading || props.disabled);
const hasSelection = computed(() => {
  const value = modelValue.value;
  return Array.isArray(value) ? value.length > 0 : !isEmptyValue(value);
});
const selectedItems = computed(() => {
  const value = modelValue.value;
  const values = Array.isArray(value) ? value : [value];
  return values.filter((value2) => value2 != null && value2 !== props.emptyValue).map(
    (value2) => props.items.find(
      (option) => (typeof option === "string" ? option : get(option, resolvedValueKey.value)) === value2
    )
  ).filter((item) => item != null);
});
const selectedText = computed(() => selectedItems.value.map(formatItem).filter(Boolean).join("\u3001"));
const isEmptyValue = (value) => value === void 0 || value === null || value === "";
const normalizeValue = (value, multiple, emptyValue) => {
  if (multiple) return value == null ? [] : value;
  return isEmptyValue(value) ? emptyValue : value;
};
const formatItem = (item) => {
  const value = typeof item === "string" ? item : get(item, resolvedValueKey.value);
  const label = typeof item === "string" ? item : get(item, resolvedLabelKey.value);
  return props.format.replace(
    /\{(value|label)\}/g,
    (_, key) => String((key === "value" ? value : label) ?? "")
  );
};
watch(
  [modelValue, () => props.multiple, () => props.emptyValue],
  ([value, multiple, emptyValue]) => {
    const next = normalizeValue(value, multiple, emptyValue);
    if (next !== value) modelValue.value = next;
  },
  { immediate: true }
);
watch(
  () => props.skeleton || blocked.value,
  (blocked2) => {
    if (blocked2) isMenuOpen.value = false;
  }
);
const { isTruncated, measure, tooltipOpen, showTooltip } = useTruncatedText(
  tooltipRoot,
  selectedText,
  '[data-slot="value"]'
);
</script>
