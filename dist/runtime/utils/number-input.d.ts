import type { DecimalOption } from './number.ts.js';
/** 檢查編輯中的數字，允許暫時只有正負號或小數點。 */
export declare const isNumberDraft: (text: string, decimal: DecimalOption) => boolean;
/** 將格式化文字的游標位置換算為編輯位置；移除的尾端補零收斂至字尾。 */
export declare const mapNumberInputPosition: (formatted: string, position: number, editable: string) => number;
