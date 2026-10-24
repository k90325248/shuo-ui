/** 電話輸入過濾後的文字與游標位置 */
export interface PhoneInput {
    /** 只包含半形數字的字串，保留開頭的 0。 */
    value: string;
    /** 過濾後的游標位置 */
    cursor: number;
}
/** 過濾輸入或貼上的非數字，依游標左側保留的數字計算新位置。 */
export declare const filterPhoneInput: (value: string, cursor?: number) => PhoneInput;
/** 合併區碼與電話，不加入分隔符號；兩者未初始化時保留 undefined。 */
export declare const joinPhone: (areaCode: string | undefined, number: string | undefined) => string | undefined;
/** 依已知區碼拆分完整號碼；無法確定區碼時保留全文於電話欄位，不猜測區碼長度。 */
export declare const splitPhone: (value: string | undefined, areaCode: string | undefined) => {
    areaCode: string | undefined;
    number: string | undefined;
};
