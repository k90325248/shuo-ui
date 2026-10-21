# 元件與參數

## 共用參數

表單輸入元件（`ShuoInputText`、`ShuoInputNumber`、`ShuoSelectMenu`、`ShuoDatepicker`、`ShuoCheckbox`、`ShuoCheckboxGroup`、`ShuoRadioGroup`、`ShuoTextarea`、`ShuoFile`、`ShuoMonths`、`ShuoPhone`）都支援下列參數，各元件章節不再重複列出：

| Prop       | 型別                                   | 預設                      | 說明                                                                                            |
| ---------- | -------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------- |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `lg`                      | 元件尺寸，同尺寸元件高度一致                                                                    |
| `disabled` | `boolean`                              | 未設定時沿用 `UForm` 狀態 | 停用                                                                                            |
| `loading`  | `boolean`                              | `false`                   | 顯示轉圈圖示並停用操作                                                                          |
| `skeleton` | `boolean`                              | `false`                   | 以骨架覆蓋並暫停互動，保留原排版；切回後保留綁定值，不影響表單驗證                              |
| `id`       | `string`                               | 沿用 `UFormField`         | 輸入框識別碼（`ShuoMonths` 指向年數框、`ShuoPhone` 指向區碼框；`ShuoFile` 只沿用 `UFormField`） |
| `name`     | `string`                               | 沿用 `UFormField`         | 欄位名稱                                                                                        |

除 `ShuoDatepicker`（改用 `state`，見[日期選擇器](datepicker.md)）與 `ShuoFile` 外，也支援 Nuxt UI 的 `color`（元件顏色）與 `highlight`（強調外框）；`ShuoFile` 的顏色與錯誤外框沿用 `UFormField`。

建議外包 `UFormField`，`name` 對應 schema 欄位，元件會透過 `useFormField` 接入 id、尺寸、停用與錯誤狀態，並在 input、blur、change 時觸發驗證：

```vue
<UFormField label="姓名" name="name" required>
  <ShuoInputText v-model="state.name" />
</UFormField>
```

### 骨架

骨架保留原控制項的排版空間，沿用 `size`、寬度、textarea 行數及選項群組排列，不另設固定高度。啟用期間不可點擊或鍵盤操作，Tooltip 與已開啟的選單會關閉。

```vue
<ShuoInputText v-model="state.text" :skeleton="loading" />
<ShuoTextarea v-model="state.description" :rows="5" :skeleton="loading" />
<ShuoFile v-model="file" :skeleton="loading" />
```

## 空值約定

父層綁定 `null`／`undefined` 時，下列元件會回寫約定空值；型別錯誤等非預期值會清空為約定空值，並以 `console.warn`（`[Shuo元件名] … 已清空`）留下紀錄。掛載時與之後由父層回填皆適用。

| 元件                                                           | 空值                                 |
| -------------------------------------------------------------- | ------------------------------------ |
| `ShuoInputText`、`ShuoTextarea`、`ShuoRadioGroup`、`ShuoPhone` | `''`                                 |
| `ShuoSelectMenu`                                               | `emptyValue`（預設 `''`）；多選 `[]` |
| `ShuoInputNumber`、`ShuoMonths`                                | `null`                               |
| `ShuoDatepicker`                                               | 單選 `''`、範圍 `[]`                 |

下列元件不回寫父層的值：

- `ShuoCheckboxGroup`：`null` 或非陣列值顯示為全部未勾選，勾選後回寫完整陣列；清空為 `[]`。
- `ShuoCheckbox`：綁定值不等於 `trueValue` 時顯示未勾選。
- `ShuoFile`：清除後為 `null`。

## ShuoInputText

文字輸入，可遮蔽內容。`v-model: string`。

| Prop             | 型別                | 預設    | 說明                                                          |
| ---------------- | ------------------- | ------- | ------------------------------------------------------------- |
| `placeholder`    | `string`            | —       | 提示文字                                                      |
| `mask`           | `boolean \| number` | 不遮蔽  | `true` 全部遮蔽；正整數遮蔽最後指定碼數；有遮蔽時顯示切換按鈕 |
| `hideMaskToggle` | `boolean`           | `false` | 隱藏明碼切換按鈕，維持遮蔽                                    |

```vue
<ShuoInputText v-model="text" :mask="true" />
<ShuoInputText v-model="text" :mask="4" />
<ShuoInputText v-model="text" :mask="4" hide-mask-toggle />
```

