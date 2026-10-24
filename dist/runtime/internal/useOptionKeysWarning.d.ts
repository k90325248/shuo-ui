import type { PropSource } from './option-keys.js';
/** 選項欄位檢查的資料來源 */
interface OptionKeysWarningSource {
    /** 選項清單 */
    items: readonly unknown[];
    /** 生效的顯示名稱欄位 */
    labelKey: string;
    /** 生效的綁定值欄位 */
    valueKey: string;
}
/**
 * 開發期檢查選項是否有生效的 labelKey、valueKey 欄位；正式環境不檢查。
 * `name` 為全站設定的元件鍵名，`sourceOf` 回傳欄位名稱來自明確傳入、全站設定或內建預設，訊息會一併註明。
 */
export declare const useOptionKeysWarning: (component: string, name: string, source: () => OptionKeysWarningSource, sourceOf: (key: "labelKey" | "valueKey") => PropSource) => void;
export {};
