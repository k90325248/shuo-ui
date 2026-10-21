import type { TextMask } from '../utils/text-mask.js';
import type { InputProps } from '@nuxt/ui';
/** 文字輸入元件參數 */
interface Props {
    /** 輸入框識別碼 */
    id?: string;
    /** 欄位名稱 */
    name?: string;
    /** 元件尺寸，預設 lg */
    size?: InputProps['size'];
    /** 是否停用，未設定時沿用表單狀態 */
    disabled?: boolean;
    /** 元件顏色 */
    color?: InputProps['color'];
    /** 是否強調外框 */
    highlight?: boolean;
    /** 提示文字 */
    placeholder?: string;
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 是否顯示載入中，於尾端顯示轉圈圖示並停用輸入 */
    loading?: boolean;
    /** true 遮蔽全部，正整數遮蔽最後指定碼數，預設不遮蔽。 */
    mask?: TextMask;
    /** 是否隱藏遮罩顯示按鈕，預設 false。 */
    hideMaskToggle?: boolean;
}
type __VLS_Props = Props;
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
