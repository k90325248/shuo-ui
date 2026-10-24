---
title: "ListCard"
description: "查詢結果清單卡片，包含標題列、表格與後端分頁。"
canonical_url: "https://k90325248.github.io/components/list-card"
---
# ListCard

> 查詢結果清單卡片，包含標題列、表格與後端分頁。

查詢結果的清單卡片：標題列、[ShuoTable](https://k90325248.github.io/components/table) 資料區與分頁，分頁由後端處理。泛型 `T` 為資料列型別。骨架、空資料、查詢中文字與高度過渡由 `ShuoTable` 處理，不需要卡片與分頁時直接使用 `ShuoTable`。

## 用法

分頁由後端處理：元件發出 `page-change`，頁面查詢該頁成功後再更新 `page` 與 `data`。查詢中、頁碼與目前相同或超出範圍時不發出。`interactionDisabled` 在查詢中為 `true`，可用來停用清單內的操作。

<component-example name="list-card-basic">



</component-example>

`PageRequest` 型別可由 `#shuo-ui/types/pagination` 匯入，見[自動匯入與型別](https://k90325248.github.io/guides/auto-imports#%E5%9E%8B%E5%88%A5)。標題「查詢結果」與底部統計可由文案 `listCard.title`、`listCard.summary` 全域覆寫；「查詢中…」「查無資料」屬於 `table` 區塊，見[文案覆寫](https://k90325248.github.io/guides/messages)。

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
      表格上方列與卡片底部額外內容；分頁與統計皆關閉時 footer 只顯示插槽內容
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

`ui` 目前開放標題列各部位，內建樣式與 `ShuoQueryCard` 相同，合併規則見[單一元件的 `ui` prop](https://k90325248.github.io/guides/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)；表格樣式請用 `tableProps.ui`：

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

---

- [UTable](https://ui.nuxt.com/docs/components/table)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
