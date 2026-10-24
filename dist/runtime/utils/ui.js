export const mergeSlotClass = (builtin, value) => {
  if (!builtin) return value;
  if (value === void 0 || value === null || value === "") return builtin;
  if (typeof value === "function") return (defaults) => value(defaults ? `${defaults} ${builtin}` : builtin);
  return [builtin, value];
};
export const mergeUi = (builtin, ui) => {
  const result = { ...ui };
  for (const [key, value] of Object.entries(builtin)) {
    result[key] = mergeSlotClass(value, result[key]);
  }
  return result;
};
