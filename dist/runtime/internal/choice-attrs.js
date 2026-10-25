const UNSUPPORTED_ATTRS = /* @__PURE__ */ new Set(["variant", "indicator", "highlight"]);
export const omitChoiceAttrs = (attrs) => Object.fromEntries(Object.entries(attrs).filter(([key]) => !UNSUPPORTED_ATTRS.has(key)));
