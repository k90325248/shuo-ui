/** 後端分頁查詢參數 */
export interface PageRequest {
    /** 頁碼，從 1 起算 */
    PageNumber: number;
    /** 每頁筆數 */
    PageSize: number;
}
