import type { MonthsProps } from '../types/components.js';
export type { MonthsProps, MonthsUi } from '../types/components.js';
type __VLS_Props = MonthsProps;
type __VLS_ModelProps = {
    modelValue?: number | null;
    'year'?: number | null;
    'month'?: number | null;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: number | null | undefined) => any;
    "update:year": (value: number | null | undefined) => any;
    "update:month": (value: number | null | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: number | null | undefined) => any) | undefined;
    "onUpdate:year"?: ((value: number | null | undefined) => any) | undefined;
    "onUpdate:month"?: ((value: number | null | undefined) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
