---
title: "表單驗證"
description: "以 UForm、UFormField 與 Valibot 驗證表單，搭配內建的共用規則。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/getting-started/form/validation"
---
# 表單驗證

> 以 UForm、UFormField 與 Valibot 驗證表單，搭配內建的共用規則。

建議表單使用 `UForm + UFormField`，驗證 schema 使用 Valibot。`UFormField` 的 `name` 必須對應 schema 與 state 的欄位名稱；`required` 只顯示必填星號，實際必填判斷由 schema 負責。

## 共用規則

規則由模組自動匯入，各表單自行組合 schema，不把商業規則寫進輸入元件。每條規則的參數與行為見工具函式的[驗證規則](https://k90325248.github.io/shuo-ui/utils/form/validation)：

<table>
<thead>
  <tr>
    <th>
      規則
    </th>
    
    <th>
      適用欄位
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        requiredText('欄位名稱')
      </code>
    </td>
    
    <td>
      文字、下拉與單選群組的字串值、日期字串、多行文字
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        requiredNumber('欄位名稱')
      </code>
    </td>
    
    <td>
      數字
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        requiredArray('欄位名稱', 項目 schema)
      </code>
    </td>
    
    <td>
      複選群組、多選下拉選單
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        optionalEmail('欄位名稱')
      </code>
    </td>
    
    <td>
      選填電子信箱
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        optionalNonNegativeNumber('欄位名稱')
      </code>
    </td>
    
    <td>
      選填的金額、期數、評分、利率等非負數字
    </td>
  </tr>
</tbody>
</table>

預設錯誤訊息為「欄位名稱 說明」，欄位名稱使用畫面上的標題，與說明之間空一格，例如「姓名 為必填」。訊息可用模組設定 `shuoUi.messages.validation` 覆寫，見[多語系與文案](https://k90325248.github.io/shuo-ui/getting-started/theme/messages)。

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

檔案欄位（`ShuoFile`）綁定 `File | null`，必填、類型與大小以 Valibot 的 `v.file`、`v.mimeType`、`v.maxSize` 組合，見 File 的[搭配表單驗證](https://k90325248.github.io/shuo-ui/components/phone-file/file#%E6%90%AD%E9%85%8D%E8%A1%A8%E5%96%AE%E9%A9%97%E8%AD%89)。

<note>

目前日期與選項只檢查必填；日期格式、選項是否仍有效、跨欄位條件、數值範圍等，依實際需求追加規則，例如 `v.pipe(v.number(), v.minValue(1), v.maxValue(100))`。

</note>

## 空值與型別

元件會將父層綁定的 `null` / `undefined` 回寫為約定空值（文字 `''`、數字 `null`、日期範圍 `[]` 等，見[空值約定](https://k90325248.github.io/shuo-ui/components/overview/common#%E7%A9%BA%E5%80%BC%E7%B4%84%E5%AE%9A)），非預期值則清空，多數元件另以 `console.warn` 留下紀錄（`ShuoSelectMenu`、`ShuoMonths` 只清空不警告，見同一節）。單選群組未選取即為 `''`，因此選項不使用空字串作為 value。

共用 schema 的輸入型別容納編輯時的 `null` / `undefined`，驗證通過後的輸出則收斂為 `string`、`number` 或對應項目型別的陣列，不需要改掉元件的空值契約。

## 顯示與互動

- 錯誤訊息建議使用內建主題（`theme: true`）：嵌在欄位下邊線的浮動樣式，不增加欄位高度；欄位排列須保留適當間距，外框避免裁切溢出內容。
- `UForm` 驗證通過才會觸發 `@submit`，透過 `event.data` 取得驗證後的資料；驗證失敗則觸發 `@error`。
- 使用預設的 input、blur、change 驗證時機。重設時除了清空 state，也呼叫表單的 `clear()` 清除錯誤。


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
