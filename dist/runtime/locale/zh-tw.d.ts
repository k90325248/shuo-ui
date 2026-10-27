/** 繁體中文（內建預設語系） */
declare const _default: {
    code: string;
    name: string;
    /** 日期選擇器日曆的月份、星期名稱 */
    dateLocale: import("date-fns").Locale;
    /** 元件文案 */
    messages: {
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
            yearUnit: string;
            monthUnit: string;
        };
        selectMenu: {
            searchPlaceholder: string;
            empty: string;
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
        table: {
            empty: string;
            loading: string;
            /** 勾選欄表頭的全選核取方塊 */
            selectAll: string;
            /** 每列的勾選核取方塊 */
            selectRow: string;
            /** 關閉全選時的勾選欄表頭文字 */
            selectionHeader: string;
        };
        listCard: {
            title: string;
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
            /** 年份清單與年份按鈕，`{year}` 為年份 */
            yearOption: string;
            /** 範圍選擇時起迄日期之間的分隔 */
            rangeSeparator: string;
        };
        /** 日期顯示的年、年月單位（日期選擇器的年、年月模式），`{year}`、`{month}` 為年份與兩位數月份 */
        date: {
            year: string;
            month: string;
        };
    };
};
export default _default;