- `12345678` 搭配 `:mask="4"` 顯示 `1234••••`；不足四碼時全部遮蔽。`false`、`0`、負數與非有限數字不啟用，小數向下取整。
- 右側眼睛按鈕切換明碼與遮蔽，`v-model` 始終保留原始文字。停用時仍可切換顯示；骨架期間不可操作。
- 遮蔽狀態禁止複製及剪下，顯示明碼後可正常複製。
- 動態變更 `mask` 或 `hideMaskToggle` 會重設為遮蔽狀態。

## ShuoInputNumber

數字輸入，離開輸入框後顯示千分位。`v-model: number | null`。

| Prop                | 型別                | 預設    | 說明                                                                    |
| ------------------- | ------------------- | ------- | ----------------------------------------------------------------------- |
| `placeholder`       | `string`            | —       | 提示文字                                                                |
| `unit`              | `boolean \| string` | `false` | `true` 顯示「元」（可由文案 `inputNumber.unit` 覆寫），字串顯示指定文字 |
| `thousandSeparator` | `boolean`           | `true`  | 離開輸入框後是否顯示千分位                                              |
| `decimal`           | `boolean \| number` | `false` | `false` 僅整數；`true` 不限位數；數字指定小數位數（最多 100）           |

輸入中保留正負號、小數點與尾端零，尚未完成的輸入（例如只有 `-`）綁定為 `null`；離開輸入框時依 `decimal` 捨入並補零。

## ShuoSelectMenu

基於 `USelectMenu`，帶有搜尋與省略提示。單選 `v-model` 為選項的 value，多選為 value 陣列。

| Prop          | 型別                       | 預設              | 說明                                                         |
| ------------- | -------------------------- | ----------------- | ------------------------------------------------------------ |
| `items`       | 字串陣列或物件陣列（必填） | —                 | 字串選項同時作為顯示名稱與值                                 |
| `labelKey`    | `string`                   | `label`           | 顯示名稱欄位                                                 |
| `valueKey`    | `string`                   | `value`           | 綁定值欄位                                                   |
| `multiple`    | `boolean`                  | `false`           | 多選，綁定值為陣列                                           |
| `format`      | `string`                   | `{value}_{label}` | 顯示格式，`{value}`、`{label}` 會被替換                      |
| `emptyValue`  | `'' \| null`               | `''`              | 單選未選取時的綁定值                                         |
| `open`        | `boolean`                  | 元件管理          | 指定選單是否開啟；未設定時由使用者操作開關（不提供 v-model） |
| `placeholder` | `string`                   | —                 | 提示文字                                                     |

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

| Prop         | 型別                          | 預設 | 說明                                             |
| ------------ | ----------------------------- | ---- | ------------------------------------------------ |
| `label`      | `string`                      | 啟用 | 顯示文字（預設值可由文案 `checkbox.label` 覆寫） |
| `trueValue`  | `string \| number \| boolean` | `1`  | 勾選時的值                                       |
| `falseValue` | `string \| number \| boolean` | `0`  | 取消勾選時的值                                   |

## ShuoCheckboxGroup／ShuoRadioGroup

複選群組 `v-model: string[]`（必須提供）、單選群組 `v-model: string`；選項 `value` 不使用空字串。

