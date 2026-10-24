import type { PhoneProps } from '../types/components.js';
export type { PhoneProps, PhoneUi } from '../types/components.js';
type __VLS_Props = PhoneProps;
type __VLS_ModelProps = {
    modelValue?: string;
    'areaCode'?: string;
    'number'?: string;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | undefined) => any;
    "update:areaCode": (value: string | undefined) => any;
    "update:number": (value: string | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | undefined) => any) | undefined;
    "onUpdate:areaCode"?: ((value: string | undefined) => any) | undefined;
    "onUpdate:number"?: ((value: string | undefined) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
