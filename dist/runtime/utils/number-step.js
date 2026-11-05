import Decimal from "decimal.js";
import { getDecimalPlaces } from "./number.js";
const isFiniteNumber = (value) => typeof value === "number" && Number.isFinite(value);
export const countDecimalPlaces = (value) => new Decimal(value).decimalPlaces();
export const resolveNumberStep = (step, decimal, min, max) => {
  const warnings = [];
  const places = getDecimalPlaces(decimal);
  let value = 1;
  if (step !== void 0 && (!isFiniteNumber(step) || step <= 0)) {
    warnings.push(`step \u9808\u70BA\u5927\u65BC 0 \u7684\u6578\u5B57\uFF0C\u6539\u7528 1\uFF1A${String(step)}`);
  } else if (step !== void 0) {
    value = step;
  }
  if (places !== void 0 && countDecimalPlaces(value) > places) {
    const unit = new Decimal(10).pow(-places);
    const rounded = Decimal.max(unit, new Decimal(value).toDecimalPlaces(places, Decimal.ROUND_HALF_UP)).toNumber();
    warnings.push(`step ${value} \u7684\u5C0F\u6578\u4F4D\u6578\u8D85\u904E decimal \u5141\u8A31\u7684 ${places} \u4F4D\uFF0C\u6539\u7528 ${rounded}`);
    value = rounded;
  }
  let lower = isFiniteNumber(min) ? min : void 0;
  let upper = isFiniteNumber(max) ? max : void 0;
  if (min !== void 0 && lower === void 0) warnings.push(`min \u4E0D\u662F\u6709\u6548\u6578\u5B57\uFF0C\u5DF2\u5FFD\u7565\uFF1A${String(min)}`);
  if (max !== void 0 && upper === void 0) warnings.push(`max \u4E0D\u662F\u6709\u6548\u6578\u5B57\uFF0C\u5DF2\u5FFD\u7565\uFF1A${String(max)}`);
  if (lower !== void 0 && upper !== void 0 && lower > upper) {
    warnings.push(`min ${lower} \u5927\u65BC max ${upper}\uFF0C\u5DF2\u5FFD\u7565\u7BC4\u570D\u9650\u5236`);
    lower = void 0;
    upper = void 0;
  }
  return { step: value, min: lower, max: upper, places, warnings };
};
export const clampNumber = (value, min, max) => {
  if (max !== void 0 && value > max) return max;
  if (min !== void 0 && value < min) return min;
  return value;
};
export const canStepNumber = (value, direction, min, max) => {
  if (value == null) return true;
  if (direction > 0) return max === void 0 || value < max;
  return min === void 0 || value > min;
};
export const stepNumber = (value, count, options) => {
  const { step, min, max, places } = options;
  let result = value == null ? new Decimal(min ?? 0) : new Decimal(value).plus(new Decimal(step).times(count));
  if (places !== void 0) result = result.toDecimalPlaces(places, Decimal.ROUND_HALF_UP);
  return clampNumber(result.toNumber(), min, max);
};
