export const SELECT_COLUMN_ID = "select";
export const withSelectColumn = (columns, column) => {
  let found = false;
  const replace = (items) => items.map((item) => {
    if (item.id === SELECT_COLUMN_ID) {
      found = true;
      const meta = { ...column.meta, ...item.meta, class: { ...column.meta?.class, ...item.meta?.class } };
      return { ...column, ...item, meta };
    }
    if ("columns" in item && item.columns) return { ...item, columns: replace(item.columns) };
    return item;
  });
  const result = replace(columns);
  return found ? result : [column, ...result];
};
export const getRowKey = (row, rowKey) => typeof rowKey === "function" ? rowKey(row) : row[rowKey];
export const toRowSelection = (keys) => Object.fromEntries(keys.map((key) => [String(key), true]));
export const fromRowSelection = (selection, previous, rowKeys) => {
  const selected = new Set(
    Object.entries(selection ?? {}).filter(([, value]) => value).map(([id]) => id)
  );
  const result = [];
  const add = (key) => {
    if (!selected.delete(String(key))) return;
    result.push(key);
  };
  previous.forEach(add);
  rowKeys.forEach(add);
  return [...result, ...selected];
};
