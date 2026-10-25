---
title: "ListCard"
description: "Result list card with a title bar, a table and server-side pagination."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/layout/list-card"
---
# ListCard

> Result list card with a title bar, a table and server-side pagination.

A list card for query results: a title bar, a [ShuoTable](https://k90325248.github.io/shuo-ui/components/layout/table) data area and pagination, with pagination handled by the back end. The generic `T` is the row type. The skeleton, empty data, loading text and height transition are handled by `ShuoTable`; when you do not need the card and pagination, use `ShuoTable` directly.

## Usage

### Server-side pagination

Pagination is handled by the back end: the component emits `page-change`, and the page updates `page` and `data` after the query for that page succeeds. It is not emitted while loading, or when the page is the current one or out of range. `interactionDisabled` is `true` while loading and can be used to disable actions in the list.

<component-example name="list-card-basic">



</component-example>

The `PageRequest` type can be imported from `#shuo-ui/types/pagination`; see [Auto-imports and types](https://k90325248.github.io/shuo-ui/getting-started/advanced/auto-imports#types). For the full pattern with query fields, see [With ListCard](https://k90325248.github.io/shuo-ui/components/layout/query-card#with-listcard) on ShuoQueryCard.

### Title and icon

`title` is the title text and `icon` is the icon to the left of the title; pass an empty string to hide the icon. The title bar wraps by the same rules as `ShuoQueryCard`; see [Long titles](https://k90325248.github.io/shuo-ui/components/layout/query-card#long-titles).

<component-example name="list-card-title">



</component-example>

### Pagination and counts

`show-pagination` controls the pagination at the bottom left, shown even with a single page; `show-summary` controls the count and range at the bottom right; `page-size` is the number of rows per page, 10 by default.

<component-example name="list-card-footer">



</component-example>

- After changing `page-size`, query again from the first page with `getPagination(1)`; see [Re-querying the current page](#re-querying-the-current-page).
- When both pagination and the summary are off, the bottom only shows `#footer`; without `#footer`, there is no bottom area.

### Loading and empty data

When the component is created while loading with no data, skeleton rows are shown; when re-querying with existing data, the data fades and switches with a height transition. `empty` is the empty-data text, using the table default when not set; with `transition` set to `false`, no transition plays. The behavior is the same as [ShuoTable](https://k90325248.github.io/shuo-ui/components/layout/table#loading-and-empty-data).

<component-example name="list-card-states">



</component-example>

The title "Results" and the bottom summary switch with the locale ("Results" and "Showing 1 to 10 of 25 results." in English, "查詢結果" and its summary in Traditional Chinese), and can be overridden globally with the `listCard.title` and `listCard.summary` texts; "Loading…" and "No data" belong to the `table` group. See [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages).

## Examples

### Title bar actions and footer content

`#title` replaces the title text, `#header-right` holds actions on the right of the title bar, and `#footer` follows the pagination and summary. `#header-right` and `#footer` receive `interactionDisabled` to disable actions while loading.

<component-example name="list-card-header-right">



</component-example>

### Re-querying the current page

`getPagination()` on the template ref returns the current page number and the component's page size; passing a page number (such as `getPagination(1)`) returns that page instead, suited to the first query or going back to page one after the filters change.

<component-example name="list-card-expose">



</component-example>

## Props

<component-props name="ShuoListCard">



</component-props>

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
        page-change
      </code>
    </td>
    
    <td>
      <code>
        { PageNumber: number; PageSize: number }
      </code>
    </td>
    
    <td>
      The page should query that page, then update <code>
        page
      </code>
      
       and <code>
        data
      </code>
      
       on success
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
        title
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Title text
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        header-right
      </code>
    </td>
    
    <td>
      <code>
        interactionDisabled
      </code>
    </td>
    
    <td>
      Actions on the right of the title
    </td>
  </tr>
  
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
      
      , <code>
        footer
      </code>
    </td>
    
    <td>
      <code>
        interactionDisabled
      </code>
    </td>
    
    <td>
      A row above the table and extra content at the bottom of the card
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
        getPagination(page?)
      </code>
    </td>
    
    <td>
      Returns <code>
        { PageNumber, PageSize }
      </code>
      
       for the first query or re-querying
    </td>
  </tr>
</tbody>
</table>

## Styling

`ui` currently covers the parts of the title bar, with the same built-in styles as `ShuoQueryCard`; see [Per-component `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#per-component-ui-prop) for how it is merged. Use `tableProps.ui` for table styles:

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
</tbody>
</table>

## Changelog

<component-changelog name="ShuoListCard">



</component-changelog>

---

- [UTable](https://ui.nuxt.com/docs/components/table)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
