---
title: "Tooltip"
description: "基於 UTooltip 的提示，補上觸控裝置長按顯示。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/components/helper/tooltip"
---
# Tooltip

> 基於 UTooltip 的提示，補上觸控裝置長按顯示。

Nuxt UI 的 `UTooltip` 只在滑鼠移入或鍵盤聚焦時顯示，手機上點擊、按住都不會出現。`ShuoTooltip` 沿用 `UTooltip` 的全部參數與 slot，只補上觸控裝置的長按顯示，把 `UTooltip` 改成 `ShuoTooltip` 即可。

元件庫內的提示都使用它：`ShuoInfoTooltip` 與下拉選單、日期選擇器、檔案選擇、核取方塊、選項群組的文字截斷提示，在手機上一樣長按顯示。

## 用法

### 提示文字

`text` 為提示內容，觸發元素放在預設 slot。`kbds`、`content`、`arrow`、`delayDuration` 等參數與 Nuxt UI 相同。

<component-example name="tooltip-text">



</component-example>

### 觸控長按

觸控裝置上按住觸發元素約 0.5 秒即顯示提示，放開後保持顯示，點擊其他位置或捲動頁面時關閉。

- 長按顯示提示時，放開手指不會觸發觸發元素原本的動作（點擊、勾選、開啟選單等）。
- 一般點擊照常觸發原本的動作，不顯示提示；點擊造成的聚焦也不顯示。
- 按住後移動手指視為捲動，不顯示提示。
- 長按期間不顯示瀏覽器的長按選單，觸發元素內的文字不會被選取（輸入框除外）。

`touch` 設為 `false` 時與 Nuxt UI 原本的行為相同，觸控無法開啟提示。

<component-example name="tooltip-touch">



</component-example>

要全站關閉時設定 `components.tooltip.touch: false`，元件庫內的提示也會一起關閉，見[元件全站預設值](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults)。

### 開啟狀態

以 `v-model:open` 綁定開啟狀態，可由程式開啟或關閉；未綁定時可用 `default-open` 設定初始狀態。

<component-example name="tooltip-open">



</component-example>

## Props

<component-props name="ShuoTooltip">



</component-props>

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
        default
      </code>
    </td>
    
    <td>
      觸發元素
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        content
      </code>
    </td>
    
    <td>
      自訂提示內容，同 Nuxt UI 的 <code>
        content
      </code>
    </td>
  </tr>
</tbody>
</table>

## 更新紀錄

<component-changelog name="ShuoTooltip">



</component-changelog>

---

- [UTooltip](https://ui.nuxt.com/docs/components/tooltip)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
