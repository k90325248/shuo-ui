---
title: "InfoTooltip"
description: "Info icon with a tooltip, shown on hover, keyboard focus or long press on touch devices."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/helper/info-tooltip"
---
# InfoTooltip

> Info icon with a tooltip, shown on hover, keyboard focus or long press on touch devices.

The tooltip shows on hover or keyboard focus with no delay; on touch devices it shows on a long press of the icon, not on tap. The tooltip is provided by [ShuoTooltip](https://k90325248.github.io/shuo-ui/components/helper/tooltip); see [Touch long press](https://k90325248.github.io/shuo-ui/components/helper/tooltip#touch-long-press) for the touch behavior.

## Usage

### Tooltip text

`text` is the tooltip content. It supports line breaks, and long text wraps within the maximum width. When `text` is empty and there is no `#content` slot, no tooltip is shown.

<component-example name="info-tooltip-text">



</component-example>

For formatting such as bold text, use the `#content` slot; see [Custom content](#custom-content).

### Icon and color

`icon` is the trigger button's icon, `i-lucide-circle-alert` by default. `class` goes on the trigger button; for example, `class="text-warning"` changes the icon color.

<component-example name="info-tooltip-icon">



</component-example>

The icon button has no visible text, so provide an accessible name with `label`.

## Examples

### Field hint

Put it in the `#hint` of `UFormField` to show the icon to the right of the field label.

<component-example name="info-tooltip-form-field">



</component-example>

### Custom content

Use the `#content` slot for formatting such as bold text and colors.

<component-example name="info-tooltip-content">



</component-example>

### Tooltip width

The tooltip's maximum width is `max-w-xs` by default and can be adjusted with `ui.tooltip.content`, for example `:ui="{ tooltip: { content: 'max-w-md' } }"`.

<component-example name="info-tooltip-width">



</component-example>

## Props

<component-props name="ShuoInfoTooltip">



</component-props>

The default of `label` can be overridden with the `infoTooltip.label` text.

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
        content
      </code>
    </td>
    
    <td>
      Custom tooltip content; with an empty <code>
        text
      </code>
      
       and no slot, no tooltip is shown
    </td>
  </tr>
</tbody>
</table>

## Styling

See [Per-component `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#per-component-ui-prop) for how `ui` is merged:

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
        trigger
      </code>
    </td>
    
    <td>
      Trigger button
    </td>
    
    <td>
      <code>
        text-primary inline-flex cursor-help rounded-full
      </code>
      
      , focus ring
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        icon
      </code>
    </td>
    
    <td>
      Icon inside the button
    </td>
    
    <td>
      <code>
        size-4 shrink-0
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        text
      </code>
    </td>
    
    <td>
      Tooltip content wrapper
    </td>
    
    <td>
      <code>
        min-w-0 text-left wrap-break-word whitespace-pre-line
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tooltip
      </code>
    </td>
    
    <td>
      Tooltip, with the same values as the <code>
        ui
      </code>
      
       of Nuxt UI <code>
        UTooltip
      </code>
    </td>
    
    <td>
      <code>
        content
      </code>
      
       is <code>
        h-auto max-w-xs py-2
      </code>
    </td>
  </tr>
</tbody>
</table>

`class` is merged with `ui.trigger`.

## Changelog

<component-changelog name="ShuoInfoTooltip">



</component-changelog>

---

- [UTooltip](https://ui.nuxt.com/docs/components/tooltip)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
