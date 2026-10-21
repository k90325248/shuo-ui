import type { DateValue } from '@vuepic/vue-datepicker';
import type { InputProps } from '@nuxt/ui';
import type { DatepickerMode, DatepickerValue } from '../utils/datepicker.js';
import '@vuepic/vue-datepicker/dist/main.css';
/** 日期選擇模式，供使用端與測試頁共用。 */
export type { DatepickerMode, DatepickerValue, DatepickerRangeValue } from '../utils/datepicker.js';
/** 日期輸入框參數 */
export interface DatepickerProps<TRange extends boolean = false> {
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 主綁定值，單選為西元字串，範圍為 [起日, 迄日]；單選清空為 ''，範圍清空為 []。 */
    modelValue?: DatepickerValue<TRange>;
    /** 起始日期綁定值，僅範圍模式使用，清空或關閉範圍時為 ''。 */
    start?: string;
    /** 結束日期綁定值，僅範圍模式使用，尚無完整範圍或關閉範圍時為 ''。 */
    end?: string;
    /** 清除按鈕，預設關閉。 */
    clearable?: boolean;
    /** 禁用狀態，預設關閉。 */
    disabled?: boolean;
    /** 是否顯示載入中，以轉圈圖示取代尾端日曆圖示並停用輸入。 */
    loading?: boolean;
    /** 範圍選擇，預設關閉；boolean 交集保留 Vue 對裸 range 屬性的布林轉換。 */
    range?: TRange & boolean;
    /** 輸入框識別碼，用於連結外部標籤。 */
    id?: string;
    /** 元件尺寸，與 Nuxt UI 的五種 size 一致。 */
    size?: InputProps['size'];
    /** 驗證狀態，false 顯示錯誤，true 顯示成功，未指定時使用一般樣式。 */
    state?: boolean;
    /** 是否顯示民國年，預設開啟；不影響西元綁定值。 */
    roc?: boolean;
    /** 選擇模式，預設為年月日。 */
    mode?: DatepickerMode;
    /** 最早可選日期，民國模式至少為 1911/01/01。 */
    minDate?: DateValue;
    /** 最晚可選日期。 */
    maxDate?: DateValue;
    /** 西元年份選擇範圍，民國模式的下限至少為 1911。 */
    yearRange?: [number, number];
    /** 綁定值的日期分隔符號，預設 '/'；不可為空或含數字、空白、冒號，無效時沿用預設並警告。 */
    separator?: string;
}
declare const __VLS_export: <TRange extends boolean = false>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<(DatepickerProps<TRange> & {
        modelValue?: DatepickerValue<TRange>;
        start?: string;
        end?: string;
    }) & {
        "onUpdate:modelValue"?: ((value: DatepickerValue<TRange> | undefined) => any) | undefined;
        "onUpdate:start"?: ((value: string | undefined) => any) | undefined;
        "onUpdate:end"?: ((value: string | undefined) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {};
    emit: ((event: "update:modelValue", value: DatepickerValue<TRange> | undefined) => void) & ((event: "update:start", value: string | undefined) => void) & ((event: "update:end", value: string | undefined) => void);
}>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_PrettifyLocal<T> = (T extends any ? {
    [K in keyof T]: T[K];
} : {
    [K in keyof T as K]: T[K];
}) & {};
