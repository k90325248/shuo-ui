import type { CheckboxProps as NuxtCheckboxProps } from '@nuxt/ui';
/** 單個核取方塊綁定值 */
export type CheckboxValue = string | number | boolean;
/** 單個核取方塊參數 */
export interface CheckboxProps {
    /** 輸入框識別碼 */
    id?: string;
    /** 欄位名稱 */
    name?: string;
    /** 是否停用，未設定時沿用表單狀態 */
    disabled?: boolean;
    /** 元件顏色 */
    color?: NuxtCheckboxProps['color'];
    /** 是否強調外框 */
    highlight?: boolean;
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 顯示文字，預設為「啟用」。 */
    label?: string;
    /** 勾選時的回傳值，預設為數字 1。 */
    trueValue?: CheckboxValue;
    /** 取消勾選時的回傳值，預設為數字 0。 */
    falseValue?: CheckboxValue;
    /** 是否顯示載入中，以轉圈圖示取代勾選框並停用 */
    loading?: boolean;
    /** 元件尺寸，外框高度對齊同尺寸輸入框，預設 lg。 */
    size?: NuxtCheckboxProps['size'];
}
type __VLS_Props = CheckboxProps;
type __VLS_ModelProps = {
    modelValue: CheckboxValue;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: CheckboxValue) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: CheckboxValue) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
