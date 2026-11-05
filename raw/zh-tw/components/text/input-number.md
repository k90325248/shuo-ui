---
title: "InputNumber"
description: "數字輸入，離開輸入框後顯示千分位，可指定小數位數、單位與增減按鈕。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/components/text/input-number"
---
# InputNumber

> 數字輸入，離開輸入框後顯示千分位，可指定小數位數、單位與增減按鈕。

`v-model: number | null`。

## 用法

### 小數位數與千分位

`decimal` 預設 `false`，只能輸入整數；正整數指定小數位數，`true` 不限位數。`thousand-separator` 預設 `true`，離開輸入框後顯示千分位；年份、代碼等不適合千分位的數字傳 `false`。

<component-example name="input-number-decimal">



</component-example>

- 輸入中保留正負號、小數點與尾端零，尚未完成的輸入（例如只有 `-`）綁定為 `null`；離開輸入框時依 `decimal` 捨入並補零，並顯示千分位。
- 非數字字元與超過指定位數的小數無法輸入，貼上時也會還原；`decimal` 為 `false` 或 `0` 時不能輸入小數點。
- 聚焦時改為不含千分位的編輯文字。`decimal` 為 `false` 或 `0` 時 `inputmode` 為 `numeric`，否則為 `decimal`，手機會顯示對應的數字鍵盤。

### 增減按鈕與步進

`buttons` 顯示增減按鈕（預設關閉），`step` 為每次增減的量（預設 `1`），`min`、`max` 限制按鈕與鍵盤增減的範圍。`orientation` 決定按鈕排列：`horizontal`（預設）左減右加，數字預設置中；`vertical` 兩個按鈕上下疊放在右側，數字維持靠右。

<component-example name="input-number-step">



</component-example>

- **鍵盤**：有 `buttons` 或傳入 `step`、`min`、`max` 任一個時，聚焦輸入框後 ArrowUp／ArrowDown 增減一步，PageUp／PageDown 增減 10 步，Home／End 跳到 `min`／`max`（有設定時）。沒有這些設定時方向鍵維持一般文字輸入的行為。按鈕不在 Tab 順序內，無障礙名稱為「增加」「減少」（依語系切換）。
- **長按**：按住按鈕超過 0.4 秒後連續增減，到達上下限或放開時停止。按按鈕不會移走輸入框的焦點。
- **空值**：值為 `null` 時，不論按增加或減少都從 `min` 開始；沒有 `min` 時從 `0` 開始。
- **浮點誤差**：以十進位計算，`0.25` 連加不會出現 `0.7500000001`；結果依 `decimal` 的位數四捨五入。
- **step 與 decimal**：`step` 的小數位數超過 `decimal` 允許的位數時（例如 `decimal` 為 `false` 卻給 `0.25`），改用依 `decimal` 四捨五入後的值（至少一個最小單位，`false` 時為 `1`），並在主控台警告。`step` 不是大於 0 的數字、`min` 大於 `max` 時同樣警告並忽略。
- **上下限**：值等於或超過 `max` 時增加按鈕停用，等於或低於 `min` 時減少按鈕停用。停用、載入中、骨架與表單停用時兩個按鈕都停用。
- 每次增減都會觸發 `UFormField` 的 input 與 change 驗證，與手動輸入相同。
- `buttons`、`orientation` 可以在全站設定預設值，例如整個專案都顯示按鈕：`shuoUi.components.inputNumber.buttons: true`。

<warning>

