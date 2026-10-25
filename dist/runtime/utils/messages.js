import en from "../locale/en.js";
import zhTW from "../locale/zh-tw.js";
export const SHUO_LOCALES = { "zh-TW": zhTW, "en": en };
export const DEFAULT_LOCALE = "zh-TW";
let options = { locale: DEFAULT_LOCALE, messages: {}, locales: {} };
const resolved = /* @__PURE__ */ new Map();
let activeCode;
const languageOf = (code) => code.split("-")[0].toLowerCase();
const builtInFor = (code) => SHUO_LOCALES[code] ?? Object.values(SHUO_LOCALES).find((locale) => languageOf(locale.code) === languageOf(code)) ?? en;
const mergeMessages = (base, ...overrides) => {
  const next = {};
  for (const key of Object.keys(base)) {
    next[key] = Object.assign({}, base[key], ...overrides.map((override) => override?.[key]));
  }
  return next;
};
export const setShuoLocales = (next = {}) => {
  options = { locale: next.locale || DEFAULT_LOCALE, messages: next.messages ?? {}, locales: next.locales ?? {} };
  resolved.clear();
  activeCode = void 0;
};
export const setShuoMessages = (override = {}) => setShuoLocales({ ...options, messages: override });
export const getShuoDefaultLocale = () => options.locale;
export const resolveShuoLocale = (code = options.locale) => {
  const cached = resolved.get(code);
  if (cached) return cached;
  const base = builtInFor(code);
  const locale = {
    ...base,
    code,
    messages: mergeMessages(
      base.messages,
      code === options.locale ? options.messages : void 0,
      options.locales[code]
    )
  };
  resolved.set(code, locale);
  return locale;
};
export const setShuoActiveLocale = (code) => {
  activeCode = code;
};
export const getShuoMessages = () => resolveShuoLocale(activeCode ?? options.locale).messages;
export const formatMessage = (template, params = {}) => template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`));
