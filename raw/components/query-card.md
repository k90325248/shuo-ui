---
title: "QueryCard"
description: "可收合的查詢條件卡片，內含 UForm，欄位以響應式格線排列。"
canonical_url: "https://k90325248.github.io/components/query-card"
---
# QueryCard

> 可收合的查詢條件卡片，內含 UForm，欄位以響應式格線排列。

欄位以響應式格線排列（一欄、md 兩欄、xl 四欄，可由 `ui.grid` 調整）。泛型 `S` 為 schema。

## 用法

### 標題與圖示

`title` 為標題文字，`icon` 為標題左側圖示，傳空字串可隱藏圖示。

<component-example name="query-card-title">



</component-example>

### 收合

以 `v-model:open` 控制展開狀態，預設展開。`expand-icon` 是收合時顯示的按鈕圖示，`collapse-icon` 是展開時顯示的按鈕圖示。

<component-example name="query-card-collapse">



</component-example>

- 驗證失敗時，收合狀態下會自動展開以顯示錯誤訊息。範例中先收合，再按參數列的「送出」即可看到。
- 收合中的欄位不可聚焦與操作。

### 停用

`disabled` 會停用表單內的欄位（沿用 `UForm` 的停用狀態）；template ref 的 `submit()`、`clear()` 與 `#actions` 提供的 `submit`、`clear` 皆不動作。`#actions` 內的按鈕不會自動停用，請自行傳入 `disabled`。

<component-example name="query-card-disabled">



</component-example>

### 欄數

以 `ui.grid` 調整欄數。改欄數時要寫齊各斷點：tailwind-merge 只會取代同一斷點的 class，只傳 `md:grid-cols-3` 時，內建的 `xl:grid-cols-4` 仍會生效。

<component-example name="query-card-grid">



</component-example>

也可以用函式寫法移除內建斷點後自訂：

```vue
<ShuoQueryCard
  :state="query"
  :ui="{
    grid: (defaults) =>
      defaults.replace(/(md|xl):grid-cols-\d/g, '') + ' lg:grid-cols-3'
  }"
>
  ...
</ShuoQueryCard>
```

全站統一欄數見[查詢欄位分欄](https://k90325248.github.io/guides/component-defaults#%E6%9F%A5%E8%A9%A2%E6%AC%84%E4%BD%8D%E5%88%86%E6%AC%84)。

### 長標題

標題預設不換行、不省略；`header-right` 放不下時整塊換到下一行並靠右，不會擠壓標題與收合按鈕。`ShuoListCard` 的標題列使用相同規則。要讓長標題在圖示旁換行，以 `ui` 覆寫標題列不換行（`bar: 'flex-nowrap'`）並允許標題收縮（`title: 'min-w-0 shrink whitespace-normal'`）：

<component-example name="query-card-long-title">



</component-example>

## 範例

### 驗證與操作按鈕

在欄位內按 Enter 即可送出；驗證通過才觸發 `submit`，以 `event.data` 取得資料。`#actions` 放底部按鈕，`clear` 觸發 `clear` 事件，由頁面重設資料後元件再清除驗證錯誤。

<component-example name="query-card-basic">



</component-example>

### 由標題列送出

透過 template ref 呼叫 `submit()`、`clear()`，例如把查詢按鈕放在 `#header-right`。

<component-example name="query-card-expose">



</component-example>

### 搭配清單卡片

送出查詢條件後，以 [ShuoListCard](https://k90325248.github.io/components/list-card) 的 `getPagination(1)` 回到第一頁查詢；換頁沿用已送出的條件。

<component-example name="query-card-with-list">



</component-example>

## Props

<component-props name="ShuoQueryCard">



</component-props>

`v-model:open`（`boolean`，預設 `true`）控制展開狀態。

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
        submit
      </code>
    </td>
    
    <td>
      <code>
        FormSubmitEvent
      </code>
    </td>
    
    <td>
      驗證通過後送出，以 <code>
        event.data
      </code>
      
       取得資料
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        clear
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      通知使用頁面重設資料，之後元件清除驗證錯誤
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        error
      </code>
    </td>
    
    <td>
      <code>
        FormErrorEvent
      </code>
    </td>
    
    <td>
      驗證失敗；收合狀態下會自動展開以顯示錯誤訊息
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
        default
      </code>
    </td>
    
    <td>
      <code>
        state
      </code>
      
      、<code>
        errors
      </code>
      
      、<code>
        loading
      </code>
    </td>
    
    <td>
      欄位內容
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        header-right
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      標題右側
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        actions
      </code>
    </td>
    
    <td>
      <code>
        submit
      </code>
      
      、<code>
        clear
      </code>
      
      、<code>
        loading
      </code>
    </td>
    
    <td>
      底部操作按鈕
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
        submit()
      </code>
    </td>
    
    <td>
      驗證並送出，停用時不動作
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        clear()
      </code>
    </td>
    
    <td>
      觸發 <code>
        clear
      </code>
      
      ，停用時不動作
    </td>
  </tr>
</tbody>
</table>

## 樣式

`ui` 可用 Nuxt UI `UCard` 的 slot（`root`、`header`、`body`），另外提供卡片內各部位，合併規則見[單一元件的 `ui` prop](https://k90325248.github.io/guides/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)：

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
        root
      </code>
    </td>
    
    <td>
      卡片外框（Nuxt UI）
    </td>
    
    <td>
      <code>
        overflow-visible rounded-[10px] bg-default ring-0 shadow-sm
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        body
      </code>
    </td>
    
    <td>
      卡片內容（Nuxt UI）
    </td>
    
    <td>
      <code>
        p-0 sm:p-0
      </code>
      
      ，內距改由 <code>
        form
      </code>
      
       負責
    </td>
  </tr>
  
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
        toggle
      </code>
    </td>
    
    <td>
      展開／收合按鈕
    </td>
    
    <td>
      <code>
        shrink-0
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
  
  <tr>
    <td>
      <code>
        form
      </code>
    </td>
    
    <td>
      查詢條件表單
    </td>
    
    <td>
      <code>
        relative
      </code>
      
      ，內距沿用全站 <code>
        app.config.ui.card.slots.body
      </code>
      
      （預設 <code>
        p-4 sm:p-6
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        grid
      </code>
    </td>
    
    <td>
      查詢欄位格線
    </td>
    
    <td>
      <code>
        grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-4
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        actions
      </code>
    </td>
    
    <td>
      操作按鈕列
    </td>
    
    <td>
      <code>
        mt-6 flex flex-wrap justify-end gap-2
      </code>
    </td>
  </tr>
</tbody>
</table>

## 更新紀錄

<component-changelog name="ShuoQueryCard">



</component-changelog>

---

- [UCard](https://ui.nuxt.com/docs/components/card)
- [UForm](https://ui.nuxt.com/docs/components/form)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
