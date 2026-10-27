# Components

Per-component essentials. Full pages: `https://k90325248.github.io/shuo-ui/en/components/<group>/<name>.md`.

## Shared behavior

All form input components (`ShuoInputText`, `ShuoInputNumber`, `ShuoTextarea`, `ShuoSelectMenu`, `ShuoDatepicker`, `ShuoCheckbox`, `ShuoCheckboxGroup`, `ShuoRadioGroup`, `ShuoSwitch`, `ShuoFile`, `ShuoMonths`, `ShuoPhone`) accept:

| Prop       | Type                                   | Notes                                                                                        |
| ---------- | -------------------------------------- | -------------------------------------------------------------------------------------------- |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Explicit prop > `UFormField` size > `shuoUi.components.<name>.size` > formField theme > `lg` |
| `disabled` | `boolean`                              | Follows `UForm` when not set                                                                 |
| `loading`  | `boolean`                              | Spinner inside the field, interaction disabled; value kept                                   |
| `skeleton` | `boolean`                              | Covers the field with a skeleton of the same size; value and validation unaffected           |
| `id`       | `string`                               | Follows `UFormField`                                                                         |
| `name`     | `string`                               | Follows `UFormField`                                                                         |

- `color` and `highlight` come from Nuxt UI, except: `ShuoDatepicker` uses `state` (`false` error, `true` success) instead of `color`; `ShuoFile` has neither (follows `UFormField`); checkboxes and groups have `color` but no `highlight`.
- Components wrapping a Nuxt UI component inherit its props types and forward its events and slots: `ShuoInputText` / `ShuoInputNumber` / `ShuoFile` → `UInput`, `ShuoTextarea` → `UTextarea`, `ShuoSelectMenu` → `USelectMenu`, `ShuoCheckbox` → `UCheckbox`, `ShuoRadioGroup` → `URadioGroup`, `ShuoCheckboxGroup` → `UCheckboxGroup`, `ShuoSwitch` → `USwitch`.
- `loadingIcon` has no effect on the input-style components (they always use `appConfig.ui.icons.loading`).
- `ui` accepts the Nuxt UI slots of the underlying component plus the component's own (for example `wrapper`, `unit`), merged with tailwind-merge. `class` usually goes on the root of the Nuxt UI component.
- Long labels and selected texts are truncated with a full-text tooltip (hover, focus, or long press on touch).

### Empty values

| Component                                                      | Empty value                                                | Writes back `null` / `undefined`?          |
| -------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------ |
| `ShuoInputText`, `ShuoTextarea`, `ShuoRadioGroup`, `ShuoPhone` | `''`                                                       | Yes                                        |
| `ShuoSelectMenu`                                               | `empty-value` (default `''`, may be `null`); `[]` multiple | Yes                                        |
| `ShuoInputNumber`, `ShuoMonths`                                | `null`                                                     | Yes                                        |
| `ShuoDatepicker`                                               | `''` single, `[]` range                                    | Yes                                        |
| `ShuoCheckboxGroup`                                            | `[]` after clearing                                        | No: `null` shows nothing checked           |
| `ShuoCheckbox`                                                 | `false-value`                                              | No: anything but `true-value` is unchecked |
| `ShuoFile`                                                     | `null`                                                     | No                                         |

Values of the wrong type are cleared too, usually with a `console.warn` like `[ShuoInputText] … cleared`.

## Text

### ShuoInputText — `v-model: string`

- `mask`: `true` masks everything; a positive integer masks that many trailing characters (`12345678` with `:mask="4"` → `1234••••`). `v-model` keeps the original text. An eye button toggles; `hide-mask-toggle` hides it. `type` is controlled by `mask` and cannot be passed.
- `reveal-icon`, `conceal-icon` change the toggle icons.
- Slots `leading`, `default`, `trailing` (trailing precedence: loading icon > mask toggle > slot). Expose `inputRef`.

### ShuoInputNumber — `v-model: number | null`

- `decimal`: `false` (default, integers only), a positive integer (fixed places), or `true` (any).
- `thousand-separator` (default `true`): separators shown on blur. Set `false` for years or codes.
- `unit`: `true` shows the locale unit ("元" / "NTD"), or pass a string (`unit="pcs"`).
- Right-aligned by default; `:ui="{ base: 'text-center' }"` centers.
- **No `min` / `max` / `step`**: use `v.minValue` / `v.maxValue` in the schema. Incomplete input such as `-` binds `null`.
- Slot `trailing` sits next to the unit without replacing it. Expose `inputRef`.

