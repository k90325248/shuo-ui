---
title: "Table"
description: "基於 UTable 的純表格，含骨架、空資料與高度過渡。"
canonical_url: "https://k90325248.github.io/components/table"
---
# Table

> 基於 UTable 的純表格，含骨架、空資料與高度過渡。

沒有卡片、標題與分頁，可直接放進彈窗或自己的 `UCard`。共用的表頭不換行、儲存格內距、空資料與查詢中文字、初次載入骨架、`interactionDisabled`，以及高度與淡化過渡。泛型 `T` 為資料列型別。

## 用法

### 查詢中與空資料

元件建立時即在查詢且沒有資料時顯示骨架列；已有資料時重新查詢，資料淡化並以高度過渡切換。清空資料後顯示「查無資料」。

<component-example name="table-basic">



</component-example>

### 可編輯表格

在 cell slot 放 Shuo 輸入元件，搭配 `UCard` 的標題與底部按鈕。

<component-example name="table-editable">



</component-example>

### 彈窗內的明細表

限制高度並固定表頭時，用 `tableProps` 設定 `ui.root` 與 `sticky`，捲動發生在表格本身，表頭才會固定。

```vue
<ShuoTable :data="rows" :columns="columns" :loading="!rows" :table-props="{ sticky: true, ui: { root: 'max-h-80' } }" />
```

### 過渡

資料筆數或內容高度改變時，資料區高度以 0.2 秒平滑變化；重新查詢且已有資料時，資料淡化為 0.5。`transition` 設為 `false` 時高度直接跟著內容，淡化不播放過渡。使用者偏好減少動態效果時一律不播放。

## Props

<component-props name="ShuoTable">



</component-props>

「查詢中…」與「查無資料」可由文案 `table.loading`、`table.empty` 全域覆寫，見[文案覆寫](https://k90325248.github.io/guides/messages)。表頭、儲存格等樣式用 `tableProps.ui` 設定，與內建樣式合併。

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
        <欄位>-cell
      </code>
      
       等 <code>
        UTable
      </code>
      
       slot
    </td>
    
    <td>
      原參數＋<code>
        interactionDisabled
      </code>
    </td>
    
    <td>
      自訂儲存格與表頭
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        body-top
      </code>
    </td>
    
    <td>
      <code>
        interactionDisabled
      </code>
    </td>
    
    <td>
      表格上方列
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        loading
      </code>
      
      、<code>
        empty
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      查詢中與空資料的內容
    </td>
  </tr>
</tbody>
</table>

---

- [UTable](https://ui.nuxt.com/docs/components/table)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
