<template>
  <UInput
    :id="id"
    ref="control"
    v-model="modelValue"
    v-skeleton="skeleton"
    :name="name"
    :size="size"
    :disabled="loading || disabled"
    :color="color"
    :highlight="highlight"
    :placeholder="placeholder"
    :aria-busy="loading || void 0"
    v-bind="$attrs"
    class="form-input-text w-full min-w-0"
    :class="{ 'form-input-text--masked': partialMask }"
    :type="mask === true && !revealed ? 'password' : 'text'"
    :ui="inputUi"
    @input="syncDisplay"
    @scroll.capture="syncDisplay"
    @copy="guardClipboard"
    @cut="guardClipboard"
  >
    <!-- 部分遮蔽層：覆蓋原生文字，只在部分遮蔽且未顯示明碼時顯示 -->
    <span
      v-if="partialMask"
      data-testid="input-text-mask"
      class="form-input-text-mask"
      :style="overlayStyle"
      aria-hidden="true"
    >
      <span
        data-testid="input-text-mask-content"
        class="form-input-text-mask-content"
        :style="{ transform: `translateX(-${scrollLeft}px)` }"
      >
        <span>{{ maskedParts.prefix }}</span>
        <span class="form-input-text-mask-tail">
          <span class="form-input-text-mask-hidden">{{ maskedParts.suffix }}</span>
          <span data-testid="input-text-mask-dots" class="form-input-text-mask-dots">
            <span v-for="index in maskedParts.count" :key="index">•</span>
          </span>
        </span>
      </span>
    </span>

    <!-- 載入中圖示放在尾端，與眼睛按鈕共用位置，不改變文字起點 -->
    <template v-if="loading || maskEnabled && !hideMaskToggle" #trailing>
      <UIcon
        v-if="loading"
        :name="appConfig.ui.icons.loading"
        data-slot="loading"
        class="form-input-text-loading text-dimmed shrink-0 animate-spin"
        :class="loadingIconSize"
        aria-hidden="true"
      />
      <UButton
        v-else
        type="button"
        color="neutral"
        variant="ghost"
        size="xs"
        :icon="revealed ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="revealed ? messages.inputText.hide : messages.inputText.show"
        :aria-pressed="revealed"
        :disabled="skeleton"
        @mousedown.prevent
        @click="toggleVisibility"
      />
    </template>
  </UInput>
</template>

<script setup>
import { getShuoMessages } from "../utils/messages";
import { vSkeleton } from "../directives/skeleton";
import { getMaskCount, splitMaskedText } from "../utils/text-mask";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  id: { type: String, required: false },
  name: { type: String, required: false },
  size: { type: null, required: false, default: "lg" },
  disabled: { type: Boolean, required: false, default: void 0 },
  color: { type: null, required: false },
  highlight: { type: Boolean, required: false, default: void 0 },
  placeholder: { type: String, required: false },
  skeleton: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  mask: { type: [Boolean, Number], required: false },
  hideMaskToggle: { type: Boolean, required: false, default: false }
});
const modelValue = defineModel({ type: String });
const attrs = useAttrs();
const appConfig = useAppConfig();
const messages = getShuoMessages();
const control = useTemplateRef("control");
const revealed = ref(false);
const displayValue = ref(modelValue.value ?? "");
const scrollLeft = ref(0);
const overlayStyle = ref({});
let observer;
const loadingIconSize = computed(
  () => ({ xs: "size-4", sm: "size-4", md: "size-5", lg: "size-5", xl: "size-6" })[props.size ?? "lg"]
);
const inputUi = computed(() => {
  const ui = attrs.ui;
  return maskEnabled.value ? { ...ui, trailing: `pointer-events-auto ${ui?.trailing ?? ""}` } : ui;
});
const maskEnabled = computed(() => getMaskCount(props.mask) > 0);
const partialMask = computed(() => maskEnabled.value && props.mask !== true && !revealed.value);
const maskedParts = computed(() => splitMaskedText(displayValue.value, props.mask));
const syncDisplay = () => {
  const input = control.value?.inputRef;
  if (!input) return;
  displayValue.value = input.value;
  scrollLeft.value = input.scrollLeft;
  const style = getComputedStyle(input);
  const next = {
    left: style.paddingLeft,
    right: style.paddingRight,
    font: style.font,
    letterSpacing: style.letterSpacing,
    color: input.disabled ? "var(--ui-form-disabled-text)" : "var(--ui-text-highlighted)"
  };
  if (JSON.stringify(next) !== JSON.stringify(overlayStyle.value)) overlayStyle.value = next;
};
const toggleVisibility = () => {
  if (props.skeleton || props.hideMaskToggle) return;
  revealed.value = !revealed.value;
};
const guardClipboard = (event) => {
  if (maskEnabled.value && !revealed.value) event.preventDefault();
};
watch(
  modelValue,
  (value) => {
    if (typeof value === "string") return;
    if (value !== null && value !== void 0) console.warn("[ShuoInputText] modelValue \u578B\u5225\u4E0D\u7B26\uFF0C\u5DF2\u6E05\u7A7A\uFF1A", value);
    modelValue.value = "";
  },
  { immediate: true }
);
watch([() => props.mask, () => props.hideMaskToggle], () => {
  revealed.value = false;
});
onMounted(() => {
  observer = new ResizeObserver(syncDisplay);
  if (control.value?.inputRef) observer.observe(control.value.inputRef);
  syncDisplay();
});
onUpdated(syncDisplay);
onBeforeUnmount(() => observer?.disconnect());
</script>

<style scoped>
.form-input-text--masked :deep(input) {
  color: transparent !important;
  caret-color: var(--ui-text-highlighted);
}
.form-input-text--masked :deep(input)::selection {
  color: transparent;
  background-color: color-mix(in srgb, var(--ui-primary) 30%, transparent);
}
.form-input-text .form-input-text-mask {
  position: absolute;
  inset-block: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  pointer-events: none;
  white-space: pre;
}
.form-input-text .form-input-text-mask-content {
  display: flex;
  flex: none;
}
.form-input-text .form-input-text-mask-tail {
  position: relative;
  display: inline-block;
}
.form-input-text .form-input-text-mask-hidden {
  visibility: hidden;
}
.form-input-text .form-input-text-mask-dots {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
