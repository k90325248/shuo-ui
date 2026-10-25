---
title: "Table"
description: "基於 UTable 的純表格，含骨架、空資料與高度過渡。"
canonical_url: "https://k90325248.github.io/components/table"
---
# Table

> 基於 UTable 的純表格，含骨架、空資料與高度過渡。

沒有卡片、標題與分頁，可直接放進彈窗或自己的 `UCard`。表頭不換行、儲存格內距、空資料與查詢中文字、初次載入骨架、`interactionDisabled`，以及高度與淡化過渡，都與 [ShuoListCard](https://k90325248.github.io/components/list-card) 共用。泛型 `T` 為資料列型別。

## 用法

### 查詢中與空資料

`loading` 表示正在查詢。已有資料時重新查詢，資料淡化並以高度過渡切換；沒有資料時查詢顯示「查詢中…」。清空資料後顯示 `empty`，預設「查無資料」。

<component-example name="table-basic">



</component-example>

重新查詢期間請保留原本的 `data`，查詢成功後再更新，資料才會淡化而不是清空。

### 初次載入骨架

元件建立時即在查詢（`loading` 為 `true`）且沒有資料時，依欄位數顯示三列骨架；第一次查詢結束後不再顯示骨架。按「重新建立」以查詢中的狀態重新建立表格。

<component-example name="table-skeleton">



</component-example>

骨架欄數以葉節點欄位計算，並排除 `tableProps.state.columnVisibility` 隱藏的欄位。

### 過渡

資料筆數或內容高度改變時，資料區高度以 0.2 秒平滑變化；重新查詢且已有資料時，資料淡化為 0.5。`transition` 設為 `false` 時高度直接跟著內容，淡化不播放過渡。使用者偏好減少動態效果時一律不播放。

<component-example name="table-transition">



</component-example>

## 範例

### 可編輯表格

在 cell slot 放 Shuo 輸入元件，搭配 `UCard` 的標題與底部按鈕。

<component-example name="table-editable">



</component-example>

### 彈窗內的明細表

限制高度並固定表頭時，用 `tableProps` 設定 `ui.root` 與 `sticky`，捲動發生在表格本身，表頭才會固定。彈窗每次開啟時表格重新建立，查詢期間顯示骨架列。

<component-example name="table-modal">



</component-example>

### 查詢中停用操作

cell slot 多了 `interactionDisabled`，查詢中為 `true`，可用來停用列內的按鈕。

<component-example name="table-interaction">



</component-example>

### 自訂查詢中與空資料

以 `#loading`、`#empty` 取代內建文字。`#loading` 只在沒有資料且不是初次載入骨架時顯示。

<component-example name="table-empty-slot">



</component-example>

## Props

<component-props name="ShuoTable">



</component-props>

`tableProps.paginationOptions.manualPagination` 固定為 `true`，分頁由後端處理；欄位顯示取自 `tableProps.state.columnVisibility`，直接傳入的 `tableProps.columnVisibility` 不會生效。

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

## 更新紀錄

<component-changelog name="ShuoTable">



</component-changelog>

---

- [UTable](https://ui.nuxt.com/docs/components/table)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
