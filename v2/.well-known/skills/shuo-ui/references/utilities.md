# Utilities

All auto-imported. Full pages: `https://k90325248.github.io/shuo-ui/en/utils/<group>/<name>.md`.

Data and bound values stay raw (Gregorian date strings, numbers, total months, full phone numbers); use these only for display or conversion, and never write formatted strings back.

## Dates

```ts
formatDateDisplay(value: string | Date | null | undefined, options?: {
  mode?: 'year' | 'month' | 'date' | 'datetime' | 'datetime-second'; // default 'date'
  roc?: boolean; // default true
  yearMonthLabels?: boolean | { year: string; month: string }; // default false
}): string

parseDateValue(value: string | null | undefined, mode: DateMode, separator?: string): Date | null
```

```ts
formatDateDisplay('2026/10/15'); // '115/10/15'
formatDateDisplay('2026-10-15'); // '115/10/15'
formatDateDisplay('2026/10/15', { roc: false }); // '2026/10/15'
formatDateDisplay('2026/10', { mode: 'month', yearMonthLabels: true }); // '115 年 10 月' (zh-TW) / '10/115' (en)
formatDateDisplay('2026/02/30'); // '' (invalid)
parseDateValue('2026/1/5', 'date'); // null (two digits required)
parseDateValue('2026-10-15', 'date', '-'); // Date
```

Strings use `/` or `-`, two-digit parts, time after a space. ISO strings with `T` / `Z` are not accepted; no time zone conversion.

## Numbers

```ts
formatNumberDisplay(value: number | null | undefined, decimal?: boolean | number, thousandSeparator?: boolean): string
```

```ts
formatNumberDisplay(1234567); // '1,234,567'
formatNumberDisplay(1234.5, 3); // '1,234.500'
formatNumberDisplay(1234.5, false); // '1,235'
formatNumberDisplay(null); // ''
```

`decimal` defaults to `true` here (keep decimals), unlike `ShuoInputNumber` whose `decimal` defaults to `false`.

## Phone

```ts
splitPhone('0223456789', '02'); // { areaCode: '02', number: '23456789' }
splitPhone('0223456789', undefined); // { areaCode: '', number: '0223456789' } (never guesses)
joinPhone('02', '23456789'); // '0223456789'
joinPhone(undefined, undefined); // undefined
```

## Months

```ts
splitMonths(30); // { total: 30, year: 2, month: 6 }
splitMonths(1.5); // null
combineMonths(1, 14); // { total: 26, year: 2, month: 2 }
combineMonths(null, null); // null
```

## Component defaults

```ts
resolveShuoDefault('listCard', 'pageSize'); // site-wide value ?? built-in default
getShuoComponentDefaults(); // raw shuoUi.components settings only
```

## Types

```ts
import type { PageRequest } from '#shuo-ui/types/pagination'; // { PageNumber, PageSize }
import type { ShuoComponentDefaults } from '#shuo-ui/types/component-defaults';
import type { DatepickerValue } from '#shuo-ui/components/ShuoDatepicker.vue';
import type { SwitchAction, SwitchValue } from '#shuo-ui/components/ShuoSwitch.vue';
import type { TableCheckboxProps } from '#shuo-ui/components/ShuoTable.vue';
import type { InputTextProps, SelectMenuProps } from '#shuo-ui/types/components';
```
