/** 列出第一個物件選項缺少的欄位名稱（依 labelKey、valueKey 順序）；沒有物件選項時回傳空陣列。 */
export declare const findMissingOptionKeys: (items: readonly unknown[], labelKey: string, valueKey: string) => string[];
/** prop 值的來源：明確傳入、全站設定或元件內建預設 */
export type PropSource = 'explicit' | 'global' | 'builtin';
/** 欄位名稱來源的說明文字，內建預設不另外說明。 */
export declare const describeOptionKeySource: (name: string, key: "labelKey" | "valueKey", source: PropSource) => string | undefined;
/**
 * 選項缺少 labelKey 或 valueKey 欄位時警告，訊息帶出元件、欄位名稱與欄位名稱的來源。
 * `warned` 由每個元件實例各自保存，同一組欄位只警告一次；字串選項與空陣列不檢查。
 */
export declare const warnMissingOptionKeys: (component: string, items: readonly unknown[], labelKey: string, valueKey: string, warned: Set<string>, warn?: (message: string) => void, sources?: Partial<Record<"labelKey" | "valueKey", string>>) => void;
