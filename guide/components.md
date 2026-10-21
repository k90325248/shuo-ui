# 元件與參數

所有元件都支援：`size`（`xs`／`sm`／`md`／`lg`／`xl`，預設 `lg`）、`disabled`（未設定時沿用 `UForm` 狀態）、`loading`（顯示轉圈並停用）、`skeleton`（以骨架覆蓋並暫停互動，保留原排版）、`id`、`name`，以及 `UFormField` 的驗證整合。

建議外包 `UFormField`，`name` 對應 schema 欄位：

```vue
<UFormField label="姓名" name="name" required>
  <ShuoInputText v-model="state.name" />
</UFormField>
```

## 空值約定

父層綁定 `null`／`undefined` 時，元件會回寫約定空值；型別錯誤等非預期值會清空並以 `console.warn` 留下紀錄。

| 元件                                              | 空值                                 |
| ------------------------------------------------- | ------------------------------------ |
| `ShuoInputText`、`ShuoTextarea`、`ShuoRadioGroup` | `''`                                 |
| `ShuoSelectMenu`                                  | `emptyValue`（預設 `''`）；多選 `[]` |
| `ShuoInputNumber`、`ShuoMonths`                   | `null`                               |
| `ShuoDatepicker`                                  | 單選 `''`、範圍 `[]`                 |
| `ShuoCheckboxGroup`                               | `[]`                                 |
| `ShuoFile`                                        | `null`                               |

## ShuoInputText

文字輸入，可遮蔽內容。`v-model: string`。

| Prop             | 型別                | 預設    | 說明                                                          |
| ---------------- | ------------------- | ------- | ------------------------------------------------------------- |
| `placeholder`    | `string`            | —       | 提示文字                                                      |
| `color`          | Nuxt UI `color`     | —       | 元件顏色                                                      |
| `highlight`      | `boolean`           | —       | 強調外框                                                      |
| `mask`           | `boolean \| number` | 不遮蔽  | `true` 全部遮蔽；正整數遮蔽最後指定碼數；有遮蔽時顯示切換按鈕 |
| `hideMaskToggle` | `boolean`           | `false` | 隱藏明碼切換按鈕                                              |

遮蔽時，原生輸入框內容無法複製或剪下。

## ShuoInputNumber

數字輸入，離開輸入框後顯示千分位。`v-model: number | null`。

| Prop                                | 型別                | 預設    | 說明                                                                    |
| ----------------------------------- | ------------------- | ------- | ----------------------------------------------------------------------- |
| `unit`                              | `boolean \| string` | `false` | `true` 顯示「元」（可由文案 `inputNumber.unit` 覆寫），字串顯示指定文字 |
| `thousandSeparator`                 | `boolean`           | `true`  | 離開輸入框後是否顯示千分位                                              |
| `decimal`                           | `boolean \| number` | `false` | `false` 僅整數；`true` 不限位數；數字指定小數位數（最多 100）           |
| `placeholder`、`color`、`highlight` | —                   | —       | 同 `ShuoInputText`                                                      |

## ShuoSelectMenu

基於 `USelectMenu`，帶有搜尋與省略提示。

| Prop                                | 型別                       | 預設              | 說明                                    |
| ----------------------------------- | -------------------------- | ----------------- | --------------------------------------- |
| `items`                             | 字串陣列或物件陣列（必填） | —                 | 字串選項同時作為顯示名稱與值            |
| `labelKey`                          | `string`                   | `label`           | 顯示名稱欄位                            |
| `valueKey`                          | `string`                   | `value`           | 綁定值欄位                              |
| `multiple`                          | `boolean`                  | `false`           | 多選，綁定值為陣列                      |
| `format`                            | `string`                   | `{value}_{label}` | 顯示格式，`{value}`、`{label}` 會被替換 |
| `emptyValue`                        | `'' \| null`               | `''`              | 單選未選取時的綁定值                    |
| `open`                              | `boolean`                  | 元件管理          | 是否開啟選單                            |
| `placeholder`、`color`、`highlight` | —                          | —                 | 同 `ShuoInputText`                      |

