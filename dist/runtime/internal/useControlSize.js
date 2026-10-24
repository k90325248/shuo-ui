import { formFieldInjectionKey } from "@nuxt/ui/composables";
import { BUILT_IN_DEFAULTS, getShuoComponentDefaults } from "../utils/component-defaults.js";
import { isPropDefined } from "./prop-defined.js";
const findProvider = (instance, key) => {
  let current = instance?.parent;
  while (current) {
    const parent = current.parent;
    if (current.provides && Object.hasOwn(current.provides, key) && parent?.provides !== current.provides)
      return current;
    current = parent;
  }
  return void 0;
};
export const useControlSize = (name, props) => {
  const formField = inject(formFieldInjectionKey, void 0);
  const provider = formField ? findProvider(getCurrentInstance(), formFieldInjectionKey) : void 0;
  return computed(() => {
    const fieldSize = formField?.value?.size;
    const explicitFieldSize = provider && isPropDefined(provider.vnode.props, "size") ? fieldSize : void 0;
    const configured = getShuoComponentDefaults()[name]?.size;
    const builtIn = BUILT_IN_DEFAULTS[name].size ?? "lg";
    return props.size ?? explicitFieldSize ?? configured ?? fieldSize ?? builtIn;
  });
};
