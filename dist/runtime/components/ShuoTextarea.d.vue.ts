import type { TextareaProps as NuxtTextareaProps } from '@nuxt/ui';
/** 多行文字輸入參數 */
export interface TextareaProps {
    /** 是否顯示骨架 */
    skeleton?: boolean;
    /** 是否停用 */
    disabled?: boolean;
    /** 是否顯示載入中，在右上角顯示轉圈圖示並停用輸入 */
    loading?: boolean;
    /** 是否自動調整高度 */
    autoresize?: boolean;
    /** 是否為原生必填欄位 */
    required?: boolean;
    /** 是否強調外框 */
    highlight?: boolean;
    /** 是否固定文字尺寸 */
    fixed?: boolean;
    /** 元件尺寸，預設 lg */
    size?: NuxtTextareaProps['size'];
    /** 元件顏色 */
    color?: NuxtTextareaProps['color'];
    /** 元件外觀 */
    variant?: NuxtTextareaProps['variant'];
    /** 基本行數 */
    rows?: number;
    /** 自動高度上限行數 */
    maxrows?: number;
    /** 原生字數上限 */
    maxlength?: number;
    /** 提示文字 */
    placeholder?: string;
    /** 欄位名稱 */
    name?: string;
    /** 圖示名稱 */
    icon?: string;
}
type __VLS_Props = TextareaProps;
type __VLS_ModelProps = {
    modelValue?: string;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | undefined) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
