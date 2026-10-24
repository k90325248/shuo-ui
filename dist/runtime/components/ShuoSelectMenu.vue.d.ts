import type { GetItemKeys, SelectMenuItem, SelectMenuProps as USelectMenuProps, SelectMenuSlots as USelectMenuSlots } from '@nuxt/ui';
import type { SelectMenuEmptyValue, SelectMenuProps } from '../types/components.js';
export type { SelectMenuProps, SelectMenuOption, SelectMenuEmptyValue, SelectMenuUi } from '../types/components.js';
declare const __VLS_export: <T extends SelectMenuItem[], VK extends GetItemKeys<T> = GetItemKeys<T>, M extends boolean = false>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<(SelectMenuProps<T, VK, M> & {
        modelValue?: USelectMenuProps<T, VK, M>["modelValue"] | SelectMenuEmptyValue;
    }) & {
        "onUpdate:modelValue"?: ((value: SelectMenuEmptyValue | import("@nuxt/ui").GetModelValue<T, VK, M, {
            type: "label" | "separator";
        }> | (M extends false ? never : never) | undefined) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: import("vue").ShallowUnwrapRef<{
        triggerRef: any;
        viewportRef: any;
    }>) => void;
    attrs: any;
    slots: USelectMenuSlots<T, VK, M, Omit<import("@nuxt/ui").ModelModifiers, "lazy">, false, import("@nuxt/ui").NestedItem<T>>;
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
