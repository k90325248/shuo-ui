<template>
  <UTextarea
    ref="control"
    v-model="modelValue"
    v-skeleton="skeleton"
    v-bind="{ ...$attrs, ...inputProps }"
    :aria-busy="loading || void 0"
    :ui="textareaUi"
    class="form-textarea"
  >
    <!-- 前置內容：使用端有傳才提供，未傳時保留 Nuxt UI 的 icon、leadingIcon、avatar -->
    <template v-if="slots.leading" #leading="slotProps">
      <slot name="leading" v-bind="slotProps" />
    </template>

    <template #default="slotProps">
      <!-- 載入中圖示放在右上角，位置同底層尾端圖示；不用底層 loading，避免取代左側 icon 或推移文字起點 -->
      <span v-if="loading" data-slot="loadingWrapper" :class="styles.loading({ class: ui?.loading })">
        <UIcon
          data-slot="loading"
          :name="appConfig.ui.icons.loading"
          class="text-dimmed shrink-0 animate-spin"
          :class="loadingLayout.icon"
          aria-hidden="true"
        />
      </span>
      <slot v-bind="slotProps" />
    </template>

    <!-- 尾端與載入圖示同位置，載入中不顯示使用端的 trailing slot -->
    <template v-if="slots.trailing && !loading" #trailing="slotProps">
      <slot name="trailing" v-bind="slotProps" />
    </template>
  </UTextarea>
</template>

<script setup>
import { tv } from "@nuxt/ui/utils/tv";
import { mergeUi } from "../utils/ui";
import { vSkeleton } from "../directives/skeleton";
import { useShuoComponentProps } from "../internal/useShuoComponentProps";
import { useControlSize } from "../internal/useControlSize";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  skeleton: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  autoresize: { type: Boolean, required: false },
  required: { type: Boolean, required: false },
  highlight: { type: Boolean, required: false },
  fixed: { type: Boolean, required: false },
  size: { type: null, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  rows: { type: Number, required: false },
  maxrows: { type: Number, required: false },
  maxlength: { type: Number, required: false },
  placeholder: { type: String, required: false },
  name: { type: String, required: false },
  icon: { type: String, required: false },
  ui: { type: Object, required: false }
});
const modelValue = defineModel({ type: String });
const slots = defineSlots();
const control = useTemplateRef("control");
const appConfig = useAppConfig();
const resolved = useShuoComponentProps("textarea", props);
const controlSize = useControlSize("textarea", props);
const loadingLayouts = {
  xs: { icon: "size-4", padding: "pe-7" },
  sm: { icon: "size-4", padding: "pe-8" },
  md: { icon: "size-5", padding: "pe-9" },
  lg: { icon: "size-5", padding: "pe-10" },
  xl: { icon: "size-6", padding: "pe-11" }
};
const theme = tv({
  slots: { loading: "pointer-events-none absolute end-0 flex items-start" },
  variants: {
    size: {
      xs: { loading: "pe-2 inset-y-1" },
      sm: { loading: "pe-2.5 inset-y-1.5" },
      md: { loading: "pe-2.5 inset-y-1.5" },
      lg: { loading: "pe-3 inset-y-2" },
      xl: { loading: "pe-3 inset-y-2" }
    }
  }
});
const minHeights = { xs: "min-h-6", sm: "min-h-7", md: "min-h-8", lg: "min-h-9", xl: "min-h-10" };
const inputProps = computed(() => {
  const { skeleton: _skeleton, loading, ui: _ui, ...input } = props;
  return {
    ...input,
    size: controlSize.value,
    autoresize: resolved.autoresize,
    rows: resolved.rows,
    maxrows: resolved.maxrows,
    fixed: resolved.fixed,
    disabled: loading || input.disabled
  };
});
const loadingLayout = computed(() => loadingLayouts[controlSize.value]);
const styles = computed(() => theme({ size: controlSize.value }));
const textareaUi = computed(() => {
  const { loading: _loading, ...ui } = props.ui ?? {};
  const base = [
    minHeights[controlSize.value],
    resolved.autoresize ? "" : "resize-y",
    props.loading ? loadingLayout.value.padding : ""
  ];
  return mergeUi(
    { root: "w-full min-w-0", base: base.filter(Boolean).join(" ") },
    ui
  );
});
watch(
  modelValue,
  (value) => {
    if (typeof value === "string") return;
    if (value !== null && value !== void 0) console.warn("[ShuoTextarea] modelValue \u578B\u5225\u4E0D\u7B26\uFF0C\u5DF2\u6E05\u7A7A\uFF1A", value);
    modelValue.value = "";
  },
  { immediate: true }
);
defineExpose({
  textareaRef: computed(() => control.value?.textareaRef ?? null),
  autoResize: () => control.value?.autoResize()
});
</script>

<style scoped>
.form-textarea :deep(textarea)::-webkit-scrollbar {
  width: 0.75rem;
  cursor: default;
}
.form-textarea :deep(textarea)::-webkit-scrollbar-track, .form-textarea :deep(textarea)::-webkit-scrollbar-corner {
  background: transparent;
}
.form-textarea :deep(textarea)::-webkit-scrollbar-thumb {
  border-width: 0.125rem 0.1875rem;
  border-style: solid;
  border-color: transparent;
  cursor: default;
  border-radius: 9999px;
  background: color-mix(in oklab, var(--ui-text-dimmed) 55%, transparent) padding-box;
}
.form-textarea :deep(textarea)::-webkit-scrollbar-thumb:hover {
  background-color: var(--ui-text-dimmed);
}
@supports not selector(::-webkit-scrollbar) {
  .form-textarea :deep(textarea) {
    scrollbar-width: thin;
    scrollbar-color: color-mix(in oklab, var(--ui-text-dimmed) 55%, transparent) transparent;
  }
}
</style>
