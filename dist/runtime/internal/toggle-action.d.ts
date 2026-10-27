/** 執行切換處理函式時通知元件的時機 */
export interface ToggleActionHooks<V> {
    /** 開始處理：顯示切換後的值並進入處理中 */
    start: (value: V) => void;
    /** 處理成功且綁定值未被外部改變時呼叫，用來更新綁定值 */
    commit: (value: V) => void;
    /** 處理結束（成功、失敗或丟出錯誤）時呼叫，解除處理中；顯示值回到綁定值 */
    finish: () => void;
    /** 處理期間綁定值是否已被外部改變；改變時以外部的值為準，不再更新 */
    isStale: () => boolean;
}
/**
 * 執行切換後的處理函式：回傳 `false`（含 Promise 解析為 `false`）視為失敗，其他回傳值視為成功。
 * 丟出錯誤時同樣結束處理並復原，錯誤再往外拋。回傳是否成功。
 */
export declare const runToggleAction: <V>(value: V, action: (value: V) => unknown, hooks: ToggleActionHooks<V>) => Promise<boolean>;
