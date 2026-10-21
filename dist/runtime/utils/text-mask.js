export const getMaskCount = (mask) => {
  if (mask === true) return Infinity;
  return typeof mask === "number" && Number.isFinite(mask) ? Math.max(0, Math.floor(mask)) : 0;
};
export const splitMaskedText = (value, mask) => {
  const characters = Array.from(value);
  const count = Math.min(characters.length, getMaskCount(mask));
  return {
    prefix: characters.slice(0, characters.length - count).join(""),
    suffix: characters.slice(characters.length - count).join(""),
    count
  };
};
