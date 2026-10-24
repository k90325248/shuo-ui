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
      data-slot="wrapper"
      :class="styles.wrapper({ class: ui?.wrapper })"
      @mouseenter="measure"
      @focusin="showTooltip"
      @focusout="tooltipOpen = false"
    >
      <USelectMenu
        :id="id"
        ref="control"
        v-model="innerValue"
        :items="items"
        :multiple="multiple"
        :disabled="blocked"
        :open="!skeleton && !blocked && (open ?? isMenuOpen)"
        :name="name"
        :size="controlSize"
        :color="color"
        :highlight="highlight"
        :placeholder="placeholder"
        :loading="loading"
        trailing
        :aria-busy="loading || void 0"
        :search-input="{ placeholder: messages.selectMenu.searchPlaceholder }"
        :ui="selectUi"
        :label-key="resolvedLabelKey"
        :value-key="resolvedValueKey"
        v-bind="$attrs"
        @update:open="isMenuOpen = !skeleton && !blocked && $event"
      >
        <!-- 使用端傳入的插槽原樣轉給選單；item-label、default、empty 有傳時取代元件的內建內容 -->
        <!-- 動態名稱下 TS 無法將參數對應到同名插槽，執行時各插槽收到的仍是自己的參數 -->
        <template v-for="name in slotNames()" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps" />
        </template>

        <!-- 選項文字 -->
        <template v-if="!slots['item-label']" #item-label="{ item }">
          {{ formatItem(item) }}
        </template>

        <!-- 已選取文字；空值沿用原元件的 placeholder，找不到對應選項時改顯示 placeholder 而非原始值 -->
        <template v-if="hasSelection && !slots.default" #default>
          <span v-if="selectedItems.length" data-slot="value" :class="styles.value({ class: ui?.value })">
            {{ selectedText }}
          </span>
          <span v-else data-slot="placeholder" :class="styles.placeholder({ class: ui?.placeholder })">
            {{ placeholder ?? "\xA0" }}
          </span>
        </template>

        <!-- 無選項提示 -->
        <template v-if="!slots.empty" #empty>無可用選項</template>
      </USelectMenu>
    </span>
  </UTooltip>
</template>

<script setup>
import { tv } from "@nuxt/ui/utils/tv";
import { mergeUi } from "../utils/ui";
import { getByPath } from "../utils/get-by-path";
import { getShuoMessages } from "../utils/messages";
import { vSkeleton } from "../directives/skeleton";
import { useTruncatedText } from "../composables/useTruncatedText";
import { useOptionKeysWarning } from "../internal/useOptionKeysWarning";
import { BUILT_IN_DEFAULTS } from "../utils/component-defaults";
import { useShuoComponentProps, useShuoPropSource } from "../internal/useShuoComponentProps";
import { useControlSize } from "../internal/useControlSize";
const BUILTIN_UI = { base: "w-full min-w-0", value: "min-w-0 truncate", placeholder: "min-w-0 truncate" };
const theme = tv({
  slots: {
    wrapper: "flex w-full min-w-0",
    value: "min-w-0 truncate pointer-events-none",
    placeholder: "min-w-0 truncate text-dimmed"
  }
});
defineOptions({ inheritAttrs: false });
const messages = getShuoMessages();
const props = defineProps({
  id: { type: String, required: false },
  name: { type: String, required: false },
  size: { type: null, required: false },
  color: { type: null, required: false },
  highlight: { type: Boolean, required: false, default: void 0 },
  placeholder: { type: String, required: false },
  open: { type: Boolean, required: false, default: void 0 },
  skeleton: { type: Boolean, required: false },
  items: { type: null, required: true },
  labelKey: { type: null, required: false },
  valueKey: { type: null, required: false },
  multiple: { type: null, required: false },
  format: { type: String, required: false, default: BUILT_IN_DEFAULTS.selectMenu.format },
  disabled: { type: Boolean, required: false, default: void 0 },
  loading: { type: Boolean, required: false },
  emptyValue: { type: [String, null], required: false, default: BUILT_IN_DEFAULTS.selectMenu.emptyValue },
  ui: { type: Object, required: false }
});
const modelValue = defineModel({ type: null });
const slots = defineSlots();
const resolved = useShuoComponentProps("selectMenu", props);
const controlSize = useControlSize("selectMenu", props);
const propSource = useShuoPropSource("selectMenu");
const tooltipRoot = useTemplateRef("tooltipRoot");
const control = useTemplateRef("control");
const isMenuOpen = ref(false);
const slotNames = () => Object.keys(slots);
const innerValue = computed({
  get: () => props.multiple || !isEmptyValue(modelValue.value) ? modelValue.value : void 0,
  set: (value) => {
    modelValue.value = props.multiple || !isEmptyValue(value) ? value : resolved.emptyValue;
  }
});
const resolvedLabelKey = computed(() => resolved.labelKey ?? BUILT_IN_DEFAULTS.selectMenu.labelKey);
const resolvedValueKey = computed(() => resolved.valueKey ?? BUILT_IN_DEFAULTS.selectMenu.valueKey);
useOptionKeysWarning(
  "ShuoSelectMenu",
  "selectMenu",
  () => ({
    items: props.items,
    labelKey: String(resolvedLabelKey.value),
    valueKey: String(resolvedValueKey.value)
  }),
  propSource
);
const selectUi = computed(() => {
  const { wrapper: _wrapper, ...ui } = props.ui ?? {};
  return mergeUi(BUILTIN_UI, ui);
});
const styles = theme();
const blocked = computed(() => props.loading || props.disabled);
const hasSelection = computed(() => {
  const value = modelValue.value;
  return Array.isArray(value) ? value.length > 0 : !isEmptyValue(value);
});
const selectedItems = computed(() => {
  const value = modelValue.value;
  const values = Array.isArray(value) ? value : [value];
  return values.filter((value2) => value2 != null && value2 !== resolved.emptyValue).map(
    (value2) => props.items.find(
      (option) => (typeof option === "string" ? option : getByPath(option, resolvedValueKey.value)) === value2
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
  const value = typeof item === "string" ? item : getByPath(item, resolvedValueKey.value);
  const label = typeof item === "string" ? item : getByPath(item, resolvedLabelKey.value);
  return resolved.format.replace(
    /\{(value|label)\}/g,
    (_, key) => String((key === "value" ? value : label) ?? "")
  );
};
watch(
  [modelValue, () => props.multiple, () => resolved.emptyValue],
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
defineExpose({
  triggerRef: computed(() => control.value?.triggerRef ?? null),
  viewportRef: computed(() => control.value?.viewportRef ?? null)
});
</script>
