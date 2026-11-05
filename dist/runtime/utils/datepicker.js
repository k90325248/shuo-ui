import { format, isValid } from "date-fns";
import {
  DATE_MODEL_FORMATS,
  DEFAULT_DATE_SEPARATOR,
  ROC_START_YEAR,
  formatDateDisplay,
  getDateModelFormat,
  parseDateValue
} from "./date.js";
import { formatMessage } from "./messages.js";
export const isEmptyDatepickerValue = (value) => value === null || value === void 0 || value === "" || Array.isArray(value) && value.length === 0;
export const DATEPICKER_MODEL_FORMATS = DATE_MODEL_FORMATS;
export const parseDatepickerValue = parseDateValue;
export const DEFAULT_WEEK_START = 0;
export const isValidWeekStart = (value) => typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 6;
export const DATEPICKER_WEEKDAY_MODES = ["date", "datetime", "datetime-second"];
export const formatDatepickerWeekday = (display, date, mode, labels) => {
  if (!display || !DATEPICKER_WEEKDAY_MODES.includes(mode) || !isValid(date)) return display;
  const day = date.getDay();
  const weekday = labels.weekdays[day] ?? String(day);
  const spaceIndex = display.indexOf(" ");
  const datePart = spaceIndex === -1 ? display : display.slice(0, spaceIndex);
  const timePart = spaceIndex === -1 ? "" : display.slice(spaceIndex);
  return `${formatMessage(labels.weekday, { date: datePart, weekday })}${timePart}`;
};
export const formatDatepickerDisplay = (date, mode, roc, labels = true, displaySeparator = DEFAULT_DATE_SEPARATOR) => {
  const text = formatDateDisplay(date, { mode, roc, yearMonthLabels: labels });
  if (displaySeparator === DEFAULT_DATE_SEPARATOR || !DATEPICKER_WEEKDAY_MODES.includes(mode)) return text;
  const spaceIndex = text.indexOf(" ");
  const datePart = spaceIndex === -1 ? text : text.slice(0, spaceIndex);
  return datePart.replaceAll(DEFAULT_DATE_SEPARATOR, displaySeparator) + (spaceIndex === -1 ? "" : text.slice(spaceIndex));
};
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
