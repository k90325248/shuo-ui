/**
 * 選項文字旁附加內容（例如輸入框）的共用處理。
 * 附加內容只能放在底層的 `<label for>` 內，須避免誤觸選取、無障礙名稱帶入輸入值，並讓使用端可主動選取。
 */
export declare const useChoiceAppend: (root: () => HTMLElement | null | undefined, options: {
    /** 是否有附加內容，沒有時不調整任何行為。 */
    enabled: () => boolean;
    /** 選項或文字變動時重新同步無障礙名稱。 */
    source: () => unknown;
}) => {
    formDisabled: any;
    onAppendClick: (event: MouseEvent) => void;
    activate: (labelId: string) => void | undefined;
};
