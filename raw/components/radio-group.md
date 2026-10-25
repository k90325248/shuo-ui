---
title: "RadioGroup"
description: "單選群組，依視窗寬度自動排列，支援自訂選項欄位與附加內容。"
canonical_url: "https://k90325248.github.io/components/radio-group"
---
# RadioGroup

> 單選群組，依視窗寬度自動排列，支援自訂選項欄位與附加內容。

`v-model: string`；選項 `value` 不使用空字串。需要複選時改用 [CheckboxGroup](https://k90325248.github.io/components/checkbox-group)。

## 用法

### 選項

`items` 可傳物件或字串：物件選項以 `label` 顯示、`value` 為綁定值，`disabled` 停用單一選項；字串選項的 `label` 與 `value` 皆為該字串。未選取時綁定值為 `''`。

<component-example name="radio-group-items">



</component-example>

### 排列方向

`orientation` 預設 `auto`，依視窗寬度在 `breakpoint`（預設 `md`）前後切換垂直與水平排列；`horizontal`、`vertical` 固定方向，不受視窗寬度影響。選項文字被省略時，滑鼠移入或鍵盤聚焦會顯示完整文字提示。`orientation`、`breakpoint` 以及 `label-key`、`value-key`、`ui` 可在全站設定預設值，見[可設定的項目](https://k90325248.github.io/guides/component-defaults#%E5%8F%AF%E8%A8%AD%E5%AE%9A%E7%9A%84%E9%A0%85%E7%9B%AE)。

<component-example name="radio-group-orientation">



</component-example>

### 響應式分欄

使用 `orientation="grid"`，透過 `ui.fieldset` 覆寫 Tailwind 分欄與斷點 class。預設一欄，每列至少維持同尺寸輸入框高度；保留省略提示與骨架行為。

<component-example name="radio-group-grid">



</component-example>

第一組設定為預設一欄、md 起兩欄、xl 起四欄。`breakpoint` 只用於 `orientation="auto"` 的水平／垂直切換；grid 的斷點由 class 控制。`class` 設定外框，`ui.fieldset` 設定選項容器。請使用完整靜態 class，讓 Tailwind 能掃描產生樣式。

### 自訂選項欄位

後端選項欄位不是 `label`、`value` 時（例如 `{ Code, Name }`），以 `label-key`、`value-key` 指定，不必先轉換資料：

<component-example name="radio-group-keys">



</component-example>

- **綁定值須為字串**：`v-model` 型別維持 `string`。後端代碼若是數字，請先轉成字串，例如 `items.map((item) => ({ ...item, Code: String(item.Code) }))`。
- **原始的 label、value 欄位會被取代**：元件把每個物件選項轉成「原始欄位 + 依 `labelKey`、`valueKey` 解析的 `label`、`value`」。原始資料本身就有 `label`、`value` 欄位時，會被解析出的值取代。
- `#item-append` 的 `item` 是轉換後的物件，同時取得原始欄位（`item.Code`、`item.Name`）與 `item.label`、`item.value`。
- 開發模式下，第一個物件選項缺少 `labelKey` 或 `valueKey` 指定的欄位時，主控台會警告一次（含元件與欄位名稱）；正式環境不檢查。`ShuoSelectMenu` 也有相同檢查。

### 顏色

沿用 `URadioGroup` 的 `color`，改變選取時的顏色。

<component-example name="radio-group-color">



</component-example>

### 尺寸與狀態

水平排列時高度對齊同尺寸輸入框，範例右側放了同尺寸的 `ShuoInputText` 方便比對。載入中以轉圈圖示取代各選項按鈕並停用；各狀態的共通行為見[共用參數](https://k90325248.github.io/components/common)。

<component-example name="radio-group-states">



</component-example>

## 範例

### 選項附加內容

選項文字旁需要直接輸入時（例如「○ 定額轉存 <span>

百元

</span>

」），使用 `#item-append` slot。範例在金額輸入框聚焦時一併選取「定額轉存」：

<component-example name="radio-group-append">



</component-example>

- 點擊附加內容（輸入框、單位或空白處）不會改變選取；要在聚焦時自動選取，請綁定 `@focus="select"`。
- `disabled` 已包含選項停用、元件停用、載入中與表單停用。
- `labelId` 是選項文字的 id，建議設為附加輸入框的 `aria-labelledby`；選項按鈕本身只以選項文字命名，不會帶入輸入框的值。
- 附加輸入框不屬於外層 `UFormField`，需要驗證時另包一層 `UFormField`，或以外層的 `error-pattern` 一併顯示錯誤。

### 搭配表單驗證

單選必填用 `requiredText`（未選取為 `''`）。附加輸入框需要驗證時，另包一層 `UFormField`，並以外層的 `error-pattern` 一併顯示錯誤；範例只在選「定額轉存」時要求金額，未選取時金額框停用。

<component-example name="radio-group-validation">



</component-example>

### 依選項顯示其他欄位

選「郵寄」才顯示通訊地址；schema 以 `v.variant` 依寄送方式切換，郵寄時地址必填。

<component-example name="radio-group-conditional">



</component-example>

## Props

<component-props name="ShuoRadioGroup">



</component-props>

`size`、`disabled`、`loading`、`skeleton`、`id`、`name` 的行為見[共用參數](https://k90325248.github.io/components/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)。

不支援 Nuxt UI 的 `variant`（card、table）、`indicator` 與 `highlight`，避免外框撐高選項、破壞與輸入框對齊的高度，原因見[沿用 Nuxt UI](https://k90325248.github.io/components/common#%E6%B2%BF%E7%94%A8-nuxt-ui)。

### 選項欄位

選項（`RadioGroupOption`）沿用 Nuxt UI 的選項欄位，`value` 限定字串。

<table>
<thead>
  <tr>
    <th>
      欄位
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
        label
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
      （必填）
    </td>
    
    <td>
      顯示文字；欄位名稱可由 <code>
        labelKey
      </code>
      
       指定
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        value
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
      （必填）
    </td>
    
    <td>
      綁定值；欄位名稱可由 <code>
        valueKey
      </code>
      
       指定
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        disabled
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      停用此選項；已選取的停用選項維持選取，方向鍵與 Tab 會略過
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        class
      </code>
      
      、<code>
        ui
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      此選項的 class 與樣式覆寫，部位同 Nuxt UI；<code>
        ui
      </code>
      
       各部位只接受 class 字串或 <code>
        (defaults) => string
      </code>
      
       函式，不接受陣列與物件寫法
    </td>
  </tr>
  
  <tr>
    <td>
      其他欄位
    </td>
    
    <td>
      —
    </td>
    
    <td>
      自訂欄位原樣保留，可在 <code>
        #item-append
      </code>
      
       的 <code>
        item
      </code>
      
       取得
    </td>
  </tr>
</tbody>
</table>

<warning>

不支援 `description`：說明會撐高選項，破壞與輸入框對齊的高度，型別會報錯，執行時也不顯示。

</warning>

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
        legend
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      群組標題，同 Nuxt UI；只需要文字時改用 <code>
        legend
      </code>
      
       prop
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        item-append
      </code>
    </td>
    
    <td>
      <code>
        item
      </code>
      
      、<code>
        selected
      </code>
      
      、<code>
        disabled
      </code>
      
      、<code>
        labelId
      </code>
      
      、<code>
        select()
      </code>
    </td>
    
    <td>
      選項文字旁的附加內容，見<a href="#%E9%81%B8%E9%A0%85%E9%99%84%E5%8A%A0%E5%85%A7%E5%AE%B9">
        選項附加內容
      </a>
    </td>
  </tr>
</tbody>
</table>

## 樣式

內建樣式寫在 `ui`，可直接覆寫（見[單一元件的 `ui` prop](https://k90325248.github.io/guides/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)）：

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
      外框
    </td>
    
    <td>
      <code>
        w-fit max-w-full min-w-0
      </code>
      
      ；<code>
        grid
      </code>
      
       為 <code>
        w-full max-w-full min-w-0
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        fieldset
      </code>
    </td>
    
    <td>
      選項容器
    </td>
    
    <td>
      <code>
        min-w-0 flex-nowrap justify-start
      </code>
      
      ；水平排列加 <code>
        items-center gap-x-2
      </code>
      
      ，高度對齊同尺寸輸入框；<code>
        grid
      </code>
      
       加 <code>
        grid grid-cols-1
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        item
      </code>
    </td>
    
    <td>
      單一選項
    </td>
    
    <td>
      <code>
        min-w-0 w-fit max-w-full text-start
      </code>
      
      ；水平排列加 <code>
        items-center
      </code>
      
       並可收縮；<code>
        grid
      </code>
      
       加 <code>
        items-center
      </code>
      
      ，最小高度對齊同尺寸輸入框；載入中加 <code>
        relative
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
      選項按鈕
    </td>
    
    <td>
      載入中為 <code>
        opacity-0
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        wrapper
      </code>
    </td>
    
    <td>
      選項文字外層
    </td>
    
    <td>
      <code>
        w-auto min-w-0
      </code>
      
      ；水平排列時加 <code>
        ms-1
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        label
      </code>
    </td>
    
    <td>
      選項文字
    </td>
    
    <td>
      <code>
        w-fit max-w-full
      </code>
    </td>
  </tr>
</tbody>
</table>

例如 `:ui="{ fieldset: 'gap-x-8' }"` 加大水平排列的選項間距。函式寫法收到的預設值包含上述內建樣式，`grid` 模式取代 `fieldset` 時請保留 `grid`，例如 `(defaults) => defaults.replace('grid-cols-1', 'grid-cols-3')`。

## 更新紀錄

<component-changelog name="ShuoRadioGroup">



</component-changelog>

---

- [URadioGroup](https://ui.nuxt.com/docs/components/radio-group)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
