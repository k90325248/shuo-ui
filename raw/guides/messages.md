---
title: "文案覆寫"
description: "覆寫驗證訊息、無障礙名稱、提示文字與日期選擇器文案。"
canonical_url: "https://k90325248.github.io/guides/messages"
---
# 文案覆寫

> 覆寫驗證訊息、無障礙名稱、提示文字與日期選擇器文案。

預設文案為繁體中文，涵蓋驗證訊息、無障礙名稱（aria-label）、提示文字與日期選擇器文案。只需寫要改的項目：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  shuoUi: {
    messages: {
      validation: {
        required: '{label} is required',
        invalidNumber: '{label} must be a valid number',
        invalidFormat: '{label} is invalid',
        minValue: '{label} must not be less than {min}'
      },
      file: { placeholder: 'Choose a file' },
      table: { empty: 'No data', loading: 'Loading…' },
      listCard: { title: 'Results', summary: '{start}–{end} of {total}' },
      queryCard: { title: 'Filters', collapse: 'Collapse ', expand: 'Expand ' }
    }
  }
});
```

`{label}`、`{min}`、`{unit}`、`{total}`、`{start}`、`{end}` 是佔位符，會在使用時替換。

## 可覆寫的項目

<table>
<thead>
  <tr>
    <th>
      區塊
    </th>
    
    <th>
      項目
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        validation
      </code>
    </td>
    
    <td>
      <code>
        required
      </code>
      
      、<code>
        invalidNumber
      </code>
      
      、<code>
        invalidFormat
      </code>
      
      、<code>
        minValue
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkbox
      </code>
    </td>
    
    <td>
      <code>
        label
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        file
      </code>
    </td>
    
    <td>
      <code>
        placeholder
      </code>
      
      、<code>
        clear
      </code>
      
      、<code>
        download
      </code>
      
      、<code>
        select
      </code>
      
      、<code>
        downloadFailedTitle
      </code>
      
      、<code>
        downloadFailedDescription
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        inputNumber
      </code>
    </td>
    
    <td>
      <code>
        unit
      </code>
      
      （<code>
        unit
      </code>
      
       為 <code>
        true
      </code>
      
       時顯示的文字）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        inputText
      </code>
    </td>
    
    <td>
      <code>
        hide
      </code>
      
      、<code>
        show
      </code>
      
      （遮蔽顯示按鈕）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        phone
      </code>
    </td>
    
    <td>
      <code>
        areaCode
      </code>
      
      、<code>
        number
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        months
      </code>
    </td>
    
    <td>
      <code>
        total
      </code>
      
      、<code>
        years
      </code>
      
      、<code>
        months
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        selectMenu
      </code>
    </td>
    
    <td>
      <code>
        searchPlaceholder
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        infoTooltip
      </code>
    </td>
    
    <td>
      <code>
        label
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        queryCard
      </code>
    </td>
    
    <td>
      <code>
        title
      </code>
      
      、<code>
        collapse
      </code>
      
      、<code>
        expand
      </code>
      
      、<code>
        submit
      </code>
      
      （隱藏送出按鈕的名稱）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        table
      </code>
    </td>
    
    <td>
      <code>
        empty
      </code>
      
      、<code>
        loading
      </code>
      
      （<code>
        ShuoTable
      </code>
      
       的空資料與查詢中文字）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        listCard
      </code>
    </td>
    
    <td>
      <code>
        title
      </code>
      
      、<code>
        summary
      </code>
      
      （筆數統計，<code>
        {total}
      </code>
      
      、<code>
        {start}
      </code>
      
      、<code>
        {end}
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        datepicker
      </code>
    </td>
    
    <td>
      <code>
        hours
      </code>
      
      、<code>
        minutes
      </code>
      
      、<code>
        seconds
      </code>
      
      、<code>
        menu
      </code>
      
      、<code>
        calendarIcon
      </code>
      
      、<code>
        clearInput
      </code>
      
      、<code>
        toggleOverlay
      </code>
      
      、<code>
        monthPicker
      </code>
      
      、<code>
        yearPicker
      </code>
      
      、<code>
        nextMonth
      </code>
      
      、<code>
        prevMonth
      </code>
      
      、<code>
        nextYear
      </code>
      
      、<code>
        prevYear
      </code>
      
      、<code>
        openMonthsOverlay
      </code>
      
      、<code>
        openYearsOverlay
      </code>
      
      、<code>
        openTimePicker
      </code>
      
      、<code>
        closeTimePicker
      </code>
      
      、<code>
        timePicker
      </code>
      
      、<code>
        openTpOverlay
      </code>
      
      、<code>
        timeOverlay
      </code>
      
      、<code>
        incrementValue
      </code>
      
      、<code>
        decrementValue
      </code>
    </td>
  </tr>
</tbody>
</table>

預設值可在 `node_modules/@shuo/ui/dist/runtime/utils/messages.js` 查看。

## 單一元件覆寫

單一元件也可直接用 prop 覆寫，例如 `<ShuoFile placeholder="..." />`、`<ShuoListCard title="..." empty="..." />`，優先於模組設定。

<note>

`messages` 只放文案。下拉選單的顯示格式（`format`）、尺寸、每頁筆數等非文案的全站設定，請寫在 [`components`](https://k90325248.github.io/guides/component-defaults)。

</note>


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
