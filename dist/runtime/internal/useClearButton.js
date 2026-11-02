import { formFieldInjectionKey } from "@nuxt/ui/composables";
import { BUILT_IN_DEFAULTS, getShuoComponentDefaults } from "../utils/component-defaults.js";
import { isPropDefined } from "./prop-defined.js";
import { resolveClear } from "./clear-default.js";
import { findProvider } from "./useControlSize.js";
export const useClearButton = (name, props) => {
  const vm = getCurrentInstance();
  const formField = inject(formFieldInjectionKey, void 0);
  const provider = formField ? findProvider(vm, formFieldInjectionKey) : void 0;
  return computed(
    () => resolveClear({
      explicit: isPropDefined(vm?.vnode.props, "clear") ? props.clear : void 0,
      fieldRequired: !!provider?.props.required,
      configured: getShuoComponentDefaults()[name]?.clear,
      builtIn: BUILT_IN_DEFAULTS[name].clear
    })
  );
};
