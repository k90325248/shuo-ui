---
title: "InputNumber"
description: "數字輸入，離開輸入框後顯示千分位，可指定小數位數與單位。"
canonical_url: "https://k90325248.github.io/components/input-number"
---
# InputNumber

> 數字輸入，離開輸入框後顯示千分位，可指定小數位數與單位。

`v-model: number | null`。

## 用法

### 單位、小數與千分位

輸入中保留正負號、小數點與尾端零，尚未完成的輸入（例如只有 `-`）綁定為 `null`；離開輸入框時依 `decimal` 捨入並補零，並顯示千分位。

<component-example name="input-number-basic">



</component-example>

### 數字置中

`ui.base` 內建 `text-right`，傳入 `text-center` 即可置中。有單位或載入中時，右內距依尾端實際寬度保留，數字不會與單位重疊。

<component-example name="input-number-center">



</component-example>

<tip>

元件不提供 `min`、`max`。底層是文字型 input，原生的 `min`、`max`、`step` 不會生效，數值範圍請用[驗證規則](https://k90325248.github.io/guides/validation)，例如 `v.pipe(v.number(), v.minValue(1), v.maxValue(100))`。

</tip>

## Props

<component-props name="ShuoInputNumber">



</component-props>

`size`、`disabled`、`loading`、`skeleton`、`id`、`name` 的行為見[共用參數](https://k90325248.github.io/components/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)。

## Slots

<table>
<thead>
  <tr>
    <th>
      Slot
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
      前置內容；未傳時保留 <code>
        icon
      </code>
      
      、<code>
        leadingIcon
      </code>
      
      、<code>
        avatar
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        default
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
      尾端內容，依序並排「單位、<code>
        trailing
      </code>
      
       slot、載入圖示」，右內距依實際寬度保留
    </td>
  </tr>
</tbody>
</table>

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

`ui` 可用 Nuxt UI `UInput` 的所有 slot（`root`、`base`、`trailing` 等），另外提供 `suffix`、`unit`：

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
</tbody>
</table>

數字置中：

```vue
<ShuoInputNumber v-model="count" class="w-14" :ui="{ base: 'text-center' }" />
```

有單位或載入中時，元件依尾端實際寬度設定輸入框右內距（inline style），`ui`、`class`、`style` 都不會蓋掉，置中時數字在扣除單位後的空間內置中，不會與單位重疊。

---

- [UInput](https://ui.nuxt.com/docs/components/input)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
