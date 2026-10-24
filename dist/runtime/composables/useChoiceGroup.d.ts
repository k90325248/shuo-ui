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
/** 選項群組內建樣式參數 */
interface ChoiceGroupUiOptions {
    /** 實際排列方向，grid 模式為 vertical */
    orientation: 'horizontal' | 'vertical';
    /** 是否為 grid 排列 */
    grid: boolean;
    /** 是否載入中 */
    loading: boolean;
}
/**
 * 單選與複選群組的內建樣式，依排列與載入狀態組成各 slot 的 class，與使用端的 ui 合併後傳入。
 * 寫在 ui 而非元件 CSS，讓 Nuxt UI 主題被覆寫的同時，使用端的 ui 仍可再覆寫。
 * 水平排列對應同尺寸輸入框的高度，狹窄時先縮小間距，把空間留給選項按鈕與省略文字。
 */
export declare const getChoiceGroupUi: ({ orientation, grid, loading }: ChoiceGroupUiOptions) => {
    root: string;
    fieldset: string;
    item: string;
    wrapper: string;
    label: string;
    base: string | undefined;
};
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
