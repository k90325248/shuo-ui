import { getByPath } from "../utils/get-by-path.js";
const NON_OPTION_TYPES = /* @__PURE__ */ new Set(["label", "separator"]);
const firstObjectOption = (items) => items.flatMap((item) => Array.isArray(item) ? item : [item]).find(
  (item) => typeof item === "object" && item !== null && !NON_OPTION_TYPES.has(String(item.type))
);
export const findMissingOptionKeys = (items, labelKey, valueKey) => {
  const option = firstObjectOption(items);
  if (!option) return [];
  return [.../* @__PURE__ */ new Set([labelKey, valueKey])].filter((key) => getByPath(option, key) === void 0);
};
export const describeOptionKeySource = (name, key, source) => {
  if (source === "explicit") return "\u660E\u78BA\u50B3\u5165";
  if (source === "global") return `\u5168\u7AD9\u8A2D\u5B9A components.${name}.${key}`;
  return void 0;
};
export const warnMissingOptionKeys = (component, items, labelKey, valueKey, warned, warn = console.warn, sources = {}) => {
  const pair = `${labelKey}\0${valueKey}`;
  if (warned.has(pair)) return;
  const missing = findMissingOptionKeys(items, labelKey, valueKey);
  if (!missing.length) return;
  warned.add(pair);
  const props = missing.map((key) => key === labelKey ? "labelKey" : "valueKey");
  const fields = missing.map((key, index) => `${key}\uFF08${props[index]}\uFF09`).join("\u3001");
  const notes = props.filter((prop) => sources[prop]).map((prop) => `${prop} \u70BA${sources[prop]}`);
  const origin = notes.length ? `\uFF08\u4F86\u6E90\uFF1A${notes.join("\u3001")}\uFF09` : "";
  warn(`[${component}] \u9078\u9805\u6C92\u6709 ${fields}\u6B04\u4F4D${origin}\uFF0C\u8ACB\u78BA\u8A8D label-key\u3001value-key \u8207\u9078\u9805\u8CC7\u6599\u4E00\u81F4\u3002`);
};
