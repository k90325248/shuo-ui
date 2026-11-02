/** 決定清除按鈕是否顯示時參考的來源 */
export interface ClearSources {
    /** 明確傳入的 clear；未傳入為 undefined */
    explicit: boolean | undefined;
    /** 外層 UFormField 是否設定 required */
    fieldRequired: boolean;
    /** 全站設定的 clear；未設定為 undefined */
    configured: boolean | undefined;
    /** 元件內建預設 */
    builtIn: boolean;
}
/** 清除按鈕：明確傳入 > UFormField required 時關閉 > 全站設定 > 內建預設。 */
export declare const resolveClear: ({ explicit, fieldRequired, configured, builtIn }: ClearSources) => boolean;
