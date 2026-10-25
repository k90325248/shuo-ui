import { enUS } from "date-fns/locale";
export default {
  code: "en",
  name: "English",
  /** 日期選擇器日曆的月份、星期名稱 */
  dateLocale: enUS,
  /** 元件文案 */
  messages: {
    validation: {
      required: "{label} is required",
      invalidNumber: "{label} must be a valid number",
      invalidFormat: "{label} has an invalid format",
      minValue: "{label} must be at least {min}"
    },
    checkbox: { label: "Enable" },
    file: {
      placeholder: "Select a file",
      clear: "Clear file",
      download: "Download file",
      select: "Select file",
      downloadFailedTitle: "Download failed",
      downloadFailedDescription: "Please try again later."
    },
    inputNumber: { unit: "NTD" },
    inputText: { hide: "Hide content", show: "Show content" },
    phone: { areaCode: "Area code", number: "Phone number" },
    months: { total: "Total months", years: "Years", months: "Months", yearUnit: "yr", monthUnit: "mo" },
    selectMenu: { searchPlaceholder: "Search...", empty: "No options" },
    infoTooltip: { label: "More info" },
    queryCard: { title: "Filters", collapse: "Collapse ", expand: "Expand ", submit: "Search" },
    table: { empty: "No data", loading: "Loading\u2026" },
    listCard: {
      title: "Results",
      summary: "Showing {start} to {end} of {total} results."
    },
    datepicker: {
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      menu: "Select date",
      calendarIcon: "Open calendar",
      clearInput: "Clear date",
      toggleOverlay: "Back to calendar",
      monthPicker: "Month picker",
      yearPicker: "Year picker",
      nextMonth: "Next month",
      prevMonth: "Previous month",
      nextYear: "Next year",
      prevYear: "Previous year",
      openMonthsOverlay: "Select month",
      openYearsOverlay: "Select year",
      openTimePicker: "Select time",
      closeTimePicker: "Back to date",
      timePicker: "Time picker",
      openTpOverlay: "Select {unit}",
      timeOverlay: "{unit} picker",
      incrementValue: "Increase {unit}",
      decrementValue: "Decrease {unit}",
      yearOption: "{year}",
      /** 範圍選擇時起迄日期之間的分隔 */
      rangeSeparator: " \u2013 "
    },
    date: {
      year: "{year}",
      month: "{month}/{year}"
    }
  }
};
