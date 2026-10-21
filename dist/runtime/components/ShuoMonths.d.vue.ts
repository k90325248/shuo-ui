import type { InputProps } from '@nuxt/ui';
/** 年月合併輸入元件參數 */
export interface MonthsProps {
    /** 年數輸入框識別碼，供外部 label 關聯。 */
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
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 是否顯示載入中，在「月」後方顯示轉圈圖示並停用輸入 */
    loading?: boolean;
}
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
