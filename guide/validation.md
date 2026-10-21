# 表單驗證

建議表單使用 `UForm + UFormField`，驗證 schema 使用 Valibot。`UFormField` 的 `name` 必須對應 schema 與 state 的欄位名稱；`required` 只顯示必填星號，實際必填判斷由 schema 負責。

## 共用規則

規則由模組自動匯入（來自 `dist/runtime/utils/validation`），各表單自行組合 schema，不把商業規則寫進輸入元件。

預設錯誤訊息為「欄位名稱 說明」，欄位名稱使用畫面上的標題，與說明之間空一格，例如「姓名 為必填」。訊息可用模組設定 `shuoUi.messages.validation` 覆寫，見[設定與自定義](configuration.md#文案覆寫)。

| 方法                                    | 適用欄位                                             | 行為                                                                                                                            |
| --------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `requiredText('欄位名稱')`              | 文字、下拉與單選群組的字串 value、日期字串、多行文字 | 拒絕 `null`、`undefined`、空字串、純空白與非字串值，保留原始文字。                                                              |
| `requiredNumber('欄位名稱')`            | 數字                                                 | 接受 `0`、負數與小數；空值與字串顯示「為必填」，`NaN` 與無限大顯示「必須是有效數字」。                                          |
| `optionalEmail('欄位名稱')`             | 選填電子信箱                                         | 空字串通過；有值時須符合 email 格式，否則顯示「格式錯誤」。必填信箱改用 `requiredText` 串接 `v.email`。                         |
| `optionalNonNegativeNumber('欄位名稱')` | 選填的金額、期數、評分、利率等非負數字               | `null` 通過；接受 `0` 與小數；負數顯示「不可小於 0」，`NaN`、無限大與非數字顯示「必須是有效數字」。整數限制另以 `v.pipe` 追加。 |

複選群組使用 `requiredArray('複選群組', v.string())`，空陣列、`null` 與 `undefined` 不通過；至少勾選一項才通過。項目 schema 可自行組合，不將選項寫死在共用規則。

目前日期與選項只檢查必填；日期格式、選項是否仍有效、跨欄位條件等，依實際需求追加規則。

元件會將父層綁定的 `null` / `undefined` 回寫為約定空值（文字 `''`、數字 `null`、日期範圍 `[]` 等，見[空值約定](components.md#空值約定)），非預期值則清空並以 `console.warn` 留下紀錄。單選群組未選取即為 `''`，因此選項不使用空字串作為 value。

共用 schema 的輸入型別容納編輯時的 `null` / `undefined`，驗證通過後的輸出則收斂為 `string`、`number` 或對應項目型別的陣列，不需要改掉元件的空值契約。

```ts
import * as v from 'valibot';

const schema = v.object({
  name: requiredText('姓名'),
  amount: requiredNumber('金額'),
  email: v.pipe(requiredText('電子郵件'), v.email('電子郵件 格式錯誤')),
  backupEmail: optionalEmail('備用電子郵件'),
  approvedAmount: optionalNonNegativeNumber('核准金額')
});
```

可重複使用的格式、長度或範圍規則再加入共用檔；特定頁面的跨欄位規則留在該表單。使用 Valibot `pipe` 組合，不另建一套驗證設定語言。

## 顯示與互動

- 錯誤訊息建議使用內建主題（`theme: true`）：嵌在欄位下邊線的浮動樣式，不增加欄位高度；欄位排列須保留適當間距，外框避免裁切溢出內容。
- `UForm` 驗證通過才會觸發 `@submit`，透過 `event.data` 取得驗證後的資料；驗證失敗則觸發 `@error`。
- 使用預設的 input、blur、change 驗證時機。重設時除了清空 state，也呼叫表單的 `clear()` 清除錯誤。

## CheckboxGroup 響應式分欄

使用 `orientation="grid"`，透過 `ui.fieldset` 覆寫 Tailwind 分欄與斷點 class。預設一欄，每列至少維持同尺寸輸入框高度；保留多選陣列綁定、省略提示與骨架行為。

```vue
<ShuoCheckboxGroup
  v-model="selectedCodes"
  :items="options"
  orientation="grid"
  :ui="{ fieldset: 'grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4' }"
/>
```

以上設定為預設一欄、md 起兩欄、xl 起四欄。原本 `breakpoint` 仍僅用於 `orientation="auto"` 的水平／垂直切換；grid 的斷點由 class 控制。`class` 設定外框，`ui.fieldset` 設定選項容器。請使用完整靜態 class，讓 Tailwind 能掃描產生樣式。