```vue
<ShuoSelectMenu
  v-model="state.type"
  :items="[
    { label: '一般', value: 'A' },
    { label: '特殊', value: 'B' }
  ]"
/>
```

## ShuoDatepicker

民國年、五種精度、範圍選擇。完整說明見[日期選擇器](datepicker.md)。

## ShuoCheckbox

單一核取方塊。`v-model: string | number | boolean`，必須提供。

| Prop                 | 型別                          | 預設 | 說明           |
| -------------------- | ----------------------------- | ---- | -------------- |
| `label`              | `string`                      | 啟用 | 顯示文字       |
| `trueValue`          | `string \| number \| boolean` | `1`  | 勾選時的值     |
| `falseValue`         | `string \| number \| boolean` | `0`  | 取消勾選時的值 |
| `color`、`highlight` | —                             | —    | 同上           |

## ShuoCheckboxGroup／ShuoRadioGroup

複選群組 `v-model: string[]`、單選群組 `v-model: string`；選項 `value` 不使用空字串。

| Prop          | 型別                                             | 預設   | 說明                                                                                             |
| ------------- | ------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------ |
| `items`       | `{ label: string; value: string }[]`（必填）     | —      | 選項                                                                                             |
| `orientation` | `'auto' \| 'horizontal' \| 'vertical' \| 'grid'` | `auto` | `auto` 依視窗寬度在 `breakpoint` 前後自動切換                                                    |
| `breakpoint`  | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`          | `md`   | 自動排列斷點，達此寬度時水平排列                                                                 |
| `ui`          | Nuxt UI `ui` slots                               | —      | 樣式覆寫；`grid` 以 `ui.fieldset` 設定欄數，見[表單驗證](validation.md#checkboxgroup-響應式分欄) |

## ShuoTextarea

`v-model: string`。

| Prop                                                   | 型別      | 說明                   |
| ------------------------------------------------------ | --------- | ---------------------- |
| `rows`、`maxrows`                                      | `number`  | 基本行數與自動高度上限 |
| `autoresize`                                           | `boolean` | 自動調整高度           |
| `maxlength`                                            | `number`  | 原生字數上限           |
| `required`                                             | `boolean` | 原生必填               |
| `fixed`                                                | `boolean` | 固定文字尺寸           |
| `variant`、`color`、`highlight`、`placeholder`、`icon` | —         | 同 Nuxt UI `UTextarea` |

## ShuoFile

單檔選擇，`v-model: File | null`，必須提供；選檔不會自動上傳。

| Prop          | 型別     | 說明                                                                                     |
| ------------- | -------- | ---------------------------------------------------------------------------------------- |
| `accept`      | `string` | 選檔對話框的檔案類型篩選（不阻擋其他類型，類型限制請由表單規則驗證）                     |
| `placeholder` | `string` | 未選檔時的提示文字                                                                       |
| `fileName`    | `string` | 既有附件名稱，沒有本機 File 時顯示                                                       |
| `fileUrl`     | `string` | 既有附件下載網址，以 Blob 取得；跨來源網址須允許 CORS；下載失敗會顯示 Toast（需 `UApp`） |

停用時隱藏移除按鈕，但已有附件仍可下載。

## ShuoMonths

年月數換算輸入。

| v-model         | 型別             | 說明   |
| --------------- | ---------------- | ------ |
| `v-model`       | `number \| null` | 總月數 |
| `v-model:year`  | `number \| null` | 年數   |
| `v-model:month` | `number \| null` | 月數   |

只接受非負整數；月數可暫時超過 11，離開焦點後進位。

## ShuoPhone

| v-model             | 型別     | 說明                               |
| ------------------- | -------- | ---------------------------------- |
| `v-model`           | `string` | 完整號碼（區碼加號碼，無分隔符號） |
| `v-model:area-code` | `string` | 區碼                               |
| `v-model:number`    | `string` | 電話號碼                           |

只接受半形數字，貼上時會過濾非數字並保留開頭的 0。

## ShuoQueryCard

可收合的查詢條件卡片，內含 `UForm`。泛型 `S` 為 schema。

| Prop           | 型別             | 預設              | 說明                 |
| -------------- | ---------------- | ----------------- | -------------------- |
| `state`        | 表單資料（必填） | —                 | 由使用頁面管理與重設 |
| `schema`       | Valibot schema   | —                 | 驗證規則             |
| `validate`     | 函式             | —                 | 自訂驗證             |
| `validateOn`   | 陣列             | —                 | 觸發驗證的事件       |
| `title`        | `string`         | 查詢條件          | 標題                 |
| `icon`         | `string`         | `i-lucide-search` | 標題圖示             |
| `disabled`     | `boolean`        | `false`           | 停用整個表單         |
| `v-model:open` | `boolean`        | `true`            | 展開狀態             |

| 事件     | 說明                           |
| -------- | ------------------------------ |
| `submit` | 驗證通過後送出（`event.data`） |
| `clear`  | 通知使用頁面重設資料           |
| `error`  | 驗證失敗                       |

| Slot           | 參數                         | 說明         |
| -------------- | ---------------------------- | ------------ |
| default        | `state`、`errors`、`loading` | 欄位內容     |
| `header-right` | —                            | 標題右側     |
| `actions`      | `submit`、`clear`、`loading` | 底部操作按鈕 |

```vue
<ShuoQueryCard :state="query" :schema="schema" @submit="search" @clear="reset">
  <UFormField label="姓名" name="name"><ShuoInputText v-model="query.name" /></UFormField>
  <template #actions="{ clear }">
    <UButton type="submit" label="查詢" />
    <UButton label="清除" color="neutral" variant="soft" @click="clear" />
  </template>
