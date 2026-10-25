---
title: "InputNumber"
description: "Number input that shows thousands separators on blur, with decimal places and units."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/text/input-number"
---
# InputNumber

> Number input that shows thousands separators on blur, with decimal places and units.

`v-model: number | null`.

## Usage

### Decimal places and thousands separators

`decimal` defaults to `false`, allowing only integers; a positive integer sets the number of decimal places, and `true` allows any number. `thousand-separator` defaults to `true`, showing thousands separators on blur; pass `false` for numbers such as years or codes that should not have them.

<component-example name="input-number-decimal">



</component-example>

- While typing, the sign, decimal point and trailing zeros are kept; incomplete input (such as just `-`) binds `null`. On blur, the value is rounded and padded according to `decimal`, and thousands separators are shown.
- Non-numeric characters and decimals beyond the set places cannot be typed, and pasted text is reverted too. When `decimal` is `false` or `0`, the decimal point cannot be typed.
- On focus, the text switches to the editable form without separators. `inputmode` is `numeric` when `decimal` is `false` or `0`, and `decimal` otherwise, so phones show the matching number keyboard.

<tip>

The component has no `min` or `max`. It is a text input underneath, so the native `min`, `max` and `step` have no effect. Use [validation rules](https://k90325248.github.io/shuo-ui/getting-started/form/validation) for ranges; see [With form validation](#with-form-validation) below.

</tip>

### Unit

When `unit` is `true`, "NTD" is shown ("元" in Traditional Chinese, switching with the locale). The text can be changed in [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages#overridable-items); passing a string shows that text. Units vary in length, so the right padding follows the unit's actual width and the number never overlaps the unit.

<component-example name="input-number-unit">



</component-example>

`unit` and `thousand-separator` can also have site-wide defaults; see [Configurable props](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#configurable-props). The site-wide `unit` only accepts `true` / `false`.

### Variants

Uses the `variant`, `color` and `highlight` of `UInput`.

<component-example name="input-number-variant">



</component-example>

### Icon

Uses the `icon` of `UInput`, shown on the left alongside the unit.

<component-example name="input-number-icon">



</component-example>

### Size and states

While loading, the spinner sits to the right of the unit and the number and unit move left to make room. See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common) for the behavior shared by all states.

<component-example name="input-number-states">



</component-example>

## Examples

### With form validation

Use `requiredNumber` for required fields and add ranges with `v.minValue` and `v.maxValue`; use `optionalNonNegativeNumber` for optional non-negative numbers. What gets validated and submitted is a number, without separators.

<component-example name="input-number-validation">



</component-example>

### Centered numbers

`ui.base` has a built-in `text-right`; pass `text-center` to center the number, which suits short fields inside a sentence. With a unit or while loading, the right padding follows the trailing content's actual width, so the number never overlaps the unit.

<component-example name="input-number-center">



</component-example>

### Clear button

Put a clear button in `#trailing`. `#trailing` sits next to the unit and the loading icon without replacing them; see [Slots](#slots) below.

<component-example name="input-number-clearable">



</component-example>

### Accessing the native input

Get the native input through `inputRef` on the template ref.

<component-example name="input-number-expose">



</component-example>

## Props

<component-props name="ShuoInputNumber">



</component-props>

See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common#shared-props) for the behavior of `size`, `disabled`, `loading`, `skeleton`, `id` and `name`.

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
        leading
      </code>
    </td>
    
    <td>
      <code>
        ui
      </code>
    </td>
    
    <td>
      Leading content; when not passed, <code>
        icon
      </code>
      
      , <code>
        leadingIcon
      </code>
      
       and <code>
        avatar
      </code>
      
       are kept
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        default
      </code>
    </td>
    
    <td>
      <code>
        ui
      </code>
    </td>
    
    <td>
      Extra content inside the input
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        trailing
      </code>
    </td>
    
    <td>
      <code>
        ui
      </code>
    </td>
    
    <td>
      Trailing content, laid out as "unit, <code>
        trailing
      </code>
      
       slot, loading icon"; the right padding follows the actual width
    </td>
  </tr>
</tbody>
</table>

The props are the same as Nuxt UI `UInput`.

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
        inputRef
      </code>
    </td>
    
    <td>
      <code>
        HTMLInputElement | null
      </code>
    </td>
    
    <td>
      The native input; call <code>
        focus()
      </code>
      
       or <code>
        select()
      </code>
      
       on it
    </td>
  </tr>
</tbody>
</table>

## Styling

`ui` accepts every slot of Nuxt UI `UInput` (`root`, `base`, `trailing` and so on), plus `suffix` and `unit`:

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
      Outer frame (Nuxt UI)
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
        base
      </code>
    </td>
    
    <td>
      Native input (Nuxt UI)
    </td>
    
    <td>
      <code>
        text-right
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        suffix
      </code>
    </td>
    
    <td>
      Trailing wrapper around the unit and loading icon
    </td>
    
    <td>
      <code>
        flex items-center gap-1.5
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        unit
      </code>
    </td>
    
    <td>
      Unit text
    </td>
    
    <td>
      <code>
        text-dimmed whitespace-nowrap
      </code>
    </td>
  </tr>
</tbody>
</table>

To center the number, pass `:ui="{ base: 'text-center' }"`; see [Centered numbers](#centered-numbers). With a unit or while loading, the component sets the input's right padding from the trailing content's actual width (inline style), which `ui`, `class` and `style` do not override. When centered, the number is centered in the space left after the unit and never overlaps it.

## Changelog

<component-changelog name="ShuoInputNumber">



</component-changelog>

---

- [UInput](https://ui.nuxt.com/docs/components/input)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
