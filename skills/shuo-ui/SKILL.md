---
name: shuo-ui
description: Build forms, query pages and result lists with Shuo UI (@shuo/ui), a Nuxt module of form components built on Nuxt UI v4. Use when writing or editing Vue/Nuxt code that uses Shuo components (ShuoInputText, ShuoInputNumber, ShuoSelectMenu, ShuoDatepicker, ShuoQueryCard, ShuoListCard, ShuoTable and others), Shuo validation rules (requiredText, requiredNumber, requiredArray), or the shuoUi options in nuxt.config.ts.
---

# Shuo UI

Shuo UI (`@shuo/ui`) is a Nuxt module of form components built on [Nuxt UI](https://ui.nuxt.com) v4. Components start with `Shuo`, are auto-imported, and are meant to be used inside Nuxt UI's `UForm` + `UFormField` with Valibot schemas. Texts default to Traditional Chinese (`zh-TW`) with English built in, and dates display ROC (Minguo) years by default while binding Gregorian strings.

## References

Load these on demand, based on the task:

| File                                                       | Load when                                                                          |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [references/components.md](references/components.md)       | Using any component: v-model types, key props, slots, exposed refs, gotchas        |
| [references/forms.md](references/forms.md)                 | Writing forms, validation schemas, or the query + result list page pattern         |
| [references/configuration.md](references/configuration.md) | Editing `shuoUi` in `nuxt.config.ts`: site-wide defaults, locales, messages, theme |
| [references/utilities.md](references/utilities.md)         | Formatting dates, numbers, phones or months for display, or reading defaults       |

The full documentation is online, with every page available as markdown (append `.md` to a page URL):

- Index: https://k90325248.github.io/shuo-ui/llms.txt
- English pages: `https://k90325248.github.io/shuo-ui/en/<section>/<page>.md`, for example `https://k90325248.github.io/shuo-ui/en/components/date/datepicker.md`

Fetch the page of a component when you need its full props table or more examples than the references give.

## Setup

```bash
pnpm add github:k90325248/shuo-ui#v1.2.1
pnpm add valibot              # only if the project writes its own Valibot schemas
pnpm add @iconify-json/lucide # recommended: bundles the built-in icons
```

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@shuo/ui'],
  css: ['~/assets/css/main.css']
});
```

```css [app/assets/css/main.css]
@import 'tailwindcss';
@import '@nuxt/ui';
@import '@shuo/ui/css'; /* required: lets Tailwind scan the library's classes */
```

The app must be wrapped in `<UApp>` (toasts and tooltips depend on it).

## Components

| Component           | Purpose                                           | v-model                                                        |
| ------------------- | ------------------------------------------------- | -------------------------------------------------------------- |
| `ShuoInputText`     | Single-line text, optional masking                | `string`                                                       |
| `ShuoInputNumber`   | Number with thousands separators, decimals, unit  | `number \| null`                                               |
| `ShuoTextarea`      | Multi-line text                                   | `string`                                                       |
| `ShuoSelectMenu`    | Select menu, searchable, `multiple`               | `string` (or `null` via `empty-value`); `string[]` if multiple |
| `ShuoDatepicker`    | Date / year / month / date-time, ranges           | `string`; `[string, string] \| []` with `range`                |
| `ShuoCheckbox`      | Single checkbox                                   | `string \| number \| boolean` (default `1` / `0`)              |
| `ShuoRadioGroup`    | Radio group                                       | `string`                                                       |
| `ShuoCheckboxGroup` | Checkbox group                                    | `string[]`                                                     |
| `ShuoSwitch`        | Switch, optional async `action`                   | `boolean` (configurable `true-value` / `false-value`)          |
| `ShuoFile`          | Single file pick + existing attachment download   | `File \| null` (does not upload)                               |
| `ShuoMonths`        | Years + months input stored as total months       | `number \| null` (+ `v-model:year`, `v-model:month`)           |
| `ShuoPhone`         | Area code + landline number                       | `string` (+ `v-model:area-code`, `v-model:number`)             |
| `ShuoQueryCard`     | Collapsible query form card (contains a `UForm`)  | `v-model:open`                                                 |
| `ShuoListCard`      | Result card: title, table, server-side pagination | —                                                              |
| `ShuoTable`         | Plain `UTable` with skeleton and transitions      | `v-model:selected` when `selectable`                           |
| `ShuoInfoTooltip`   | Info icon with a tooltip                          | —                                                              |
| `ShuoTooltip`       | `UTooltip` plus long press on touch devices       | `v-model:open`                                                 |

## Core rules

1. **Wrap every input in `UFormField` with `name`** matching the schema and state key. The component then takes its id, name, size, disabled and error state from the field; do not repeat `size` or `disabled` on each component unless one field differs.
2. **Validate with Valibot and the auto-imported rules**, not with component props: `requiredText` (text, single select, radio, single date), `requiredNumber`, `requiredArray(label, v.string())` (checkbox group, multiple select, date range), `optionalEmail`, `optionalNonNegativeNumber`. `required` on `UFormField` only draws the asterisk.
3. **Respect the empty values.** Components write `null` / `undefined` back as their agreed empty value: `''` for text, textarea, radio, phone and single select; `null` for numbers and months; `[]` for multiple select and date ranges. Initialize state with these values. Option `value`s must never be `''`.
4. **Option values are strings.** Radio and checkbox groups bind strings; convert numeric codes first. Use `label-key` / `value-key` for back-end fields such as `{ Code, Name }` instead of mapping the data.
5. **Dates bind Gregorian strings** (`'2026/09/20'`, separator `/` by default, `separator="-"` for `YYYY-MM-DD` APIs). `roc` only changes the display. A value that does not match `mode` and `separator` is cleared with a console warning.
6. **Use `loading` for a field doing its own work** (fetching options), and **`skeleton`** while the page's data has not arrived yet.
7. **Pagination is server-side.** `ShuoListCard` emits `page-change` with `{ PageNumber, PageSize }`; the page queries the back end and then updates `data`, `total` and `page`.
8. **Display helpers are auto-imported**: `formatDateDisplay`, `formatNumberDisplay`, `splitMonths`, `splitPhone` and others. Use them in table cells instead of writing formatters, and never write formatted strings back into the data.
9. **Do not add props that do not exist.** `ShuoInputNumber` has no `min` / `max` (use validation); `ShuoDatepicker` has no `color` (use `state`); checkboxes and groups do not support `variant`, `indicator` or `highlight`.
10. **Types** come from the `#shuo-ui` alias, for example `import type { PageRequest } from '#shuo-ui/types/pagination'`.

## Minimal form

```vue
<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField label="Name" name="name" required>
      <ShuoInputText v-model="state.name" />
    </UFormField>

    <UFormField label="Amount" name="amount" required>
      <ShuoInputNumber v-model="state.amount" unit />
    </UFormField>

    <UFormField label="Type" name="type" required>
      <ShuoSelectMenu v-model="state.type" :items="types" />
    </UFormField>

    <UFormField label="Application date" name="date" required>
      <ShuoDatepicker v-model="state.date" clearable />
    </UFormField>

    <UButton type="submit" label="Submit" />
  </UForm>
</template>

<script setup lang="ts">
import * as v from 'valibot';

const types = [
  { label: 'New', value: 'N' },
  { label: 'Renewal', value: 'R' }
];

const schema = v.object({
  name: requiredText('Name'),
  amount: requiredNumber('Amount'),
  type: requiredText('Type'),
  date: requiredText('Application date')
});

const state = reactive({
  name: '',
  amount: null as number | null,
  type: '',
  date: ''
});

const onSubmit = (event: { data: v.InferOutput<typeof schema> }) => {
  // event.data is validated: strings and numbers, no nulls
};
</script>
```
