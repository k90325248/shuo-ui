export const filterPhoneInput = (value, cursor = value.length) => ({
  value: value.replace(/\D/g, ""),
  cursor: value.slice(0, Math.max(0, Math.min(cursor, value.length))).replace(/\D/g, "").length
});
export const joinPhone = (areaCode, number) => areaCode === void 0 && number === void 0 ? void 0 : `${areaCode ?? ""}${number ?? ""}`;
export const splitPhone = (value, areaCode) => {
  if (value === void 0 || value === "") return { areaCode: value, number: value };
  if (areaCode && value.startsWith(areaCode)) return { areaCode, number: value.slice(areaCode.length) };
  return { areaCode: "", number: value };
};
