import type { GetItemKeys, SelectMenuItem, SelectMenuProps as USelectMenuProps } from '@nuxt/ui';
/** 下拉選項 */
export interface SelectMenuOption {
    /** 顯示名稱 */
    label: string;
    /** 綁定值 */
    value: string;
}
/** 單選未選取時的綁定值 */
export type SelectMenuEmptyValue = '' | null;
declare const __VLS_export: <T extends SelectMenuItem[], VK extends GetItemKeys<T> = GetItemKeys<T>, M extends boolean = false>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<({
        /** 輸入框識別碼 */
        id?: string;
        /** 欄位名稱 */
        name?: string;
        /** 元件尺寸，預設 lg */
        size?: USelectMenuProps<T, VK, M>["size"];
        /** 元件顏色 */
        color?: USelectMenuProps<T, VK, M>["color"];
        /** 是否強調外框 */
        highlight?: boolean;
        /** 提示文字 */
        placeholder?: string;
        /** 是否開啟選單，未設定時由元件管理 */
        open?: boolean;
        /** 是否顯示與原控制項同尺寸的骨架 */
        skeleton?: boolean;
        /** 選項清單，字串選項同時作為顯示名稱與綁定值 */
        items: T;
        /** 顯示名稱欄位，預設 label */
        labelKey?: GetItemKeys<T>;
        /** 綁定值欄位，預設 value */
        valueKey?: VK;
        /** 是否允許多選，綁定值改為陣列 */
        multiple?: M;
        /** 顯示格式，支援 {value} 與 {label} 替換 */
        format?: string;
        /** 是否停用選單 */
        disabled?: boolean;
        /** 是否顯示載入中，以轉圈圖示取代尾端箭頭並停用選單 */
        loading?: boolean;
        /** 單選未選取時的綁定值，預設空字串；多選固定為空陣列 */
        emptyValue?: SelectMenuEmptyValue;
    } & {
        modelValue?: USelectMenuProps<T, VK, M>["modelValue"] | SelectMenuEmptyValue;
    }) & {
        "onUpdate:modelValue"?: ((value: SelectMenuEmptyValue | import("@nuxt/ui").GetModelValue<T, VK, M, {
            type: "label" | "separator";
        }> | (M extends false ? never : never) | undefined) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {};
    emit: (event: "update:modelValue", value: SelectMenuEmptyValue | import("@nuxt/ui").GetModelValue<T, VK, M, {
        type: "label" | "separator";
    }> | (M extends false ? never : never) | undefined) => void;
}>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_PrettifyLocal<T> = (T extends any ? {
    [K in keyof T]: T[K];
} : {
    [K in keyof T as K]: T[K];
}) & {};