`min`、`max` 只限制按鈕與鍵盤，**手動輸入超出範圍時不會自動修正**，綁定值維持輸入的數字；超出範圍時按增加或減少會回到範圍內。表單驗證仍請在 schema 以 `v.minValue`、`v.maxValue` 檢查，見下方[搭配表單驗證](#%E6%90%AD%E9%85%8D%E8%A1%A8%E5%96%AE%E9%A9%97%E8%AD%89)。

</warning>

水平排列時減少按鈕取代左側的 `icon`、`leadingIcon` 位置（`#leading` slot 仍接在按鈕後面）；需要左側圖示時改用 `orientation="vertical"`。增加按鈕排在單位、`#trailing` slot 與載入圖示的右側，左右內距依實際寬度保留，數字與單位不會被擠掉。

### 單位

`unit` 為 `true` 時顯示「元」（英文為「NTD」，依語系切換），文字可由[多語系與文案](https://k90325248.github.io/shuo-ui/getting-started/theme/messages#%E5%8F%AF%E8%A6%86%E5%AF%AB%E7%9A%84%E9%A0%85%E7%9B%AE)調整；傳入字串時顯示該文字。單位長度不固定，右內距依單位實際寬度保留，數字不會與單位重疊。

<component-example name="input-number-unit">



</component-example>

`unit` 與 `thousand-separator` 也可以在全站設定預設值，見[可設定的項目](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#%E5%8F%AF%E8%A8%AD%E5%AE%9A%E7%9A%84%E9%A0%85%E7%9B%AE)；全站的 `unit` 只接受 `true`／`false`。

### 外觀

沿用 `UInput` 的 `variant`、`color` 與 `highlight`。

<component-example name="input-number-variant">



</component-example>

### 圖示

沿用 `UInput` 的 `icon`，顯示在左側，與單位並存。

<component-example name="input-number-icon">



</component-example>

### 尺寸與狀態

載入中時轉圈圖示排在單位右側，數字與單位往左讓出空間。各狀態的共通行為見[共用參數](https://k90325248.github.io/shuo-ui/components/overview/common)。

<component-example name="input-number-states">



</component-example>

## 範例

### 搭配表單驗證

必填用 `requiredNumber`，範圍以 `v.minValue`、`v.maxValue` 追加；選填的非負數字用 `optionalNonNegativeNumber`。驗證與送出的都是數字，不含千分位。

<component-example name="input-number-validation">



</component-example>

### 增減按鈕搭配驗證

`min`、`max` 不取代驗證：範例的按鈕只限制不小於 0，上限由 schema 檢查；按增加超過 40 時立即顯示錯誤。

<component-example name="input-number-step-validation">



</component-example>

### 數字置中

`ui.base` 內建 `text-right`，傳入 `text-center` 即可置中，適合嵌在句子中的短欄位。開啟水平排列的增減按鈕時內建改為 `text-center`，數字在兩個按鈕中間；要維持靠右時傳入 `text-right`。有單位或載入中時，右內距依尾端實際寬度保留，數字不會與單位重疊。

<component-example name="input-number-center">



</component-example>

### 清除按鈕

以 `#trailing` 放入清除按鈕。`#trailing` 與單位、載入圖示並排，不會互相取代，見下方 [Slots](#slots)。

<component-example name="input-number-clearable">



</component-example>

### 操作原生 input

透過 template ref 的 `inputRef` 取得原生 input。

<component-example name="input-number-expose">



</component-example>

## Props

<component-props name="ShuoInputNumber">



</component-props>

`size`、`disabled`、`loading`、`skeleton`、`id`、`name` 的行為見[共用參數](https://k90325248.github.io/shuo-ui/components/overview/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)。

## Slots

<table>
<thead>
  <tr>
    <th>
      Slot
    </th>
    
    <th>
      參數
    </th>
    
    <th>
      說明
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        leading
      </code>
    </td>
    
    <td>
      <code>
        ui
      </code>
    </td>
    
    <td>
      前置內容；未傳時保留 <code>
        icon
      </code>
      
      、<code>
        leadingIcon
      </code>
      
      、<code>
        avatar
      </code>
      
      ；水平排列的按鈕開啟時接在減少按鈕後面
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        default
      </code>
    </td>
    
    <td>
      <code>
        ui
      </code>
    </td>
    
    <td>
      輸入框內的額外內容
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        trailing
      </code>
    </td>
    
    <td>
      <code>
        ui
      </code>
    </td>
    
    <td>
      尾端內容，依序並排「單位、<code>
        trailing
      </code>
      
       slot、載入圖示、增加按鈕」，右內距依實際寬度保留
    </td>
  </tr>
</tbody>
</table>

參數同 Nuxt UI `UInput`。

## Expose

<table>
<thead>
  <tr>
    <th>
      名稱
    </th>
    
    <th>
      型別
    </th>
    
    <th>
      說明
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        inputRef
      </code>
    </td>
    
    <td>
      <code>
        HTMLInputElement | null
      </code>
    </td>
    
    <td>
      原生 input，可直接 <code>
        focus()
      </code>
      
      、<code>
        select()
      </code>
    </td>
  </tr>
</tbody>
</table>

## 樣式

`ui` 可用 Nuxt UI `UInput` 的所有 slot（`root`、`base`、`leading`、`trailing` 等），另外提供 `suffix`、`unit` 與增減按鈕的 `prefix`、`buttons`、`increment`、`decrement`：

<table>
<thead>
  <tr>
    <th>
      Slot
    </th>
    
    <th>
      部位
    </th>
    
    <th>
      內建樣式
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        root
      </code>
    </td>
    
    <td>
      外框（Nuxt UI）
    </td>
    
    <td>
      <code>
        w-full min-w-0
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        base
      </code>
    </td>
    
    <td>
      原生 input（Nuxt UI）
    </td>
    
    <td>
      <code>
        text-right
      </code>
      
      ；水平排列的增減按鈕為 <code>
        text-center
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        suffix
      </code>
    </td>
    
    <td>
      尾端外層，包住單位與載入圖示
    </td>
    
    <td>
      <code>
        flex items-center gap-1.5
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        unit
      </code>
    </td>
    
    <td>
      單位文字
    </td>
    
    <td>
      <code>
        text-dimmed whitespace-nowrap
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        prefix
      </code>
    </td>
    
    <td>
      水平排列時包住減少按鈕與 <code>
        #leading
      </code>
    </td>
    
    <td>
      <code>
        flex items-center gap-1.5
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        buttons
      </code>
    </td>
    
    <td>
      垂直排列時上下疊放兩個按鈕
    </td>
    
    <td>
      <code>
        flex flex-col justify-center
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        increment
      </code>
    </td>
    
    <td>
      增加按鈕外層
    </td>
    
    <td>
      <code>
        flex items-center
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        decrement
      </code>
    </td>
    
    <td>
      減少按鈕外層
    </td>
    
    <td>
      <code>
        flex items-center
      </code>
    </td>
  </tr>
</tbody>
</table>

開啟按鈕時，Nuxt UI 的 `leading`、`trailing` 內距縮小為 `ps-1`、`pe-1`（同 `UInputNumber`），可由 `ui` 覆寫。按鈕圖示沿用 `app.config.ts` 的 `ui.icons`：水平為 `plus`、`minus`，垂直為 `chevronUp`、`chevronDown`。

要讓數字置中，傳入 `:ui="{ base: 'text-center' }"`，見[數字置中](#%E6%95%B8%E5%AD%97%E7%BD%AE%E4%B8%AD)；水平排列的增減按鈕已內建置中，傳入 `text-right`、`text-left` 可改回靠右或靠左。函式寫法收到的預設值同樣依按鈕排列而不同。有單位或載入中時，元件依尾端實際寬度設定輸入框右內距（inline style），`ui`、`class`、`style` 都不會蓋掉，置中時數字在扣除單位後的空間內置中，不會與單位重疊。

## 更新紀錄

<component-changelog name="ShuoInputNumber">



</component-changelog>

---

- [UInput](https://ui.nuxt.com/docs/components/input)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
