---
title: "InfoTooltip"
description: "資訊圖示加提示，滑鼠移入、鍵盤聚焦或觸控長按即顯示。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/components/helper/info-tooltip"
---
# InfoTooltip

> 資訊圖示加提示，滑鼠移入、鍵盤聚焦或觸控長按即顯示。

滑鼠移入或鍵盤聚焦即顯示提示，沒有延遲；觸控裝置長按圖示顯示，點擊不顯示。提示由 [ShuoTooltip](https://k90325248.github.io/shuo-ui/components/helper/tooltip) 提供，觸控行為見[觸控長按](https://k90325248.github.io/shuo-ui/components/helper/tooltip#%E8%A7%B8%E6%8E%A7%E9%95%B7%E6%8C%89)。

## 用法

### 提示文字

`text` 為提示內容，支援換行字元，過長時在最大寬度內自動換行。`text` 為空且沒有 `#content` slot 時不顯示提示。

<component-example name="info-tooltip-text">



</component-example>

需要粗體等格式時改用 `#content` slot，見[自訂內容](#%E8%87%AA%E8%A8%82%E5%85%A7%E5%AE%B9)。

### 圖示與顏色

`icon` 為觸發按鈕的圖示，預設 `i-lucide-circle-alert`。`class` 落在觸發按鈕，例如 `class="text-warning"` 可改變圖示顏色。

<component-example name="info-tooltip-icon">



</component-example>

圖示按鈕沒有可見文字，請以 `label` 提供無障礙名稱。

## 範例

### 欄位提示

放在 `UFormField` 的 `#hint`，提示圖示顯示在欄位標籤右側。

<component-example name="info-tooltip-form-field">



</component-example>

### 自訂內容

以 `#content` slot 放入粗體、顏色等格式。

<component-example name="info-tooltip-content">



</component-example>

### 提示框寬度

提示框預設最大寬度為 `max-w-xs`，可用 `ui.tooltip.content` 調整，例如 `:ui="{ tooltip: { content: 'max-w-md' } }"`。

<component-example name="info-tooltip-width">



</component-example>

## Props

<component-props name="ShuoInfoTooltip">



</component-props>

`label` 的預設值可由文案 `infoTooltip.label` 覆寫。

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
        content
      </code>
    </td>
    
    <td>
      自訂提示內容；<code>
        text
      </code>
      
       為空且沒有此 slot 時不顯示提示
    </td>
  </tr>
</tbody>
</table>

## 樣式

`ui` 合併規則見[單一元件的 `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)：

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
        trigger
      </code>
    </td>
    
    <td>
      觸發按鈕
    </td>
    
    <td>
      <code>
        text-primary inline-flex cursor-help rounded-full
      </code>
      
      、focus 外框
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        icon
      </code>
    </td>
    
    <td>
      按鈕內的圖示
    </td>
    
    <td>
      <code>
        size-4 shrink-0
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        text
      </code>
    </td>
    
    <td>
      提示內容外層
    </td>
    
    <td>
      <code>
        min-w-0 text-left wrap-break-word whitespace-pre-line
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tooltip
      </code>
    </td>
    
    <td>
      提示框，值同 Nuxt UI <code>
        UTooltip
      </code>
      
       的 <code>
        ui
      </code>
    </td>
    
    <td>
      <code>
        content
      </code>
      
       為 <code>
        h-auto max-w-xs py-2
      </code>
    </td>
  </tr>
</tbody>
</table>

`class` 與 `ui.trigger` 一起合併。

## 更新紀錄

<component-changelog name="ShuoInfoTooltip">



</component-changelog>

---

- [UTooltip](https://ui.nuxt.com/docs/components/tooltip)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
