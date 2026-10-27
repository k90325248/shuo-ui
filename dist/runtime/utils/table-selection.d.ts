import type { TableColumn, TableData } from '@nuxt/ui';
/** 勾選欄的欄位 ID；`columns` 中有這個 ID 的欄位時，勾選欄放在該位置 */
export declare const SELECT_COLUMN_ID = "select";
/** 列的 key：勾選結果以此識別資料 */
export type TableRowKey = string | number;
/** 取得列 key 的方式：資料欄位名稱，或由整筆資料組出 key 的函式 */
export type TableRowKeyGetter<T> = keyof T | ((row: T) => TableRowKey);
/**
 * 在欄位設定中放入勾選欄：已有 `id: 'select'` 的欄位（含分組內）時，以內建設定為底、該欄位的設定優先，放在原位置；
 * `meta` 逐項合併，其中 `meta.class` 再依 `th`、`td` 合併，只寫 `td` 時表頭仍保留內建 class；
 * 沒有時放在最前面。
 */
export declare const withSelectColumn: <T extends TableData>(columns: TableColumn<T>[], column: TableColumn<T>) => TableColumn<T>[];
/** 依 `rowKey` 取得資料的 key。 */
export declare const getRowKey: <T>(row: T, rowKey: TableRowKeyGetter<T>) => TableRowKey;
/** 勾選的 key 轉為 Table 的 `rowSelection`。 */
export declare const toRowSelection: (keys: readonly TableRowKey[]) => Record<string, boolean>;
/**
 * Table 的 `rowSelection` 轉回勾選的 key。
 * 仍勾選的既有 key 保留原順序與型別（包含不在目前資料中的其他頁），新勾選的依 `rowKeys`（目前資料的 key）順序附加在後；
 * `rowKeys` 找不到的 ID（未設定 `rowKey` 時的列序號）以字串加入。
 */
export declare const fromRowSelection: (selection: Record<string, boolean> | undefined, previous: readonly TableRowKey[], rowKeys: readonly TableRowKey[]) => TableRowKey[];
