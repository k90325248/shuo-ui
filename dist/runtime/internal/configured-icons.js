export const collectConfiguredIcons = (components) => [
  ...new Set(
    Object.values(components).flatMap(
      (defaults) => Object.entries(defaults ?? {}).filter(([key, value]) => /icon$/i.test(key) && typeof value === "string" && value !== "").map(([, value]) => value)
    )
  )
];
export const toBundleIconName = (name, hasCollection) => {
  const bare = name.replace(/^i-/, "");
  if (bare.includes(":")) return bare;
  const parts = bare.split("-");
  for (let index = parts.length - 1; index > 0; index--) {
    const prefix = parts.slice(0, index).join("-");
    if (hasCollection(prefix)) return `${prefix}:${parts.slice(index).join("-")}`;
  }
  return parts.length > 1 ? `${parts[0]}:${parts.slice(1).join("-")}` : bare;
};
