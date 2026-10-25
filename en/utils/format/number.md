---
title: "Number"
description: "Number display with thousands separators and fixed decimal places."
canonical_url: "https://k90325248.github.io/shuo-ui/en/utils/format/number"
---
# Number

> Number display with thousands separators and fixed decimal places.

## Usage

API data and bound values stay numbers and are formatted only for display. Call it directly in the template for list columns, without creating a separate formatter:

```vue
<template>
  <ShuoListCard :data="rows" :columns="columns">
    <!-- Amount -->
    <template #amount-cell="{ row }">
      {{ formatNumberDisplay(row.original.amount) }}
    </template>
  </ShuoListCard>
</template>
```

The function is auto-imported by the module and uses the same rules as [InputNumber](https://k90325248.github.io/shuo-ui/components/text/input-number) shows after blur. Do not write strings with commas or padded zeros back into the data.

## API

### formatNumberDisplay

```ts
formatNumberDisplay(
  value: number | null | undefined,
  decimal?: boolean | number,
  thousandSeparator?: boolean
): string
```

Converts a number to display text. `null`, `undefined`, `NaN` and infinity return an empty string, and `0` shows normally; very large or very small numbers are written out in full, never in scientific notation.

<field-group>
<field name="value" type="number | null | undefined" :required="true">

The number to display.

</field>

<field name="decimal" type="boolean | number">

Decimal places, `true` by default. `true` keeps the original decimals without padding; `false` or `0` rounds to an integer; a positive integer fixes the number of places, padding with zeros or rounding as needed, up to 100 places.

</field>

<field name="thousandSeparator" type="boolean">

Whether to add thousands separators, `true` by default.

</field>
</field-group>

<note>

The `decimal` of `ShuoInputNumber` defaults to `false` (integers only), unlike the default here, which keeps decimals.

</note>

## Examples

```ts
formatNumberDisplay(1234567); // 1,234,567
formatNumberDisplay(-1234.5); // -1,234.5
formatNumberDisplay(1234.5, 3); // 1,234.500
formatNumberDisplay(1234.5, 3, false); // 1234.500
formatNumberDisplay(1234.5, false); // 1,235
formatNumberDisplay(0.1 + 0.2, 2); // 0.30
formatNumberDisplay(0); // 0
formatNumberDisplay(null); // ''
```


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
