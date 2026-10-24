<template>
  <UTooltip
    :text="tooltipText"
    :delay-duration="0"
    :disabled="skeleton || !isTruncated || isMenuOpen"
    :open="!skeleton && isTruncated && !isMenuOpen && tooltipOpen"
    @update:open="tooltipOpen = $event"
  >
    <span
      ref="tooltipRoot"
      v-skeleton="skeleton"
      data-testid="datepicker-display"
      v-bind="{ ...$attrs, class: void 0 }"
      :class="[
  display({ class: normalizeClass($attrs.class) }),
  `form-datepicker--${controlSize}`,
  { 'form-datepicker--loading': loading }
]"
      @mouseenter="measure"
      @focusin="showTooltip"
      @focusout="tooltipOpen = false"
    >
      <!-- 日曆固定六週，避免不同月份的週數改變彈窗高度。 -->
      <VueDatePicker
        ref="picker"
        :key="`${mode}-${rocDisplay}-${range}`"
        v-model="pickerValue"
        class="form-datepicker form-datepicker-theme"
        :class="`form-datepicker--${controlSize}`"
        :ui="{ menu: `form-datepicker-menu form-datepicker-theme form-datepicker--${controlSize}` }"
        :input-attrs="{
  id: fieldId,
  name: fieldName,
  state: fieldState,
  clearable: showClear,
  autocomplete: 'off'
}"
        :aria-labels="ariaLabels"
        :locale="zhTW"
        :year-picker="mode === 'year'"
        :month-picker="mode === 'month'"
        :time-config="timeConfig"
        :disabled="loading || fieldDisabled"
        :range="range ? { partialRange: true } : false"
        auto-apply
        arrow-navigation
        :config="{ closeOnAutoApply: false }"
        :flow="selectionFlow"
        :formats="{ input: formatDisplay, preview: formatDisplay }"
        :min-date="effectiveMinDate"
        :max-date="maxDate"
        :year-range="effectiveYearRange"
        :start-date="hasInvalidValue ? effectiveMinDate : void 0"
        :focus-start-date="hasInvalidValue"
        :week-start="0"
        six-weeks
        prevent-min-max-navigation
        :floating="{ placement: 'bottom-start', offset: 8, shift: { padding: 8, crossAxis: true } }"
        teleport
        @open="isMenuOpen = true"
        @closed="onMenuClosed"
        @focus="emitFormFocus"
        @blur="emitFormBlur"
        @menu-mounted="centerYear"
      >
        <!-- 尾端日曆圖示；slot 固定提供，套件初始化後不再偵測 slot 變化，圖示名稱可隨 prop 更新。 -->
        <template #input-icon>
          <!-- 圖示元件固定加上 aria-hidden，無障礙名稱放在外層 -->
          <span role="img" :aria-label="messages.datepicker.calendarIcon" class="form-datepicker-icon">
            <UIcon :name="calendarIcon" class="size-full" />
          </span>
        </template>

        <!-- 清除按鈕：保留套件的 class 與測試識別，鍵盤由原生 button 處理 -->
        <template #clear-icon="{ clear }">
          <button
            type="button"
            class="form-datepicker-clear"
            :aria-label="messages.datepicker.clearInput"
            data-test-id="clear-input-value-btn"
            @click.prevent="clear($event)"
          >
            <span class="form-datepicker-icon">
              <UIcon :name="clearIcon" class="size-full" />
            </span>
          </button>
        </template>

        <!-- 年份按鈕 -->
        <template #year="{ value }">{{ formatYear(value) }}</template>

        <!-- 年份清單項目 -->
        <template #year-overlay-value="{ value }">
          <span :data-datepicker-year="value">{{ formatYear(value) }}</span>
        </template>
      </VueDatePicker>
      <!-- 原生 input 保留值與鍵盤操作，獨立文字層確保 focus 時仍顯示省略號。 -->
      <span data-testid="datepicker-value" class="form-datepicker-value" aria-hidden="true">{{ tooltipText }}</span>
      <!-- 載入中隱藏日曆圖示，於相同位置顯示轉圈圖示；套件初始化後不再偵測 slot 變化，因此不用 input-icon slot。 -->
      <span v-if="loading" data-slot="loading" class="form-datepicker-loading" aria-hidden="true">
        <UIcon
          :name="appConfig.ui.icons.loading"
          data-testid="datepicker-loading-icon"
          class="size-full animate-spin"
        />
      </span>
    </span>
  </UTooltip>
