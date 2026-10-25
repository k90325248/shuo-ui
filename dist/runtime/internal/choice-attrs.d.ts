/** 移除不支援的參數後，其餘屬性照常轉給 Nuxt UI 元件；型別上已排除，這裡處理未經型別檢查的傳入。 */
export declare const omitChoiceAttrs: (attrs: Record<string, unknown>) => {
    [k: string]: unknown;
};
