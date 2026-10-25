---
title: "Months"
description: "Splitting total months into years and months, and combining them back."
canonical_url: "https://k90325248.github.io/shuo-ui/en/utils/field/months"
---
# Months

> Splitting total months into years and months, and combining them back.

## Usage

[Months](https://k90325248.github.io/shuo-ui/components/date/months) binds the total months, and can also bind `year` and `month`. For list display, or when the back end stores years and months separately, convert with these two functions:

```vue
<template>
  <ShuoListCard :data="rows" :columns="columns">
    <!-- Loan term -->
    <template #terms-cell="{ row }">
      {{ toYearMonth(row.original.terms) }}
    </template>
  </ShuoListCard>
</template>

<script setup lang="ts">
// Total months as "2 yr 6 mo"; empty values show an empty string.
const toYearMonth = (terms: number | null) => {
  const months = splitMonths(terms);
  return months ? `${months.year} yr ${months.month} mo` : '';
};
</script>
```

The functions are auto-imported by the module. Both return the same result type:

```ts
interface MonthsValue {
  total: number; // Total months
  year: number; // Full years
  month: number; // Remaining months, 0 to 11
}
```

## API

### splitMonths

```ts
splitMonths(value: unknown): MonthsValue | null
```

Splits total months into years and months. Only non-negative safe integers are accepted; empty values, negative numbers, decimals and non-numbers return `null`.

<field-group>
<field :required="true" name="value" type="unknown">

Total months.

</field>
</field-group>

### combineMonths

```ts
combineMonths(
  year: number | null | undefined,
  month: number | null | undefined
): MonthsValue | null
```

Combines years and months and carries over, for example 1 year 14 months becomes 2 years 2 months. An empty side counts as `0`, and when both are empty it returns `null`; negative numbers or non-integers return `null`.

<field-group>
<field :required="true" name="year" type="number | null | undefined">

Years.

</field>

<field :required="true" name="month" type="number | null | undefined">

Months; can be more than 11.

</field>
</field-group>

## Examples

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
