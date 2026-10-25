import { COMPONENT_DEFAULT_KEYS } from "../types/component-defaults.js";
import { DEFAULT_DATE_SEPARATOR } from "./date.js";
export const BUILT_IN_DEFAULTS = {
  inputText: { size: "lg", hideMaskToggle: false, revealIcon: "i-lucide-eye", concealIcon: "i-lucide-eye-off" },
  inputNumber: { size: "lg", unit: false, thousandSeparator: true },
  textarea: { size: "lg", autoresize: void 0, rows: void 0, maxrows: void 0, fixed: void 0 },
  file: { size: "lg", clearIcon: "i-lucide-x", downloadIcon: "i-lucide-download", selectIcon: "i-lucide-paperclip" },
  months: { size: "lg" },
  phone: { size: "lg" },
  selectMenu: { size: "lg", format: "{label}", emptyValue: "", labelKey: "label", valueKey: "value" },
  checkbox: { size: "lg", trueValue: 1, falseValue: 0 },
  radioGroup: {
    size: "lg",
    orientation: "auto",
    breakpoint: "md",
    ui: void 0,
    labelKey: "label",
    valueKey: "value"
  },
  checkboxGroup: {
    size: "lg",
    orientation: "auto",
    breakpoint: "md",
    ui: void 0,
    labelKey: "label",
    valueKey: "value"
  },
  datepicker: {
    size: "lg",
    clearable: false,
    calendarIcon: "i-lucide-calendar",
    clearIcon: "i-lucide-x",
    roc: true,
    separator: DEFAULT_DATE_SEPARATOR,
    yearRange: [1900, 2100]
  },
  queryCard: {
    icon: "i-lucide-search",
    expandIcon: "i-lucide-chevron-down",
    collapseIcon: "i-lucide-chevron-up",
    validateOn: void 0,
    ui: void 0
  },
  listCard: {
    icon: "i-lucide-list",
    pageSize: 10,
    showPagination: true,
    showSummary: true,
    transition: true,
    ui: void 0
  },
  infoTooltip: { icon: "i-lucide-circle-alert" },
  tooltip: { touch: true }
};
const isPlainObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
let current = {};
export const setShuoComponentDefaults = (defaults = {}, warn = console.warn) => {
  const result = {};
  for (const [name, values] of Object.entries(defaults ?? {})) {
    if (!Object.hasOwn(COMPONENT_DEFAULT_KEYS, name)) {
      warn(`[ShuoUI] components.${name} \u4E0D\u662F\u53EF\u8A2D\u5B9A\u5168\u7AD9\u9810\u8A2D\u503C\u7684\u5143\u4EF6\uFF0C\u5DF2\u5FFD\u7565\u3002`);
      continue;
    }
    if (!isPlainObject(values)) continue;
    const keys = COMPONENT_DEFAULT_KEYS[name];
    const picked = {};
    for (const [key, value] of Object.entries(values)) {
      if (!keys.includes(key)) {
        warn(`[ShuoUI] components.${name}.${key} \u4E0D\u53EF\u8A2D\u5B9A\u5168\u7AD9\u9810\u8A2D\u503C\uFF0C\u5DF2\u5FFD\u7565\u3002`);
        continue;
      }
      if (value === void 0) continue;
      if (name === "inputNumber" && key === "unit" && typeof value !== "boolean") {
        warn(
          `[ShuoUI] components.inputNumber.unit \u53EA\u63A5\u53D7 boolean\uFF0C\u55AE\u4F4D\u6587\u5B57\u8ACB\u8A2D\u5B9A messages.inputNumber.unit\uFF0C\u5DF2\u5FFD\u7565\uFF1A${String(value)}`
        );
        continue;
      }
      picked[key] = value;
    }
    if (Object.keys(picked).length) result[name] = picked;
  }
  current = result;
};
export const getShuoComponentDefaults = () => current;
export const resolveShuoDefault = (name, key) => {
  const configured = current[name]?.[key];
  const builtIn = BUILT_IN_DEFAULTS[name][key];
  return configured ?? builtIn;
};
const mergeUiBySlot = (raw, configured) => {
  if (!isPlainObject(configured)) return raw;
  if (!isPlainObject(raw)) return raw ?? configured;
  const result = { ...configured };
  for (const [slot, value] of Object.entries(raw)) {
    if (value !== void 0) result[slot] = value;
  }
  return result;
};
export const resolveComponentProps = (name, props, isExplicit) => {
  const keys = COMPONENT_DEFAULT_KEYS[name];
  return new Proxy(props, {
    get(target, key, receiver) {
      if (key === "__v_isReactive") return true;
      if (key === "__v_raw") return target;
      if (typeof key === "string" && key.startsWith("__v_")) return void 0;
      const raw = Reflect.get(target, key, receiver);
      if (typeof key !== "string" || !keys.includes(key)) return raw;
      const configured = current[name]?.[key];
      if (key === "ui") return mergeUiBySlot(raw, configured);
      if (configured === void 0 || isExplicit(key)) return raw;
      return configured;
    },
    has: (target, key) => Reflect.has(target, key),
    ownKeys: (target) => Reflect.ownKeys(target),
    getOwnPropertyDescriptor: (target, key) => Reflect.getOwnPropertyDescriptor(target, key)
  });
};
