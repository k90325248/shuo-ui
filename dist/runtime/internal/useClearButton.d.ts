import type { ComputedRef } from 'vue';
/**
 * 決定清除按鈕是否顯示：明確傳入的 clear > 外層 UFormField 有 required 時關閉 > 全站預設 > 內建預設（開啟）。
 * - `props` 必須是原始 props（不經 useShuoComponentProps），才能分辨明確傳入與全站預設。
 * - required 讀 UFormField 實例的 props（響應式），欄位切換必填時跟著更新；只在 schema 設必填、欄位沒寫 required 時無法判斷。
 */
export declare const useClearButton: (name: "selectMenu" | "datepicker", props: {
    clear?: boolean;
}) => ComputedRef<boolean>;
