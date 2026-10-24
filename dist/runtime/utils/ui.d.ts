import type { SlotClass } from '@nuxt/ui';
/** 元件內建的 slot 樣式，鍵為 slot 名稱、值為 class 字串 */
export type BuiltinUi<T> = {
    [K in keyof T]?: string;
};
/**
 * 將元件內建樣式與使用端的單一 slot 樣式合併。
 * 字串或陣列：內建在前、使用端在後，交由 Nuxt UI 的 tailwind-merge 處理，衝突時使用端優先。
 * 函式：使用端收到的 defaults 已包含內建樣式，回傳值即為最終樣式，可完整取代內建樣式。
 */
export declare const mergeSlotClass: (builtin: string | undefined, value: SlotClass | undefined) => SlotClass;
/**
 * 將元件內建的 ui 與使用端傳入的 ui 逐 slot 合併，供傳給 Nuxt UI 元件的 `ui` prop。
 * 內建未設定的 slot 原樣保留使用端的值。
 */
export declare const mergeUi: <T extends object>(builtin: BuiltinUi<T>, ui: T | undefined) => T;
