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

文字、多行文字、數字、日期、市話與單選群組元件會將父層綁定的 `null` / `undefined` 回寫為約定空值：文字與單選 `''`、數字 `null`、日期 `''`、日期範圍 `[]`；下拉選單依 `emptyValue`（預設 `''`）。單選群組未選取即為 `''`，選項不使用空字串作為 value。其他非預期值（型別錯誤、日期格式不符、範圍起迄相反、非有限數字）直接清空為約定空值，並以 `console.warn` 留下紀錄；掛載時與之後由父層回填皆適用。

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

核取方塊的獨立測試頁為 `/Checkbox`，可測試自訂勾選與取消值。

## 測試

### 文字遮蔽

`ShuoInputText` 的 `mask` 接受 boolean 或數字，預設不遮蔽。`true` 遮蔽全部文字，正整數遮蔽最後指定碼數：例如 `12345678` 搭配 `:mask="4"` 顯示 `1234••••`；不足四碼時全部遮蔽。`false`、`0`、負數與非有限數字不啟用，小數向下取整。

```vue
<ShuoInputText v-model="text" :mask="true" />
<ShuoInputText v-model="text" :mask="4" />
```

啟用後右側顯示眼睛按鈕，可切換明碼與遮蔽；`v-model` 始終保留原始文字。停用時仍可切換顯示，輸入框維持原本的不可編輯狀態；骨架期間不可操作。遮蔽狀態禁止複製及剪下，顯示明碼後可正常複製及剪下。

`hideMaskToggle` 預設為 `false`，眼睛按鈕正常顯示；設為 `true` 時隱藏按鈕並維持遮蔽。動態變更此參數會重設為遮蔽狀態。

```vue
<ShuoInputText v-model="text" :mask="4" hide-mask-toggle />
```

文字輸入與遮罩效果請使用 `/InputText` 測試頁，並比對原始綁定值。

```sh
pnpm test:unit
```

### 電話輸入

`ShuoPhone` 使用兩個 `UInput`，由 `v-model` 綁定區碼與電話直接串接的完整號碼，`v-model:area-code` 綁定區碼，`v-model:number` 綁定電話。三者皆保留字串與開頭的 `0`；未初始化、使用者清空或父層回填 `null`／`undefined` 時皆為 `''`。父層回填數字等非字串值不會拋錯，該綁定清空為 `''` 並以 `console.warn` 留下 `[ShuoPhone] modelValue 型別不符，已清空：` 紀錄；完整號碼型別不符時視同清空完整號碼，兩欄一併清空；區碼或電話型別不符時只清空該欄並重新合併完整號碼。

```vue
<ShuoPhone v-model="fullPhone" v-model:area-code="areaCode" v-model:number="phoneNumber" :skeleton="loading" />
```

例如區碼 `02`、電話 `00123456`，完整號碼為 `0200123456`。可只使用具名綁定；完整號碼回填時依已知且符合前綴的區碼拆分，沒有可用區碼則將全文放入電話欄位並清空區碼，不猜測長度。清空完整號碼會同步清空兩欄。

使用者輸入或貼上時只保留半形數字（全形與其他 Unicode 數字也會移除），游標停在保留內容之後；父層回填則原樣顯示，不改寫外部資料，使用者編輯該欄後才過濾該欄。輸入、聚焦、離焦與變更皆通知 `UForm`，可依 `validate-on` 設定驗證時機；停用或骨架期間不更新綁定，但父層回填仍會同步顯示。不內建電話長度或區碼合法性規則，這些驗證由使用表單定義。區碼框置中並以三位數寬顯示，電話框填滿剩餘寬度；支援 `size`、`disabled` 與 `skeleton`。

市話輸入功能請使用 `/Phone`，窄容器使用 `/Width`，必填驗證使用 `/Validation`。純邏輯測試包含中段過濾後的游標位置：

```sh
pnpm test:unit
```

### 月數輸入

`ShuoMonths` 顯示「年輸入框 年 月輸入框 月」，兩個輸入框皆為兩位數字寬並將數字置中。接受非負整數，焦點離開年月整組後才正規化（在年與月之間移動焦點不提交，可同時清空兩欄）：例如 0 年 13 月變成 1 年 1 月，總月數為 13；2 年 13 月則變成 3 年 1 月，總月數為 37。

```vue
<ShuoMonths v-model="totalMonths" v-model:year="years" v-model:month="months" :skeleton="loading" />
```

三個綁定型別皆為 `number | null`，可只使用總月數或具名年月綁定。父層回填時會同步換算；同時回填總月數與年月且內容衝突時，總月數優先。輸入中的草稿在焦點離開整組後才提交並送出表單 `change` 驗證；單邊空白視為 0，兩邊皆空則回傳 null。父層回填 `undefined`、字串、負數、小數、`NaN` 或超出安全整數的值不會拋錯，視為空值並將三個綁定寫回 `null`。輸入時拒絕非數字、負號、小數點與會讓合計超過 `Number.MAX_SAFE_INTEGER` 的數字。寬度以兩位數設計，但不限制年數為兩位數。

月數輸入的進位、綁定與狀態切換請使用 `/Months` 測試頁。

### 輸入元件骨架

所有共用 Form 輸入元件都支援 `skeleton`，預設關閉：文字、數字、下拉、日期、單個 Checkbox、單選群組、複選群組、多行文字、檔案、月數及電話。

```vue
<ShuoInputText v-model="state.text" :skeleton="loading" />
<ShuoTextarea v-model="state.description" :rows="5" :skeleton="loading" />
<ShuoFile v-model="file" :skeleton="loading" />
```

骨架保留原控制項的排版空間，沿用 `size`、寬度、textarea 行數及選項群組排列，不另設固定高度。啟用期間不可點擊或鍵盤操作，Tooltip 與已開啟的選單會關閉；切回正常狀態保留原本的綁定值。骨架只控制呈現與互動，不代表停用表單驗證。

各元件獨立測試頁提供骨架切換；尺寸與容器寬度分別使用 `/Size`、`/Width` 測試。

### 表單規則

`/Validation`（統一表單驗證）提供必填驗證、送出、清空與帶入資料，可測試數字 `0`；此頁不呼叫 API。

```sh
pnpm test:unit
```
