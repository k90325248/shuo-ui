<template>
  <UTooltip :delay-duration="0" :disabled="!text && !$slots.content" :ui="{ content: 'h-auto max-w-xs py-2' }">
    <!-- 資訊提示圖示 -->
    <button
      v-bind="$attrs"
      type="button"
      :aria-label="label"
      class="text-primary focus-visible:outline-primary inline-flex shrink-0 cursor-help items-center justify-center rounded-full align-middle focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <UIcon :name="icon" data-testid="info-tooltip-icon" class="size-4 shrink-0" aria-hidden="true" />
    </button>

    <!-- 提示內容 -->
    <template #content>
      <div class="min-w-0 text-left wrap-break-word whitespace-pre-line">
        <slot name="content">{{ text }}</slot>
      </div>
    </template>
  </UTooltip>
</template>

<script setup>
import { getShuoMessages } from "../utils/messages";
defineOptions({ inheritAttrs: false });
defineProps({
  text: { type: String, required: false, default: "" },
  icon: { type: String, required: false, default: "i-lucide-circle-alert" },
  label: { type: String, required: false, default: () => getShuoMessages().infoTooltip.label }
});
</script>
