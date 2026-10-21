import type { Ref } from 'vue';
/** 判斷顯示文字是否超出可用寬度，供共用元件控制完整文字提示。 */
export declare const useTruncatedText: (root: Ref<HTMLElement | null>, text: Ref<string>, selector: string) => {
    isTruncated: any;
    measure: () => void;
    tooltipOpen: any;
    showTooltip: () => void;
};
