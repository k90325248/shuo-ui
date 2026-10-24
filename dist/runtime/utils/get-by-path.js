export const getByPath = (source, path) => path.split(/[.[\]]+/).filter(Boolean).reduce(
  (current, key) => current == null ? void 0 : current[key],
  source
);
