import type { DateMode, YearMonthLabels } from './date.js';
/** 日期選擇模式：年、年月、日期、日期時分、日期時分秒。 */
export type DatepickerMode = DateMode;
/** 完整日期範圍綁定值，起迄皆選完才回傳。 */
export type DatepickerRangeValue = [
    /** 起始西元日期字串 */
    start: string,
    /** 結束西元日期字串 */
    end: string
];
/** 日期綁定值，依是否開啟範圍推論為字串或起迄陣列；單選清空為 ''，範圍清空為 []。 */
export type DatepickerValue<TRange extends boolean = false> = TRange extends true ? DatepickerRangeValue | [] : string;
/** 判斷日期綁定值是否為空；相容父層傳入的 null、undefined。 */
export declare const isEmptyDatepickerValue: (value: unknown) => boolean;
/** 日期選擇器沿用共用的西元綁定格式。 */
export declare const DATEPICKER_MODEL_FORMATS: Record<DateMode, string>;
/** 日期選擇器的綁定值依分隔符號嚴格解析，預設為斜線。 */
export declare const parseDatepickerValue: (value: string | null | undefined, mode: DateMode, separator?: string) => Date | null;
/** 日期選擇器共用日期顯示邏輯，年與年月加上單位；未傳入格式時使用目前語系的文案。 */
export declare const formatDatepickerDisplay: (date: Date, mode: DatepickerMode, roc: boolean, labels?: YearMonthLabels | true) => string;
/** 將套件的年份數字或日期字串統一為西元字串；無效或民國下限之前的值不接受。 */
export declare const normalizeDatepickerValue: (value: unknown, mode: DatepickerMode, roc: boolean, separator?: string) => string | null;
/** 將套件原生 Date、年月物件或年份數字轉成指定精度的西元字串。 */
export declare const serializeDatepickerValue: (value: unknown, mode: DatepickerMode, roc: boolean, separator?: string) => string | null;
/** 將完整起迄轉成西元字串並依時間排序；未完成的範圍不視為有效綁定值。 */
export declare const serializeDatepickerRange: (value: unknown, mode: DatepickerMode, roc: boolean, separator?: string) => DatepickerRangeValue | null;
/** 父層綁定值檢查設定 */
export interface DatepickerCheckOptions {
    /** 選擇模式 */
    mode: DatepickerMode;
    /** 是否限制民國下限 */
    roc: boolean;
    /** 是否為範圍模式 */
    range: boolean;
    /** 日期分隔符號 */
    separator: string;
}
/** 檢查父層綁定值；有效值或約定空值回傳 null，否則回傳清空原因。null、undefined 由呼叫端另行轉為空值。 */
export declare const getDatepickerValueIssue: (value: unknown, { mode, roc, range, separator }: DatepickerCheckOptions) => string | null;
