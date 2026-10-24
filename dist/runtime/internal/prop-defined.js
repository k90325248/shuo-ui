const camelCase = (value) => value.replace(/-(\w)/g, (_, char) => char.toUpperCase());
const kebabCase = (value) => value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
export const isPropDefined = (vnodeProps, key) => {
  if (!vnodeProps) return false;
  return vnodeProps[camelCase(key)] !== void 0 || vnodeProps[kebabCase(key)] !== void 0;
};
