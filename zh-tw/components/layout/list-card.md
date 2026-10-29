---
title: "ListCard"
description: "查詢結果清單卡片，包含標題列、表格與後端分頁。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/components/layout/list-card"
---
# ListCard

> 查詢結果清單卡片，包含標題列、表格與後端分頁。

查詢結果的清單卡片：標題列、[ShuoTable](https://k90325248.github.io/shuo-ui/components/layout/table) 資料區與分頁，分頁由後端處理。泛型 `T` 為資料列型別。骨架、空資料、查詢中文字與高度過渡由 `ShuoTable` 處理，不需要卡片與分頁時直接使用 `ShuoTable`。

## 用法

### 後端分頁

分頁由後端處理：元件發出 `page-change`，頁面查詢該頁成功後再更新 `page` 與 `data`。查詢中、頁碼與目前相同或超出範圍時不發出。`interactionDisabled` 在查詢中為 `true`，可用來停用清單內的操作。

<component-example name="list-card-basic">



</component-example>

`PageRequest` 型別可由 `#shuo-ui/types/pagination` 匯入，見[自動匯入與型別](https://k90325248.github.io/shuo-ui/getting-started/advanced/auto-imports#%E5%9E%8B%E5%88%A5)。搭配查詢條件的完整寫法見 ShuoQueryCard 的[搭配清單卡片](https://k90325248.github.io/shuo-ui/components/layout/query-card#%E6%90%AD%E9%85%8D%E6%B8%85%E5%96%AE%E5%8D%A1%E7%89%87)。

### 標題與圖示

`title` 為標題文字，`icon` 為標題左側圖示，傳空字串可隱藏圖示。標題列的換行規則與 `ShuoQueryCard` 相同，見[長標題](https://k90325248.github.io/shuo-ui/components/layout/query-card#%E9%95%B7%E6%A8%99%E9%A1%8C)。

<component-example name="list-card-title">



</component-example>

### 分頁與筆數

`show-pagination` 控制左下分頁，只有一頁時仍顯示；`show-summary` 控制右下的筆數與範圍；`page-size` 為每頁筆數，預設 10。

<component-example name="list-card-footer">



</component-example>

- 改變 `page-size` 後請以 `getPagination(1)` 從第一頁重新查詢，見[重新查詢目前頁](#%E9%87%8D%E6%96%B0%E6%9F%A5%E8%A9%A2%E7%9B%AE%E5%89%8D%E9%A0%81)。
- 分頁與筆數都關閉時，底部只顯示 `#footer` 的內容；沒有傳 `#footer` 時不顯示底部。

### 查詢中與空資料

元件建立時即在查詢且沒有資料時顯示骨架列；已有資料時重新查詢，資料淡化並以高度過渡切換。`empty` 為空資料說明，未設定時沿用表格預設；`transition` 為 `false` 時不播放過渡。骨架列數與高度由 `skeleton-rows`、`skeleton-class` 設定，未傳入時沿用 `components.table` 的全站設定。行為與 [ShuoTable](https://k90325248.github.io/shuo-ui/components/layout/table#%E6%9F%A5%E8%A9%A2%E4%B8%AD%E8%88%87%E7%A9%BA%E8%B3%87%E6%96%99) 相同。

<component-example name="list-card-states">



</component-example>

標題「查詢結果」與底部統計依語系切換（英文為「Results」「Showing 1 to 10 of 25 results.」），可由文案 `listCard.title`、`listCard.summary` 全域覆寫；「查詢中…」「查無資料」屬於 `table` 區塊，見[多語系與文案](https://k90325248.github.io/shuo-ui/getting-started/theme/messages)。

### 勾選

`selectable`、`select-all`、`selection-header`、`row-key`、`row-selectable`、`checkbox-props` 與 `v-model:selected` 轉傳給表格，用法見 [ShuoTable 的勾選](https://k90325248.github.io/shuo-ui/components/layout/table#%E5%8B%BE%E9%81%B8)。後端分頁時請設定 `row-key`，換頁後保留其他頁的勾選，可以一次處理多頁勾選的資料。

<component-example name="list-card-selection">



</component-example>

## 範例

### 標題列操作與底部內容

`#title` 取代標題文字，`#header-right` 放標題列右側的操作，`#footer` 接在分頁與統計下方。`#header-right` 與 `#footer` 可取得 `interactionDisabled`，查詢中停用操作。

<component-example name="list-card-header-right">



</component-example>

### 重新查詢目前頁

template ref 的 `getPagination()` 回傳目前頁碼與元件的每頁筆數；傳入頁碼（例如 `getPagination(1)`）則回傳該頁，適合初次查詢或條件變更後回到第一頁。

<component-example name="list-card-expose">



</component-example>

## Props

<component-props name="ShuoListCard">



</component-props>

## Events

<table>
<thead>
  <tr>
    <th>
      事件
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
        page-change
      </code>
    </td>
    
    <td>
      <code>
        { PageNumber: number; PageSize: number }
      </code>
    </td>
    
    <td>
      請由使用頁面查詢該頁，成功後再更新 <code>
        page
      </code>
      
       與 <code>
        data
      </code>
    </td>
  </tr>
</tbody>
</table>

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
        title
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      標題文字
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        header-right
      </code>
    </td>
    
    <td>
      <code>
        interactionDisabled
      </code>
    </td>
    
    <td>
      標題右側操作
    </td>
  </tr>
  
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
      
      、<code>
        footer
      </code>
    </td>
    
    <td>
      <code>
        interactionDisabled
      </code>
    </td>
    
    <td>
      表格上方列與卡片底部額外內容
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

## Expose

<table>
<thead>
  <tr>
    <th>
      名稱
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
        getPagination(page?)
      </code>
    </td>
    
    <td>
      回傳 <code>
        { PageNumber, PageSize }
      </code>
      
      ，供初次查詢或重新查詢使用
    </td>
  </tr>
</tbody>
</table>

## 樣式

`ui` 目前開放標題列各部位，內建樣式與 `ShuoQueryCard` 相同，合併規則見[單一元件的 `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)；表格樣式請用 `tableProps.ui`：

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
        bar
      </code>
    </td>
    
    <td>
      標題列
    </td>
    
    <td>
      <code>
        flex min-h-8 flex-wrap items-center gap-2
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        icon
      </code>
    </td>
    
    <td>
      標題圖示
    </td>
    
    <td>
      <code>
        text-primary size-5 shrink-0
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        title
      </code>
    </td>
    
    <td>
      標題文字
    </td>
    
    <td>
      <code>
        text-highlighted shrink-0 text-base font-semibold whitespace-nowrap
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        headerRight
      </code>
    </td>
    
    <td>
      <code>
        header-right
      </code>
      
       的外層
    </td>
    
    <td>
      <code>
        ml-auto flex min-w-0 items-center gap-3
      </code>
      
      ，只在有傳入 slot 時產生
    </td>
  </tr>
</tbody>
</table>

## 更新紀錄

<component-changelog name="ShuoListCard">



</component-changelog>

---

- [UTable](https://ui.nuxt.com/docs/components/table)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
