<template>
  <div
    v-skeleton="skeleton"
    v-bind="{ ...$attrs, class: void 0 }"
    data-slot="root"
    :class="[`form-phone form-phone--${controlSize}`, styles.root({ class: [ui?.root, $attrs.class] })]"
    role="group"
    :aria-busy="loading || void 0"
  >
    <!-- 區碼 -->
    <UInput
      :id="controlId"
      :model-value="areaCode ?? ''"
      v-bind="inputProps"
      :ui="areaCodeUi"
      type="tel"
      inputmode="numeric"
      :aria-label="messages.phone.areaCode"
      @input.capture="filterDigits"
      @update:model-value="updateValue($event, 'areaCode')"
      @blur="emitFormBlur"
      @focus="emitFormFocus"
      @change="emitFormChange"
    />

    <!-- 電話號碼；載入中圖示顯示在此欄最右側 -->
    <UInput
      :id="`${controlId}-number`"
      :model-value="number ?? ''"
      v-bind="inputProps"
      :loading="loading"
      trailing
      :ui="numberUi"
      type="tel"
      inputmode="numeric"
      :aria-label="messages.phone.number"
      @input.capture="filterDigits"
      @update:model-value="updateValue($event, 'number')"
      @blur="emitFormBlur"
      @focus="emitFormFocus"
      @change="emitFormChange"
    />
  </div>
</template>

<script setup>
import { tv } from "@nuxt/ui/utils/tv";
import { mergeUi } from "../utils/ui";
import { useFormField } from "@nuxt/ui/composables";
import { getShuoMessages } from "../utils/messages";
import { vSkeleton } from "../directives/skeleton";
import { filterPhoneInput, joinPhone, splitPhone } from "../utils/phone";
import { useControlSize } from "../internal/useControlSize";
const theme = tv({
  slots: { root: "flex w-full min-w-0 items-center gap-2 text-base" },
  variants: { size: { xs: { root: "text-sm" }, sm: { root: "text-sm" }, md: "", lg: "", xl: "" } }
});
const AREA_CODE_UI = {
  root: "w-[min(calc(3ch_+_var(--phone-input-padding)_+_2px),calc((100%_-_0.5rem)_/_2))] min-w-0 flex-none",
  base: "text-center tabular-nums"
};
const NUMBER_UI = { root: "min-w-0 flex-1", base: "tabular-nums" };
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
const messages = getShuoMessages();
const modelValue = defineModel({ type: String });
const areaCode = defineModel("areaCode", { type: String });
const number = defineModel("number", { type: String });
const generatedId = useId();
const {
  id: fieldId,
  color: fieldColor,
  highlight: fieldHighlight,
  disabled: fieldDisabled,
  ariaAttrs,
  emitFormInput,
  emitFormBlur,
  emitFormFocus,
  emitFormChange
} = useFormField(props);
let synced = [];
const controlId = computed(() => fieldId.value ?? generatedId);
const controlSize = useControlSize("phone", props);
const styles = computed(() => theme({ size: controlSize.value }));
const areaCodeUi = computed(() => mergeUi(AREA_CODE_UI, props.ui?.areaCode));
const numberUi = computed(() => mergeUi(NUMBER_UI, props.ui?.number));
const inputProps = computed(() => ({
  ...ariaAttrs.value,
  size: controlSize.value,
  color: fieldColor.value,
  highlight: fieldHighlight.value,
  disabled: props.loading || fieldDisabled.value
}));
const filterDigits = (event) => {
  const input = event.target;
  const result = filterPhoneInput(input.value, input.selectionStart ?? input.value.length);
  if (input.value === result.value) return;
  input.value = result.value;
  input.setSelectionRange(result.cursor, result.cursor);
};
const applyParts = (area, phoneNumber) => {
  const full = joinPhone(area, phoneNumber);
  synced = [full, area, phoneNumber];
  areaCode.value = area;
  number.value = phoneNumber;
  modelValue.value = full;
};
const updateValue = async (value, part) => {
  if (props.skeleton || props.loading || fieldDisabled.value) return;
  const digits = filterPhoneInput(String(value ?? "")).value;
  applyParts(part === "areaCode" ? digits : areaCode.value, part === "number" ? digits : number.value);
  await nextTick();
  emitFormInput();
};
const normalize = (value, key) => {
  if (typeof value === "string") return value;
  if (value !== null && value !== void 0) console.warn(`[ShuoPhone] ${key} \u578B\u5225\u4E0D\u7B26\uFF0C\u5DF2\u6E05\u7A7A\uFF1A`, value);
  return "";
};
watch(
  [modelValue, areaCode, number],
  (values) => {
    if (synced.length && values.every((value, index) => value === synced[index])) return;
    const [full, area, phoneNumber] = [
      normalize(values[0], "modelValue"),
      normalize(values[1], "areaCode"),
      normalize(values[2], "number")
    ];
    const fullChanged = synced.length ? values[0] !== synced[0] : !!full || values[0] !== void 0 && values[0] !== null;
    if (fullChanged) {
      const parts = splitPhone(full, area);
      applyParts(parts.areaCode, parts.number);
    } else {
      applyParts(area, phoneNumber);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.form-phone {
  --phone-input-padding: 1.5rem;
}
.form-phone--xs {
  --phone-input-padding: 1rem;
}
.form-phone--sm, .form-phone--md {
  --phone-input-padding: 1.25rem;
}
</style>
