---
title: "Date"
description: "西元日期字串的民國年顯示與嚴格解析。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/utils/format/date"
---
# Date

> 西元日期字串的民國年顯示與嚴格解析。

## 用法

綁定值與 API 資料一律保留西元，只在顯示時轉成民國年。清單、明細等畫面直接在 template 呼叫：

```vue
<template>
  <ShuoListCard :data="rows" :columns="columns">
    <!-- 申請日期 -->
    <template #applyDate-cell="{ row }">
      {{ formatDateDisplay(row.original.applyDate) }}
    </template>
  </ShuoListCard>
</template>
```

- 函式由模組自動匯入，不用 import。
- 字串日期可用 `/` 或 `-` 分隔，時間以空白接續，月、日、時、分、秒要補足兩位；不接受含 `T`、`Z` 或時區的 ISO 字串，也不做時區轉換。
- 日期選擇器的綁定格式與 `mode` 見 [Datepicker](https://k90325248.github.io/shuo-ui/components/date/datepicker)。

## API

### formatDateDisplay

```ts
formatDateDisplay(
  value: string | Date | null | undefined,
  options?: DateDisplayOptions
): string
```

把西元日期轉成顯示文字，預設為民國年月日。空值、無效日期與不符合精度的字串回傳空字串；民國模式下早於 1911 年的日期也回傳空字串。

<field-group>
<field name="value" type="string | Date | null | undefined" :required="true">

西元日期字串或 `Date`。字串須符合 `mode` 的精度，例如 `mode: 'month'` 時為 `2026/10`。

</field>

<field name="options.mode" type="'year' | 'month' | 'date' | 'datetime' | 'datetime-second'">

日期精度，預設 `date`。

</field>

<field name="options.roc" type="boolean">

是否顯示民國年，預設 `true`；`false` 顯示西元。

</field>

<field name="options.yearMonthLabels" type="boolean | { year: string; month: string }">

年與年月加上單位，預設 `false`。`true` 使用目前語系的格式（繁體中文為「115 年 10 月」，英文為「10/115」）；也可傳入格式，`{year}`、`{month}` 為年份與兩位數月份，例如 `{ year: '{year}年', month: '{year}年{month}月' }`。

</field>
</field-group>

<table>
<thead>
  <tr>
    <th>
      mode
    </th>
    
    <th>
      西元字串
    </th>
    
    <th>
      民國顯示
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        year
      </code>
    </td>
    
    <td>
      <code>
        2026
      </code>
    </td>
    
    <td>
      <code>
        115
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        month
      </code>
    </td>
    
    <td>
      <code>
        2026/10
      </code>
    </td>
    
    <td>
      <code>
        115/10
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        date
      </code>
    </td>
    
    <td>
      <code>
        2026/10/15
      </code>
    </td>
    
    <td>
      <code>
        115/10/15
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        datetime
      </code>
    </td>
    
    <td>
      <code>
        2026/10/15 09:08
      </code>
    </td>
    
    <td>
      <code>
        115/10/15 09:08
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        datetime-second
      </code>
    </td>
    
    <td>
      <code>
        2026/10/15 09:08:07
      </code>
    </td>
    
    <td>
      <code>
        115/10/15 09:08:07
      </code>
    </td>
  </tr>
</tbody>
</table>

### parseDateValue

```ts
parseDateValue(
  value: string | null | undefined,
  mode: DateMode,
  separator?: string
): Date | null
```

嚴格解析西元日期字串，格式必須完全符合指定精度與分隔符號（補足兩位、日期存在），否則回傳 `null`。適合在送出前確認日期字串是否有效。

<field-group>
<field name="value" type="string | null | undefined" :required="true">

西元日期字串。

</field>

<field name="mode" type="'year' | 'month' | 'date' | 'datetime' | 'datetime-second'" :required="true">

日期精度。

</field>

<field name="separator" type="string">

日期分隔符號，預設 `/`；日期選擇器設定了 `separator` 時傳入相同的值。

</field>
</field-group>

## 範例

### 顯示格式

```ts
formatDateDisplay('2026/10/15'); // 115/10/15
formatDateDisplay('2026-10-15'); // 115/10/15
formatDateDisplay('2026/10/15', { roc: false }); // 2026/10/15
formatDateDisplay('2026', { mode: 'year' }); // 115
formatDateDisplay('2026/10', {
  mode: 'month',
  yearMonthLabels: true
}); // 115 年 10 月
formatDateDisplay('2026/10/15 09:08', { mode: 'datetime' }); // 115/10/15 09:08
formatDateDisplay('2026/02/30'); // ''（日期不存在）
formatDateDisplay(null); // ''
```

### 嚴格解析

```ts
parseDateValue('2026/10/15', 'date'); // Date
parseDateValue('2026/1/5', 'date'); // null（月、日未補兩位）
parseDateValue('2026/02/30', 'date'); // null（日期不存在）
parseDateValue('2026-10-15', 'date', '-'); // Date
```


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
