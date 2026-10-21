import type { FormErrorEvent, FormProps, FormSchema, FormSubmitEvent, InferOutput } from '@nuxt/ui';
declare const __VLS_export: <S extends FormSchema>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<({
        /** 標題 */
        title?: string;
        /** 標題圖示 */
        icon?: string;
        /** 表單資料，由使用頁面管理與重設 */
        state: FormProps<S>["state"];
        /** 表單驗證規則 */
        schema?: S;
        /** 自訂驗證方法 */
        validate?: FormProps<S>["validate"];
        /** 觸發驗證的輸入事件 */
        validateOn?: FormProps<S>["validateOn"];
        /** 是否停用表單 */
        disabled?: boolean;
    } & {
        open?: boolean;
    }) & {
        onClear?: (() => any) | undefined;
        onError?: ((event: FormErrorEvent) => any) | undefined;
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
    emit: (((evt: "clear") => void) & ((evt: "error", event: FormErrorEvent) => void) & ((evt: "submit", event: FormSubmitEvent<InferOutput<S>>) => void)) & ((event: "update:open", value: boolean) => void);
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
