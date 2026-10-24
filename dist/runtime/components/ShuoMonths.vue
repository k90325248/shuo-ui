<template>
  <div
    ref="root"
    v-skeleton="skeleton"
    v-bind="{ ...$attrs, class: void 0 }"
    data-slot="root"
    :class="[
  `form-months form-months--${controlSize}`,
  { 'form-months--loading': loading },
  styles.root({ class: [ui?.root, $attrs.class] })
]"
    role="group"
    :aria-busy="loading || void 0"
  >
    <!-- 完整寬度量測 -->
    <span ref="widthProbe" class="form-months-width-probe" aria-hidden="true" />

    <!-- 窄容器以總月數輸入 -->
    <UInput
      v-if="compact"
      :id="controlId"
      :model-value="totalInput"
      :size="controlSize"
      :disabled="inputDisabled"
      :color="fieldColor"
      :highlight="fieldHighlight"
      :ui="totalUi"
      inputmode="numeric"
      :aria-label="messages.months.total"
      v-bind="ariaAttrs"
      @input.capture="onTotalInput"
      @update:model-value="totalInput = String($event)"
      @blur="commitTotal"
    />

    <!-- 年數 -->
    <UInput
      v-if="!compact"
      :id="controlId"
      :model-value="yearInput"
      :size="controlSize"
      :disabled="inputDisabled"
      :color="fieldColor"
      :highlight="fieldHighlight"
      :ui="yearUi"
      inputmode="numeric"
      :aria-label="messages.months.years"
      v-bind="ariaAttrs"
      @input.capture="onInput($event, 'year')"
      @update:model-value="yearInput = String($event)"
      @blur="commit"
    />
    <span v-if="!compact" data-slot="unit" :class="styles.unit({ class: ui?.unit })">年</span>

    <!-- 月數 -->
    <UInput
      v-if="!compact"
      :id="`${controlId}-month`"
      :model-value="monthInput"
      :size="controlSize"
      :disabled="inputDisabled"
      :color="fieldColor"
      :highlight="fieldHighlight"
      :ui="monthUi"
      inputmode="numeric"
      :aria-label="messages.months.months"
      v-bind="ariaAttrs"
      @input.capture="onInput($event, 'month')"
      @update:model-value="monthInput = String($event)"
      @blur="commit"
    />
    <span data-testid="months-unit" data-slot="unit" :class="styles.unit({ class: ui?.unit })">月</span>

    <!-- 載入中圖示接在「月」後面，整組寬度同步加上圖示空間 -->
    <UIcon
      v-if="loading"
      data-slot="loading"
      :name="appConfig.ui.icons.loading"
      class="form-months-loading text-dimmed shrink-0 animate-spin"
      aria-hidden="true"
    />
  </div>
</template>

