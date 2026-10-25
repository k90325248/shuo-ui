import type { FormErrorEvent, FormSchema, FormSubmitEvent, InferOutput } from '@nuxt/ui';
import type { QueryCardProps } from '../types/components.js';
export type { QueryCardProps, QueryCardUi } from '../types/components.js';
declare const __VLS_export: <S extends FormSchema>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<(QueryCardProps<S> & {
        open?: boolean;
    }) & {
        onError?: ((event: FormErrorEvent) => any) | undefined;
        onClear?: (() => any) | undefined;
        "onUpdate:open"?: ((value: boolean) => any) | undefined;
        onSubmit?: ((event: FormSubmitEvent<InferOutput<S>>) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: import("vue").ShallowUnwrapRef<{
        submit: () => Promise<void>;
        clear: () => Promise<void>;
    }>) => void;
    attrs: any;
    slots: {
        'header-right'?: (props: {}) => any;
    } & {
        default?: (props: {
            state: import("@nuxt/ui").FormState<S> | undefined;
            errors: any;
            loading: any;
        }) => any;
    } & {
        actions?: (props: {
            submit: () => Promise<void>;
            clear: () => Promise<void>;
            loading: any;
        }) => any;
    };
    emit: (((evt: "error", event: FormErrorEvent) => void) & ((evt: "clear") => void) & ((evt: "submit", event: FormSubmitEvent<InferOutput<S>>) => void)) & ((event: "update:open", value: boolean) => void);
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
