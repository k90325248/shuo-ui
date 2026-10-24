---
title: "InfoTooltip"
description: "資訊圖示加提示，滑鼠移入或鍵盤聚焦即顯示。"
canonical_url: "https://k90325248.github.io/components/info-tooltip"
---
# InfoTooltip

> 資訊圖示加提示，滑鼠移入或鍵盤聚焦即顯示。

滑鼠移入或鍵盤聚焦即顯示提示，沒有延遲。

## 用法

<component-example name="info-tooltip-basic">



</component-example>

`text` 支援換行字元；需要粗體等格式時改用 `#content` slot。`class` 落在觸發按鈕，例如 `class="text-warning"` 可改變圖示顏色。

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

`ui` 合併規則見[單一元件的 `ui` prop](https://k90325248.github.io/guides/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)：

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

`class` 落在觸發按鈕，與 `ui.trigger` 一起合併，例如 `class="text-warning"` 可改變圖示顏色。

---

- [UTooltip](https://ui.nuxt.com/docs/components/tooltip)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
