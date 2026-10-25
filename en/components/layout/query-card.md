---
title: "QueryCard"
description: "Collapsible query card containing a UForm, with fields in a responsive grid."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/layout/query-card"
---
# QueryCard

> Collapsible query card containing a UForm, with fields in a responsive grid.

Fields are laid out in a responsive grid (one column, two from md, four from xl, adjustable with `ui.grid`). The generic `S` is the schema.

## Usage

### Title and icon

`title` is the title text and `icon` is the icon to the left of the title; pass an empty string to hide the icon.

<component-example name="query-card-title">



</component-example>

### Collapsing

Control the expanded state with `v-model:open`, expanded by default. `expand-icon` is the button icon shown when collapsed, and `collapse-icon` is the button icon shown when expanded.

<component-example name="query-card-collapse">



</component-example>

- When validation fails while collapsed, the card expands automatically to show the errors. In the example, collapse it first, then press "Submit" in the props bar to see it.
- Collapsed fields cannot be focused or used.

### Disabled

`disabled` disables the fields in the form (using the disabled state of `UForm`); `submit()` and `clear()` on the template ref and the `submit` and `clear` provided by `#actions` do nothing. Buttons in `#actions` are not disabled automatically, so pass `disabled` yourself.

<component-example name="query-card-disabled">



</component-example>

### Columns

Adjust the number of columns with `ui.grid`. When changing columns, write out every breakpoint: tailwind-merge only replaces classes of the same breakpoint, so with only `md:grid-cols-3`, the built-in `xl:grid-cols-4` still applies.

<component-example name="query-card-grid">



</component-example>

You can also remove the built-in breakpoints with the function form and set your own:

```vue
<ShuoQueryCard
  :state="query"
  :ui="{
    grid: (defaults) =>
      defaults.replace(/(md|xl):grid-cols-\d/g, '') + ' lg:grid-cols-3'
  }"
>
  ...
</ShuoQueryCard>
```

See [Query field columns](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#query-field-columns) for site-wide columns.

### Long titles

By default the title neither wraps nor truncates; when `header-right` does not fit, the whole block moves to the next line, aligned right, without squeezing the title or the collapse button. The title bar of `ShuoListCard` follows the same rules. To let a long title wrap next to the icon, override the title bar with `ui` so it does not wrap (`bar: 'flex-nowrap'`) and allow the title to shrink (`title: 'min-w-0 shrink whitespace-normal'`):

<component-example name="query-card-long-title">



</component-example>

## Examples

### Validation and action buttons

Press Enter in a field to submit; `submit` fires only after validation passes, with the data in `event.data`. Put the bottom buttons in `#actions`. `clear` fires the `clear` event; the page resets the data and the component then clears the validation errors.

<component-example name="query-card-basic">



</component-example>

### Submitting from the title bar

Call `submit()` and `clear()` through the template ref, for example to put the search button in `#header-right`.

<component-example name="query-card-expose">



</component-example>

### With ListCard

After submitting the query, call `getPagination(1)` on [ShuoListCard](https://k90325248.github.io/shuo-ui/components/layout/list-card) to query from the first page; changing pages keeps the submitted query.

<component-example name="query-card-with-list">



</component-example>

## Props

<component-props name="ShuoQueryCard">



</component-props>

`v-model:open` (`boolean`, default `true`) controls the expanded state.

## Events

<table>
<thead>
  <tr>
    <th>
      Event
    </th>
    
    <th>
      Payload
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
        submit
      </code>
    </td>
    
    <td>
      <code>
        FormSubmitEvent
      </code>
    </td>
    
    <td>
      Submitted after validation passes; read the data from <code>
        event.data
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        clear
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Tells the page to reset its data; the component then clears validation errors
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        error
      </code>
    </td>
    
    <td>
      <code>
        FormErrorEvent
      </code>
    </td>
    
    <td>
      Validation failed; a collapsed card expands to show the errors
    </td>
  </tr>
</tbody>
</table>

## Slots

<table>
<thead>
  <tr>
    <th>
      Slot
    </th>
    
    <th>
      Props
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
        default
      </code>
    </td>
    
    <td>
      <code>
        state
      </code>
      
      , <code>
        errors
      </code>
      
      , <code>
        loading
      </code>
    </td>
    
    <td>
      Field content
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        header-right
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Right side of the title
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        actions
      </code>
    </td>
    
    <td>
      <code>
        submit
      </code>
      
      , <code>
        clear
      </code>
      
      , <code>
        loading
      </code>
    </td>
    
    <td>
      Bottom action buttons
    </td>
  </tr>
</tbody>
</table>

## Expose

<table>
<thead>
  <tr>
    <th>
      Name
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
        submit()
      </code>
    </td>
    
    <td>
      Validates and submits; does nothing when disabled
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        clear()
      </code>
    </td>
    
    <td>
      Fires <code>
        clear
      </code>
      
      ; does nothing when disabled
    </td>
  </tr>
</tbody>
</table>

## Styling

`ui` accepts the slots of Nuxt UI `UCard` (`root`, `header`, `body`), plus the parts inside the card; see [Per-component `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#per-component-ui-prop) for how it is merged:

<table>
<thead>
  <tr>
    <th>
      Slot
    </th>
    
    <th>
      Part
    </th>
    
    <th>
      Built-in styles
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        root
      </code>
    </td>
    
    <td>
      Card frame (Nuxt UI)
    </td>
    
    <td>
      <code>
        overflow-visible rounded-[10px] bg-default ring-0 shadow-sm
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        body
      </code>
    </td>
    
    <td>
      Card body (Nuxt UI)
    </td>
    
    <td>
      <code>
        p-0 sm:p-0
      </code>
      
      ; padding is handled by <code>
        form
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        bar
      </code>
    </td>
    
    <td>
      Title bar
    </td>
    
    <td>
      <code>
        flex min-h-8 flex-wrap items-center gap-2
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        icon
      </code>
    </td>
    
    <td>
      Title icon
    </td>
    
    <td>
      <code>
        text-primary size-5 shrink-0
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        title
      </code>
    </td>
    
    <td>
      Title text
    </td>
    
    <td>
      <code>
        text-highlighted shrink-0 text-base font-semibold whitespace-nowrap
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        toggle
      </code>
    </td>
    
    <td>
      Expand / collapse button
    </td>
    
    <td>
      <code>
        shrink-0
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        headerRight
      </code>
    </td>
    
    <td>
      Wrapper of <code>
        header-right
      </code>
    </td>
    
    <td>
      <code>
        ml-auto flex min-w-0 items-center gap-3
      </code>
      
      , only rendered when the slot is passed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        form
      </code>
    </td>
    
    <td>
      Query form
    </td>
    
    <td>
      <code>
        relative
      </code>
      
      , with padding from the site-wide <code>
        app.config.ui.card.slots.body
      </code>
      
       (default <code>
        p-4 sm:p-6
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        grid
      </code>
    </td>
    
    <td>
      Query field grid
    </td>
    
    <td>
      <code>
        grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-4
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        actions
      </code>
    </td>
    
    <td>
      Action button row
    </td>
    
    <td>
      <code>
        mt-6 flex flex-wrap justify-end gap-2
      </code>
    </td>
  </tr>
</tbody>
</table>

## Changelog

<component-changelog name="ShuoQueryCard">



</component-changelog>

---

- [UCard](https://ui.nuxt.com/docs/components/card)
- [UForm](https://ui.nuxt.com/docs/components/form)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
