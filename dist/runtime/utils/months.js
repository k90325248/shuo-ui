export const splitMonths = (value) => {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) return null;
  return { total: value, year: Math.floor(value / 12), month: value % 12 };
};
export const combineMonths = (year, month) => {
  if (year == null && month == null) return null;
  const years = year ?? 0;
  const months = month ?? 0;
  if (!Number.isSafeInteger(years) || years < 0 || !Number.isSafeInteger(months) || months < 0) return null;
  return splitMonths(years * 12 + months);
};
