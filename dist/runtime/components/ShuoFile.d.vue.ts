import type { InputProps } from '@nuxt/ui';
/** 單檔選擇與下載元件參數 */
export interface FileProps {
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 允許選取的檔案類型，沿用原生 accept 格式；只篩選選檔對話框，不阻擋其他類型，類型限制須由表單規則驗證。 */
    accept?: string;
    /** 未選檔時的提示文字 */
    placeholder?: string;
    /** 既有附件名稱，沒有本機 File 時顯示此名稱。 */
    fileName?: string;
    /** 既有附件下載 API 網址，以 Blob 取得內容；跨來源網址須允許 CORS。 */
    fileUrl?: string;
    /** 輸入框尺寸 */
    size?: InputProps['size'];
    /** 是否停用選檔並隱藏移除按鈕；已有附件仍可下載 */
    disabled?: boolean;
    /** 是否顯示載入中，以轉圈圖示取代尾端按鈕，並停用選檔、清除與下載 */
    loading?: boolean;
}
type __VLS_Props = FileProps;
type __VLS_ModelProps = {
    modelValue: File | null;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: File | null) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: File | null) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
