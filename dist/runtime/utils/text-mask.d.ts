/** 文字遮蔽參數：true 全碼遮蔽，正整數遮蔽末尾指定碼數。 */
export type TextMask = boolean | number;
/** 取得有效遮蔽碼數；false、0、負數或非有限數值不啟用。 */
export declare const getMaskCount: (mask: TextMask | undefined) => number;
/** 拆分可見前綴及遮蔽尾碼，以 Unicode code point 計數，避免拆開代理字元。 */
export declare const splitMaskedText: (value: string, mask: TextMask | undefined) => {
    prefix: string;
    suffix: string;
    count: number;
};
