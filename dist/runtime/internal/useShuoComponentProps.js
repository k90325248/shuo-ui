import { getShuoComponentDefaults, resolveComponentProps } from "../utils/component-defaults.js";
import { isPropDefined } from "./prop-defined.js";
export const useShuoComponentProps = (name, props) => {
  const vm = getCurrentInstance();
  return resolveComponentProps(name, props, (key) => isPropDefined(vm?.vnode.props, key));
};
export const useShuoPropSource = (name) => {
  const vm = getCurrentInstance();
  return (key) => {
    if (isPropDefined(vm?.vnode.props, key)) return "explicit";
    const configured = getShuoComponentDefaults()[name]?.[key];
    return configured === void 0 ? "builtin" : "global";
  };
};
