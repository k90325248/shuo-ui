---
title: "SelectMenu"
description: "Select menu with search and multiple selection, showing a full-text tooltip when the text is too long."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/choice/select-menu"
---
# SelectMenu

> Select menu with search and multiple selection, showing a full-text tooltip when the text is too long.

`v-model`: the item's value for single selection, an array of values when `multiple`; see [`empty-value`](#single-and-multiple) for the cleared value.

## Usage

### Single and multiple

Single selection binds the item's value; with `multiple`, it binds an array of values, and the selected labels are joined with ", ". An empty single selection is `empty-value` (default `''`, can be `null`), and an empty multiple selection is `[]`.

<component-example name="select-menu-basic">



</component-example>

### Display format

`format` defaults to `{label}`, showing only the label. `{value}` and `{label}` are replaced, the result is not parsed again, and unknown tokens are kept as is. The same format applies to the items and the selected text.

<component-example name="select-menu-format">



</component-example>

To show "value_label" across the whole project, set `format` site-wide:

<code-group>

```vue [Single component]
<ShuoSelectMenu v-model="state.type" :items="items" format="{value}_{label}" />
```

```ts [Site-wide]
// nuxt.config.ts
export default defineNuxtConfig({
  shuoUi: {
    components: {
      selectMenu: { format: '{value}_{label}' }
    }
  }
});
```

</code-group>

### Custom item fields

When the back-end fields are not `label` and `value`, set them with `label-key` and `value-key`. Props of `USelectMenu` such as `description-key` work directly too; field names are inferred from `items`, and a wrong name is a type error.

<component-example name="select-menu-keys">



</component-example>

### Search

The menu has a built-in search input with the placeholder "Search..." ("關鍵字查詢..." in Traditional Chinese), which can be changed in [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages#overridable-items). The search matches the `label-key` field and is not affected by the display format. With only a few items, pass `:search-input="false"` to hide the search input.

<component-example name="select-menu-search">



</component-example>

### Variants

Uses the `variant`, `color` and `highlight` of `USelectMenu`.

<component-example name="select-menu-variant">



</component-example>

### Icon

Uses the `icon` and `trailing-icon` of `USelectMenu`; `icon` shows on the left, and `trailing-icon` replaces the arrow on the right.

<component-example name="select-menu-icon">



</component-example>

### Size and states

While loading, a spinner replaces the arrow on the right and the menu is disabled. Switching to skeleton, disabled or loading closes an open menu, and it does not reopen afterwards. See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common) for the behavior shared by all states.

<component-example name="select-menu-states">



</component-example>

## Examples

### With form validation

An empty single selection is `''`, so use `requiredText`; an empty multiple selection is `[]`, so use `requiredArray`.

<component-example name="select-menu-validation">



</component-example>

### Truncated text tooltip

When the selected text is wider than the field, it is truncated with an ellipsis, and a tooltip shows the full text on hover or focus, or on long press on touch devices (see [Tooltip](https://k90325248.github.io/shuo-ui/components/helper/tooltip#touch-long-press)); a long press does not open the menu. The tooltip is not shown while the menu is open. Set the width on `ui.wrapper`; see [Styling](#styling) below.

<component-example name="select-menu-truncate">



</component-example>

### Loading items asynchronously

While fetching items from the back end, use `loading` to show a spinner and disable the menu, then fill in `items` when the request completes. When the bound value has no matching item, `placeholder` is shown, and the label appears automatically once the items arrive.

<component-example name="select-menu-async">



</component-example>

### Dependent menus

When the city changes, the district is cleared, and the district `items` are computed from the city.

<component-example name="select-menu-cascade">



</component-example>

### Opening the menu

Get the trigger button through `triggerRef` on the template ref and call `click()` to open the menu.

<component-example name="select-menu-expose">



</component-example>

## Props

<component-props name="ShuoSelectMenu">



</component-props>

See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common#shared-props) for the behavior of `size`, `disabled`, `loading`, `skeleton`, `id` and `name`.

When `open` is not set, the user opens and closes the menu; there is no v-model for it. The types of `clear` and `clearIcon` are inferred from another Nuxt UI generic that this component does not provide, so they are not in its types.

## Slots

Every slot of `USelectMenu` is available (`leading`, `trailing`, `item`, `item-leading`, `content-top` and so on). These three replace the component's built-in content when passed:

<table>
<thead>
  <tr>
    <th>
      Slot
    </th>
    
    <th>
      Built-in content
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        item-label
      </code>
    </td>
    
    <td>
      The item text formatted by <code>
        format
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        default
      </code>
    </td>
    
    <td>
      The selected text formatted by <code>
        format
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        empty
      </code>
    </td>
    
    <td>
      "No options" (by locale)
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
        triggerRef
      </code>
    </td>
    
    <td>
      <code>
        HTMLButtonElement | null
      </code>
    </td>
    
    <td>
      The trigger button
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        viewportRef
      </code>
    </td>
    
    <td>
      <code>
        HTMLDivElement | null
      </code>
    </td>
    
    <td>
      The menu's scroll area
    </td>
  </tr>
</tbody>
</table>

## Styling

`ui` accepts every slot of Nuxt UI `USelectMenu`, plus `wrapper`:

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
        wrapper
      </code>
    </td>
    
    <td>
      Outer wrapper that measures truncation and holds the tooltip
    </td>
    
    <td>
      <code>
        flex w-full min-w-0
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        base
      </code>
    </td>
    
    <td>
      Trigger button (Nuxt UI)
    </td>
    
    <td>
      <code>
        w-full min-w-0
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        value
      </code>
      
      , <code>
        placeholder
      </code>
    </td>
    
    <td>
      Selected text and placeholder (Nuxt UI)
    </td>
    
    <td>
      <code>
        min-w-0 truncate
      </code>
    </td>
  </tr>
</tbody>
</table>

To make it narrower, set `ui.wrapper` (for example `w-40`), and the trigger button fills the wrapper; `class` goes on the trigger button and does not affect the wrapper. `ui.value` and `ui.placeholder` apply whether something is selected, nothing is selected, or no item matches.

## Changelog

<component-changelog name="ShuoSelectMenu">



</component-changelog>

---

- [USelectMenu](https://ui.nuxt.com/docs/components/select-menu)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
