export const getDecimalPlaces = (decimal) => {
  if (decimal === true) return void 0;
  if (decimal === false) return 0;
  return Number.isSafeInteger(decimal) && decimal >= 0 ? Math.min(decimal, 100) : 0;
};
export const toNumberText = (value) => {
  if (value == null || !Number.isFinite(value)) return "";
  const text = String(value);
  if (!/[eE]/.test(text)) return text;
  const [coefficient = "", exponent = "0"] = text.split(/[eE]/);
  const sign = coefficient.startsWith("-") ? "-" : "";
  const unsigned = coefficient.replace(/^-/, "");
  const point = (unsigned.indexOf(".") === -1 ? unsigned.length : unsigned.indexOf(".")) + Number(exponent);
  const digits = unsigned.replace(".", "");
  if (point <= 0) return `${sign}0.${"0".repeat(-point)}${digits}`;
  if (point >= digits.length) return `${sign}${digits}${"0".repeat(point - digits.length)}`;
  return `${sign}${digits.slice(0, point)}.${digits.slice(point)}`;
};
export const formatNumberDisplay = (value, decimal = true, thousandSeparator = true) => {
  if (value == null || !Number.isFinite(value)) return "";
  const places = getDecimalPlaces(decimal);
  let text = places === void 0 ? toNumberText(value) : value.toFixed(places);
  if (/[eE]/.test(text)) {
    text = toNumberText(value);
    if (places) text += `.${"0".repeat(places)}`;
  }
  const [integer = "", fraction] = text.split(".");
  const grouped = thousandSeparator ? integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : integer;
  return fraction === void 0 ? grouped : `${grouped}.${fraction}`;
};