| Prop          | 型別                                             | 預設   | 說明                                                                                             |
| ------------- | ------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------ |
| `items`       | `{ label: string; value: string }[]`（必填）     | —      | 選項                                                                                             |
| `orientation` | `'auto' \| 'horizontal' \| 'vertical' \| 'grid'` | `auto` | `auto` 依視窗寬度在 `breakpoint` 前後自動切換                                                    |
| `breakpoint`  | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`          | `md`   | 自動排列斷點，達此寬度時水平排列                                                                 |
| `ui`          | Nuxt UI `ui` slots                               | —      | 樣式覆寫；`grid` 以 `ui.fieldset` 設定欄數，見[表單驗證](validation.md#checkboxgroup-響應式分欄) |

選項文字被省略時，滑鼠移入或鍵盤聚焦會顯示完整文字提示。

## ShuoTextarea

`v-model: string`，保留換行。

| Prop                                                   | 型別      | 說明                   |
| ------------------------------------------------------ | --------- | ---------------------- |
| `rows`、`maxrows`                                      | `number`  | 基本行數與自動高度上限 |
| `autoresize`                                           | `boolean` | 自動調整高度           |
| `maxlength`                                            | `number`  | 原生字數上限           |
| `required`                                             | `boolean` | 原生必填               |
| `fixed`                                                | `boolean` | 固定文字尺寸           |
| `variant`、`color`、`highlight`、`placeholder`、`icon` | —         | 同 Nuxt UI `UTextarea` |

未啟用 `autoresize` 時可上下拖拉調整高度，最低不小於同尺寸單行輸入框。

## ShuoFile

單檔選擇，`v-model: File | null`，必須提供；選檔不會自動上傳。

| Prop          | 型別     | 預設       | 說明                                                                                     |
| ------------- | -------- | ---------- | ---------------------------------------------------------------------------------------- |
| `accept`      | `string` | —          | 選檔對話框的檔案類型篩選（不阻擋其他類型，類型限制請由表單規則驗證）                     |
| `placeholder` | `string` | 請選擇檔案 | 未選檔時的提示文字（預設值可由文案 `file.placeholder` 覆寫）                             |
| `fileName`    | `string` | —          | 既有附件名稱，沒有本機 File 時顯示                                                       |
| `fileUrl`     | `string` | —          | 既有附件下載網址，以 Blob 取得；跨來源網址須允許 CORS；下載失敗會顯示 Toast（需 `UApp`） |

停用時隱藏移除按鈕，但已有附件仍可下載；載入中則一律不可操作。

## ShuoMonths

年月數換算輸入，顯示「年輸入框 年 月輸入框 月」。

| v-model         | 型別             | 說明   |
| --------------- | ---------------- | ------ |
| `v-model`       | `number \| null` | 總月數 |
| `v-model:year`  | `number \| null` | 年數   |
| `v-model:month` | `number \| null` | 月數   |

```vue
<ShuoMonths v-model="totalMonths" v-model:year="years" v-model:month="months" />
```

- 只接受非負整數；焦點離開年月整組後才進位（在年與月之間移動焦點不提交，可同時清空兩欄）：0 年 13 月變成 1 年 1 月，總月數 13。
- 三個綁定可單獨或同時使用。父層同時回填總月數與年月且內容衝突時，總月數優先。
- 單邊空白視為 0，兩邊皆空則三個綁定皆為 `null`。父層回填字串、負數、小數、`NaN` 或超出安全整數的值時視為空值。
- 容器寬度不足以顯示年月兩欄時，自動改為單一「總月數」輸入框。

## ShuoPhone

市話號碼，兩個輸入框分別輸入區碼與電話。

| v-model             | 型別     | 說明                               |
| ------------------- | -------- | ---------------------------------- |
| `v-model`           | `string` | 完整號碼（區碼加號碼，無分隔符號） |
| `v-model:area-code` | `string` | 區碼                               |
| `v-model:number`    | `string` | 電話號碼                           |

```vue
<ShuoPhone v-model="fullPhone" v-model:area-code="areaCode" v-model:number="phoneNumber" />
```

- 三者皆保留字串與開頭的 `0`，例如區碼 `02`、電話 `00123456`，完整號碼為 `0200123456`。
- 使用者輸入或貼上時只保留半形數字；父層回填則原樣顯示，使用者編輯該欄後才過濾。
- 只回填完整號碼時，依已知且符合前綴的區碼拆分；沒有可用區碼則全文放入電話欄並清空區碼，不猜測長度。
- 區碼或電話型別不符時只清空該欄並重新合併完整號碼；完整號碼型別不符時兩欄一併清空。
- 不內建電話長度或區碼合法性規則，請由表單 schema 定義。

## ShuoQueryCard

可收合的查詢條件卡片，內含 `UForm`，欄位以響應式格線排列（一欄、md 兩欄、xl 四欄），在欄位內按 Enter 即可送出。泛型 `S` 為 schema。

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

| 事件     | 參數              | 說明                                         |
| -------- | ----------------- | -------------------------------------------- |
| `submit` | `FormSubmitEvent` | 驗證通過後送出，以 `event.data` 取得資料     |
| `clear`  | —                 | 通知使用頁面重設資料，之後元件清除驗證錯誤   |
| `error`  | `FormErrorEvent`  | 驗證失敗；收合狀態下會自動展開以顯示錯誤訊息 |

| Slot           | 參數                         | 說明         |
| -------------- | ---------------------------- | ------------ |
| default        | `state`、`errors`、`loading` | 欄位內容     |
| `header-right` | —                            | 標題右側     |
| `actions`      | `submit`、`clear`、`loading` | 底部操作按鈕 |

透過 template ref 可呼叫 `submit()`、`clear()`，例如由卡片外的按鈕觸發查詢；停用時兩者皆不動作。

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

| Prop             | 型別                       | 預設            | 說明                                                 |
| ---------------- | -------------------------- | --------------- | ---------------------------------------------------- |
| `data`           | `T[]`（必填）              | —               | 已完成查詢的資料，重新查詢期間請保留原值             |
| `columns`        | `TableColumn<T>[]`（必填） | —               | 欄位設定，內容可用對應 cell slot 自訂                |
| `loading`        | `boolean`                  | `false`         | 是否正在查詢；元件建立時即在查詢且無資料時顯示骨架列 |
| `total`          | `number`                   | `0`             | 後端回傳的總筆數                                     |
| `page`           | `number`                   | `1`             | 目前頁碼（從 1 起算）                                |
| `pageSize`       | `number`                   | `10`            | 每頁筆數                                             |
| `showPagination` | `boolean`                  | `true`          | 顯示分頁，只有一頁仍顯示                             |
| `showSummary`    | `boolean`                  | `true`          | 顯示筆數與範圍                                       |
| `title`          | `string`                   | 查詢結果        | 標題                                                 |
| `icon`           | `string`                   | `i-lucide-list` | 標題圖示，`icon=""` 隱藏                             |
| `empty`          | `string`                   | 查無資料        | 空資料說明                                           |
| `tableProps`     | `Partial<TableProps<T>>`   | —               | 額外 `UTable` 設定                                   |

| 事件          | 參數                                       | 說明                                                |
| ------------- | ------------------------------------------ | --------------------------------------------------- |
| `page-change` | `{ PageNumber: number; PageSize: number }` | 請由使用頁面查詢該頁，成功後再更新 `page` 與 `data` |

底部統計「共有 N 筆資料, 目前顯示第 X 筆至第 Y 筆資料。」與「查詢中…」可由文案 `list.summary`、`list.loading` 全域覆寫，見[設定與自定義](configuration.md#文案覆寫)。

查詢中、頁碼與目前相同或超出範圍時不發出 `page-change`。透過 template ref 可呼叫 `getPagination(page?)` 取得 `{ PageNumber, PageSize }`，供初次查詢或重新查詢使用。

| Slot                           | 參數                          | 說明                         |
| ------------------------------ | ----------------------------- | ---------------------------- |
| `title`                        | —                             | 標題文字                     |
| `header-right`                 | `interactionDisabled`         | 標題右側操作                 |
| `<欄位>-cell` 等 `UTable` slot | 原參數＋`interactionDisabled` | 自訂儲存格與表頭             |
| `body-top`、`footer`           | `interactionDisabled`         | 表格上方列與卡片底部額外內容 |
| `loading`、`empty`             | —                             | 查詢中與空資料的內容         |

`interactionDisabled` 在查詢中為 `true`，可用來停用清單內的操作：

```vue
<ShuoList :data="rows" :columns="columns" :loading="loading" :total="total" :page="page" @page-change="search">
  <template #action-cell="{ row, interactionDisabled }">
    <UButton label="明細" :disabled="interactionDisabled" @click="openDetail(row.original)" />
  </template>
</ShuoList>
```

`PageRequest` 型別可由 `#shuo-ui/types/pagination` 匯入，見[設定與自定義](configuration.md#自動匯入)。

## ShuoInfoTooltip

資訊圖示加提示，滑鼠移入或鍵盤聚焦即顯示（無延遲）。

| Prop    | 型別     | 預設                    | 說明                                                            |
| ------- | -------- | ----------------------- | --------------------------------------------------------------- |
| `text`  | `string` | `''`                    | 提示文字，支援換行字元                                          |
| `icon`  | `string` | `i-lucide-circle-alert` | 圖示                                                            |
| `label` | `string` | 資訊說明                | 圖示按鈕的無障礙名稱（預設值可由文案 `infoTooltip.label` 覆寫） |

| Slot      | 說明                                                |
| --------- | --------------------------------------------------- |
| `content` | 自訂提示內容；`text` 為空且沒有此 slot 時不顯示提示 |

```vue
<UFormField label="年份範圍">
  <template #hint>
    <ShuoInfoTooltip label="年份範圍說明" :text="'輸入西元年份。\n民國模式最低為 1911 年。'" />
  </template>
  <ShuoInputNumber v-model="year" :thousand-separator="false" />
</UFormField>
```
