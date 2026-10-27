import type { ShuoComponentDefaults, ShuoComponentDefaultsOf, ShuoComponentName } from '../types/component-defaults.js';
/** 元件內建預設值；元件的 `withDefaults` 引用同一份常數，避免兩邊數值不同。值為 `undefined` 的項目沿用底層元件的預設。 */
export declare const BUILT_IN_DEFAULTS: {
    inputText: {
        size: "lg";
        hideMaskToggle: false;
        revealIcon: string;
        concealIcon: string;
    };
    inputNumber: {
        size: "lg";
        unit: false;
        thousandSeparator: true;
    };
    textarea: {
        size: "lg";
        autoresize: undefined;
        rows: undefined;
        maxrows: undefined;
        fixed: undefined;
    };
    file: {
        size: "lg";
        clearIcon: string;
        downloadIcon: string;
        selectIcon: string;
    };
    months: {
        size: "lg";
    };
    phone: {
        size: "lg";
    };
    selectMenu: {
        size: "lg";
        format: string;
        emptyValue: "";
        labelKey: string;
        valueKey: string;
    };
    checkbox: {
        size: "lg";
        trueValue: number;
        falseValue: number;
    };
    switch: {
        size: "lg";
        color: undefined;
        loadingIcon: undefined;
    };
    radioGroup: {
        size: "lg";
        orientation: "auto";
        breakpoint: "md";
        ui: undefined;
        labelKey: string;
        valueKey: string;
    };
    checkboxGroup: {
        size: "lg";
        orientation: "auto";
        breakpoint: "md";
        ui: undefined;
        labelKey: string;
        valueKey: string;
    };
    datepicker: {
        size: "lg";
        clearable: false;
        calendarIcon: string;
        clearIcon: string;
        roc: true;
        separator: string;
        yearRange: [number, number];
    };
    queryCard: {
        icon: string;
        expandIcon: string;
        collapseIcon: string;
        validateOn: undefined;
        ui: undefined;
    };
    table: {
        selectAll: true;
        checkboxProps: undefined;
    };
    listCard: {
        icon: string;
        pageSize: number;
        showPagination: true;
        showSummary: true;
        transition: true;
        ui: undefined;
    };
    infoTooltip: {
        icon: string;
    };
    tooltip: {
        touch: true;
    };
};
/** 實際生效的預設值：有內建預設的項目必定有值，內建為 `undefined` 的項目可能仍為 `undefined`。 */
export type ResolvedShuoDefault<C extends ShuoComponentName, K extends keyof ShuoComponentDefaultsOf<C>> = undefined extends (typeof BUILT_IN_DEFAULTS)[C][K & keyof (typeof BUILT_IN_DEFAULTS)[C]] ? ShuoComponentDefaultsOf<C>[K] : Exclude<ShuoComponentDefaultsOf<C>[K], undefined>;
/**
 * 套用全站元件預設值；由 Nuxt 外掛在啟動時呼叫，單元測試可直接呼叫。
 * 只保存白名單內且不是 `undefined` 的項目，白名單外的元件或 prop 忽略並警告；`inputNumber.unit` 只接受 boolean。
 */
export declare const setShuoComponentDefaults: (defaults?: ShuoComponentDefaults, warn?: (message: string) => void) => void;
/** 取得目前的全站元件預設值（只含使用端設定的項目，不含元件內建預設）。 */
export declare const getShuoComponentDefaults: () => ShuoComponentDefaults;
/**
 * 取得元件某個 prop 實際生效的預設值：全站設定 ?? 元件內建預設。
 * 例如頁面送給後端的每頁筆數：`resolveShuoDefault('listCard', 'pageSize')`。
 */
export declare const resolveShuoDefault: <C extends ShuoComponentName, K extends keyof ShuoComponentDefaultsOf<C>>(name: C, key: K) => ResolvedShuoDefault<C, K>;
/**
 * 包裝元件 props：白名單內且未明確傳入的 prop 改讀全站預設，`ui` 依 slot 合併；其他 prop 一律回傳原值。
 * `isExplicit` 由呼叫端提供，單元測試可直接傳入假的判斷函式。
 * Proxy 的 `has`、`ownKeys` 只反映原始 props，需要整包轉傳時要逐一列出鍵，不能用 `{ ...resolved }`。
 */
export declare const resolveComponentProps: <T extends object>(name: ShuoComponentName, props: T, isExplicit: (key: string) => boolean) => T;
