---
title: "Checkbox"
description: "Single checkbox with custom checked values and optional content next to the label."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/choice/checkbox"
---
# Checkbox

> Single checkbox with custom checked values and optional content next to the label.

`v-model: string | number | boolean`, required.

## Usage

### Checked values

`true-value` is the bound value when checked, the number `1` by default; `false-value` is the bound value when unchecked, the number `0` by default. Change them when the back end uses `Y` / `N` or booleans; if the whole project uses the same values, set site-wide defaults for `trueValue` and `falseValue`; see [Configurable props](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#configurable-props).

<component-example name="checkbox-values">



</component-example>

- When the bound value is not `true-value`, the checkbox shows unchecked. In the example, changing only `true-value` makes the existing value no longer match, so it shows unchecked.
- A native form submission sends `true-value` instead of the browser's default `on`.

### Label

`label` defaults to "Enable" ("啟用" in Traditional Chinese), switching with the locale, and can be overridden with the `checkbox.label` text; see [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages).

<component-example name="checkbox-label">



</component-example>

The label shows on one line and is truncated when wider than its container. A tooltip shows the full text on hover or focus, or on long press on touch devices (see [Tooltip](https://k90325248.github.io/shuo-ui/components/helper/tooltip#touch-long-press)); a long press that shows the tooltip does not change the checked state.

### Color and icon

Uses the `color` and `icon` (the checked icon) of `UCheckbox`.

<component-example name="checkbox-color">



</component-example>

### Size and states

The frame height matches an input of the same size. While loading, a spinner of the same size replaces the checkbox and it is disabled. See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common) for the behavior shared by all states.

<component-example name="checkbox-states">



</component-example>

## Examples

### Next to an input

Inside a flex container, the wrapper shrinks with the available space and truncates the label. To show the full label, set `ui.wrapper` to `shrink-0`; a label wider than the container is still truncated with a tooltip.

<component-example name="checkbox-inline">



</component-example>

### Input next to the label

Put an input next to the label with `#append`. When the input is focused, call `check()` from the slot props to check the box too, and use `labelId` as the input's `aria-labelledby`. Clicking non-interactive parts of the appended content does not change the checked state; see [Item append content](https://k90325248.github.io/shuo-ui/components/choice/checkbox-group#item-append-content) for details.

<component-example name="checkbox-append">



</component-example>

### Must be checked

For fields that must be checked, such as agreeing to terms, use `v.check` to check that the bound value equals `true-value` (not `v.literal`, which would narrow the UForm state type).

<component-example name="checkbox-validation">



</component-example>

## Props

<component-props name="ShuoCheckbox">



</component-props>

See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common#shared-props) for the behavior of `size`, `disabled`, `loading`, `skeleton`, `id` and `name`. The default of `label` can be overridden with the `checkbox.label` text.

Nuxt UI's `variant` (card), `indicator` and `highlight` are not supported, so that a frame does not make the option taller and break the height alignment with inputs; see [Built on Nuxt UI](https://k90325248.github.io/shuo-ui/components/overview/common#built-on-nuxt-ui) for why.

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
        append
      </code>
    </td>
    
    <td>
      <code>
        checked
      </code>
      
      , <code>
        disabled
      </code>
      
      , <code>
        labelId
      </code>
      
      , <code>
        check()
      </code>
    </td>
    
    <td>
      Content next to the label; see <a href="https://k90325248.github.io/shuo-ui/components/choice/checkbox-group#item-append-content">
        Item append content
      </a>
    </td>
  </tr>
</tbody>
</table>

## Styling

`ui` accepts every slot of Nuxt UI `UCheckbox`, merged as described in [Per-component `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#per-component-ui-prop), plus `wrapper`:

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
      Outer wrapper that measures truncation, holds the tooltip and positions the loading icon
    </td>
    
    <td>
      <code>
        relative inline-flex w-fit max-w-full min-w-0 align-top
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        root
      </code>
    </td>
    
    <td>
      Checkbox frame (Nuxt UI)
    </td>
    
    <td>
      <code>
        w-fit max-w-full min-w-0
      </code>
      
      , with height matching inputs of the same size and centered vertically
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        label
      </code>
    </td>
    
    <td>
      Label (Nuxt UI)
    </td>
    
    <td>
      <code>
        truncate
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
      Checkbox (Nuxt UI)
    </td>
    
    <td>
      <code>
        opacity-0
      </code>
      
       while loading
    </td>
  </tr>
</tbody>
</table>

The height can also be adjusted with `class="[--form-checkbox-height:1.25rem]"`. `class` goes on the checkbox frame and does not affect the wrapper.

## Changelog

<component-changelog name="ShuoCheckbox">



</component-changelog>

---

- [UCheckbox](https://ui.nuxt.com/docs/components/checkbox)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
