import type { InfoTooltipProps } from '../types/components.js';
export type { InfoTooltipProps, InfoTooltipUi } from '../types/components.js';
declare var __VLS_13: {};
type __VLS_Slots = {} & {
    content?: (props: typeof __VLS_13) => any;
};
declare const __VLS_base: import("vue").DefineComponent<InfoTooltipProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<InfoTooltipProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
