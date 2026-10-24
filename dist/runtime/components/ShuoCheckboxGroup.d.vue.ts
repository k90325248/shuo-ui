import type { CheckboxGroupOption, ResolvedCheckboxGroupOption } from '../types/choice.js';
import type { CheckboxGroupProps } from '../types/components.js';
/** 選項型別，供使用端與測試頁共用。 */
export type { CheckboxGroupOption, ResolvedCheckboxGroupOption } from '../types/choice.js';
export type { CheckboxGroupProps, CheckboxGroupOrientation, CheckboxGroupBreakpoint } from '../types/components.js';
/** 選項附加內容 slot 參數 */
export interface CheckboxGroupAppendSlotProps<T extends object = CheckboxGroupOption> {
    /** 轉換後的選項：保留原始欄位，label、value 為依 labelKey、valueKey 解析的值；字串選項轉為 { label, value } */
    item: ResolvedCheckboxGroupOption<T>;
    /** 此選項是否已勾選 */
    checked: boolean;
    /** 此選項是否停用（含選項停用、群組停用、載入中與表單停用） */
    disabled: boolean;
    /** 選項文字的 id，可作為附加輸入框的 aria-labelledby */
    labelId: string;
    /** 勾選此選項（已勾選時不變），例如附加輸入框聚焦時呼叫 */
    check: () => void;
}
/** 複選群組 slot */
export interface CheckboxGroupSlots<T extends object = CheckboxGroupOption> {
    /** 群組標題，同 Nuxt UI 的 legend slot；也可用 legend prop 傳入文字 */
    'legend'?: () => unknown;
    /** 選項文字旁的附加內容 */
    'item-append'?: (props: CheckboxGroupAppendSlotProps<T>) => unknown;
}
declare const __VLS_export: <T extends object = CheckboxGroupOption>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<(CheckboxGroupProps<T> & {
        modelValue: CheckboxGroupOption["value"][];
    }) & {
        "onUpdate:modelValue"?: ((value: string[]) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: CheckboxGroupSlots<T>;
    emit: (event: "update:modelValue", value: string[]) => void;
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
