<template>
  <UTextarea
    v-model="modelValue"
    v-skeleton="skeleton"
    v-bind="{ ...$attrs, ...inputProps }"
    :aria-busy="loading || void 0"
    :ui="textareaUi"
    class="form-textarea w-full min-w-0"
  >
    <!-- 載入中圖示放在右上角，位置同底層尾端圖示；不用底層 loading，避免取代左側 icon 或推移文字起點 -->
    <span v-if="loading" class="pointer-events-none absolute end-0 flex items-start" :class="loadingLayout.wrapper">
      <UIcon
        data-slot="loading"
        :name="appConfig.ui.icons.loading"
        class="text-dimmed shrink-0 animate-spin"
        :class="loadingLayout.icon"
        aria-hidden="true"
      />
    </span>
  </UTextarea>
</template>

<script setup>
import { vSkeleton } from "../directives/skeleton";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  skeleton: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  autoresize: { type: Boolean, required: false },
  required: { type: Boolean, required: false },
  highlight: { type: Boolean, required: false },
  fixed: { type: Boolean, required: false },
  size: { type: null, required: false, default: "lg" },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  rows: { type: Number, required: false },
  maxrows: { type: Number, required: false },
  maxlength: { type: Number, required: false },
  placeholder: { type: String, required: false },
  name: { type: String, required: false },
  icon: { type: String, required: false }
});
const modelValue = defineModel({ type: String });
const attrs = useAttrs();
const appConfig = useAppConfig();
const loadingLayouts = {
  xs: { wrapper: "pe-2 inset-y-1", icon: "size-4", padding: "pe-7" },
  sm: { wrapper: "pe-2.5 inset-y-1.5", icon: "size-4", padding: "pe-8" },
  md: { wrapper: "pe-2.5 inset-y-1.5", icon: "size-5", padding: "pe-9" },
  lg: { wrapper: "pe-3 inset-y-2", icon: "size-5", padding: "pe-10" },
  xl: { wrapper: "pe-3 inset-y-2", icon: "size-6", padding: "pe-11" }
};
const minHeights = { xs: "min-h-6", sm: "min-h-7", md: "min-h-8", lg: "min-h-9", xl: "min-h-10" };
const inputProps = computed(() => {
  const { skeleton: _skeleton, loading, ...input } = props;
  return { ...input, disabled: loading || input.disabled };
});
const loadingLayout = computed(() => loadingLayouts[props.size ?? "lg"]);
const textareaUi = computed(() => {
  const ui = attrs.ui;
  const base = [
    minHeights[props.size ?? "lg"],
    props.autoresize ? "" : "resize-y",
    props.loading ? loadingLayout.value.padding : "",
    ui?.base ?? ""
  ];
  return { ...ui, base: base.filter(Boolean).join(" ") };
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
