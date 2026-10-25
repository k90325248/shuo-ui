---
title: "Datepicker"
description: "Date picker with ROC years by default, five precisions and range selection."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/date/datepicker"
---
# Datepicker

> Date picker with ROC years by default, five precisions and range selection.

`v-model: string` (`[string, string] | []` for ranges), plus `v-model:start` and `v-model:end`; see [v-model](#v-model) below. By default it shows ROC years and picks a full date; the bound value is always a Gregorian string.

## Usage

### Modes

`mode` sets the precision, `date` by default; the bound value is always a Gregorian string. The year and year-month displays below are the English ones (Traditional Chinese shows "115 年" and "115 年 09 月").

<table>
<thead>
  <tr>
    <th>
      mode
    </th>
    
    <th>
      ROC display
    </th>
    
    <th>
      Gregorian display
    </th>
    
    <th>
      v-model
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
      115
    </td>
    
    <td>
      2026
    </td>
    
    <td>
      <code>
        "2026"
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
      09/115
    </td>
    
    <td>
      09/2026
    </td>
    
    <td>
      <code>
        "2026/09"
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
      115/09/20
    </td>
    
    <td>
      2026/09/20
    </td>
    
    <td>
      <code>
        "2026/09/20"
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
      115/09/20 14:02
    </td>
    
    <td>
      2026/09/20 14:02
    </td>
    
    <td>
      <code>
        "2026/09/20 14:02"
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
      115/09/20 14:02:09
    </td>
    
    <td>
      2026/09/20 14:02:09
    </td>
    
    <td>
      <code>
        "2026/09/20 14:02:09"
      </code>
    </td>
  </tr>
</tbody>
</table>

<component-example name="datepicker-modes">



</component-example>

- When the year mode opens, the selected year scrolls to the middle of the list; with nothing selected, the current year is centered and the bound value stays `''`. Near either end of the year range, scrolling stops at the range.
- Date-times are local calendar times, with no UTC or time zone conversion.
- After switching `mode`, an existing value that does not match the new format is cleared; see the warning below. The example keeps a matching value for each `mode`.

### ROC years and separators

`roc` only switches the display, is on by default and does not rewrite the bound value; `separator` only affects the bound value, `/` by default, and the display still uses slashes.

<component-example name="datepicker-roc">



</component-example>

- The ROC year is the Gregorian year minus 1911; 1911 shows as ROC year 0. The year button and year list use the same rule.
- In ROC mode, dates before 1911 are neither shown nor selectable; Gregorian mode uses the normal year range.
- The bound value uses slashes by default; when your API uses hyphenated formats such as `YYYY-MM-DD`, set `separator="-"` to bind it directly. `separator` cannot be empty or contain digits, spaces or colons; an invalid one falls back to the default with a warning.

<warning>

When the parent passes a value (on mount or filled in later) that does not match the current `mode` and `separator`, has the wrong type, is before the ROC lower bound, or is a range whose start is after its end, the component clears the bound value and logs a `console.warn` with `[ShuoDatepicker] modelValue 格式不符，已清空：` or `起迄相反`. After switching `mode`, `roc` or `separator`, an existing value that does not match the new settings is also cleared with a warning, so fill in a matching value at the same time.

</warning>

Each clearing emits `update:modelValue` (or `update:start`, `update:end`) only once; for a reversed range, no temporary sorted value is emitted first.

### Range binding

`range` turns on range selection. The main array and the separate start and end stay in sync, to fit different APIs. Only a complete start-end array or `[]` is committed, never half a range.

<component-example name="datepicker-range">



</component-example>

- When both bindings are given on initialization, the main `v-model` wins; afterwards the parent can update either the main value or start and end.
- When cleared, the main value is `[]` and start and end are `''`. When the parent binds `null` or `undefined`, the component writes back `''` for a single date, `[]` for a range, and `''` for start and end.
- When only start and end are bound, they can be filled in separately; an invalid format on one side clears only that side, and when both have values but the start is after the end, both are cleared.
- When you do not need the main array, write just `<ShuoDatepicker v-model:start="start" v-model:end="end" range />`; see [Binding only start and end](#binding-only-start-and-end). The end date needs a start date; the component does not treat an end date alone as a complete range.

### Selectable dates

`min-date` and `max-date` limit the earliest and latest selectable dates, and dates outside cannot be selected; `year-range` is the Gregorian range of the year list, `[1900, 2100]` by default.

<component-example name="datepicker-limits">



</component-example>

- In ROC mode, `min-date` is at least 1911/01/01 and the lower bound of `year-range` is at least 1911.
- A string `min-date` can use slashes or hyphens and can include hours and minutes (and seconds).
- The year and year-month modes compare `min-date` by whole year and whole month.

### Icons and clear button

`clearable` shows a clear button, off by default; after clearing, the bound value is `''` (`[]` for ranges). `calendar-icon` is the trailing calendar icon, `i-lucide-calendar` by default; `clear-icon` is the clear button icon, `i-lucide-x` by default.

<component-example name="datepicker-icons">



</component-example>

### Validation state

`ShuoDatepicker` has no `color`; it uses `state` for the validation result: `false` shows an error, `true` shows success, and unset uses the normal style. Inside a `UFormField` with an error, it always shows the error.

<component-example name="datepicker-feedback">



</component-example>

### Size and states

While loading, a spinner replaces the trailing calendar icon and input is disabled. See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common) for the behavior shared by all states.

<component-example name="datepicker-states">



</component-example>

## Examples

### With form validation

Use `requiredText` for a single date and `requiredArray` for a range. A range with only a start date is not committed and does not fire change, so the required error still shows. Inside a `UFormField`, it picks up the field's id, name, size, disabled and error state; see [With UForm and UFormField](https://k90325248.github.io/shuo-ui/components/overview/common#with-uform-and-uformfield).

<component-example name="datepicker-validation">



</component-example>

### Binding only start and end

When the query API has separate start and end fields, bind only `v-model:start` and `v-model:end`, and use `separator="-"` for the `YYYY-MM-DD` format directly.

<component-example name="datepicker-start-end">



</component-example>

### Start and end limiting each other

When two single date pickers enter the start and end dates, use each other's value as `max-date` and `min-date` so the start cannot be after the end.

<component-example name="datepicker-linked-range">



</component-example>

## Interaction

### Selection flow

- **Year, year-month, date**: selecting applies the value and closes the menu, with no confirm / cancel buttons.
- **Range**: after selecting only the start date, a draft is kept and the parent's three bindings keep their values; the range is committed and the menu closed only after both dates are selected. Clicking outside, pressing Esc or closing the menu midway discards the draft and restores the last complete range; an empty value stays `[]`.
- **Date with hours and minutes / seconds**: after selecting a date, the full date-time is filled in immediately and the time panel opens. The time keeps the existing value, or the local current time set when the picker initialized if empty. Adjusting the time updates immediately; click outside to close and keep it.
- **Date-time range**: select both dates first, then switch to the start and end time panels; both times can be changed live.
- Switching from single to range clears the value and waits for a complete selection; turning range off keeps the start date as the single value and clears `start` and `end`.

### Keyboard

When the menu opens, focus moves to the selected date (or year, month), or to the first selectable item when nothing is selected. Arrow keys move focus, Enter selects and Esc closes; when the menu closes with focus still inside it, focus returns to the input. The menu is teleported to the body, so Tab cannot reach it.

### Calendar display

The calendar starts weeks on Sunday and always shows six weeks; dates from the previous and next months are dimmed. Changing months uses an opacity transition to avoid a scrollbar from horizontal movement.

Month and weekday names, the "年" in the year list, the year and year-month format ("115 年 10 月" in Traditional Chinese, "10/115" in English) and the range separator ("～" in Traditional Chinese, "–" in English) all switch with the locale; ROC or Gregorian years are still decided by `roc`. See [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages).

## v-model

<table>
<thead>
  <tr>
    <th>
      v-model
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        v-model
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
       for a single date; <code>
        [string, string] | []
      </code>
      
       for ranges
    </td>
    
    <td>
      Always Gregorian strings, with ranges as a start-end array; empty is <code>
        ''
      </code>
      
       for a single date and <code>
        []
      </code>
      
       for a range.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        v-model:start
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Range start date, can be filled in separately; <code>
        ''
      </code>
      
       when not a range.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        v-model:end
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Range end date, can be filled in separately; <code>
        ''
      </code>
      
       without a complete range or when not a range.
    </td>
  </tr>
</tbody>
</table>

## Props

<component-props :exclude="["start", "end"]" name="ShuoDatepicker">



</component-props>

See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common#shared-props) for the behavior of `size`, `disabled`, `loading`, `skeleton`, `id` and `name`. `clearable`, `calendarIcon`, `clearIcon`, `roc`, `separator` and `yearRange` can have site-wide defaults; see [Configurable props](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#configurable-props).

<note>

The component only exposes the props in the table above and does not inherit every prop of `@vuepic/vue-datepicker`; `auto-apply`, `flow`, `config`, `formats`, `model-type` and others are managed inside the component.

</note>

## Styling

There is no `ui` prop. HTML attributes such as `class` and `style` go on the outer container and are not passed through to the date library. The container has a built-in `relative block w-full min-w-0`; `class` is merged with it using tailwind-merge and wins on conflicts, so it can override the width and minimum width (for example `class="w-40"` or `class="min-w-20"`).

When the displayed date is wider than the field, it is truncated with an ellipsis, and a tooltip shows the full text on hover or focus, or on long press on touch devices (see [Tooltip](https://k90325248.github.io/shuo-ui/components/helper/tooltip#touch-long-press)); a long press does not open the calendar. The tooltip is not shown while the menu is open or during the skeleton.

## Changelog

<component-changelog name="ShuoDatepicker">



</component-changelog>

---

- [@vuepic/vue-datepicker](https://vue3datepicker.com)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
