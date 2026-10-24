/** 小數設定：false 僅整數、true 不限制位數、數字指定小數位數。 */
export type DecimalOption = boolean | number;
/** 取得有效小數位數；undefined 表示不限，固定精度最多支援 100 位。 */
export declare const getDecimalPlaces: (decimal: DecimalOption) => number | undefined;
/** 將科學記號展開成可編輯的小數文字。 */
export declare const toNumberText: (value: number | null | undefined) => string;
/** 共用數字顯示格式：預設保留原小數與千分位，指定精度時補零；空值顯示空字串。 */
export declare const formatNumberDisplay: (value: number | null | undefined, decimal?: DecimalOption, thousandSeparator?: boolean) => string;
