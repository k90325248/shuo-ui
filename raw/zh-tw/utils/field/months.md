---
title: "Months"
description: "總月數與年、月的拆分與合併。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/utils/field/months"
---
# Months

> 總月數與年、月的拆分與合併。

## 用法

[Months](https://k90325248.github.io/shuo-ui/components/date/months) 以總月數綁定，另可綁定 `year` 與 `month`。清單顯示或後端分開存年、月時，用這兩個函式轉換：

```vue
<template>
  <ShuoListCard :data="rows" :columns="columns">
    <!-- 貸款期間 -->
    <template #terms-cell="{ row }">
      {{ toYearMonth(row.original.terms) }}
    </template>
  </ShuoListCard>
</template>

<script setup lang="ts">
// 總月數轉成「2 年 6 個月」；空值顯示空字串。
const toYearMonth = (terms: number | null) => {
  const months = splitMonths(terms);
  return months ? `${months.year} 年 ${months.month} 個月` : '';
};
</script>
```

函式由模組自動匯入。兩個函式都回傳同一種結果：

```ts
interface MonthsValue {
  total: number; // 總月數
  year: number; // 完整年數
  month: number; // 剩餘月數，0 至 11
}
```

## API

### splitMonths

```ts
splitMonths(value: unknown): MonthsValue | null
```

把總月數拆成年與月。只接受非負的安全整數，空值、負數、小數與非數字回傳 `null`。

<field-group>
<field :required="true" name="value" type="unknown">

總月數。

</field>
</field-group>

### combineMonths

```ts
combineMonths(
  year: number | null | undefined,
  month: number | null | undefined
): MonthsValue | null
```

合併年與月並處理進位，例如 1 年 14 個月為 2 年 2 個月。單邊為空時視為 `0`，兩邊都為空時回傳 `null`；負數或非整數回傳 `null`。

<field-group>
<field :required="true" name="year" type="number | null | undefined">

年數。

</field>

<field :required="true" name="month" type="number | null | undefined">

月數，可超過 11。

</field>
</field-group>

## 範例

```ts
splitMonths(30); // { total: 30, year: 2, month: 6 }
splitMonths(null); // null
splitMonths(1.5); // null

combineMonths(2, 6); // { total: 30, year: 2, month: 6 }
combineMonths(1, 14); // { total: 26, year: 2, month: 2 }
combineMonths(null, 8); // { total: 8, year: 0, month: 8 }
combineMonths(null, null); // null
```


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
