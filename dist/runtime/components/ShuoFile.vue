<template>
  <UTooltip
    :text="filename"
    :delay-duration="0"
    :disabled="skeleton || !isTruncated"
    :open="!skeleton && isTruncated && tooltipOpen"
    @update:open="tooltipOpen = $event"
  >
    <span
      ref="root"
      v-skeleton="skeleton"
      data-slot="wrapper"
      :class="styles.wrapper({ class: ui?.wrapper })"
      @mouseenter="measure"
      @focusin="showTooltip"
      @focusout="tooltipOpen = false"
    >
      <!-- 隱藏的原生選檔欄位 -->
      <input ref="picker" type="file" :accept="accept" :disabled="blocked" hidden @change="onSelect" />

      <!-- 檔名顯示欄位 -->
      <UInput
        v-bind="{ ...$attrs, ...ariaAttrs }"
        :id="fieldId"
        ref="control"
        :model-value="filename"
        :size="controlSize"
        :color="fieldColor"
        :highlight="fieldHighlight"
        :disabled="blocked"
        :placeholder="isDisabled ? '' : placeholder"
        :aria-busy="loading || void 0"
        readonly
        :ui="inputUi"
        @click="openPicker"
        @keydown.enter.prevent="openPicker"
        @keydown.space.prevent="openPicker"
      >
        <!-- 前置內容：使用端有傳才提供，未傳時保留 Nuxt UI 的 icon、leadingIcon、avatar -->
        <template v-if="slots.leading" #leading="slotProps">
          <slot name="leading" v-bind="slotProps" />
        </template>

        <template v-if="slots.default" #default="slotProps">
          <slot v-bind="slotProps" />
        </template>

        <!-- 尾端固定為清除與下載按鈕，不開放 trailing slot -->
        <template #trailing>
          <!-- 載入中以轉圈圖示取代尾端按鈕，佔用與按鈕相同的位置 -->
          <UIcon
            v-if="loading"
            data-slot="loading"
            :name="appConfig.ui.icons.loading"
            class="text-dimmed m-1 size-4 shrink-0 animate-spin"
            aria-hidden="true"
          />

          <template v-else>
            <!-- 清除按鈕：有檔案且未停用時顯示 -->
            <UButton
              v-if="modelValue && !isDisabled"
              type="button"
              :icon="resolved.clearIcon"
              :aria-label="messages.file.clear"
              color="neutral"
              variant="ghost"
              size="xs"
              class="cursor-pointer disabled:cursor-not-allowed"
              :disabled="skeleton"
              @click.stop="clearFile"
            />

            <!-- 下載或選擇檔案按鈕：有檔案時下載，否則開啟選檔 -->
            <UButton
              type="button"
              :icon="hasDownload ? resolved.downloadIcon : resolved.selectIcon"
              :aria-label="hasDownload ? messages.file.download : messages.file.select"
              color="neutral"
              variant="ghost"
              size="xs"
              class="cursor-pointer disabled:cursor-not-allowed"
              :disabled="skeleton || downloading || !hasDownload && isDisabled"
              :loading="downloading"
              @click.stop="hasDownload ? downloadFile() : openPicker()"
            />
          </template>
        </template>
      </UInput>
    </span>
  </UTooltip>
</template>

