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

## Props

<component-props name="ShuoTable">



</component-props>

`tableProps.paginationOptions.manualPagination` is always `true`, with pagination handled by the back end; column visibility comes from `tableProps.state.columnVisibility`, and `tableProps.columnVisibility` passed directly has no effect.

"Loading…" and "No data" switch with the locale ("查詢中…" and "查無資料" in Traditional Chinese), and can be overridden globally with the `table.loading` and `table.empty` texts; see [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages). Set styles for headers, cells and so on with `tableProps.ui`, merged with the built-in styles.

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
</tbody>
</table>

## Changelog

<component-changelog name="ShuoTable">



</component-changelog>

---

- [UTable](https://ui.nuxt.com/docs/components/table)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