</template>

<script setup>
import { formatMessage, getShuoMessages } from "../utils/messages";
import { vSkeleton } from "../directives/skeleton";
import { useTruncatedText } from "../composables/useTruncatedText";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import { tv } from "@nuxt/ui/utils/tv";
import { normalizeClass } from "vue";
import { useFormField } from "@nuxt/ui/composables";
import { isValid, startOfMonth, startOfYear } from "date-fns";
import {
  formatDatepickerDisplay,
  getDatepickerValueIssue,
  isEmptyDatepickerValue,
  normalizeDatepickerValue,
  parseDatepickerValue,
  serializeDatepickerRange,
  serializeDatepickerValue
} from "../utils/datepicker";
import {
  DEFAULT_DATE_SEPARATOR,
  ROC_START_YEAR,
  formatDateDisplay,
  isValidDateSeparator,
  parseDateValue
} from "../utils/date";
import { zhTW } from "date-fns/locale";
import "@vuepic/vue-datepicker/dist/main.css";
import { BUILT_IN_DEFAULTS } from "../utils/component-defaults";
import { useShuoComponentProps } from "../internal/useShuoComponentProps";
import { useControlSize } from "../internal/useControlSize";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  skeleton: { type: Boolean, required: false },
  modelValue: { type: null, required: false },
  start: { type: String, required: false },
  end: { type: String, required: false },
  clearable: { type: Boolean, required: false, default: BUILT_IN_DEFAULTS.datepicker.clearable },
  calendarIcon: { type: String, required: false, default: BUILT_IN_DEFAULTS.datepicker.calendarIcon },
  clearIcon: { type: String, required: false, default: BUILT_IN_DEFAULTS.datepicker.clearIcon },
  disabled: { type: Boolean, required: false, default: false },
  loading: { type: Boolean, required: false, default: false },
  range: { type: Boolean, required: false, default: () => false },
  id: { type: String, required: false },
  size: { type: null, required: false },
  state: { type: Boolean, required: false, default: void 0 },
  roc: { type: Boolean, required: false, default: BUILT_IN_DEFAULTS.datepicker.roc },
  mode: { type: String, required: false, default: "date" },
  minDate: { type: [Date, String, Number], required: false },
  maxDate: { type: [Date, String, Number], required: false },
  yearRange: { type: Array, required: false, default: () => [...BUILT_IN_DEFAULTS.datepicker.yearRange] },
  separator: { type: String, required: false, default: BUILT_IN_DEFAULTS.datepicker.separator }
});
const valueModel = defineModel({ type: null });
const startModel = defineModel("start", { type: String });
const endModel = defineModel("end", { type: String });
const instance = getCurrentInstance();
const appConfig = useAppConfig();
const {
  id: fieldId,
  name: fieldName,
  color: fieldColor,
  disabled: fieldDisabled,
  ariaAttrs,
  emitFormChange,
  emitFormFocus,
  emitFormBlur
} = useFormField(props);
const resolved = useShuoComponentProps("datepicker", props);
const calendarIcon = computed(() => resolved.calendarIcon);
const clearIcon = computed(() => resolved.clearIcon);
const controlSize = useControlSize("datepicker", props);
const display = tv({ base: "form-datepicker-display relative block w-full min-w-0" });
const messages = getShuoMessages();
const timeUnitLabel = (type) => messages.datepicker[type];
const MIN_DATE_MODES = ["date", "datetime", "datetime-second"];
const MIN_DATE_SEPARATORS = [DEFAULT_DATE_SEPARATOR, "-"];
const ariaLabels = {
  // 保留原生 label 的名稱，避免套件預設的英文 aria-label 蓋過外部標籤。
  input: void 0,
  menu: messages.datepicker.menu,
  calendarIcon: messages.datepicker.calendarIcon,
  clearInput: messages.datepicker.clearInput,
  toggleOverlay: messages.datepicker.toggleOverlay,
  monthPicker: () => messages.datepicker.monthPicker,
  yearPicker: () => messages.datepicker.yearPicker,
  nextMonth: messages.datepicker.nextMonth,
  prevMonth: messages.datepicker.prevMonth,
  nextYear: messages.datepicker.nextYear,
  prevYear: messages.datepicker.prevYear,
  openMonthsOverlay: messages.datepicker.openMonthsOverlay,
  openYearsOverlay: messages.datepicker.openYearsOverlay,
  openTimePicker: messages.datepicker.openTimePicker,
  closeTimePicker: messages.datepicker.closeTimePicker,
  timePicker: messages.datepicker.timePicker,
  openTpOverlay: (type) => formatMessage(messages.datepicker.openTpOverlay, { unit: timeUnitLabel(type) }),
  timeOverlay: (type) => formatMessage(messages.datepicker.timeOverlay, { unit: timeUnitLabel(type) }),
  incrementValue: (type) => formatMessage(messages.datepicker.incrementValue, { unit: timeUnitLabel(type) }),
  decrementValue: (type) => formatMessage(messages.datepicker.decrementValue, { unit: timeUnitLabel(type) })
};
let lastWarning = "";
let checkedRange = props.range;
let syncedEndpoints = "";
const picker = useTemplateRef("picker");
const tooltipRoot = useTemplateRef("tooltipRoot");
const isMenuOpen = ref(false);
const rocDisplay = computed(() => resolved.roc);
const showClear = computed(() => resolved.clearable);
const fieldState = computed(() => fieldColor.value === "error" ? false : props.state);
const separator = computed(
  () => isValidDateSeparator(resolved.separator) ? resolved.separator : DEFAULT_DATE_SEPARATOR
);
const hasTime = computed(() => props.mode === "datetime" || props.mode === "datetime-second");
const selectionFlow = computed(() => ({ steps: hasTime.value ? ["calendar", "time"] : [] }));
const timeConfig = computed(() => ({
  enableTimePicker: hasTime.value,
  enableSeconds: props.mode === "datetime-second",
  is24: true
}));
const effectiveYearRange = computed(() => [
  Math.max(resolved.yearRange[0], resolved.roc ? ROC_START_YEAR : resolved.yearRange[0]),
  resolved.yearRange[1]
]);
const effectiveMinDate = computed(() => {
  const date = toMinDate(props.minDate);
  const minimum = resolved.roc ? new Date(ROC_START_YEAR, 0, 1) : void 0;
  if (!date || !isValid(date)) return minimum;
  const result = minimum && date < minimum ? minimum : date;
  if (props.mode === "year") return startOfYear(result);
  if (props.mode === "month") return startOfMonth(result);
  return result;
});
const sourceValue = computed(() => {
  if (!props.range || hasMainModel()) return valueModel.value;
  return startModel.value ? [startModel.value, endModel.value] : null;
});
const validModelValue = computed(
  () => props.range ? serializeDatepickerRange(sourceValue.value, props.mode, resolved.roc, separator.value) : normalizeDatepickerValue(sourceValue.value, props.mode, resolved.roc, separator.value)
);
const firstValue = computed(
  () => Array.isArray(validModelValue.value) ? validModelValue.value[0] : validModelValue.value
);
const hasInvalidValue = computed(() => !isEmptyDatepickerValue(sourceValue.value) && !validModelValue.value);
const pickerValue = computed({
  get: () => {
    const value = validModelValue.value;
    return Array.isArray(value) ? value.map(toPickerValue) : toPickerValue(value);
  },
  set: (value) => {
    const result = props.range ? serializeDatepickerRange(value, props.mode, resolved.roc, separator.value) : serializeDatepickerValue(value, props.mode, resolved.roc, separator.value);
    if (props.range && value !== null && !result) return;
    valueModel.value = result ?? emptyValue();
    startModel.value = Array.isArray(result) ? result[0] : "";
    endModel.value = Array.isArray(result) ? result[1] : "";
    nextTick(emitFormChange);
    if (!hasTime.value && (!props.range || Array.isArray(result) && result[1])) {
      nextTick(() => picker.value?.closeMenu());
    }
  }
});
const tooltipText = computed(() => {
  const values = Array.isArray(validModelValue.value) ? validModelValue.value : [validModelValue.value];
  return values.map((value) => {
    const date = parseDatepickerValue(value, props.mode, separator.value);
    return date ? formatDisplay(date) : "";
  }).join(" \uFF5E ");
});
const emptyValue = () => props.range ? [] : "";
const hasMainModel = () => {
  const bindings = instance?.vnode.props ?? {};
  return Object.hasOwn(bindings, "modelValue") || Object.hasOwn(bindings, "model-value");
};
const warnCleared = (key, value, reason) => {
  const signature = JSON.stringify([key, value, reason]);
  if (signature === lastWarning) return false;
  lastWarning = signature;
  nextTick(() => lastWarning = "");
  console.warn(`[ShuoDatepicker] ${key} ${reason}\uFF0C\u5DF2\u6E05\u7A7A\uFF1A`, value);
  return true;
};
const toMinDate = (value) => {
  if (value === void 0) return null;
  if (typeof value !== "string") return new Date(value);
  for (const dateSeparator of MIN_DATE_SEPARATORS) {
    for (const mode of MIN_DATE_MODES) {
      const date = parseDateValue(value, mode, dateSeparator);
      if (date) return date;
    }
  }
  return null;
};
const toPickerValue = (value) => {
  const date = parseDatepickerValue(value, props.mode, separator.value);
  if (!date) return null;
  if (props.mode === "year") return date.getFullYear();
  if (props.mode === "month") return { year: date.getFullYear(), month: date.getMonth() };
  return date;
};
const validRange = (value) => getDatepickerValueIssue(value, { mode: props.mode, roc: resolved.roc, range: true, separator: separator.value }) ? null : serializeDatepickerRange(value, props.mode, resolved.roc, separator.value);
const formatYear = (year) => `${formatDateDisplay(String(year).padStart(4, "0"), { mode: "year", roc: resolved.roc })}\u5E74`;
const formatDisplay = (value) => {
  if (Array.isArray(value)) {
    return value.map((date) => date ? formatDatepickerDisplay(date, props.mode, resolved.roc) : "").join(" \uFF5E ");
  }
  return formatDatepickerDisplay(value, props.mode, resolved.roc);
};
const centerYear = async (menu) => {
  if (props.mode !== "year") return;
  await nextTick();
  requestAnimationFrame(() => {
    if (!menu.isConnected) return;
    const selectedDate = parseDatepickerValue(firstValue.value, props.mode, separator.value);
    const initialDate = selectedDate ?? (hasInvalidValue.value ? effectiveMinDate.value : void 0) ?? /* @__PURE__ */ new Date();
    const year = Math.min(
      effectiveYearRange.value[1],
      Math.max(effectiveYearRange.value[0], initialDate.getFullYear())
    );
    const option = menu.querySelector(`[data-datepicker-year="${year}"]`)?.closest('[role="option"]');
    const list = option?.closest('[role="listbox"]');
    if (!option || !list) return;
    const optionRect = option.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    list.scrollTop += optionRect.top - listRect.top - list.clientTop - (list.clientHeight - optionRect.height) / 2;
  });
};
const onMenuClosed = () => {
  isMenuOpen.value = false;
  setTimeout(() => {
    const active = document.activeElement;
    if (!active || active === document.body || active.closest(".form-datepicker-menu")) {
      tooltipRoot.value?.querySelector("input")?.focus({ preventScroll: true });
    }
  });
};
const syncBusy = () => {
  const input = tooltipRoot.value?.querySelector("input");
  if (props.loading) input?.setAttribute("aria-busy", "true");
  else input?.removeAttribute("aria-busy");
};
watch(
  () => resolved.separator,
  (value) => {
    if (!isValidDateSeparator(value)) console.warn('[ShuoDatepicker] separator \u7121\u6548\uFF0C\u6539\u7528\u9810\u8A2D "/"\uFF1A', value);
  },
  { immediate: true }
);
watch(
  () => props.range,
  (enabled) => {
    const value = valueModel.value;
    if (!hasMainModel() || Array.isArray(value) === enabled) return;
    const first = Array.isArray(value) ? value[0] : value;
    valueModel.value = enabled ? [] : first ?? "";
  }
);
watch(
  () => [props.range, props.mode, resolved.roc, separator.value, valueModel.value, startModel.value, endModel.value],
  () => {
    const rangeChanged = props.range !== checkedRange;
    checkedRange = props.range;
    const current = valueModel.value;
    const converting = current !== null && current !== void 0 && Array.isArray(current) !== props.range;
    if (rangeChanged && hasMainModel() && converting) return;
    const options = { mode: props.mode, roc: resolved.roc, range: props.range, separator: separator.value };
    if (hasMainModel()) {
      const value = valueModel.value;
      const issue = value === null || value === void 0 ? null : getDatepickerValueIssue(value, options);
      if (issue ? warnCleared("modelValue", value, issue) : value === null || value === void 0) {
        valueModel.value = emptyValue();
      }
      return;
    }
    if (!props.range) return;
    const single = { ...options, range: false };
    const checked = [startModel, endModel].map((model, index) => {
      const key = index === 0 ? "start" : "end";
      const value = model.value;
      const issue = value === null || value === void 0 ? null : getDatepickerValueIssue(value, single);
      if (issue ? warnCleared(key, value, issue) : value === null || value === void 0) model.value = "";
      return issue ? "" : value ?? "";
    });
    if (checked[0] && checked[1] && checked[0] > checked[1] && warnCleared("start\uFF0Fend", checked, "\u8D77\u8FC4\u76F8\u53CD")) {
      startModel.value = "";
      endModel.value = "";
    }
  },
  { immediate: true, deep: true }
);
watch(
  () => [props.range, valueModel.value, startModel.value, endModel.value],
  (next, previous) => {
    const mainChanged = !previous || next[0] !== previous[0] || JSON.stringify(next[1]) !== JSON.stringify(previous[1]);
    const partsMissing = [next[2], next[3]].some((value) => value === null || value === void 0);
    if (!props.range || hasMainModel() && (mainChanged || partsMissing)) {
      const values2 = props.range ? validRange(valueModel.value) : null;
      syncedEndpoints = JSON.stringify([values2?.[0] ?? "", values2?.[1] ?? ""]);
      startModel.value = values2?.[0] ?? "";
      endModel.value = values2?.[1] ?? "";
      return;
    }
    if (!previous || JSON.stringify([startModel.value, endModel.value]) === syncedEndpoints) return;
    const values = validRange([startModel.value, endModel.value]);
    if (!values && (startModel.value || endModel.value)) return;
    syncedEndpoints = JSON.stringify([values?.[0] ?? "", values?.[1] ?? ""]);
    const target = values ?? [];
    const current = isEmptyDatepickerValue(valueModel.value) ? [] : valueModel.value;
    if (JSON.stringify(target) !== JSON.stringify(current)) {
      valueModel.value = target;
    }
  },
  { immediate: true, deep: true }
);
watch(
  () => [ariaAttrs.value?.["aria-describedby"], tooltipRoot.value, props.mode, resolved.roc, props.range],
  () => {
    const input = tooltipRoot.value?.querySelector("input");
    const description = ariaAttrs.value?.["aria-describedby"];
    if (description) input?.setAttribute("aria-describedby", description);
    else input?.removeAttribute("aria-describedby");
  },
  { flush: "post" }
);
watch(
  () => props.skeleton || props.loading,
  (enabled) => {
    if (enabled) picker.value?.closeMenu();
  }
);
watch(() => [props.loading, props.mode, resolved.roc, props.range], syncBusy, { flush: "post" });
onMounted(syncBusy);
watch(
  () => [props.mode, resolved.roc, props.range],
  () => {
    isMenuOpen.value = false;
  }
);
const { isTruncated, measure, tooltipOpen, showTooltip } = useTruncatedText(
  tooltipRoot,
  tooltipText,
  ".form-datepicker-value"
);
</script>

