/** 日期精度：年、年月、年月日、年月日時分、年月日時分秒。 */
export type DateMode = 'year' | 'month' | 'date' | 'datetime' | 'datetime-second';
/** 日期顯示設定 */
export interface DateDisplayOptions {
    /** 日期精度，預設年月日 */
    mode?: DateMode;
    /** 是否使用民國年，預設開啟 */
    roc?: boolean;
    /**
     * 年與年月是否加上單位，例如「115 年 10 月」。`true` 使用目前語系的文案（`messages.date`），
     * 也可直接傳入格式，`{year}`、`{month}` 為年份與兩位數月份。
     */
    yearMonthLabels?: boolean | YearMonthLabels;
}
/** 年與年月的顯示格式 */
export interface YearMonthLabels {
    /** 年，例如 `{year} 年` */
    year: string;
    /** 年月，例如 `{year} 年 {month} 月` */
    month: string;
}
/** 各精度的西元日期格式。 */
export declare const DATE_MODEL_FORMATS: Record<DateMode, string>;
/** 民國起始西元年，1911 年對應民國 0 年。 */
export declare const ROC_START_YEAR = 1911;
/** 日期綁定值的預設分隔符號。 */
export declare const DEFAULT_DATE_SEPARATOR = "/";
/** 分隔符號須為非空文字，且不含數字、空白、冒號與單引號，避免與年月日、時間或格式跳脫混淆。 */
export declare const isValidDateSeparator: (separator: unknown) => separator is string;
/** 取得指定精度與分隔符號的綁定格式；分隔符號以引號包住，避免被 date-fns 視為格式代碼。 */
export declare const getDateModelFormat: (mode: DateMode, separator?: string) => string;
/** 嚴格解析指定精度與分隔符號的西元日期，拒絕無效日期與補位不足，不做 UTC 轉換。 */
export declare const parseDateValue: (value: string | null | undefined, mode: DateMode, separator?: string) => Date | null;
/** 格式化日期；字串依指定精度解析，接受斜線或連字號日期，空值與無效日期回傳空字串。 */
export declare const formatDateDisplay: (value: string | Date | null | undefined, { mode, roc, yearMonthLabels }?: DateDisplayOptions) => string;
