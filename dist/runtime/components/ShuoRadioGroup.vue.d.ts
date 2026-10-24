import type { RadioGroupOption, ResolvedRadioGroupOption } from '../types/choice.js';
import type { RadioGroupProps } from '../types/components.js';
/** 選項型別，供使用端與測試頁共用。 */
export type { RadioGroupOption, ResolvedRadioGroupOption } from '../types/choice.js';
export type { RadioGroupProps, RadioGroupOrientation, RadioGroupBreakpoint } from '../types/components.js';
/** 選項附加內容 slot 參數 */
export interface RadioGroupAppendSlotProps<T extends object = RadioGroupOption> {
    /** 轉換後的選項：保留原始欄位，label、value 為依 labelKey、valueKey 解析的值；字串選項轉為 { label, value } */
    item: ResolvedRadioGroupOption<T>;
    /** 此選項是否已選取 */
    selected: boolean;
    /** 此選項是否停用（含選項停用、群組停用、載入中與表單停用） */
    disabled: boolean;
    /** 選項文字的 id，可作為附加輸入框的 aria-labelledby */
    labelId: string;
    /** 選取此選項，例如附加輸入框聚焦時呼叫 */
    select: () => void;
}
/** 單選群組 slot */
export interface RadioGroupSlots<T extends object = RadioGroupOption> {
    /** 群組標題，同 Nuxt UI 的 legend slot；也可用 legend prop 傳入文字 */
    'legend'?: () => unknown;
    /** 選項文字旁的附加內容 */
    'item-append'?: (props: RadioGroupAppendSlotProps<T>) => unknown;
}
declare const __VLS_export: <T extends object = RadioGroupOption>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<(RadioGroupProps<T> & {
        modelValue?: RadioGroupOption["value"];
    }) & {
        "onUpdate:modelValue"?: ((value: string | undefined) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: RadioGroupSlots<T>;
    emit: (event: "update:modelValue", value: string | undefined) => void;
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
