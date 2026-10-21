<template>
  <div
    v-skeleton="skeleton"
    v-bind="$attrs"
    class="form-phone flex w-full min-w-0 items-center gap-2"
    :class="`form-phone--${controlSize}`"
    role="group"
    :aria-busy="loading || void 0"
  >
    <!-- 區碼 -->
    <UInput
      :id="controlId"
      :model-value="areaCode ?? ''"
      v-bind="inputProps"
      class="form-phone-area"
      :ui="{ base: 'text-center tabular-nums' }"
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
      class="min-w-0 flex-1"
      :ui="{ base: 'tabular-nums' }"
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
import { useFormField } from "@nuxt/ui/composables";
import { getShuoMessages } from "../utils/messages";
import { vSkeleton } from "../directives/skeleton";
import { filterPhoneInput, joinPhone, splitPhone } from "../utils/phone";
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
const messages = getShuoMessages();
const modelValue = defineModel({ type: String });
const areaCode = defineModel("areaCode", { type: String });
const number = defineModel("number", { type: String });
const generatedId = useId();
const {
  id: fieldId,
  size: fieldSize,
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
const controlSize = computed(() => fieldSize.value ?? "lg");
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
  font-size: 1rem;
}
.form-phone--xs {
  --phone-input-padding: 1rem;
  font-size: 0.875rem;
}
.form-phone--sm {
  --phone-input-padding: 1.25rem;
  font-size: 0.875rem;
}
.form-phone--md {
  --phone-input-padding: 1.25rem;
}
.form-phone .form-phone-area {
  width: min(3ch + var(--phone-input-padding) + 2px, (100% - 0.5rem) / 2);
  min-width: 0;
  flex: none;
}
</style>
