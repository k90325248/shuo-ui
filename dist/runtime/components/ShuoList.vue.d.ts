import type { TableColumn, TableData, TableProps } from '@nuxt/ui';
import type { PageRequest } from '../types/pagination.js';
declare const __VLS_export: <T extends TableData>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<{
        /** 清單標題 */
        title?: string;
        /** 標題圖示，空字串可隱藏 */
        icon?: string;
        /** 已完成查詢的資料，重新查詢期間請保留原值 */
        data: T[];
        /** 欄位設定，內容可透過對應 cell slot 自訂 */
        columns: TableColumn<T>[];
        /** 是否正在查詢 */
        loading?: boolean;
        /** 空資料說明 */
        empty?: string;
        /** 後端回傳的總筆數 */
        total?: number;
        /** 目前已載入的頁碼，從 1 起算 */
        page?: number;
        /** 每頁筆數，預設為 10 */
        pageSize?: number;
        /** 是否顯示分頁，只有一頁仍顯示 */
        showPagination?: boolean;
        /** 是否顯示筆數與範圍 */
        showSummary?: boolean;
        /** 額外 Table 設定 */
        tableProps?: Partial<TableProps<T>>;
    } & {
        "onPage-change"?: ((pagination: PageRequest) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: import("vue").ShallowUnwrapRef<{
        getPagination: (page?: number) => PageRequest;
    }>) => void;
    attrs: any;
    slots: {
        [x: string]: ((props: any) => any) | undefined;
    } & {
        title?: (props: {}) => any;
    } & {
        'header-right'?: (props: {
            interactionDisabled: boolean;
        }) => any;
    } & {
        'body-top'?: (props: {
            interactionDisabled: boolean;
        }) => any;
    } & {
        loading?: (props: {}) => any;
    } & {
        empty?: (props: {}) => any;
    } & {
        footer?: (props: {
            interactionDisabled: boolean;
        }) => any;
    };
    emit: (evt: "page-change", pagination: PageRequest) => void;
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
