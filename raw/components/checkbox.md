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

預設勾選為 `1`、取消為 `0`。綁定值不等於 `trueValue` 時顯示未勾選。

<component-example name="checkbox-basic">



</component-example>

### 與輸入框並排

外層在 flex 中會隨空間收縮並截斷文字。要完整顯示文字，設定 `ui.wrapper` 為 `shrink-0`；文字超過容器寬度時仍會截斷並顯示 Tooltip。

<component-example name="checkbox-inline">



</component-example>

## Props

<component-props name="ShuoCheckbox">



</component-props>

`size`、`disabled`、`loading`、`skeleton`、`id`、`name` 的行為見[共用參數](https://k90325248.github.io/components/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)。`label` 的預設值可由文案 `checkbox.label` 覆寫。

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
      文字旁的附加內容，見<a href="https://k90325248.github.io/components/choice-group#%E9%81%B8%E9%A0%85%E9%99%84%E5%8A%A0%E5%85%A7%E5%AE%B9">
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

---

- [UCheckbox](https://ui.nuxt.com/docs/components/checkbox)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
