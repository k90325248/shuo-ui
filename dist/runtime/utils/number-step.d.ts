import type { DecimalOption } from './number.js';
/** 增減設定 */
export interface NumberStepOptions {
    /** 每次增減的量，須大於 0 */
    step: number;
    /** 最小值，未設定時不限 */
    min?: number;
    /** 最大值，未設定時不限 */
    max?: number;
    /** 結果的小數位數，undefined 表示不限 */
    places?: number;
}
/** 解析後的增減設定與需要提示的問題 */
export interface ResolvedNumberStep {
    /** 實際使用的步進值 */
    step: number;
    /** 實際使用的最小值；設定無效時為 undefined */
    min?: number;
    /** 實際使用的最大值；設定無效時為 undefined */
    max?: number;
    /** 結果的小數位數，undefined 表示不限 */
    places?: number;
    /** 設定有問題時的說明，供元件於開發期警告 */
    warnings: string[];
}
/** 數字的小數位數，例如 0.25 為 2、1e-7 為 7。 */
export declare const countDecimalPlaces: (value: number) => number;
/**
 * 整理 step、min、max 與 decimal 的關係：
 * - step 不是大於 0 的有限數字時改用 1。
 * - decimal 限制的位數比 step 少時（例如只能整數卻給 0.25），step 依 decimal 的最小單位四捨五入，至少為一個單位。
 * - min、max 不是有限數字時忽略；min 大於 max 時兩者都忽略。
 */
export declare const resolveNumberStep: (step: unknown, decimal: DecimalOption, min?: unknown, max?: unknown) => ResolvedNumberStep;
/** 將數字限制在 min、max 之間。 */
export declare const clampNumber: (value: number, min?: number, max?: number) => number;
/** 判斷是否還能往指定方向增減：已達上限（或超出）時不能增加，已達下限（或低於）時不能減少；空值一律可以。 */
export declare const canStepNumber: (value: number | null | undefined, direction: 1 | -1, min?: number, max?: number) => boolean;
/**
 * 以十進位計算增減，避免 0.1 + 0.2 之類的浮點誤差。
 * - `count` 為步數，正數增加、負數減少（PageUp、PageDown 傳 ±10）。
 * - 空值不論增減都從 min 開始，沒有 min 時從 0 開始（仍限制在範圍內）。
 * - 結果依 places 四捨五入，再限制在 min、max 之間。
 */
export declare const stepNumber: (value: number | null | undefined, count: number, options: NumberStepOptions) => number;