</ShuoQueryCard>
```

## ShuoList

基於 `UTable` 的分頁清單，分頁由後端處理。泛型 `T` 為資料列型別。

| Prop             | 型別                       | 預設     | 說明                                     |
| ---------------- | -------------------------- | -------- | ---------------------------------------- |
| `data`           | `T[]`（必填）              | —        | 已完成查詢的資料，重新查詢期間請保留原值 |
| `columns`        | `TableColumn<T>[]`（必填） | —        | 欄位設定，內容可用對應 cell slot 自訂    |
| `loading`        | `boolean`                  | `false`  | 是否正在查詢                             |
| `total`          | `number`                   | `0`      | 後端回傳的總筆數                         |
| `page`           | `number`                   | `1`      | 目前頁碼（從 1 起算）                    |
| `pageSize`       | `number`                   | `10`     | 每頁筆數                                 |
| `showPagination` | `boolean`                  | `true`   | 顯示分頁，只有一頁仍顯示                 |
| `showSummary`    | `boolean`                  | `true`   | 顯示筆數與範圍                           |
| `title`、`icon`  | `string`                   | 查詢結果 | 標題與圖示（`icon=""` 隱藏）             |
| `empty`          | `string`                   | 查無資料 | 空資料說明                               |
| `tableProps`     | `Partial<TableProps>`      | —        | 額外 `UTable` 設定                       |

| 事件          | 參數                                       | 說明                                                |
| ------------- | ------------------------------------------ | --------------------------------------------------- |
| `page-change` | `{ PageNumber: number; PageSize: number }` | 請由使用頁面查詢該頁，成功後再更新 `page` 與 `data` |

| Slot                                     | 說明           |
| ---------------------------------------- | -------------- |
| `title`、`header-right`                  | 標題與右側操作 |
| `<欄位>-cell`（`UTable` 的欄位 slot）    | 自訂儲存格     |
| `body-top`、`loading`、`empty`、`footer` | 清單各區塊     |

各 slot 都帶有 `interaction-disabled`，查詢中為 `true`，可用來停用清單內的操作。

## ShuoInfoTooltip

| Prop    | 型別     | 預設                    | 說明                   |
| ------- | -------- | ----------------------- | ---------------------- |
| `text`  | `string` | `''`                    | 提示文字，支援換行字元 |
| `icon`  | `string` | `i-lucide-circle-alert` | 圖示                   |
| `label` | `string` | 資訊說明                | 圖示按鈕的無障礙名稱   |
