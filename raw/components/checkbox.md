---
title: "Checkbox"
description: "單一核取方塊，可自訂勾選值，文字旁可放附加內容。"
canonical_url: "https://k90325248.github.io/components/checkbox"
---
# Checkbox

> 單一核取方塊，可自訂勾選值，文字旁可放附加內容。

`v-model: string | number | boolean`，必須提供。

## 用法

### 勾選值

`true-value` 是勾選時的綁定值，預設數字 `1`；`false-value` 是取消時的綁定值，預設數字 `0`。後端使用 `Y`／`N` 或布林值時改成對應的值；整個專案統一時可在全站設定 `trueValue`、`falseValue` 的預設值，見[可設定的項目](https://k90325248.github.io/guides/component-defaults#%E5%8F%AF%E8%A8%AD%E5%AE%9A%E7%9A%84%E9%A0%85%E7%9B%AE)。

<component-example name="checkbox-values">



</component-example>

- 綁定值不等於 `true-value` 時顯示未勾選；範例中只改 `true-value` 時，原本的值不再相符，會顯示為未勾選。
- 原生表單送出時帶出 `true-value`，而不是瀏覽器預設的 `on`。

### 顯示文字

`label` 預設為「啟用」，可由文案 `checkbox.label` 覆寫。

<component-example name="checkbox-label">



</component-example>

文字單行顯示，超過容器寬度時截斷，滑過或聚焦時以 Tooltip 顯示完整文字。

### 顏色與圖示

沿用 `UCheckbox` 的 `color` 與 `icon`（勾選時的圖示）。

<component-example name="checkbox-color">



</component-example>

### 尺寸與狀態

外框高度對齊同尺寸的輸入框。載入中以同尺寸的轉圈圖示取代勾選框並停用。各狀態的共通行為見[共用參數](https://k90325248.github.io/components/common)。

<component-example name="checkbox-states">



</component-example>

## 範例

### 與輸入框並排

外層在 flex 中會隨空間收縮並截斷文字。要完整顯示文字，設定 `ui.wrapper` 為 `shrink-0`；文字超過容器寬度時仍會截斷並顯示 Tooltip。

<component-example name="checkbox-inline">



</component-example>

### 文字旁的輸入框

以 `#append` 在文字旁放輸入框；輸入框聚焦時呼叫 slot 參數的 `check()` 一併勾選，`labelId` 作為輸入框的 `aria-labelledby`。點擊附加內容的非互動區域不會改變勾選，細節見[選項附加內容](https://k90325248.github.io/components/checkbox-group#%E9%81%B8%E9%A0%85%E9%99%84%E5%8A%A0%E5%85%A7%E5%AE%B9)。

<component-example name="checkbox-append">



</component-example>

### 必須勾選

同意條款等必須勾選的欄位，以 `v.check` 檢查綁定值等於 `true-value`（不用 `v.literal`，避免 UForm 的 state 型別被限縮）。

<component-example name="checkbox-validation">



</component-example>

## Props

<component-props name="ShuoCheckbox">



</component-props>

`size`、`disabled`、`loading`、`skeleton`、`id`、`name` 的行為見[共用參數](https://k90325248.github.io/components/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)。`label` 的預設值可由文案 `checkbox.label` 覆寫。

不支援 Nuxt UI 的 `variant`（card）、`indicator` 與 `highlight`，避免外框撐高選項、破壞與輸入框對齊的高度，原因見[沿用 Nuxt UI](https://k90325248.github.io/components/common#%E6%B2%BF%E7%94%A8-nuxt-ui)。

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
        append
      </code>
    </td>
    
    <td>
      <code>
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
    </td>
    
    <td>
      文字旁的附加內容，見<a href="https://k90325248.github.io/components/checkbox-group#%E9%81%B8%E9%A0%85%E9%99%84%E5%8A%A0%E5%85%A7%E5%AE%B9">
        選項附加內容
      </a>
    </td>
  </tr>
</tbody>
</table>

## 樣式

`ui` 可用 Nuxt UI `UCheckbox` 的所有 slot，合併規則見[單一元件的 `ui` prop](https://k90325248.github.io/guides/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)，另外提供 `wrapper`：

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
        wrapper
      </code>
    </td>
    
    <td>
      外層，量測省略文字、掛 Tooltip 並定位載入圖示
    </td>
    
    <td>
      <code>
        relative inline-flex w-fit max-w-full min-w-0 align-top
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        root
      </code>
    </td>
    
    <td>
      核取方塊外框（Nuxt UI）
    </td>
    
    <td>
      <code>
        w-fit max-w-full min-w-0
      </code>
      
      ，高度對齊同尺寸輸入框、垂直置中
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        label
      </code>
    </td>
    
    <td>
      文字（Nuxt UI）
    </td>
    
    <td>
      <code>
        truncate
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
      勾選框（Nuxt UI）
    </td>
    
    <td>
      載入中為 <code>
        opacity-0
      </code>
    </td>
  </tr>
</tbody>
</table>

高度也可用 `class="[--form-checkbox-height:1.25rem]"` 調整。`class` 落在核取方塊外框，不影響外層。

## 更新紀錄

<component-changelog name="ShuoCheckbox">



</component-changelog>

---

- [UCheckbox](https://ui.nuxt.com/docs/components/checkbox)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
