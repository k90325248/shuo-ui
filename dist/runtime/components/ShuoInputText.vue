<template>
  <UInput
    :id="id"
    ref="control"
    v-model="modelValue"
    v-skeleton="skeleton"
    :name="name"
    :size="controlSize"
    :disabled="loading || disabled"
    :color="color"
    :highlight="highlight"
    :placeholder="placeholder"
    :aria-busy="loading || void 0"
    v-bind="$attrs"
    class="form-input-text"
    :class="{ 'form-input-text--masked': partialMask }"
    :type="mask === true && !revealed ? 'password' : 'text'"
    :ui="inputUi"
    @input="syncDisplay"
    @scroll.capture="syncDisplay"
    @copy="guardClipboard"
    @cut="guardClipboard"
  >
    <!-- 前置內容：使用端有傳才提供，未傳時保留 Nuxt UI 的 icon、leadingIcon、avatar -->
    <template v-if="slots.leading" #leading="slotProps">
      <slot name="leading" v-bind="slotProps" />
    </template>

    <template #default="slotProps">
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
      <slot v-bind="slotProps" />
    </template>

    <!-- 尾端：載入圖示優先，其次眼睛按鈕，最後才是使用端的 trailing slot；都沒有時保留 Nuxt UI 的 trailingIcon -->
    <template v-if="loading || showMaskToggle || slots.trailing" #trailing="slotProps">
      <UIcon
        v-if="loading"
        :name="appConfig.ui.icons.loading"
        data-slot="loading"
        class="form-input-text-loading text-dimmed shrink-0 animate-spin"
        :class="loadingIconSize"
        aria-hidden="true"
      />
      <UButton
        v-else-if="showMaskToggle"
        type="button"
        color="neutral"
        variant="ghost"
        size="xs"
        :icon="revealed ? resolved.concealIcon : resolved.revealIcon"
        :aria-label="revealed ? messages.inputText.hide : messages.inputText.show"
        :aria-pressed="revealed"
        :disabled="skeleton"
        @mousedown.prevent
        @click="toggleVisibility"
      />
      <slot v-else name="trailing" v-bind="slotProps" />
    </template>
  </UInput>
</template>

<script setup>
import { getShuoMessages } from "../utils/messages";
import { vSkeleton } from "../directives/skeleton";
import { getMaskCount, splitMaskedText } from "../utils/text-mask";
import { mergeUi } from "../utils/ui";
import { BUILT_IN_DEFAULTS } from "../utils/component-defaults";
import { useShuoComponentProps } from "../internal/useShuoComponentProps";
import { useControlSize } from "../internal/useControlSize";
const TEXT_ALIGN_JUSTIFY = {
  center: "safe center",
  right: "safe flex-end",
  end: "safe flex-end"
};
defineOptions({ inheritAttrs: false });
const props = defineProps({
  id: { type: String, required: false },
  name: { type: String, required: false },
  size: { type: null, required: false },
  disabled: { type: Boolean, required: false, default: void 0 },
  color: { type: null, required: false },
  highlight: { type: Boolean, required: false, default: void 0 },
  placeholder: { type: String, required: false },
  skeleton: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  mask: { type: [Boolean, Number], required: false },
  hideMaskToggle: { type: Boolean, required: false, default: BUILT_IN_DEFAULTS.inputText.hideMaskToggle },
  revealIcon: { type: String, required: false, default: BUILT_IN_DEFAULTS.inputText.revealIcon },
  concealIcon: { type: String, required: false, default: BUILT_IN_DEFAULTS.inputText.concealIcon },
  ui: { type: Object, required: false }
});
const modelValue = defineModel({ type: String });
const slots = defineSlots();
const resolved = useShuoComponentProps("inputText", props);
const controlSize = useControlSize("inputText", props);
const appConfig = useAppConfig();
const messages = getShuoMessages();
const control = useTemplateRef("control");
const revealed = ref(false);
const displayValue = ref(modelValue.value ?? "");
const scrollLeft = ref(0);
const overlayStyle = ref({});
let observer;
const loadingIconSize = computed(
  () => ({ xs: "size-4", sm: "size-4", md: "size-5", lg: "size-5", xl: "size-6" })[controlSize.value]
);
const inputUi = computed(
  () => mergeUi(
    { root: "w-full min-w-0", trailing: maskEnabled.value ? "pointer-events-auto" : void 0 },
    props.ui
  )
);
const maskEnabled = computed(() => getMaskCount(props.mask) > 0);
const showMaskToggle = computed(() => maskEnabled.value && !resolved.hideMaskToggle);
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
    justifyContent: TEXT_ALIGN_JUSTIFY[style.textAlign] ?? "flex-start",
    color: input.disabled ? "var(--ui-form-disabled-text)" : "var(--ui-text-highlighted)"
  };
  if (JSON.stringify(next) !== JSON.stringify(overlayStyle.value)) overlayStyle.value = next;
};
const toggleVisibility = () => {
  if (props.skeleton || resolved.hideMaskToggle) return;
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
watch([() => props.mask, () => resolved.hideMaskToggle], () => {
  revealed.value = false;
});
onMounted(() => {
  observer = new ResizeObserver(syncDisplay);
  if (control.value?.inputRef) observer.observe(control.value.inputRef);
  syncDisplay();
});
onUpdated(syncDisplay);
onBeforeUnmount(() => observer?.disconnect());
defineExpose({ inputRef: computed(() => control.value?.inputRef ?? null) });
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
