/** 依路徑（如 `a.b[0].c`）取值，路徑中途不存在時回傳 undefined；取代 lodash 的 `get`。 */
export declare const getByPath: (source: unknown, path: string) => unknown;
