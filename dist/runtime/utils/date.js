import { format, isValid, parse } from "date-fns";
export const DATE_MODEL_FORMATS = {
  /** 年 */
  "year": "yyyy",
  /** 年月 */
  "month": "yyyy/MM",
  /** 年月日 */
  "date": "yyyy/MM/dd",
  /** 年月日時分 */
  "datetime": "yyyy/MM/dd HH:mm",
  /** 年月日時分秒 */
  "datetime-second": "yyyy/MM/dd HH:mm:ss"
};
export const ROC_START_YEAR = 1911;
export const DEFAULT_DATE_SEPARATOR = "/";
export const isValidDateSeparator = (separator) => typeof separator === "string" && separator.length > 0 && !/[\d\s:']/.test(separator);
export const getDateModelFormat = (mode, separator = DEFAULT_DATE_SEPARATOR) => separator === DEFAULT_DATE_SEPARATOR ? DATE_MODEL_FORMATS[mode] : DATE_MODEL_FORMATS[mode].replaceAll("/", `'${separator}'`);
export const parseDateValue = (value, mode, separator = DEFAULT_DATE_SEPARATOR) => {
  if (!value) return null;
  const pattern = getDateModelFormat(mode, separator);
  const date = parse(value, pattern, new Date(2e3, 0, 1));
  return isValid(date) && format(date, pattern) === value ? date : null;
};
export const formatDateDisplay = (value, { mode = "date", roc = true, yearMonthLabels = false } = {}) => {
  const normalized = value instanceof Date ? value : value?.replace(
    /^(\d{4})-(\d{2})(?:-(\d{2}))?/,
    (_, year2, month, day) => day ? `${year2}/${month}/${day}` : `${year2}/${month}`
  );
  const date = normalized instanceof Date ? normalized : parseDateValue(normalized, mode);
  if (!date || !isValid(date) || roc && date.getFullYear() < ROC_START_YEAR) return "";
  const year = roc ? String(date.getFullYear() - ROC_START_YEAR) : format(date, "yyyy");
  if (mode === "year") return yearMonthLabels ? `${year} \u5E74` : year;
  if (mode === "month" && yearMonthLabels) return `${year} \u5E74 ${format(date, "MM")} \u6708`;
  return `${year}${format(date, DATE_MODEL_FORMATS[mode].slice(4))}`;
};