### ShuoTextarea — `v-model: string`

- `rows` (Nuxt UI default 3), `autoresize`, `maxrows` (`0` = unlimited), `maxlength`.
- Expose `textareaRef`, `autoResize()`.

## Choice

### ShuoSelectMenu — `v-model: string | null | string[]`

- `items` (required): objects (`label`, `value`, plus any `USelectMenu` item fields) or strings.
- `multiple`: binds `string[]`, empty `[]`.
- `empty-value`: `''` (default) or `null` for an empty single selection.
- `format`: default `'{label}'`; `'{value}_{label}'` shows code and name. Applies to items and the selected text.
- `label-key` / `value-key` for other field names (inferred from `items`; a wrong name is a type error).
- Built-in search on `label-key`; `:search-input="false"` hides it.
- When the bound value has no matching item yet (items loading), `placeholder` shows, then the label appears once items arrive.
- Narrow it with `:ui="{ wrapper: 'w-40' }"` (not `class`).
- All `USelectMenu` slots work. Expose `triggerRef` (call `click()` to open), `viewportRef`.

### ShuoCheckbox — `v-model: string | number | boolean` (required)

- `true-value` (default `1`), `false-value` (default `0`); use `'Y'` / `'N'` or booleans to match the back end.
- `label` defaults to "啟用" / "Enable"; `description` shows below.
- Must-be-checked fields: `v.pipe(v.union([v.string(), v.number(), v.boolean()]), v.check((value) => value === 'Y', 'message'))`, not `v.literal` (which narrows the UForm state type).
- Slot `append` with `{ checked, disabled, labelId, check() }` for an input next to the label.

### ShuoRadioGroup — `v-model: string`

- `items`: objects (`label`, `value`, `disabled`, `description`, custom fields) or strings. Values must be non-empty strings.
- `orientation`: `'auto'` (default; vertical below `breakpoint`, default `md`), `'horizontal'`, `'vertical'`, or `'grid'` with columns set by `:ui="{ fieldset: 'grid-cols-1 md:grid-cols-2' }"`.
- `label-key` / `value-key` / `description-key` for other field names. The component rewrites `label` and `value` on each item from these keys.
- `legend` prop or slot. Slot `item-append` with `{ item, selected, disabled, labelId, select() }`; bind `@focus="select"` on an appended input to select its item. The appended input needs its own `UFormField` to be validated.

### ShuoCheckboxGroup — `v-model: string[]` (required)

Same as `ShuoRadioGroup` (items, orientation, keys, `item-append` with `{ item, checked, disabled, labelId, check() }`), plus `icon` and per-item `icon`. Select all / clear: assign the array directly.

### ShuoSwitch — `v-model: boolean | string | number`

- `label`, `description`, `true-value` / `false-value` (default `true` / `false`).
- `action(value)`: runs after toggling and may be async. Pending: shows the new value, loading and disabled, `v-model` unchanged. Success (anything but `false`): `v-model` updates and `change` fires. Returning `false` or throwing reverts. To notify the user, `try` / `catch` in the action, show a toast, return `false`.
- Types `SwitchAction`, `SwitchValue` from `#shuo-ui/components/ShuoSwitch.vue`.

## Date

### ShuoDatepicker — `v-model: string | [string, string] | []`

| `mode`            | Display (ROC)        | v-model                 |
| ----------------- | -------------------- | ----------------------- |
| `year`            | `115`                | `'2026'`                |
| `month`           | `09/115`             | `'2026/09'`             |
| `date` (default)  | `115/09/20`          | `'2026/09/20'`          |
| `datetime`        | `115/09/20 14:02`    | `'2026/09/20 14:02'`    |
| `datetime-second` | `115/09/20 14:02:09` | `'2026/09/20 14:02:09'` |

- `roc` (default `true`) only changes the display; `separator` (default `'/'`) only changes the bound value. Use `separator="-"` for `YYYY-MM-DD` APIs.
- `range`: binds `[start, end]` or `[]`; also `v-model:start` / `v-model:end` (strings, `''` when empty). Only complete ranges are committed. With separate API fields, bind only `v-model:start` and `v-model:end`.
- `min-date`, `max-date` (string, number or `Date`), `year-range` (default `[1900, 2100]`; ROC mode starts at 1911).
- `clearable` (default `false`), `calendar-icon`, `clear-icon`, `state`.
- Mismatched values (wrong format for `mode` / `separator`, reversed range) are cleared with a `console.warn`. When changing `mode`, set a matching value at the same time.
- Does not inherit `@vuepic/vue-datepicker` props.
- Two linked pickers: pass each other's value as `max-date` / `min-date`.

