---
title: "Date"
description: "ROC year display and strict parsing of Gregorian date strings."
canonical_url: "https://k90325248.github.io/shuo-ui/en/utils/format/date"
---
# Date

> ROC year display and strict parsing of Gregorian date strings.

## Usage

Bound values and API data always stay Gregorian, and are converted to ROC years only for display. Call it directly in the template for lists, detail views and so on:

```vue
<template>
  <ShuoListCard :data="rows" :columns="columns">
    <!-- Application date -->
    <template #applyDate-cell="{ row }">
      {{ formatDateDisplay(row.original.applyDate) }}
    </template>
  </ShuoListCard>
</template>
```

- The functions are auto-imported by the module, with no import needed.
- Date strings can use `/` or `-` as the separator, with the time after a space; months, days, hours, minutes and seconds must have two digits. ISO strings with `T`, `Z` or a time zone are not accepted, and there is no time zone conversion.
- See [Datepicker](https://k90325248.github.io/shuo-ui/components/date/datepicker) for the date picker's bound format and `mode`.

## API

### formatDateDisplay

```ts
formatDateDisplay(
  value: string | Date | null | undefined,
  options?: DateDisplayOptions
): string
```

Converts a Gregorian date to display text, ROC year-month-day by default. Empty values, invalid dates and strings that do not match the precision return an empty string; in ROC mode, dates before 1911 also return an empty string.

<field-group>
<field name="value" type="string | Date | null | undefined" :required="true">

A Gregorian date string or `Date`. A string must match the `mode` precision, for example `2026/10` for `mode: 'month'`.

</field>

<field name="options.mode" type="'year' | 'month' | 'date' | 'datetime' | 'datetime-second'">

Date precision, `date` by default.

</field>

<field name="options.roc" type="boolean">

Whether to show ROC years, `true` by default; `false` shows Gregorian years.

</field>

<field name="options.yearMonthLabels" type="boolean | { year: string; month: string }">

Adds units to years and year-months, `false` by default. `true` uses the current locale's format ("10/115" in English, "115 年 10 月" in Traditional Chinese); you can also pass formats, where `{year}` and `{month}` are the year and the two-digit month, for example `{ year: 'Year {year}', month: '{month}/{year}' }`.

</field>
</field-group>

<table>
<thead>
  <tr>
    <th>
      mode
    </th>
    
    <th>
      Gregorian string
    </th>
    
    <th>
      ROC display
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

Strictly parses a Gregorian date string. The format must exactly match the given precision and separator (two digits, a date that exists), otherwise it returns `null`. Useful for checking a date string before submitting.

<field-group>
<field name="value" type="string | null | undefined" :required="true">

A Gregorian date string.

</field>

<field name="mode" type="'year' | 'month' | 'date' | 'datetime' | 'datetime-second'" :required="true">

Date precision.

</field>

<field name="separator" type="string">

Date separator, `/` by default; pass the same value when the date picker sets `separator`.

</field>
</field-group>

## Examples

### Display format

```ts
formatDateDisplay('2026/10/15'); // 115/10/15
formatDateDisplay('2026-10-15'); // 115/10/15
formatDateDisplay('2026/10/15', { roc: false }); // 2026/10/15
formatDateDisplay('2026', { mode: 'year' }); // 115
formatDateDisplay('2026/10', {
  mode: 'month',
  yearMonthLabels: true
}); // 10/115 in English (115 年 10 月 in Traditional Chinese)
formatDateDisplay('2026/10/15 09:08', { mode: 'datetime' }); // 115/10/15 09:08
formatDateDisplay('2026/02/30'); // '' (the date does not exist)
formatDateDisplay(null); // ''
```

### Strict parsing

```ts
parseDateValue('2026/10/15', 'date'); // Date
parseDateValue('2026/1/5', 'date'); // null (month and day not two digits)
parseDateValue('2026/02/30', 'date'); // null (the date does not exist)
parseDateValue('2026-10-15', 'date', '-'); // Date
```


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