<style>
@charset "UTF-8";
/* 選單會 teleport 至 body，因此使用專屬 class，避免依賴父層或 scoped 選擇器。 */
.form-datepicker-theme[class] {
  --dp-font-family: var(--font-sans);
  --dp-background-color: var(--ui-bg);
  --dp-text-color: var(--ui-text-highlighted);
  --dp-hover-color: var(--ui-bg-elevated);
  --dp-hover-text-color: var(--ui-text-highlighted);
  --dp-hover-icon-color: var(--ui-text);
  --dp-primary-color: var(--ui-primary);
  --dp-primary-text-color: var(--ui-text-inverted);
  --dp-primary-disabled-color: color-mix(in srgb, var(--ui-primary) 50%, transparent);
  /* 前後月份的日期保留顯示，使用較淡文字與當月區分。 */
  --dp-secondary-color: var(--ui-text-dimmed);
  --dp-border-color: var(--ui-form-border);
  --dp-menu-border-color: var(--ui-border);
  --dp-border-color-hover: var(--ui-form-border);
  --dp-border-color-focus: var(--ui-primary);
  --dp-disabled-color: var(--ui-form-disabled-bg);
  --dp-disabled-color-text: var(--ui-form-disabled-text);
  --dp-icon-color: var(--ui-text-dimmed);
  --dp-success-color: var(--ui-success);
  --dp-success-color-disabled: color-mix(in srgb, var(--ui-success) 50%, transparent);
  --dp-danger-color: var(--ui-error);
  --dp-marker-color: var(--ui-primary);
  --dp-tooltip-color: var(--ui-bg-elevated);
  --dp-highlight-color: color-mix(in srgb, var(--ui-primary) 10%, transparent);
  --dp-scroll-bar-background: var(--ui-bg-muted);
  --dp-scroll-bar-color: var(--ui-border-accented);
  --dp-border-radius: calc(var(--ui-radius) * 1.5);
  --dp-cell-border-radius: calc(var(--ui-radius) * 1.5);
  --dp-font-size: var(--datepicker-font-size);
  --dp-preview-font-size: 0.75rem;
  /* 日曆圖示在尾端，文字固定從左內距開始；極窄時讓右側留白縮至剩餘寬度，文字區歸零而不撐開外框。 */
  --dp-input-padding: 0 clamp(0px, calc(100% - var(--datepicker-padding)), var(--datepicker-end-space)) 0
    var(--datepicker-padding);
  --dp-input-icon-padding: var(--datepicker-padding);
  --dp-input-not-clearable-padding: clamp(0px, calc(100% - var(--datepicker-padding)), var(--datepicker-end-space));
  --dp-cell-size: min(var(--datepicker-cell-size), calc((100vw - 3rem) / 7));
  --dp-menu-min-width: calc(var(--dp-cell-size) * 7 + 2rem);
  --dp-button-height: var(--dp-cell-size);
  --dp-month-year-row-height: var(--dp-cell-size);
  --dp-month-year-row-button-size: var(--dp-cell-size);
  --dp-button-icon-height: var(--datepicker-icon-size);
  --dp-menu-padding: 0.5rem;
  --dp-row-margin: 0.25rem 0;
  --dp-action-row-padding: 0.75rem;
  --dp-common-transition: background-color 0.15s, color 0.15s, box-shadow 0.15s;
}

