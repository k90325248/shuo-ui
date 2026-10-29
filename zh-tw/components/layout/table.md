---
title: "Table"
description: "基於 UTable 的純表格，含骨架、空資料與高度過渡。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/components/layout/table"
---
# Table

> 基於 UTable 的純表格，含骨架、空資料與高度過渡。

沒有卡片、標題與分頁，可直接放進彈窗或自己的 `UCard`。表頭不換行、儲存格內距、空資料與查詢中文字、初次載入骨架、`interactionDisabled`，以及高度與淡化過渡，都與 [ShuoListCard](https://k90325248.github.io/shuo-ui/components/layout/list-card) 共用。泛型 `T` 為資料列型別。

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

列數由 `skeleton-rows` 設定（預設 `3`，至少 1 列）；每條骨架的高度等樣式由 `skeleton-class` 設定（預設 `h-6`，即 24px），傳入時整個取代預設值。兩者都可在[全站元件預設值](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults)以 `components.table.skeletonRows`、`components.table.skeletonClass` 統一設定，也套用到 `ShuoListCard`。

```vue
<ShuoTable :data="rows" :columns="columns" :loading="loading" :skeleton-rows="5" skeleton-class="h-8" />
```

### 過渡

資料筆數或內容高度改變時，資料區高度以 0.2 秒平滑變化；重新查詢且已有資料時，資料淡化為 0.5。`transition` 設為 `false` 時高度直接跟著內容，淡化不播放過渡。使用者偏好減少動態效果時一律不播放。

<component-example name="table-transition">



</component-example>

### 勾選

`selectable` 開啟後在最前面加上勾選欄，勾選結果以 `v-model:selected` 綁定 key 陣列。`row-key` 指定 key，可以是欄位名稱（例如 `row-key="id"`），或由整筆資料組出 key 的函式，勾選結果保留 key 原本的型別。表頭的全選只勾選目前這頁可勾選的資料，只勾了一部分時顯示半選；`select-all` 設為 `false` 時不顯示全選，改顯示 `selection-header` 的文字。

<component-example name="table-selection">



</component-example>

- 未設定 `row-key` 時以列序號（`'0'`、`'1'`…）為 key，換頁後第一列仍是 `'0'`，會勾到不同的資料，後端分頁時請務必設定。
- 換頁或重新查詢時保留已勾選的 key，包含不在目前資料中的其他頁；要取消所有勾選時把 `v-model:selected` 設為 `[]`。
- 查詢中（`loading`）停用所有核取方塊。
- `select-all` 可在[全站元件預設值](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults)以 `components.table.selectAll` 統一設定。

### 不可勾選的資料

`row-selectable` 回傳 `false` 的資料停用勾選，全選時也會略過。範例的 key 由年度與序號組成（例如 `115-1`），已結案的資料不可勾選。

<component-example name="table-selection-disabled">



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

### 勾選欄樣式

`checkbox-props` 設定全選與每列核取方塊的外觀，兩者共用同一份設定。勾選欄格子的寬度與對齊則以 `columns` 中 `id` 為 `select` 的欄位設定，見[勾選欄位置與自訂勾選格](#%E5%8B%BE%E9%81%B8%E6%AC%84%E4%BD%8D%E7%BD%AE%E8%88%87%E8%87%AA%E8%A8%82%E5%8B%BE%E9%81%B8%E6%A0%BC)。

<component-example name="table-selection-style">



</component-example>

<table>
<thead>
  <tr>
    <th>
      屬性
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
        class
      </code>
    </td>
    
    <td>
      <code>
        any
      </code>
    </td>
    
    <td>
      核取方塊外層（UCheckbox 的 <code>
        root
      </code>
      
      ）的 class
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ui
      </code>
    </td>
    
    <td>
      UCheckbox 的 <code>
        ui
      </code>
    </td>
    
    <td>
      各部位樣式：<code>
        root
      </code>
      
      、<code>
        container
      </code>
      
      、<code>
        base
      </code>
      
      （方框）、<code>
        indicator
      </code>
      
      （勾選底色）、<code>
        icon
      </code>
      
       等，與 UCheckbox 的主題合併；可用函式取得預設值後自行取代
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        color
      </code>
    </td>
    
    <td>
      <code>
        'primary'
      </code>
      
      、<code>
        'neutral'
      </code>
      
       等主題色
    </td>
    
    <td>
      勾選後的底色，未設定時為 <code>
        primary
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        size
      </code>
    </td>
    
    <td>
      <code>
        'xs'
      </code>
      
      、<code>
        'sm'
      </code>
      
      、<code>
        'md'
      </code>
      
      、<code>
        'lg'
      </code>
      
      、<code>
        'xl'
      </code>
    </td>
    
    <td>
      方框尺寸，未設定時為 <code>
        md
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
      <code>
        string
      </code>
    </td>
    
    <td>
      勾選時的圖示，未設定時沿用 Nuxt UI 的 <code>
        check
      </code>
      
       圖示
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        indeterminateIcon
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      半選時的圖示，未設定時沿用 Nuxt UI 的 <code>
        minus
      </code>
      
       圖示
    </td>
  </tr>
</tbody>
</table>

- 型別為 `TableCheckboxProps`，可由 `#shuo-ui/components/ShuoTable.vue` 匯入。
- 勾選狀態、停用與無障礙名稱由表格控制，不能透過 `checkbox-props` 設定；`variant` 的 `card` 樣式不適合放在表格內，也不開放。
- 全選與每列要不同外觀時，以 `#select-header` 或 `#select-cell` 插槽自行放 `UCheckbox`。
- 可在[全站元件預設值](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults)以 `components.table.checkboxProps` 統一設定（不能寫函式）。頁面明確傳入 `checkbox-props` 時整個取代全站設定，不逐項合併。

### 勾選欄位置與自訂勾選格

勾選欄預設放在最前面。要放在其他位置時，在 `columns` 加上 `id` 為 `select` 的欄位，勾選欄就放在該位置，這個欄位的設定也會套用到勾選欄；`meta.class` 的 `th`、`td` 會分別取代內建的 `w-px`（貼合核取方塊的寬度），只寫 `td` 時表頭仍為 `w-px`。

```ts
const columns: TableColumn<Row>[] = [
  { accessorKey: 'name', header: '名稱' },

  // 勾選欄放在名稱後面
  { id: 'select', meta: { class: { td: 'bg-muted' } } },

  { accessorKey: 'amount', header: '金額' }
];
```

`#select-header`、`#select-cell` 插槽可取代內建的全選與核取方塊，參數與 `UTable` 相同，例如以 `row.getIsSelected()` 取得勾選狀態、`row.toggleSelected()` 切換勾選、`row.getCanSelect()` 判斷是否可勾選。

## Props

<component-props name="ShuoTable">



</component-props>

`tableProps.paginationOptions.manualPagination` 固定為 `true`，分頁由後端處理；欄位顯示取自 `tableProps.state.columnVisibility`，直接傳入的 `tableProps.columnVisibility` 不會生效。

開啟 `selectable` 時，勾選狀態由 `v-model:selected` 控制，`tableProps` 的 `rowSelection` 與 `onUpdate:rowSelection` 不會生效；未開啟時仍可照 `UTable` 的寫法自行以 `tableProps` 控制勾選。`row-key` 未開啟勾選時也會作為 `UTable` 的 `getRowId`。

「查詢中…」與「查無資料」依語系切換（英文為「Loading…」「No data」），可由文案 `table.loading`、`table.empty` 全域覆寫，見[多語系與文案](https://k90325248.github.io/shuo-ui/getting-started/theme/messages)；全選與每列核取方塊的無障礙名稱（「全選」「選取此列」）及關閉全選時的表頭文字（預設空白）由 `table.selectAll`、`table.selectRow`、`table.selectionHeader` 設定。表頭、儲存格等樣式用 `tableProps.ui` 設定，與內建樣式合併。

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
  
  <tr>
    <td>
      <code>
        select-header
      </code>
      
      、<code>
        select-cell
      </code>
    </td>
    
    <td>
      原參數＋<code>
        interactionDisabled
      </code>
    </td>
    
    <td>
      取代勾選欄的全選與核取方塊
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

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
