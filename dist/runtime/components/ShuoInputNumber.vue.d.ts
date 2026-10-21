import type { InputProps } from '@nuxt/ui';
import type { DecimalOption } from '../utils/number.js';
/** 數字輸入框參數 */
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
    /** 是否顯示載入中，於最右側顯示轉圈圖示並停用輸入；數字與單位往左讓出圖示空間 */
    loading?: boolean;
    /** 單位，true 顯示「元」，字串顯示傳入文字，預設不顯示 */
    unit?: boolean | string;
    /** 是否在離開輸入框後顯示千分位，預設開啟。 */
    thousandSeparator?: boolean;
    /** 是否允許小數或指定小數位數，預設 false；固定精度最多 100 位。 */
    decimal?: DecimalOption;
}
type __VLS_Props = Props;
type __VLS_ModelProps = {
    modelValue?: number | null;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: number | null | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: number | null | undefined) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