/* 日期輸入框：尺寸變數、輸入區與尾端圖示。 */
.form-datepicker {
  width: 100%;
  min-width: 0;
  /* 輸入高度、字級與圖示空間對應 Nuxt UI 的 xs / sm / md / lg / xl。 */
}
.form-datepicker--xs {
  --datepicker-height: 1.5rem;
  --datepicker-font-size: 0.875rem;
  --datepicker-padding: 0.5rem;
  --datepicker-icon-size: 1rem;
  --datepicker-icon-space: 1.75rem;
  --datepicker-cell-size: 1.75rem;
}
.form-datepicker--sm {
  --datepicker-height: 1.75rem;
  --datepicker-font-size: 0.875rem;
  --datepicker-padding: 0.625rem;
  --datepicker-icon-size: 1rem;
  --datepicker-icon-space: 2rem;
  --datepicker-cell-size: 1.875rem;
}
.form-datepicker--md {
  --datepicker-height: 2rem;
  --datepicker-font-size: 1rem;
  --datepicker-padding: 0.625rem;
  --datepicker-icon-size: 1.25rem;
  --datepicker-icon-space: 2.25rem;
  --datepicker-cell-size: 2rem;
}
.form-datepicker--lg {
  --datepicker-height: 2.25rem;
  --datepicker-font-size: 1rem;
  --datepicker-padding: 0.75rem;
  --datepicker-icon-size: 1.25rem;
  --datepicker-icon-space: 2.5rem;
  --datepicker-cell-size: 2.25rem;
}
.form-datepicker--xl {
  --datepicker-height: 2.5rem;
  --datepicker-font-size: 1rem;
  --datepicker-padding: 0.75rem;
  --datepicker-icon-size: 1.5rem;
  --datepicker-icon-space: 2.75rem;
  --datepicker-cell-size: 2.5rem;
}
@media (min-width: 48rem) {
  .form-datepicker--xs, .form-datepicker--sm {
    --datepicker-font-size: 0.75rem;
  }
  .form-datepicker--md, .form-datepicker--lg {
    --datepicker-font-size: 0.875rem;
  }
}
.form-datepicker .dp--input {
  --datepicker-ring: var(--ui-form-border);
  /* 移除 inline input 的基線空隙，xs 才能與 UInput 精確等高。 */
  display: block;
  height: var(--datepicker-height);
  min-width: 0;
  border: 0;
  outline: none;
  cursor: default;
  color: transparent;
  caret-color: transparent;
  box-shadow: inset 0 0 0 1px var(--datepicker-ring);
  text-overflow: ellipsis;
  /* 焦點立即套用主題色，避免 outline 從預設 currentColor 漸變而閃黑。 */
  transition: none;
  /* Tab 的原生文字選取不可透出，輔助工具仍可讀取 input 的日期值。 */
}
.form-datepicker .dp--input::selection {
  color: transparent;
  background: transparent;
}
.form-datepicker .dp--input::placeholder {
  color: var(--ui-text-dimmed);
  opacity: 1;
}
.form-datepicker .dp--input:is(:focus, .dp--input-focus) {
  --datepicker-ring: var(--ui-primary);
  outline: 3px solid color-mix(in srgb, var(--datepicker-ring) 25%, transparent);
  outline-offset: 0;
}
.form-datepicker .dp--input {
  /* 驗證色涵蓋一般與 focus 狀態，避免聚焦時錯誤提示被主題色蓋過。 */
}
.form-datepicker .dp--input.dp--input-invalid {
  --datepicker-ring: var(--ui-error);
}
.form-datepicker .dp--input.dp--input-valid {
  --datepicker-ring: var(--ui-success);
}
.form-datepicker .dp--input:disabled {
  --datepicker-ring: var(--ui-form-disabled-border);
  cursor: not-allowed;
  background-color: var(--ui-form-disabled-bg);
  opacity: 1;
}
.form-datepicker {
  /* 與 SelectMenu 一致：整個輸入區 hover 變灰，包含圖示與清除按鈕所在區域。 */
}
.form-datepicker .dp--input-wrap:hover .dp--input:not(:disabled) {
  background-color: var(--ui-bg-elevated);
}
.form-datepicker :is(.dp--input-icon, .dp--clear-btn) {
  cursor: default;
}
.form-datepicker {
  /* 圖示本身不加內距，避免 CSS mask 圖示延伸到內距區域。 */
}
.form-datepicker .form-datepicker-icon {
  display: block;
  width: var(--datepicker-icon-size);
  height: var(--datepicker-icon-size);
}
.form-datepicker {
  /* 日曆圖示移到尾端，與 SelectMenu 的箭頭位置一致；左右內距放在外層。 */
}
.form-datepicker .dp--input-icon {
  display: flex;
  padding: 0 var(--datepicker-padding);
  inset-inline-start: auto;
  inset-inline-end: 0;
}
.form-datepicker .dp--clear-btn {
  /* 點擊與焦點範圍集中在圖示周圍，保留原本的圖示中心位置。 */
  width: calc(var(--datepicker-icon-size) + 0.25rem);
  height: calc(var(--datepicker-icon-size) + 0.25rem);
  inset-inline-end: calc(var(--datepicker-padding) + var(--datepicker-icon-size) + 0.375rem);
  justify-content: center;
  border-radius: var(--dp-border-radius);
  /* 自訂清除按鈕填滿外層，點擊與焦點範圍不變。 */
}
.form-datepicker .dp--clear-btn .form-datepicker-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  cursor: default;
}
.form-datepicker .dp--clear-btn:hover {
  color: var(--ui-text);
  background: transparent;
}