<script setup>
import { getShuoMessages } from "../utils/messages";
import { vSkeleton } from "../directives/skeleton";
import { tv } from "@nuxt/ui/utils/tv";
import { mergeUi } from "../utils/ui";
import { useFormField } from "@nuxt/ui/composables";
import { useTruncatedText } from "../composables/useTruncatedText";
import { BUILT_IN_DEFAULTS } from "../utils/component-defaults";
import { useShuoComponentProps } from "../internal/useShuoComponentProps";
import { useControlSize } from "../internal/useControlSize";
const theme = tv({ slots: { wrapper: "flex w-full min-w-0 cursor-default" } });
defineOptions({ inheritAttrs: false });
const props = defineProps({
  skeleton: { type: Boolean, required: false },
  accept: { type: String, required: false },
  placeholder: { type: String, required: false, default: () => getShuoMessages().file.placeholder },
  fileName: { type: String, required: false },
  fileUrl: { type: String, required: false },
  size: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  clearIcon: { type: String, required: false, default: BUILT_IN_DEFAULTS.file.clearIcon },
  downloadIcon: { type: String, required: false, default: BUILT_IN_DEFAULTS.file.downloadIcon },
  selectIcon: { type: String, required: false, default: BUILT_IN_DEFAULTS.file.selectIcon },
  ui: { type: Object, required: false }
});
const modelValue = defineModel({ type: null, ...{ required: true } });
const slots = defineSlots();
const {
  id: fieldId,
  color: fieldColor,
  highlight: fieldHighlight,
  disabled: fieldDisabled,
  ariaAttrs,
  emitFormChange,
  emitFormInput
} = useFormField(props);
const resolved = useShuoComponentProps("file", props);
const controlSize = useControlSize("file", props);
const appConfig = useAppConfig();
const toast = useToast();
const messages = getShuoMessages();
const picker = useTemplateRef("picker");
const control = useTemplateRef("control");
const root = useTemplateRef("root");
const downloading = ref(false);
let downloadController;
let downloadUrl;
const filename = computed(() => modelValue.value?.name ?? props.fileName ?? "");
const hasDownload = computed(() => Boolean(modelValue.value || props.fileUrl));
const isDisabled = computed(() => fieldDisabled.value ?? props.disabled);
const blocked = computed(() => props.loading || isDisabled.value);
const inputUi = computed(() => {
  const { wrapper: _wrapper, ...ui } = props.ui ?? {};
  const padding = modelValue.value && !isDisabled.value ? "pe-16" : "pe-9";
  return mergeUi(
    {
      root: "w-full min-w-0",
      base: `truncate cursor-default disabled:cursor-not-allowed enabled:hover:bg-elevated/50 ${padding}`,
      trailing: "pointer-events-auto cursor-default gap-1 pe-2"
    },
    ui
  );
});
const styles = theme();
const { isTruncated, measure, tooltipOpen, showTooltip } = useTruncatedText(root, filename, "input[readonly]");
const openPicker = () => {
  if (blocked.value || props.skeleton || !picker.value) return;
  tooltipOpen.value = false;
  picker.value.value = "";
  picker.value.click();
};
const updateFile = async (file) => {
  modelValue.value = file;
  await nextTick();
  emitFormInput();
  emitFormChange();
};
const onSelect = (event) => {
  if (blocked.value) return;
  const file = event.target.files?.[0];
  if (file) void updateFile(file);
};
const clearFile = () => {
  if (blocked.value || props.skeleton) return;
  if (picker.value) picker.value.value = "";
  tooltipOpen.value = false;
  void updateFile(null);
};
const releaseDownloadUrl = () => {
  if (downloadUrl) URL.revokeObjectURL(downloadUrl);
  downloadUrl = void 0;
};
const downloadFile = async () => {
  if (props.skeleton || props.loading || !hasDownload.value || downloading.value) return;
  const name = filename.value || "download";
  downloading.value = true;
  downloadController = new AbortController();
  const controller = downloadController;
  try {
    const blob = modelValue.value ?? await $fetch(props.fileUrl, {
      responseType: "blob",
      signal: controller.signal
    });
    if (controller.signal.aborted) return;
    releaseDownloadUrl();
    downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = name;
    document.body.append(link);
    link.click();
    link.remove();
  } catch {
    if (!controller.signal.aborted)
      toast.add({
        title: messages.file.downloadFailedTitle,
        description: messages.file.downloadFailedDescription,
        color: "error"
      });
  } finally {
    downloading.value = false;
  }
};
onBeforeUnmount(() => {
  downloadController?.abort();
  releaseDownloadUrl();
});
defineExpose({ inputRef: computed(() => control.value?.inputRef ?? null) });
</script>
