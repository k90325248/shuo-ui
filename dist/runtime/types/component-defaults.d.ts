import type { CheckboxGroupProps, CheckboxProps, DatepickerProps, FileProps, InfoTooltipProps, InputNumberProps, InputTextProps, ListCardProps, MonthsProps, PhoneProps, QueryCardProps, RadioGroupProps, SelectMenuProps, TextareaProps } from './components.js';
/** 可設定全站預設值的 prop 白名單；型別與執行時過濾共用這份清單。 */
export declare const COMPONENT_DEFAULT_KEYS: {
    readonly inputText: readonly ["size", "hideMaskToggle", "revealIcon", "concealIcon"];
    readonly inputNumber: readonly ["size", "unit", "thousandSeparator"];
    readonly textarea: readonly ["size", "autoresize", "rows", "maxrows", "fixed"];
    readonly file: readonly ["size", "clearIcon", "downloadIcon", "selectIcon"];
    readonly months: readonly ["size"];
    readonly phone: readonly ["size"];
    readonly selectMenu: readonly ["size", "format", "emptyValue", "labelKey", "valueKey"];
    readonly checkbox: readonly ["size", "trueValue", "falseValue"];
    readonly radioGroup: readonly ["size", "orientation", "breakpoint", "ui", "labelKey", "valueKey"];
    readonly checkboxGroup: readonly ["size", "orientation", "breakpoint", "ui", "labelKey", "valueKey"];
    readonly datepicker: readonly ["size", "clearable", "calendarIcon", "clearIcon", "roc", "separator", "yearRange"];
    readonly queryCard: readonly ["icon", "expandIcon", "collapseIcon", "validateOn", "ui"];
    readonly listCard: readonly ["icon", "pageSize", "showPagination", "showSummary", "transition", "ui"];
    readonly infoTooltip: readonly ["icon"];
};
/** 元件鍵名與 props 型別對照 */
interface ShuoComponentPropsMap {
    /** 文字輸入 */
    inputText: InputTextProps;
    /** 數字輸入 */
    inputNumber: InputNumberProps;
    /** 多行文字輸入 */
    textarea: TextareaProps;
    /** 檔案選擇 */
    file: FileProps;
    /** 月數輸入 */
    months: MonthsProps;
    /** 市話號碼 */
    phone: PhoneProps;
    /** 下拉選單（泛型參數不影響可設定項目的型別） */
    selectMenu: SelectMenuProps;
    /** 核取方塊 */
    checkbox: CheckboxProps;
    /** 單選群組 */
    radioGroup: RadioGroupProps;
    /** 複選群組 */
    checkboxGroup: CheckboxGroupProps;
    /** 日期選擇器 */
    datepicker: DatepickerProps;
    /** 查詢條件卡片 */
    queryCard: QueryCardProps;
    /** 清單卡片 */
    listCard: ListCardProps;
    /** 資訊提示 */
    infoTooltip: InfoTooltipProps;
}
/** 可全站設定的元件鍵名 */
export type ShuoComponentName = keyof typeof COMPONENT_DEFAULT_KEYS;
/** 單一元件的白名單 prop 名稱 */
type DefaultKey<C extends ShuoComponentName> = (typeof COMPONENT_DEFAULT_KEYS)[C][number];
/** 依白名單從元件 props 取出的可設定項目，型別直接取自元件 props */
type PickDefaults<C extends ShuoComponentName> = {
    [K in DefaultKey<C> & keyof ShuoComponentPropsMap[C]]?: ShuoComponentPropsMap[C][K];
};
/** 全站設定的型別和 prop 不同的項目 */
interface ShuoComponentDefaultsOverrides {
    /** 數字輸入：`unit` 只決定預設是否顯示單位，文字來自 `messages.inputNumber.unit` */
    inputNumber: {
        /** 是否顯示單位 */
        unit?: boolean;
    };
    /** 下拉選單：prop 型別 `GetItemKeys<T>` 依選項推導，全站設定沒有選項可推導，改為字串 */
    selectMenu: {
        /** 顯示名稱欄位 */
        labelKey?: string;
        /** 綁定值欄位 */
        valueKey?: string;
    };
}
/** 全站元件預設值，每個元件只能設定白名單內的 prop */
export type ShuoComponentDefaults = {
    [C in ShuoComponentName]?: C extends keyof ShuoComponentDefaultsOverrides ? Omit<PickDefaults<C>, keyof ShuoComponentDefaultsOverrides[C]> & ShuoComponentDefaultsOverrides[C] : PickDefaults<C>;
};
/** 單一元件可設定的全站預設值 */
export type ShuoComponentDefaultsOf<C extends ShuoComponentName> = NonNullable<ShuoComponentDefaults[C]>;
export {};