/* 文字層不接收滑鼠事件，點擊仍由底下的日期輸入框處理。 */
.form-datepicker-display {
  /* 尾端保留日曆圖示空間；有清除按鈕時再加一格，清除按鈕位於日曆圖示左側。 */
  --datepicker-end-space: var(--datepicker-icon-space);
}
.form-datepicker-display:has(.dp--clear-btn) {
  --datepicker-end-space: calc(var(--datepicker-icon-space) + var(--datepicker-icon-size) + 0.5rem);
}
.form-datepicker-display:has(input:disabled) .form-datepicker-value,
.form-datepicker-display:has(input:disabled) .dp--input-icon {
  color: var(--ui-form-disabled-text);
}

.form-datepicker-loading {
  position: absolute;
  top: 50%;
  right: var(--datepicker-padding);
  width: var(--datepicker-icon-size);
  height: var(--datepicker-icon-size);
  transform: translateY(-50%);
  color: var(--ui-text-dimmed);
  pointer-events: none;
}

.form-datepicker--loading .dp--input-icon {
  visibility: hidden;
}

.form-datepicker-value {
  position: absolute;
  top: 50%;
  left: min(var(--datepicker-padding), 100%);
  width: max(0px, 100% - var(--datepicker-padding) - var(--datepicker-end-space));
  transform: translateY(-50%);
  overflow: hidden;
  color: var(--ui-text-highlighted);
  font-size: var(--datepicker-font-size);
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
}

