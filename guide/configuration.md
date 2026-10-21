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

`ShuoCheckboxGroup`、`ShuoRadioGroup` 宣告 `ui` prop，`ShuoInputText`、`ShuoTextarea`、`ShuoCheckbox` 也會把傳入的 `ui` 與元件自身的樣式合併後交給內部的 Nuxt UI 元件，寫法同 Nuxt UI 的 `ui` slots。其餘元件請以 `app.config.ts` 的主題覆寫；`class`、`style` 套用在元件外層。

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
      list: {
        title: 'Results',
        empty: 'No data',
        loading: 'Loading…',
        summary: '{start}–{end} of {total}'
      },
      queryCard: { title: 'Filters', collapse: 'Collapse ', expand: 'Expand ' }
    }
  }
});
```

`{label}`、`{min}`、`{unit}`、`{total}`、`{start}`、`{end}` 是佔位符，會在使用時替換。完整可覆寫的結構如下：

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
| `queryCard`   | `title`、`collapse`、`expand`、`submit`（隱藏送出按鈕的名稱）                                                                                                                                                                                                                                                                       |
| `list`        | `title`、`empty`、`loading`（查詢中文字）、`summary`（筆數統計，`{total}`、`{start}`、`{end}`）                                                                                                                                                                                                                                     |
| `datepicker`  | `hours`、`minutes`、`seconds`、`menu`、`calendarIcon`、`clearInput`、`toggleOverlay`、`monthPicker`、`yearPicker`、`nextMonth`、`prevMonth`、`nextYear`、`prevYear`、`openMonthsOverlay`、`openYearsOverlay`、`openTimePicker`、`closeTimePicker`、`timePicker`、`openTpOverlay`、`timeOverlay`、`incrementValue`、`decrementValue` |

預設值可在 `node_modules/@shuo/ui/dist/runtime/utils/messages.js` 查看。

單一元件也可直接用 prop 覆寫，例如 `<ShuoFile placeholder="..." />`、`<ShuoList title="..." empty="..." />`，優先於模組設定。

## 自動匯入

模組自動匯入 `dist/runtime/utils` 與 `dist/runtime/composables`，無須 import：

| 名稱                                                                                            | 說明                                           |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `requiredText`、`requiredNumber`、`requiredArray`、`optionalEmail`、`optionalNonNegativeNumber` | Valibot 驗證規則，見[表單驗證](validation.md)  |
| `formatDateDisplay`、`parseDateValue`、`getDateModelFormat`、`isValidDateSeparator` 等          | 日期格式與解析                                 |
| `formatNumberDisplay`、`toNumberText`、`getDecimalPlaces`                                       | 數字顯示                                       |
| `filterPhoneInput`、`joinPhone`、`splitPhone`                                                   | 電話號碼                                       |
| `splitMonths`、`combineMonths`                                                                  | 年月數換算                                     |
| `useChoiceGroup`、`useTruncatedText`                                                            | 排列與文字省略                                 |
| `getShuoMessages`、`setShuoMessages`、`formatMessage`                                           | 文案讀取、覆寫與佔位符替換（通常不需直接使用） |

目錄內其他元件內部使用的工具（例如 `getByPath`、`getMaskCount`）同樣會被匯入，但不屬於公開 API，版本間可能變動。若與專案自己的函式同名，請改名或關閉其中一方的自動匯入。

型別可由別名 `#shuo-ui` 匯入：

```ts
import type { DatepickerValue } from '#shuo-ui/components/ShuoDatepicker.vue';
import type { PageRequest } from '#shuo-ui/types/pagination';
```

## 與 Nuxt UI 搭配的注意事項

- 專案 CSS 必須加入 `@import '@shuo/ui/css';`（放在 `@import 'tailwindcss'` 之後），否則 Tailwind 不會掃描元件庫內的 class，部分樣式會缺失。
- 表單欄位建議外包 `UFormField` 並設定 `name`，元件會透過 `useFormField` 接入 id、name、size、停用與錯誤狀態，並在 input、blur、change 時觸發驗證。
- 圖示使用 Iconify（`i-lucide-*`）。元件庫用到的圖示會由模組自動加入 `@nuxt/icon` 的 client bundle；若專案停用執行期圖示 API（`icon.provider: 'none'`），請安裝 `@iconify-json/lucide` 讓圖示能在建置時打包。
