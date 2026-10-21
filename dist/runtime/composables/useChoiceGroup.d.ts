import { breakpointsTailwind } from '@vueuse/core';
/** 選項群組排列模式：水平、垂直或依視窗寬度自動切換。 */
export type ChoiceGroupOrientation = 'horizontal' | 'vertical' | 'auto';
/** 自動排列斷點，沿用 Tailwind 的 sm、md、lg、xl、2xl。 */
export type ChoiceGroupBreakpoint = keyof typeof breakpointsTailwind;
/** 選項群組互動參數 */
interface ChoiceGroupOptions {
    /** 排列模式 */
    orientation: ChoiceGroupOrientation;
    /** 自動排列斷點 */
    breakpoint: ChoiceGroupBreakpoint;
    /** 選項清單，更新內容時重新量測文字。 */
    items: readonly unknown[];
}
/** 共用單選與複選群組的響應式排列及整個選項的文字提示。 */
export declare const useChoiceGroup: (props: ChoiceGroupOptions) => {
    resolvedOrientation: any;
    tooltipReference: any;
    tooltipText: any;
    isTruncated: any;
    tooltipOpen: any;
    showOptionTooltip: (event: PointerEvent | FocusEvent) => void;
    closeTooltip: () => void;
};
export {};