<script setup>
import { tv } from "@nuxt/ui/utils/tv";
import { mergeUi } from "../utils/ui";
import { useFormField } from "@nuxt/ui/composables";
import { getShuoMessages } from "../utils/messages";
import { vSkeleton } from "../directives/skeleton";
import { combineMonths, splitMonths } from "../utils/months";
import { useControlSize } from "../internal/useControlSize";
const theme = tv({
  slots: {
    root: "relative inline-flex w-(--months-full-width) max-w-full min-w-0 items-center gap-2 overflow-hidden text-base",
    unit: "w-[1em] flex-none whitespace-nowrap"
  },
  variants: { size: { xs: { root: "text-sm" }, sm: { root: "text-sm" }, md: "", lg: "", xl: "" } }
});
const YEAR_MONTH_UI = {
  root: "w-[calc(2ch_+_var(--months-input-padding)_+_2px)] min-w-0 flex-none",
  base: "text-center tabular-nums"
};
const TOTAL_UI = {
  root: "w-[calc(4ch_+_var(--months-input-padding)_+_2px)] min-w-0 flex-[0_1_auto]",
  base: "text-center tabular-nums"
};
defineOptions({ inheritAttrs: false });
const props = defineProps({
  id: { type: String, required: false },
  name: { type: String, required: false },
  size: { type: null, required: false },
  color: { type: null, required: false },
  highlight: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  skeleton: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  ui: { type: Object, required: false }
});
const totalModel = defineModel({ type: [Number, null] });
const yearModel = defineModel("year", { type: [Number, null] });
const monthModel = defineModel("month", { type: [Number, null] });
const instance = getCurrentInstance();
const generatedId = useId();
const appConfig = useAppConfig();
const messages = getShuoMessages();
const {
  id: fieldId,
  color: fieldColor,
  highlight: fieldHighlight,
  disabled: fieldDisabled,
  ariaAttrs,
  emitFormChange
} = useFormField(props);
const yearInput = ref("");
const monthInput = ref("");
const totalInput = ref("");
const root = useTemplateRef("root");
const widthProbe = useTemplateRef("widthProbe");
const compact = ref(false);
let resizeObserver;
let synced = [];
const controlId = computed(() => fieldId.value ?? generatedId);
const controlSize = useControlSize("months", props);
const styles = computed(() => theme({ size: controlSize.value }));
const yearUi = computed(() => mergeUi(YEAR_MONTH_UI, props.ui?.year));
const monthUi = computed(() => mergeUi(YEAR_MONTH_UI, props.ui?.month));
const totalUi = computed(() => mergeUi(TOTAL_UI, props.ui?.total));
const inputDisabled = computed(() => props.loading || fieldDisabled.value);
const applyValue = (value) => {
  synced = [value?.total ?? null, value?.year ?? null, value?.month ?? null];
  totalModel.value = value?.total ?? null;
  yearModel.value = value?.year ?? null;
  monthModel.value = value?.month ?? null;
  yearInput.value = value ? String(value.year) : "";
  monthInput.value = value ? String(value.month) : "";
  totalInput.value = value ? String(value.total) : "";
};
const parseDraft = (text) => text === "" ? null : Number(text);
const combineDraft = () => combineMonths(parseDraft(yearInput.value), parseDraft(monthInput.value));
const splitDraft = () => splitMonths(parseDraft(totalInput.value));
const onTotalInput = (event) => {
  const input = event.target;
  if (/^\d*$/.test(input.value) && splitMonths(Number(input.value))) return;
  input.value = totalInput.value;
};
const commitTotal = async () => {
  if (props.skeleton || inputDisabled.value) return;
  applyValue(splitDraft());
  await nextTick();
  emitFormChange();
};
const onInput = (event, part) => {
  const input = event.target;
  const value = input.value;
  const other = part === "year" ? monthInput.value : yearInput.value;
  const years = Number(part === "year" ? value : other);
  const months = Number(part === "month" ? value : other);
  if (/^\d*$/.test(value) && combineMonths(years, months)) return;
  input.value = part === "year" ? yearInput.value : monthInput.value;
};
const commit = async (event) => {
  if (event?.relatedTarget instanceof Node && root.value?.contains(event.relatedTarget)) return;
  if (props.skeleton || inputDisabled.value) return;
  applyValue(combineDraft());
  await nextTick();
  emitFormChange();
};
const updateLayout = () => {
  if (!root.value || !widthProbe.value) return;
  const nextCompact = root.value.clientWidth < widthProbe.value.getBoundingClientRect().width - 1;
  if (nextCompact === compact.value) return;
  applyValue(compact.value ? splitDraft() : combineDraft());
  compact.value = nextCompact;
};
watch(
  [totalModel, yearModel, monthModel],
  (values) => {
    if (values.every((value, index) => value === synced[index]) && synced.length) return;
    const bindings = instance?.vnode.props ?? {};
    const hasTotal = Object.hasOwn(bindings, "modelValue") || Object.hasOwn(bindings, "model-value");
    const totalChanged = synced.length ? values[0] !== synced[0] : hasTotal;
    applyValue(totalChanged ? splitMonths(values[0]) : combineMonths(values[1], values[2]));
  },
  { immediate: true }
);
onMounted(() => {
  resizeObserver = new ResizeObserver(updateLayout);
  if (root.value) resizeObserver.observe(root.value);
  if (widthProbe.value) resizeObserver.observe(widthProbe.value);
  updateLayout();
});
onBeforeUnmount(() => resizeObserver?.disconnect());
</script>

<style scoped>
.form-months {
  --months-input-padding: 1.5rem;
  --months-loading-size: 1.25rem;
  --months-full-width: calc(
    4ch + var(--months-input-padding) * 2 + 4px + 2em + 1.5rem + var(--months-loading-space, 0px)
  );
}
.form-months .form-months-width-probe {
  position: absolute;
  width: var(--months-full-width);
  height: 0;
  visibility: hidden;
  pointer-events: none;
}
.form-months .form-months-loading {
  width: var(--months-loading-size);
  height: var(--months-loading-size);
}
.form-months--loading {
  --months-loading-space: calc(var(--months-loading-size) + 0.5rem);
}
.form-months--xs {
  --months-input-padding: 1rem;
  --months-loading-size: 1rem;
}
.form-months--sm {
  --months-input-padding: 1.25rem;
  --months-loading-size: 1rem;
}
.form-months--md {
  --months-input-padding: 1.25rem;
}
.form-months--xl {
  --months-loading-size: 1.5rem;
}
</style>
