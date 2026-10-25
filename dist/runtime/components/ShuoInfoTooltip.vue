<template>
  <ShuoTooltip :delay-duration="0" :disabled="!text && !$slots.content" :ui="tooltipUi">
    <!-- 資訊提示圖示；class 與 ui.trigger 一起合併，其餘屬性落在按鈕 -->
    <button
      v-bind="{ ...$attrs, class: void 0 }"
      type="button"
      :aria-label="labelText"
      data-slot="trigger"
      :class="styles.trigger({ class: [ui?.trigger, $attrs.class] })"
    >
      <UIcon
        :name="resolved.icon"
        data-testid="info-tooltip-icon"
        data-slot="icon"
        :class="styles.icon({ class: ui?.icon })"
        aria-hidden="true"
      />
    </button>

    <!-- 提示內容 -->
    <template #content>
      <div data-slot="text" :class="styles.text({ class: ui?.text })">
        <slot name="content">{{ text }}</slot>
      </div>
    </template>
  </ShuoTooltip>
</template>

<script setup>
import { tv } from "@nuxt/ui/utils/tv";
import { useMessageDefault } from "../internal/useShuoLocale";
import { mergeUi } from "../utils/ui";
import { BUILT_IN_DEFAULTS } from "../utils/component-defaults";
import { useShuoComponentProps } from "../internal/useShuoComponentProps";
import ShuoTooltip from "./ShuoTooltip.vue";
const theme = tv({
  slots: {
    trigger: "text-primary focus-visible:outline-primary inline-flex shrink-0 cursor-help items-center justify-center rounded-full align-middle focus-visible:outline-2 focus-visible:outline-offset-2",
    icon: "size-4 shrink-0",
    text: "min-w-0 text-left wrap-break-word whitespace-pre-line"
  }
});
const styles = theme();
defineOptions({ inheritAttrs: false });
const props = defineProps({
  text: { type: String, required: false, default: "" },
  icon: { type: String, required: false, default: BUILT_IN_DEFAULTS.infoTooltip.icon },
  label: { type: String, required: false },
  ui: { type: Object, required: false }
});
const resolved = useShuoComponentProps("infoTooltip", props);
const labelText = useMessageDefault(
  () => props.label,
  (m) => m.infoTooltip.label
);
const tooltipUi = computed(
  () => mergeUi({ content: "h-auto max-w-xs py-2" }, props.ui?.tooltip)
);
</script>
