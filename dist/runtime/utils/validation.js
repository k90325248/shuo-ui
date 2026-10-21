import * as v from "valibot";
import { formatMessage, getShuoMessages } from "./messages.js";
const message = (key, label, min) => formatMessage(getShuoMessages().validation[key], { label, min: min ?? "" });
export const requiredText = (label) => {
  const requiredMessage = message("required", label);
  const text = v.string(requiredMessage);
  return v.pipe(
    v.nullish(text),
    text,
    v.check((value) => value.trim().length > 0, requiredMessage)
  );
};
export const requiredNumber = (label) => {
  const number = v.custom((value) => typeof value === "number", message("required", label));
  return v.pipe(v.nullish(number), number, v.finite(message("invalidNumber", label)));
};
export const requiredArray = (label, itemSchema) => {
  const requiredMessage = message("required", label);
  const array = v.array(itemSchema, requiredMessage);
  return v.pipe(v.nullish(array), array, v.minLength(1, requiredMessage));
};
export const optionalEmail = (label) => v.union([v.literal(""), v.pipe(v.string(), v.email(message("invalidFormat", label)))]);
export const optionalNonNegativeNumber = (label) => {
  const invalidMessage = message("invalidNumber", label);
  return v.nullable(
    v.pipe(v.number(invalidMessage), v.finite(invalidMessage), v.minValue(0, message("minValue", label, 0)))
  );
};
