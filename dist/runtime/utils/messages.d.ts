import type { Locale as DateLocale } from 'date-fns';
import zhTW from '../locale/zh-tw.js';
/** 文案結構，以繁體中文語系為準 */
export type ShuoMessages = typeof zhTW.messages;
/** 可局部覆寫的文案 */
export type ShuoMessagesOverride = {
    [K in keyof ShuoMessages]?: Partial<ShuoMessages[K]>;
};
/** 語系 */
export interface ShuoLocale {
    /** 語系代碼，對應 Nuxt UI 語系的 code，例如 `zh-TW`、`en` */
    code: string;
    /** 語系名稱 */
    name: string;
    /** 日期選擇器日曆使用的 date-fns 語系 */
    dateLocale: DateLocale;
    /** 元件文案 */
    messages: ShuoMessages;
}
/** 語系設定，來自模組選項 */
export interface ShuoLocaleOptions {
    /** 預設語系代碼：頁面沒有設定 Nuxt UI 語系時使用 */
    locale?: string;
    /** 預設語系的文案覆寫 */
    messages?: ShuoMessagesOverride;
    /** 依語系代碼覆寫文案；也可加入內建以外的語系，未翻譯的項目沿用同語言或英文的內建文案 */
    locales?: Record<string, ShuoMessagesOverride>;
}
/** 內建語系 */
export declare const SHUO_LOCALES: Record<string, ShuoLocale>;
/** 內建的預設語系代碼 */
export declare const DEFAULT_LOCALE = "zh-TW";
/** 套用模組的語系設定；由 Nuxt 外掛在啟動時呼叫，單元測試可直接呼叫。 */
export declare const setShuoLocales: (next?: ShuoLocaleOptions) => void;
/** 只覆寫預設語系的文案，其他設定維持；保留給既有呼叫端與單元測試。 */
export declare const setShuoMessages: (override?: ShuoMessagesOverride) => void;
/** 取得預設語系代碼。 */
export declare const getShuoDefaultLocale: () => string;
/** 取得指定語系（含覆寫），未指定時為預設語系。 */
export declare const resolveShuoLocale: (code?: string) => ShuoLocale;
/** 記錄瀏覽器端目前使用的語系；由元件呼叫。 */
export declare const setShuoActiveLocale: (code: string) => void;
/** 取得目前語系的文案；元件內請改用 useShuoMessages 取得響應式的文案。 */
export declare const getShuoMessages: () => ShuoMessages;
/** 替換文案中的 `{name}` 佔位符。 */
export declare const formatMessage: (template: string, params?: Record<string, string | number>) => string;
