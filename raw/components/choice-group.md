---
title: "RadioGroup／CheckboxGroup"
description: "單選與複選群組，依視窗寬度自動排列，支援自訂選項欄位與附加內容。"
canonical_url: "https://k90325248.github.io/components/choice-group"
---
# RadioGroup／CheckboxGroup

> 單選與複選群組，依視窗寬度自動排列，支援自訂選項欄位與附加內容。

複選群組 `v-model: string[]`（必須提供）、單選群組 `v-model: string`；選項 `value` 不使用空字串。

## 用法

### 單選與複選

`orientation` 預設 `auto`，依視窗寬度在 `breakpoint`（預設 `md`）前後切換垂直與水平排列。選項文字被省略時，滑鼠移入或鍵盤聚焦會顯示完整文字提示。

<component-example name="choice-group-basic">



</component-example>

### 響應式分欄

使用 `orientation="grid"`，透過 `ui.fieldset` 覆寫 Tailwind 分欄與斷點 class。預設一欄，每列至少維持同尺寸輸入框高度；保留多選陣列綁定、省略提示與骨架行為。

<component-example name="choice-group-grid">



</component-example>

以上設定為預設一欄、md 起兩欄、xl 起四欄。`breakpoint` 只用於 `orientation="auto"` 的水平／垂直切換；grid 的斷點由 class 控制。`class` 設定外框，`ui.fieldset` 設定選項容器。請使用完整靜態 class，讓 Tailwind 能掃描產生樣式。

### 自訂選項欄位

後端選項欄位不是 `label`、`value` 時（例如 `{ Code, Name }`），以 `labelKey`、`valueKey` 指定，不必先轉換資料：

<component-example name="choice-group-keys">



</component-example>

- **綁定值須為字串**：`v-model` 型別維持 `string`（複選為 `string[]`）。後端代碼若是數字，請先轉成字串，例如 `items.map((item) => ({ ...item, Code: String(item.Code) }))`。
- **原始的 label、value 欄位會被取代**：元件把每個物件選項轉成「原始欄位 + 依 `labelKey`、`valueKey` 解析的 `label`、`value`」。原始資料本身就有 `label`、`value` 欄位時，會被解析出的值取代。
- `#item-append` 的 `item` 是轉換後的物件，同時取得原始欄位（`item.Code`、`item.Name`）與 `item.label`、`item.value`。
- 開發模式下，第一個物件選項缺少 `labelKey` 或 `valueKey` 指定的欄位時，主控台會警告一次（含元件與欄位名稱）；正式環境不檢查。`ShuoSelectMenu` 也有相同檢查。

### 選項附加內容

選項文字旁需要直接輸入時（例如「○ 定額轉存 <span>

百元

</span>

」），使用 `#item-append` slot（`ShuoCheckbox` 為 `#append`）：

<component-example name="choice-group-append">



</component-example>

附加輸入框需要驗證時，另包一層 `UFormField`，並以外層的 `error-pattern` 一併顯示錯誤：

```vue
<UFormField label="薪餉留薪金額" name="mode" :error-pattern="/^(mode|amount)$/">
  <ShuoRadioGroup v-model="state.mode" :items="modeOptions">
    <template #item-append="{ item, selected, labelId }">
      <UFormField v-if="item.value === 'fixed'" name="amount" :ui="{ error: 'hidden' }">
        <ShuoInputNumber
          v-model="state.amount"
          class="w-32"
          unit="百元"
          :disabled="!selected"
          :aria-labelledby="labelId"
        />
      </UFormField>
    </template>
  </ShuoRadioGroup>
</UFormField>
```

- 點擊附加內容（輸入框、單位或空白處）不會改變選取；要在聚焦時自動選取，請綁定 `@focus="select"`（或 `check`）。
- `disabled` 已包含選項停用、元件停用、載入中與表單停用。
- `labelId` 是選項文字的 id，建議設為附加輸入框的 `aria-labelledby`；選項按鈕本身只以選項文字命名，不會帶入輸入框的值。
- 附加輸入框不屬於外層 `UFormField`，需要驗證時另包一層 `UFormField`，或以外層的 `error-pattern` 一併顯示錯誤。

## Props

兩個元件的 props 相同，以下為 `ShuoRadioGroup`；`ShuoCheckboxGroup` 另有選項欄位 `icon`（勾選時顯示的圖示）。

<component-props name="ShuoRadioGroup">



</component-props>

`size`、`disabled`、`loading`、`skeleton`、`id`、`name` 的行為見[共用參數](https://k90325248.github.io/components/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)。

### 選項欄位

選項（`RadioGroupOption`／`CheckboxGroupOption`）沿用 Nuxt UI 的選項欄位，`value` 限定字串。

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
        icon
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      只有複選群組：勾選時顯示的圖示
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
      元件
    </th>
    
    <th>
      Slot
    </th>
    
    <th>
      參數
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ShuoRadioGroup
      </code>
    </td>
    
    <td>
      <code>
        #item-append
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
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoCheckboxGroup
      </code>
    </td>
    
    <td>
      <code>
        #item-append
      </code>
    </td>
    
    <td>
      <code>
        item
      </code>
      
      、<code>
        checked
      </code>
      
      、<code>
        disabled
      </code>
      
      、<code>
        labelId
      </code>
      
      、<code>
        check()
      </code>
      
      （已勾選時不變）
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
      <code>
        w-fit max-w-full min-w-0
      </code>
      
      ；<code>
        grid
      </code>
      
       為 <code>
        w-full
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
      水平排列時高度對齊同尺寸輸入框、間距 <code>
        gap-x-2
      </code>
      
      ；<code>
        grid
      </code>
      
       為 <code>
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
      <code>
        min-w-0 w-fit max-w-full
      </code>
      
      ；載入中加 <code>
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
      載入中為 <code>
        opacity-0
      </code>
    </td>
  </tr>
</tbody>
</table>

例如 `:ui="{ fieldset: 'gap-x-8' }"` 加大水平排列的選項間距。函式寫法收到的預設值包含上述內建樣式，`grid` 模式取代 `fieldset` 時請保留 `grid`，例如 `(defaults) => defaults.replace('grid-cols-1', 'grid-cols-3')`。

---

- [URadioGroup](https://ui.nuxt.com/docs/components/radio-group)
- [UCheckboxGroup](https://ui.nuxt.com/docs/components/checkbox-group)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
