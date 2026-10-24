import { formOptionsInjectionKey } from "@nuxt/ui/composables";
const INTERACTIVE_SELECTOR = "input, textarea, select, button, a[href], [contenteditable], [tabindex]";
export const useChoiceAppend = (root, options) => {
  const formOptions = inject(formOptionsInjectionKey, void 0);
  const formDisabled = computed(() => !!formOptions?.value.disabled);
  const onAppendClick = (event) => {
    const container = event.currentTarget;
    const target = event.target;
    if (!(container instanceof Element) || !(target instanceof Element)) return;
    const interactive = target.closest(INTERACTIVE_SELECTOR);
    if (interactive && container.contains(interactive)) return;
    event.preventDefault();
  };
  const findControl = (labelId) => root()?.querySelector(`[id="${labelId}"]`)?.closest('[data-slot="item"], [data-slot="root"]')?.querySelector('[data-slot="base"]');
  const activate = (labelId) => findControl(labelId)?.click();
  const syncAccessibleNames = () => {
    root()?.querySelectorAll("[data-choice-label][id]").forEach((label) => {
      const control = findControl(label.id);
      if (!control) return;
      if (options.enabled()) control.setAttribute("aria-labelledby", label.id);
      else if (control.getAttribute("aria-labelledby") === label.id) control.removeAttribute("aria-labelledby");
    });
  };
  watch([root, options.enabled, options.source], syncAccessibleNames, { flush: "post", immediate: true, deep: true });
  return { formDisabled, onAppendClick, activate };
};
