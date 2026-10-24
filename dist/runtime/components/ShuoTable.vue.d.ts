import type { TableData } from '@nuxt/ui';
import type { ShuoTableProps } from '../types/components.js';
export type { ShuoTableProps } from '../types/components.js';
declare const __VLS_export: <T extends TableData>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<ShuoTableProps<T>> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
        [x: string]: ((props: any) => any) | undefined;
    } & {
        'body-top'?: (props: {
            interactionDisabled: boolean;
        }) => any;
    } & {
        loading?: (props: {}) => any;
    } & {
        empty?: (props: {}) => any;
    };
    emit: {};
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