### ShuoMonths — `v-model: number | null` (total months)

- Also `v-model:year`, `v-model:month` (0–11); all three stay in sync and carry over on blur (0 yr 13 mo → 1 yr 1 mo).
- Use only `v-model:year` and `v-model:month` when the API stores them separately.
- Switches to a single total-months input in narrow containers.

## Phone and file

### ShuoPhone — `v-model: string`

- Full number = area code + number, no separator, leading zeros kept. Also `v-model:area-code`, `v-model:number`.
- Filling only the full number splits it by a known area code; otherwise it all goes into the number. Bind `v-model:area-code` too when you know the area code.
- No built-in length or area code rules: validate with `v.regex` in the schema.

### ShuoFile — `v-model: File | null` (required)

- Selecting does not upload; the page sends the `File` when it wants.
- `accept` only filters the dialog; enforce type and size with `v.file()`, `v.mimeType([...])`, `v.maxSize(bytes)`.
- Existing attachment: `file-name` + `file-url` (download fetches the URL as a Blob; needs CORS for other origins; failures show a toast).
- `select-icon`, `clear-icon`, `download-icon`. No `trailing`, `color` or `highlight`.

## Layout

### ShuoQueryCard

- Props: `state` (required), `schema`, `validate`, `validate-on`, `title` (default "查詢條件" / locale), `icon`, `disabled`, `v-model:open` (default `true`), `expand-icon`, `collapse-icon`, `ui`.
- Contains its own `UForm`: put `UFormField`s directly in the default slot. Fields use a grid: 1 column, `md:grid-cols-2`, `xl:grid-cols-4`. Override with `ui.grid` and write every breakpoint (tailwind-merge keeps other breakpoints).
- Events: `submit` (`FormSubmitEvent`, after validation), `clear` (reset the state in the handler; the card clears errors), `error` (expands if collapsed).
- Slots: `default` `{ state, errors, loading }`, `header-right`, `actions` `{ submit, clear, loading }`. Enter in a field submits.
- Expose `submit()`, `clear()`.

### ShuoListCard

- Props: `data`, `columns` (`TableColumn<T>[]` from `@nuxt/ui`), `total`, `page` (default 1), `page-size` (default 10), `loading`, `title`, `icon`, `empty`, `show-pagination`, `show-summary`, `transition`, `table-props`, selection props (as `ShuoTable`).
- Event `page-change` with `{ PageNumber, PageSize }`: query, then update `data`, `total`, `page`. Not emitted while loading.
- Expose `getPagination(page?)` → `{ PageNumber, PageSize }`; use `getPagination(1)` for a new search.
- Slots: `title`, `header-right`, `<column>-cell` and other `UTable` slots (with extra `interactionDisabled`), `body-top`, `footer`, `loading`, `empty`.
- Keep the old `data` while re-querying, so rows fade instead of disappearing.
- With selection across pages, always set `row-key`.

### ShuoTable

- `UTable` without card or pagination, for modals or your own `UCard`. Props: `data`, `columns`, `loading`, `empty`, `transition`, `table-props` (pass `UTable` props such as `sticky`, `ui` here).
- Skeleton rows when created with `loading` and no data.
- Selection: `selectable`, `v-model:selected` (array of keys), `row-key` (field name or function; default is the row index), `row-selectable(row)`, `select-all` (default `true`), `selection-header`, `checkbox-props`. Place the selection column with a `{ id: 'select' }` column; slots `select-header`, `select-cell`.
- Cell slots receive `interactionDisabled` to disable row buttons while loading.

## Helpers

### ShuoInfoTooltip

- `text` (supports line breaks) or `#content` slot; `icon` (default `i-lucide-circle-alert`); `label` for the accessible name. Typical use: in the `#hint` slot of `UFormField`.

### ShuoTooltip

- Drop-in replacement for `UTooltip` that also opens on a ~0.5 s long press on touch devices. `:touch="false"` disables that. `v-model:open`, `default-open`.
