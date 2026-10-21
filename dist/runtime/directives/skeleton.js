import "../assets/css/form-skeleton.css";
const originalStates = /* @__PURE__ */ new WeakMap();
const updateSkeleton = (element, enabled) => {
  if (enabled) {
    if (!originalStates.has(element)) {
      originalStates.set(element, { inert: element.inert, busy: element.getAttribute("aria-busy") });
    }
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && element.contains(focused)) focused.blur();
    element.inert = true;
    element.setAttribute("aria-busy", "true");
    element.setAttribute("data-form-skeleton", "");
    return;
  }
  const original = originalStates.get(element);
  if (!original) return;
  element.inert = original.inert;
  if (original.busy === null) element.removeAttribute("aria-busy");
  else element.setAttribute("aria-busy", original.busy);
  element.removeAttribute("data-form-skeleton");
  originalStates.delete(element);
};
export const vSkeleton = {
  mounted: (element, binding) => updateSkeleton(element, binding.value),
  updated: (element, binding) => updateSkeleton(element, binding.value)
};
