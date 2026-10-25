---
title: "Tooltip"
description: "Tooltip built on UTooltip that adds long press on touch devices."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/helper/tooltip"
---
# Tooltip

> Tooltip built on UTooltip that adds long press on touch devices.

Nuxt UI's `UTooltip` only shows on hover or keyboard focus, so on phones neither tapping nor holding shows it. `ShuoTooltip` keeps every prop and slot of `UTooltip` and only adds long press on touch devices; just change `UTooltip` to `ShuoTooltip`.

Every tooltip in the library uses it: `ShuoInfoTooltip` and the truncated-text tooltips of the select menu, date picker, file input, checkbox and option groups all show on long press on phones too.

## Usage

### Tooltip text

`text` is the tooltip content, and the trigger goes in the default slot. Props such as `kbds`, `content`, `arrow` and `delayDuration` are the same as Nuxt UI.

<component-example name="tooltip-text">



</component-example>

### Touch long press

On touch devices, holding the trigger for about 0.5 seconds shows the tooltip, which stays open after you lift your finger and closes when you tap elsewhere or scroll the page.

- When a long press shows the tooltip, lifting your finger does not trigger the trigger's own action (click, check, open a menu and so on).
- A normal tap triggers the original action as usual without showing the tooltip; focus caused by a tap does not show it either.
- Moving your finger after pressing counts as scrolling and does not show the tooltip.
- During a long press, the browser's long-press menu is not shown and text inside the trigger is not selected (except in inputs).

With `touch` set to `false`, it behaves like the original Nuxt UI tooltip and touch cannot open it.

<component-example name="tooltip-touch">



</component-example>

To turn it off site-wide, set `components.tooltip.touch: false`; the tooltips inside the library turn off too. See [Component defaults](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults).

### Open state

Bind the open state with `v-model:open` to open or close it from code; without binding, set the initial state with `default-open`.

<component-example name="tooltip-open">



</component-example>

## Props

<component-props name="ShuoTooltip">



</component-props>

## Slots

<table>
<thead>
  <tr>
    <th>
      Slot
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
      The trigger
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        content
      </code>
    </td>
    
    <td>
      Custom tooltip content, like Nuxt UI's <code>
        content
      </code>
    </td>
  </tr>
</tbody>
</table>

## Changelog

<component-changelog name="ShuoTooltip">



</component-changelog>

---

- [UTooltip](https://ui.nuxt.com/docs/components/tooltip)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
