# 設定與自定義

## 模組選項

在 `nuxt.config.ts` 以 `shuoUi` 設定：

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@shuo/ui'],
  shuoUi: {
    prefix: 'Shuo',
    theme: true,
    css: true,
    messages: {}
  }
});
```

| 選項       | 型別      | 預設   | 說明                                                                 |
| ---------- | --------- | ------ | -------------------------------------------------------------------- |
| `prefix`   | `string`  | `Shuo` | 元件名稱前綴。改為 `My` 後使用 `<MyInputText>`。                     |
| `theme`    | `boolean` | `true` | 是否套用內建 Nuxt UI 主題（見下方）。`false` 表示完全交給專案決定。  |
| `css`      | `boolean` | `true` | 是否載入預設 CSS 變數（`--ui-form-*`）。`false` 表示由專案自行定義。 |
| `messages` | `object`  | `{}`   | 覆寫內建文案，只需寫要修改的項目。                                   |

## 樣式與主題

### 1. 顏色來自你的專案

元件只使用 Nuxt UI 的語意色（`primary`、`neutral`、`error` 等）與 CSS 變數，不寫死顏色。在專案的 `app.config.ts` 設定主題色即可：

```ts
export default defineAppConfig({
  ui: { colors: { primary: 'blue', neutral: 'slate' } }
});
```

### 2. 表單色票（CSS 變數）

預設值如下，在你的 CSS 重新定義即可覆寫（模組載入的預設值權重最低）：

```css
:root {
  --ui-form-border: var(--ui-color-primary-700); /* 輸入框邊框 */
  --ui-form-disabled-text: var(--color-gray-600); /* 停用文字 */
  --ui-form-disabled-border: var(--color-gray-400); /* 停用邊框 */
  --ui-form-disabled-bg: var(--color-gray-100); /* 停用背景 */
}
```

### 3. 內建主題

`theme: true` 時，模組以 `defu` 把下列 Nuxt UI 主題當作**預設值**加入 `appConfig.ui`；專案 `app.config.ts` 的 `ui` 設定優先。

| 元件                                        | 內容                                            |
| ------------------------------------------- | ----------------------------------------------- |
| `input`、`textarea`、`select`、`selectMenu` | 邊框使用 `--ui-form-border`，停用時使用停用色票 |
| `checkbox`、`radioGroup`                    | 停用時保留勾選狀態，文字可換行                  |
| `formField`                                 | 預設尺寸 `lg`、標題單行省略、錯誤訊息嵌在下邊線 |

想改其中一項，在 `app.config.ts` 覆寫即可：

```ts
export default defineAppConfig({
  ui: {
    formField: {
      slots: { error: 'text-xs text-error' } // 改成一般樣式的錯誤訊息
    }
  }
});
```

完全不要內建主題：`shuoUi: { theme: false }`，再自行設定 `ui.input`、`ui.formField` 等。

### 4. 單一元件的 `ui` prop

可以傳入 `ui` 的元件（例如 `ShuoCheckboxGroup`、`ShuoRadioGroup`）沿用 Nuxt UI 的 `ui` slots 覆寫；其餘元件的 HTML attributes（`class`、`style`）套用在外層。

## 文案覆寫

預設文案為繁體中文，涵蓋驗證訊息、無障礙名稱（aria-label）、提示文字與日期選擇器文案。只需寫要改的項目：

```ts
export default defineNuxtConfig({
  shuoUi: {
    messages: {
      validation: {
        required: '{label} is required',
        invalidNumber: '{label} must be a valid number',
        invalidFormat: '{label} is invalid',
        minValue: '{label} must not be less than {min}'
      },
      file: { placeholder: 'Choose a file' },
      list: { title: 'Results', empty: 'No data' },
      queryCard: { title: 'Filters', collapse: 'Collapse ', expand: 'Expand ' }
    }
  }
});
```

`{label}`、`{min}`、`{unit}` 是佔位符，會在使用時替換。完整可覆寫的結構如下：

| 區塊          | 項目                                                                                                                                                                                                                                                                                                                                |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `validation`  | `required`、`invalidNumber`、`invalidFormat`、`minValue`                                                                                                                                                                                                                                                                            |
| `checkbox`    | `label`                                                                                                                                                                                                                                                                                                                             |
| `file`        | `placeholder`、`clear`、`download`、`select`、`downloadFailedTitle`、`downloadFailedDescription`                                                                                                                                                                                                                                    |
| `inputNumber` | `unit`（`unit` 為 `true` 時顯示的文字）                                                                                                                                                                                                                                                                                             |
| `inputText`   | `hide`、`show`（遮蔽顯示按鈕）                                                                                                                                                                                                                                                                                                      |
| `phone`       | `areaCode`、`number`                                                                                                                                                                                                                                                                                                                |
| `months`      | `total`、`years`、`months`                                                                                                                                                                                                                                                                                                          |
| `selectMenu`  | `searchPlaceholder`                                                                                                                                                                                                                                                                                                                 |
| `infoTooltip` | `label`                                                                                                                                                                                                                                                                                                                             |
| `queryCard`   | `title`、`collapse`、`expand`                                                                                                                                                                                                                                                                                                       |
| `list`        | `title`、`empty`                                                                                                                                                                                                                                                                                                                    |
| `datepicker`  | `hours`、`minutes`、`seconds`、`menu`、`calendarIcon`、`clearInput`、`toggleOverlay`、`monthPicker`、`yearPicker`、`nextMonth`、`prevMonth`、`nextYear`、`prevYear`、`openMonthsOverlay`、`openYearsOverlay`、`openTimePicker`、`closeTimePicker`、`timePicker`、`openTpOverlay`、`timeOverlay`、`incrementValue`、`decrementValue` |

預設值可在 `node_modules/@shuo/ui/dist/runtime/utils/messages.js` 查看。

單一元件也可直接用 prop 覆寫，例如 `<ShuoFile placeholder="..." />`、`<ShuoList title="..." empty="..." />`，優先於模組設定。

## 自動匯入

模組自動匯入 `dist/runtime/utils` 與 `dist/runtime/composables`，無須 import：

| 名稱                                                                                            | 說明                                          |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `requiredText`、`requiredNumber`、`requiredArray`、`optionalEmail`、`optionalNonNegativeNumber` | Valibot 驗證規則，見[表單驗證](validation.md) |
| `formatDateDisplay`、`parseDateValue`、`getDateModelFormat`、`isValidDateSeparator` 等          | 日期格式與解析                                |
| `formatNumberDisplay`、`toNumberText`、`getDecimalPlaces`                                       | 數字顯示                                      |
| `filterPhoneInput`、`joinPhone`、`splitPhone`                                                   | 電話號碼                                      |
| `useChoiceGroup`、`useTruncatedText`                                                            | 排列與文字省略                                |
| `setShuoMessages`、`getShuoMessages`                                                            | 文案（通常不需直接使用）                      |

型別可由別名 `#shuo-ui` 匯入：

```ts
import type { DatepickerValue } from '#shuo-ui/components/ShuoDatepicker.vue';
import type { PageRequest } from '#shuo-ui/types/pagination';
```

## 與 Nuxt UI 搭配的注意事項

- 表單欄位建議外包 `UFormField` 並設定 `name`，元件會透過 `useFormField` 接入 id、name、size、停用與錯誤狀態，並在 input、blur、change 時觸發驗證。
- 圖示使用 Iconify（`i-lucide-*`）。若專案停用執行期圖示 API，請安裝 `@iconify-json/lucide` 並確認圖示已進入 client bundle。