/* 日曆選單：teleport 至 body，不能巢狀放在輸入框內。 */
.form-datepicker-menu.dp--menu {
  max-width: calc(100vw - 1rem);
  max-height: calc(100dvh - 1rem);
  overflow: auto;
  box-shadow: var(--shadow-lg);
}
.form-datepicker-menu {
  /* translateY(0) 仍會建立定位容器，使底部箭頭撐出捲軸；彈出動畫只改透明度。 */
}
.form-datepicker-menu:is(.dp-menu-appear-top-enter-active,
.dp-menu-appear-top-leave-active,
.dp-menu-appear-bottom-enter-active,
.dp-menu-appear-bottom-leave-active) {
  transform: none;
  transition: opacity var(--dp-animation-duration) var(--dp-transition-timing);
}
.form-datepicker-menu .dp--calendar-header {
  color: var(--ui-text-muted);
  font-weight: 500;
}
.form-datepicker-menu .dp--calendar:is(.calendar-next-enter-active,
.calendar-next-leave-active,
.calendar-prev-enter-active,
.calendar-prev-leave-active) {
  transform: none;
  transition: opacity var(--dp-animation-duration) var(--dp-transition-timing);
}
.form-datepicker-menu .dp--inner-nav {
  border-radius: var(--dp-border-radius);
}
.form-datepicker-menu .dp--active:hover {
  background: color-mix(in srgb, var(--ui-primary) 75%, transparent);
  color: var(--ui-text-inverted);
}
.form-datepicker-menu :is(.dp--cell-disabled, .dp--overlay-cell-disabled) {
  color: var(--ui-text-dimmed);
  opacity: 0.5;
}
.form-datepicker-menu .dp--action-row {
  gap: 0.75rem;
  border-top: 1px solid var(--ui-border);
}
.form-datepicker-menu .dp--selection-preview {
  min-width: 0;
  color: var(--ui-text-muted);
}

/* 日曆日期、月份／年份、導覽與清除按鈕都保留鍵盤焦點提示。 */
.form-datepicker-menu :is(button, [tabindex]):focus-visible,
.form-datepicker .form-datepicker-clear:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .form-datepicker-theme[class] {
    --dp-common-transition: none;
    --dp-animation-duration: 0s;
  }
  .form-datepicker .dp--input {
    transition: none;
  }
}
</style>
