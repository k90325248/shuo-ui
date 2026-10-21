/** 元件庫內建文案，預設為繁體中文；可由模組設定 `shuoUi.messages` 局部覆寫。 */
export declare const defaultMessages: {
    /** 驗證規則訊息，`{label}` 會替換為欄位名稱、`{min}` 為下限 */
    validation: {
        required: string;
        invalidNumber: string;
        invalidFormat: string;
        minValue: string;
    };
    checkbox: {
        label: string;
    };
    file: {
        placeholder: string;
        clear: string;
        download: string;
        select: string;
        downloadFailedTitle: string;
        downloadFailedDescription: string;
    };
    inputNumber: {
        unit: string;
    };
    inputText: {
        hide: string;
        show: string;
    };
    phone: {
        areaCode: string;
        number: string;
    };
    months: {
        total: string;
        years: string;
        months: string;
    };
    selectMenu: {
        searchPlaceholder: string;
    };
    infoTooltip: {
        label: string;
    };
    queryCard: {
        title: string;
        collapse: string;
        expand: string;
        submit: string;
    };
    list: {
        title: string;
        empty: string;
        loading: string;
        /** `{total}` 為總筆數，`{start}`、`{end}` 為目前顯示的起訖筆數 */
        summary: string;
    };
    datepicker: {
        hours: string;
        minutes: string;
        seconds: string;
        menu: string;
        calendarIcon: string;
        clearInput: string;
        toggleOverlay: string;
        monthPicker: string;
        yearPicker: string;
        nextMonth: string;
        prevMonth: string;
        nextYear: string;
        prevYear: string;
        openMonthsOverlay: string;
        openYearsOverlay: string;
        openTimePicker: string;
        closeTimePicker: string;
        timePicker: string;
        /** 以下四項的 `{unit}` 會替換為時、分、秒 */
        openTpOverlay: string;
        timeOverlay: string;
        incrementValue: string;
        decrementValue: string;
    };
};
/** 文案結構 */
export type ShuoMessages = typeof defaultMessages;
/** 可局部覆寫的文案 */
export type ShuoMessagesOverride = {
    [K in keyof ShuoMessages]?: Partial<ShuoMessages[K]>;
};
/** 以覆寫值合併預設文案；由 Nuxt 外掛於啟動時呼叫，單元測試可直接呼叫。 */
export declare const setShuoMessages: (override?: ShuoMessagesOverride) => void;
/** 取得目前文案；元件以函式預設值延遲讀取，確保外掛已先套用。 */
export declare const getShuoMessages: () => ShuoMessages;
/** 替換文案中的 `{name}` 佔位符。 */
export declare const formatMessage: (template: string, params?: Record<string, string | number>) => string;
