import type { CheckboxGroupProps as NuxtCheckboxGroupProps } from '@nuxt/ui';
import type { ChoiceGroupBreakpoint, ChoiceGroupOrientation } from '../composables/useChoiceGroup.js';
/** 複選群組排列模式：水平、垂直、網格或依視窗寬度自動切換。 */
export type CheckboxGroupOrientation = ChoiceGroupOrientation | 'grid';
/** 自動排列斷點，沿用 Tailwind 的 sm、md、lg、xl、2xl。 */
export type CheckboxGroupBreakpoint = ChoiceGroupBreakpoint;
/** 複選群組選項 */
export interface CheckboxGroupOption {
    /** 顯示名稱 */
    label: string;
    /** 綁定值 */
    value: string;
}
/** 複選群組參數 */
export interface CheckboxGroupProps {
    /** 輸入框識別碼 */
    id?: string;
    /** 欄位名稱 */
    name?: string;
    /** 是否停用，未設定時沿用表單狀態 */
    disabled?: boolean;
    /** 元件顏色 */
    color?: NuxtCheckboxGroupProps['color'];
    /** 是否強調外框 */
    highlight?: boolean;
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 是否顯示載入中，以轉圈圖示取代各選項按鈕並停用 */
    loading?: boolean;
    /** 選項清單 */
    items: CheckboxGroupOption[];
    /** 排列模式，預設依斷點自動切換。 */
    orientation?: CheckboxGroupOrientation;
    /** 自動排列斷點，視窗達此寬度時水平排列，預設 md。 */
    breakpoint?: CheckboxGroupBreakpoint;
    /** 元件尺寸，水平高度對齊同尺寸的輸入框，預設 lg。 */
    size?: NuxtCheckboxGroupProps['size'];
    /** 樣式覆寫；grid 模式以 fieldset 設定分欄與響應式斷點 class。 */
    ui?: NuxtCheckboxGroupProps['ui'];
}
type __VLS_Props = CheckboxGroupProps;
type __VLS_ModelProps = {
    modelValue: CheckboxGroupOption['value'][];
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
