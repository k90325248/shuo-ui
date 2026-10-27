import type { SwitchProps, SwitchValue } from '../types/components.js';
export type { SwitchAction, SwitchProps, SwitchUi, SwitchValue } from '../types/components.js';
/** 開關 slot */
export interface SwitchSlots {
    /** 取代顯示文字 */
    label?: (props: {
        label: string | undefined;
    }) => unknown;
    /** 取代說明文字 */
    description?: (props: {
        description: string | undefined;
    }) => unknown;
}
type __VLS_Props = SwitchProps;
type __VLS_Slots = SwitchSlots;
type __VLS_ModelProps = {
    modelValue?: SwitchValue;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: SwitchValue) => any;
    change: (event: Event) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: SwitchValue) => any) | undefined;
    onChange?: ((event: Event) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
