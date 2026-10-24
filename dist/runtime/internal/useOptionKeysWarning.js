import { describeOptionKeySource, warnMissingOptionKeys } from "./option-keys.js";
export const useOptionKeysWarning = (component, name, source, sourceOf) => {
  if (!import.meta.dev) return;
  const warned = /* @__PURE__ */ new Set();
  watch(
    source,
    ({ items, labelKey, valueKey }) => warnMissingOptionKeys(component, items, labelKey, valueKey, warned, console.warn, {
      labelKey: describeOptionKeySource(name, "labelKey", sourceOf("labelKey")),
      valueKey: describeOptionKeySource(name, "valueKey", sourceOf("valueKey"))
    }),
    { immediate: true }
  );
};
