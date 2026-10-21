<template>
  <div
    ref="root"
    v-skeleton="skeleton"
    v-bind="$attrs"
    class="form-months relative inline-flex min-w-0 items-center gap-2 overflow-hidden"
    :class="[`form-months--${controlSize}`, { 'form-months--loading': loading }]"
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
      :ui="{ base: 'text-center tabular-nums' }"
      class="form-months-total"
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
      :ui="{ base: 'text-center tabular-nums' }"
      class="form-months-input"
      inputmode="numeric"
      :aria-label="messages.months.years"
      v-bind="ariaAttrs"
      @input.capture="onInput($event, 'year')"
      @update:model-value="yearInput = String($event)"
      @blur="commit"
    />
    <span v-if="!compact" class="shrink-0">年</span>

    <!-- 月數 -->
    <UInput
      v-if="!compact"
      :id="`${controlId}-month`"
      :model-value="monthInput"
      :size="controlSize"
      :disabled="inputDisabled"
      :color="fieldColor"
      :highlight="fieldHighlight"
      :ui="{ base: 'text-center tabular-nums' }"
      class="form-months-input"
      inputmode="numeric"
      :aria-label="messages.months.months"
      v-bind="ariaAttrs"
      @input.capture="onInput($event, 'month')"
      @update:model-value="monthInput = String($event)"
      @blur="commit"
    />
    <span data-testid="months-unit" class="form-months-unit">月</span>

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
import { useFormField } from "@nuxt/ui/composables";
import { getShuoMessages } from "../utils/messages";
import { vSkeleton } from "../directives/skeleton";
import { combineMonths, splitMonths } from "../utils/months";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  id: { type: String, required: false },
  name: { type: String, required: false },
  size: { type: null, required: false },
  color: { type: null, required: false },
  highlight: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  skeleton: { type: Boolean, required: false },
  loading: { type: Boolean, required: false }
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
  size: fieldSize,
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
const controlSize = computed(() => fieldSize.value ?? "lg");
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
  width: var(--months-full-width);
  max-width: 100%;
  font-size: 1rem;
}
.form-months .form-months-width-probe {
  position: absolute;
  width: var(--months-full-width);
  height: 0;
  visibility: hidden;
  pointer-events: none;
}
.form-months .form-months-unit {
  width: 1em;
  flex: none;
  white-space: nowrap;
}
.form-months .form-months-loading {
  width: var(--months-loading-size);
  height: var(--months-loading-size);
}
.form-months--loading {
  --months-loading-space: calc(var(--months-loading-size) + 0.5rem);
}
.form-months .form-months-total {
  width: calc(4ch + var(--months-input-padding) + 2px);
  min-width: 0;
  flex: 0 1 auto;
}
.form-months--xs {
  --months-input-padding: 1rem;
  --months-loading-size: 1rem;
  font-size: 0.875rem;
}
.form-months--sm {
  --months-input-padding: 1.25rem;
  --months-loading-size: 1rem;
  font-size: 0.875rem;
}
.form-months--md {
  --months-input-padding: 1.25rem;
}
.form-months--xl {
  --months-loading-size: 1.5rem;
}
.form-months .form-months-input {
  width: calc(2ch + var(--months-input-padding) + 2px);
  min-width: 0;
  flex: none;
}
</style>
