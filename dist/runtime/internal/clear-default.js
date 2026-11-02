export const resolveClear = ({ explicit, fieldRequired, configured, builtIn }) => {
  if (explicit !== void 0) return explicit;
  if (fieldRequired) return false;
  return configured ?? builtIn;
};
