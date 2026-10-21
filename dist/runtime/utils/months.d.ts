/** 正規化的月數與年月拆分 */
export interface MonthsValue {
    /** 總月數 */
    total: number;
    /** 完整年數 */
    year: number;
    /** 剩餘月數，範圍為 0 至 11。 */
    month: number;
}
/** 將非負安全整數月數拆成年與月，空值或無效資料回傳 null。 */
export declare const splitMonths: (value: unknown) => MonthsValue | null;
/** 合併年月並處理月份進位，單邊空值視為 0，兩邊皆空則回傳 null。 */
export declare const combineMonths: (year: number | null | undefined, month: number | null | undefined) => MonthsValue | null;
