import { zhTW } from "date-fns/locale";
export default {
  code: "zh-TW",
  name: "\u7E41\u9AD4\u4E2D\u6587",
  /** 日期選擇器日曆的月份、星期名稱 */
  dateLocale: zhTW,
  /** 元件文案 */
  messages: {
    /** 驗證規則訊息，`{label}` 會替換為欄位名稱、`{min}` 為下限 */
    validation: {
      required: "{label} \u70BA\u5FC5\u586B",
      invalidNumber: "{label} \u5FC5\u9808\u662F\u6709\u6548\u6578\u5B57",
      invalidFormat: "{label} \u683C\u5F0F\u932F\u8AA4",
      minValue: "{label} \u4E0D\u53EF\u5C0F\u65BC {min}"
    },
    checkbox: { label: "\u555F\u7528" },
    file: {
      placeholder: "\u8ACB\u9078\u64C7\u6A94\u6848",
      clear: "\u6E05\u9664\u6A94\u6848",
      download: "\u4E0B\u8F09\u6A94\u6848",
      select: "\u9078\u64C7\u6A94\u6848",
      downloadFailedTitle: "\u6A94\u6848\u4E0B\u8F09\u5931\u6557",
      downloadFailedDescription: "\u8ACB\u7A0D\u5F8C\u518D\u8A66\u3002"
    },
    inputNumber: { unit: "\u5143" },
    inputText: { hide: "\u96B1\u85CF\u5167\u5BB9", show: "\u986F\u793A\u5167\u5BB9" },
    phone: { areaCode: "\u5340\u78BC", number: "\u96FB\u8A71\u865F\u78BC" },
    months: { total: "\u7E3D\u6708\u6578", years: "\u5E74\u6578", months: "\u6708\u6578", yearUnit: "\u5E74", monthUnit: "\u6708" },
    selectMenu: { searchPlaceholder: "\u95DC\u9375\u5B57\u67E5\u8A62...", empty: "\u7121\u53EF\u7528\u9078\u9805" },
    infoTooltip: { label: "\u8CC7\u8A0A\u8AAA\u660E" },
    queryCard: { title: "\u67E5\u8A62\u689D\u4EF6", collapse: "\u6536\u5408", expand: "\u5C55\u958B", submit: "\u67E5\u8A62" },
    table: {
      empty: "\u67E5\u7121\u8CC7\u6599",
      loading: "\u67E5\u8A62\u4E2D\u2026",
      /** 勾選欄表頭的全選核取方塊 */
      selectAll: "\u5168\u9078",
      /** 每列的勾選核取方塊 */
      selectRow: "\u9078\u53D6\u6B64\u5217",
      /** 關閉全選時的勾選欄表頭文字 */
      selectionHeader: ""
    },
    listCard: {
      title: "\u67E5\u8A62\u7D50\u679C",
      /** `{total}` 為總筆數，`{start}`、`{end}` 為目前顯示的起訖筆數 */
      summary: "\u5171\u6709 {total} \u7B46\u8CC7\u6599, \u76EE\u524D\u986F\u793A\u7B2C {start} \u7B46\u81F3\u7B2C {end} \u7B46\u8CC7\u6599\u3002"
    },
    datepicker: {
      hours: "\u6642",
      minutes: "\u5206",
      seconds: "\u79D2",
      menu: "\u9078\u64C7\u65E5\u671F",
      calendarIcon: "\u958B\u555F\u65E5\u66C6",
      clearInput: "\u6E05\u9664\u65E5\u671F",
      toggleOverlay: "\u8FD4\u56DE\u65E5\u66C6",
      monthPicker: "\u6708\u4EFD\u9078\u55AE",
      yearPicker: "\u5E74\u4EFD\u9078\u55AE",
      nextMonth: "\u4E0B\u4E00\u500B\u6708",
      prevMonth: "\u4E0A\u4E00\u500B\u6708",
      nextYear: "\u4E0B\u4E00\u5E74",
      prevYear: "\u4E0A\u4E00\u5E74",
      openMonthsOverlay: "\u9078\u64C7\u6708\u4EFD",
      openYearsOverlay: "\u9078\u64C7\u5E74\u4EFD",
      openTimePicker: "\u9078\u64C7\u6642\u9593",
      closeTimePicker: "\u8FD4\u56DE\u65E5\u671F",
      timePicker: "\u6642\u9593\u9078\u55AE",
      /** 以下四項的 `{unit}` 會替換為時、分、秒 */
      openTpOverlay: "\u9078\u64C7{unit}",
      timeOverlay: "{unit}\u9078\u55AE",
      incrementValue: "\u589E\u52A0{unit}",
      decrementValue: "\u6E1B\u5C11{unit}",
      /** 年份清單與年份按鈕，`{year}` 為年份 */
      yearOption: "{year}\u5E74",
      /** 範圍選擇時起迄日期之間的分隔 */
      rangeSeparator: " \uFF5E "
    },
    /** 日期顯示的年、年月單位（日期選擇器的年、年月模式），`{year}`、`{month}` 為年份與兩位數月份 */
    date: {
      year: "{year} \u5E74",
      month: "{year} \u5E74 {month} \u6708"
    }
  }
};
