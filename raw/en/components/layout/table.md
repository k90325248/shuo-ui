---
title: "Table"
description: "Plain table built on UTable, with skeleton, empty data and height transition."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/layout/table"
---
# Table

> Plain table built on UTable, with skeleton, empty data and height transition.

It has no card, title or pagination, so it can go straight into a modal or your own `UCard`. Non-wrapping headers, cell padding, empty and loading texts, the first-load skeleton, `interactionDisabled`, and the height and fade transitions are all shared with [ShuoListCard](https://k90325248.github.io/shuo-ui/components/layout/list-card). The generic `T` is the row type.

## Usage

### Loading and empty data

`loading` means a query is in progress. When re-querying with existing data, the data fades and switches with a height transition; without data, the query shows "Loading…". After the data is cleared, `empty` is shown, "No data" by default.

<component-example name="table-basic">



</component-example>

Keep the existing `data` while re-querying and update it after the query succeeds, so the data fades instead of being cleared.

### First-load skeleton

When the component is created while loading (`loading` is `true`) with no data, three skeleton rows are shown based on the number of columns; after the first query finishes, the skeleton is no longer shown. Press "Recreate" to recreate the table in the loading state.

<component-example name="table-skeleton">



</component-example>

The skeleton column count uses leaf columns and excludes columns hidden by `tableProps.state.columnVisibility`.

### Transition

When the row count or content height changes, the data area height changes smoothly over 0.2 seconds; when re-querying with existing data, the data fades to 0.5 opacity. With `transition` set to `false`, the height follows the content directly and the fade has no transition. Nothing is animated when the user prefers reduced motion.

<component-example name="table-transition">



</component-example>

### Selection

`selectable` adds a selection column at the front, and the selection is bound to an array of keys with `v-model:selected`. `row-key` sets the key: a field name (such as `row-key="id"`) or a function that builds the key from the row; the selection keeps the original type of the keys. Select all in the header only selects the selectable rows on the current page, and shows an indeterminate state when only some are selected. With `select-all` set to `false`, the header shows the `selection-header` text instead.

<component-example name="table-selection">



</component-example>

- Without `row-key`, the row index (`'0'`, `'1'`…) is the key. The first row is still `'0'` after changing pages and selects different data, so always set it with server-side pagination.
- Selected keys are kept when changing pages or re-querying, including those on other pages; set `v-model:selected` to `[]` to clear the selection.
- All checkboxes are disabled while loading (`loading`).
- `select-all` can be set site-wide with `components.table.selectAll` in [Component defaults](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults).

### Rows that cannot be selected

Rows for which `row-selectable` returns `false` cannot be selected and are skipped by select all. In this example the key combines the year and number (such as `115-1`), and closed rows cannot be selected.

<component-example name="table-selection-disabled">



</component-example>

## Examples

### Editable table

Put Shuo input components in cell slots, with a title and bottom buttons from `UCard`.

<component-example name="table-editable">



</component-example>

### Detail table in a modal

To limit the height and keep the header fixed, set `ui.root` and `sticky` through `tableProps`, so the table itself scrolls and the header stays in place. The table is recreated each time the modal opens and shows skeleton rows while loading.

<component-example name="table-modal">



</component-example>

### Disabling actions while loading

Cell slots get an extra `interactionDisabled`, `true` while loading, to disable buttons in the rows.

<component-example name="table-interaction">



</component-example>

### Custom loading and empty content

Replace the built-in texts with `#loading` and `#empty`. `#loading` only shows when there is no data and it is not the first-load skeleton.

<component-example name="table-empty-slot">



</component-example>

### Selection checkbox styles

`checkbox-props` sets the appearance of the select-all and row checkboxes, which share the same settings. The width and alignment of the selection column cells are set with a column whose `id` is `select` in `columns`; see [Selection column position and custom cells](#selection-column-position-and-custom-cells).

<component-example name="table-selection-style">



</component-example>

<table>
<thead>
  <tr>
    <th>
      Property
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
        class
      </code>
    </td>
    
    <td>
      <code>
        any
      </code>
    </td>
    
    <td>
      Class of the checkbox wrapper (the <code>
        root
      </code>
      
       of UCheckbox)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ui
      </code>
    </td>
    
    <td>
      <code>
        ui
      </code>
      
       of UCheckbox
    </td>
    
    <td>
      Part styles: <code>
        root
      </code>
      
      , <code>
        container
      </code>
      
      , <code>
        base
      </code>
      
       (the box), <code>
        indicator
      </code>
      
       (checked background), <code>
        icon
      </code>
      
       and so on, merged with the UCheckbox theme; a function receives the defaults so you can replace them
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        color
      </code>
    </td>
    
    <td>
      Theme colors such as <code>
        'primary'
      </code>
      
      , <code>
        'neutral'
      </code>
    </td>
    
    <td>
      Background when checked; <code>
        primary
      </code>
      
       when not set
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        size
      </code>
    </td>
    
    <td>
      <code>
        'xs'
      </code>
      
      , <code>
        'sm'
      </code>
      
      , <code>
        'md'
      </code>
      
      , <code>
        'lg'
      </code>
      
      , <code>
        'xl'
      </code>
    </td>
    
    <td>
      Box size; <code>
        md
      </code>
      
       when not set
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        icon
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Icon when checked; the Nuxt UI <code>
        check
      </code>
      
       icon when not set
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        indeterminateIcon
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Icon when partly selected; the Nuxt UI <code>
        minus
      </code>
      
       icon when not set
    </td>
  </tr>
</tbody>
</table>

- The type is `TableCheckboxProps`, importable from `#shuo-ui/components/ShuoTable.vue`.
- The checked state, disabled state and accessible names are controlled by the table and cannot be set with `checkbox-props`; the `card` style of `variant` does not fit in a table and is not available either.
- For different styles on the select-all and row checkboxes, put your own `UCheckbox` in the `#select-header` or `#select-cell` slot.
- It can be set site-wide with `components.table.checkboxProps` in [Component defaults](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults) (no functions). A `checkbox-props` passed on the page replaces the site-wide value as a whole instead of merging it.

### Selection column position and custom cells

The selection column is placed at the front by default. To place it elsewhere, add a column with `id` set to `select` to `columns`; the selection column takes its position, and the column's settings apply to it. `th` and `td` in `meta.class` each replace the built-in `w-px` (fitting the checkbox width); with only `td` set, the header keeps `w-px`.

```ts
const columns: TableColumn<Row>[] = [
  { accessorKey: 'name', header: 'Name' },

  // Selection column after the name
  { id: 'select', meta: { class: { td: 'bg-muted' } } },

  { accessorKey: 'amount', header: 'Amount' }
];
```

The `#select-header` and `#select-cell` slots replace the built-in select-all and row checkboxes, with the same props as `UTable`: for example `row.getIsSelected()` for the state, `row.toggleSelected()` to toggle it, and `row.getCanSelect()` to check whether the row can be selected.

## Props

<component-props name="ShuoTable">



</component-props>

`tableProps.paginationOptions.manualPagination` is always `true`, with pagination handled by the back end; column visibility comes from `tableProps.state.columnVisibility`, and `tableProps.columnVisibility` passed directly has no effect.

With `selectable` on, the selection is controlled by `v-model:selected`, and `rowSelection` and `onUpdate:rowSelection` in `tableProps` have no effect; without it you can still control selection through `tableProps` as with `UTable`. `row-key` is also used as the `getRowId` of `UTable` when selection is off.

"Loading…" and "No data" switch with the locale ("查詢中…" and "查無資料" in Traditional Chinese), and can be overridden globally with the `table.loading` and `table.empty` texts; see [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages). The accessible names of the select-all and row checkboxes ("Select all", "Select row") and the header text when select all is off (empty by default) come from `table.selectAll`, `table.selectRow` and `table.selectionHeader`. Set styles for headers, cells and so on with `tableProps.ui`, merged with the built-in styles.

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
        <column>-cell
      </code>
      
       and other <code>
        UTable
      </code>
      
       slots
    </td>
    
    <td>
      Original props + <code>
        interactionDisabled
      </code>
    </td>
    
    <td>
      Custom cells and headers
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        body-top
      </code>
    </td>
    
    <td>
      <code>
        interactionDisabled
      </code>
    </td>
    
    <td>
      A row above the table
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        loading
      </code>
      
      , <code>
        empty
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Loading and empty-data content
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        select-header
      </code>
      
      , <code>
        select-cell
      </code>
    </td>
    
    <td>
      Original props + <code>
        interactionDisabled
      </code>
    </td>
    
    <td>
      Replace the select-all and row checkboxes
    </td>
  </tr>
</tbody>
</table>

## Changelog

<component-changelog name="ShuoTable">



</component-changelog>

---

- [UTable](https://ui.nuxt.com/docs/components/table)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
