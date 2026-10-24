import { format, isValid } from "date-fns";
import {
  DATE_MODEL_FORMATS,
  DEFAULT_DATE_SEPARATOR,
  ROC_START_YEAR,
  formatDateDisplay,
  getDateModelFormat,
  parseDateValue
} from "./date.js";
export const isEmptyDatepickerValue = (value) => value === null || value === void 0 || value === "" || Array.isArray(value) && value.length === 0;
export const DATEPICKER_MODEL_FORMATS = DATE_MODEL_FORMATS;
export const parseDatepickerValue = parseDateValue;
export const formatDatepickerDisplay = (date, mode, roc) => formatDateDisplay(date, { mode, roc, yearMonthLabels: true });
export const normalizeDatepickerValue = (value, mode, roc, separator = DEFAULT_DATE_SEPARATOR) => {
  const candidate = mode === "year" && typeof value === "number" ? String(value).padStart(4, "0") : value;
  if (typeof candidate !== "string") return null;
  const date = parseDatepickerValue(candidate, mode, separator);
  return date && (!roc || date.getFullYear() >= ROC_START_YEAR) ? candidate : null;
};
export const serializeDatepickerValue = (value, mode, roc, separator = DEFAULT_DATE_SEPARATOR) => {
  if (value instanceof Date) {
    if (!isValid(value)) return null;
    return normalizeDatepickerValue(format(value, getDateModelFormat(mode, separator)), mode, roc, separator);
  }
  if (mode === "month" && value && typeof value === "object" && "year" in value && "month" in value) {
    const year = Number(value.year);
    const month = Number(value.month);
    if (!Number.isInteger(year) || !Number.isInteger(month) || month < 0 || month > 11) return null;
    return normalizeDatepickerValue(
      `${String(year).padStart(4, "0")}${separator}${String(month + 1).padStart(2, "0")}`,
      mode,
      roc,
      separator
    );
  }
  return normalizeDatepickerValue(value, mode, roc, separator);
};
export const serializeDatepickerRange = (value, mode, roc, separator = DEFAULT_DATE_SEPARATOR) => {
  if (!Array.isArray(value)) return null;
  const start = serializeDatepickerValue(value[0], mode, roc, separator);
  const end = serializeDatepickerValue(value[1], mode, roc, separator);
  if (!start || !end) return null;
  return start > end ? [end, start] : [start, end];
};
export const getDatepickerValueIssue = (value, { mode, roc, range, separator }) => {
  const isDate = (item) => typeof item === "string" && normalizeDatepickerValue(item, mode, roc, separator) === item;
  if (!range) return value === "" || isDate(value) ? null : "\u683C\u5F0F\u4E0D\u7B26";
  if (!Array.isArray(value)) return "\u683C\u5F0F\u4E0D\u7B26";
  if (value.length === 0) return null;
  if (value.length !== 2 || !isDate(value[0]) || !isDate(value[1])) return "\u683C\u5F0F\u4E0D\u7B26";
  return value[0] > value[1] ? "\u8D77\u8FC4\u76F8\u53CD" : null;
};
