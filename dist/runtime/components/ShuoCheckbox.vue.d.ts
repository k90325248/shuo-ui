import type { CheckboxProps, CheckboxValue } from '../types/components.js';
export type { CheckboxProps, CheckboxUi, CheckboxValue } from '../types/components.js';
/** 附加內容 slot 參數 */
export interface CheckboxAppendSlotProps {
    /** 是否已勾選 */
    checked: boolean;
    /** 是否停用（含載入中與表單停用） */
    disabled: boolean;
    /** 顯示文字的 id，可作為附加輸入框的 aria-labelledby */
    labelId: string;
    /** 勾選（已勾選時不變），例如附加輸入框聚焦時呼叫 */
    check: () => void;
}
/** 單個核取方塊 slot */
export interface CheckboxSlots {
    /** 顯示文字旁的附加內容 */
    append?: (props: CheckboxAppendSlotProps) => unknown;
}
type __VLS_Props = CheckboxProps;
type __VLS_Slots = CheckboxSlots;
type __VLS_ModelProps = {
    modelValue: CheckboxValue;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: CheckboxValue) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: CheckboxValue) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
