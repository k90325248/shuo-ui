import { getDecimalPlaces } from "./number.ts";
export const isNumberDraft = (text, decimal) => {
  const places = getDecimalPlaces(decimal);
  if (!/^[+-]?\d*(?:\.\d*)?$/.test(text)) return false;
  if (places === 0 && text.includes(".")) return false;
  if (places !== void 0 && (text.split(".")[1]?.length ?? 0) > places) return false;
  return !/\d/.test(text) || Number.isFinite(Number(text));
};
export const mapNumberInputPosition = (formatted, position, editable) => {
  return Math.min(formatted.slice(0, position).replaceAll(",", "").length, editable.length);
};
