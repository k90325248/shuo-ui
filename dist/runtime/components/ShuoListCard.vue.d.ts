import type { TableData } from '@nuxt/ui';
import type { PageRequest } from '../types/pagination.js';
import type { TableRowKey } from '../utils/table-selection.js';
import type { ListCardProps } from '../types/components.js';
export type { ListCardProps, ListCardUi, TableCheckboxProps } from '../types/components.js';
declare const __VLS_export: <T extends TableData>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<(ListCardProps<T> & {
        selected?: TableRowKey[];
    }) & {
        "onUpdate:selected"?: ((value: TableRowKey[]) => any) | undefined;
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
        footer?: (props: {
            interactionDisabled: boolean;
        }) => any;
    };
    emit: ((evt: "page-change", pagination: PageRequest) => void) & ((event: "update:selected", value: TableRowKey[]) => void);
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
