import type { InputProps } from '@nuxt/ui';
/** 市話號碼元件參數 */
export interface PhoneProps {
    /** 區碼輸入框識別碼 */
    id?: string;
    /** 表單欄位名稱 */
    name?: string;
    /** 輸入框尺寸 */
    size?: InputProps['size'];
    /** 主題色 */
    color?: InputProps['color'];
    /** 是否強調欄位狀態 */
    highlight?: boolean;
    /** 是否停用 */
    disabled?: boolean;
    /** 是否顯示骨架 */
    skeleton?: boolean;
    /** 是否顯示載入中，在電話號碼欄最右側顯示轉圈圖示並停用輸入 */
    loading?: boolean;
}
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
