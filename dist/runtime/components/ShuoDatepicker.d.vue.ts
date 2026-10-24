import type { DatepickerValue } from '../utils/datepicker.js';
import '@vuepic/vue-datepicker/dist/main.css';
import type { DatepickerProps } from '../types/components.js';
/** 日期選擇模式，供使用端與測試頁共用。 */
export type { DatepickerMode, DatepickerValue, DatepickerRangeValue } from '../utils/datepicker.js';
export type { DatepickerProps } from '../types/components.js';
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
