---
title: "InputNumber"
description: "Number input that shows thousands separators on blur, with decimal places, units and step buttons."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/text/input-number"
---
# InputNumber

> Number input that shows thousands separators on blur, with decimal places, units and step buttons.

`v-model: number | null`.

## Usage

### Decimal places and thousands separators

`decimal` defaults to `false`, allowing only integers; a positive integer sets the number of decimal places, and `true` allows any number. `thousand-separator` defaults to `true`, showing thousands separators on blur; pass `false` for numbers such as years or codes that should not have them.

<component-example name="input-number-decimal">



</component-example>

- While typing, the sign, decimal point and trailing zeros are kept; incomplete input (such as just `-`) binds `null`. On blur, the value is rounded and padded according to `decimal`, and thousands separators are shown.
- Non-numeric characters and decimals beyond the set places cannot be typed, and pasted text is reverted too. When `decimal` is `false` or `0`, the decimal point cannot be typed.
- On focus, the text switches to the editable form without separators. `inputmode` is `numeric` when `decimal` is `false` or `0`, and `decimal` otherwise, so phones show the matching number keyboard.

### Step buttons

`buttons` shows increment and decrement buttons (off by default), `step` is the amount per step (`1` by default), and `min`, `max` limit stepping with the buttons and keys. `orientation` sets the button layout: `horizontal` (default) puts decrement on the left and increment on the right and centers the number; `vertical` stacks both on the right and keeps the number right-aligned.

<component-example name="input-number-step">



</component-example>

- **Keyboard**: with `buttons`, or when any of `step`, `min`, `max` is passed, ArrowUp / ArrowDown steps once in the focused input, PageUp / PageDown steps 10 times, and Home / End jump to `min` / `max` (when set). Without these settings the arrow keys behave as in a normal text input. The buttons are not in the Tab order and are labelled "Increment" and "Decrement" (following the locale).
- **Press and hold**: holding a button for more than 0.4 seconds keeps stepping until a limit is reached or the button is released. Pressing a button does not move focus away from the input.
- **Empty value**: when the value is `null`, both increment and decrement start at `min`, or at `0` without `min`.
- **No floating-point errors**: steps are computed in decimal, so repeatedly adding `0.25` never gives `0.7500000001`; the result is rounded to the places allowed by `decimal`.
- **step and decimal**: when `step` has more decimal places than `decimal` allows (for example `0.25` with `decimal` set to `false`), the step is rounded to what `decimal` allows (at least one smallest unit, `1` for `false`) with a console warning. A `step` that is not a number above 0, or a `min` greater than `max`, is also ignored with a warning.
- **Limits**: the increment button is disabled when the value is at or above `max`, and the decrement button at or below `min`. Both are disabled while disabled, loading, in a skeleton or in a disabled form.
- Each step triggers the `UFormField` input and change validation, just like typing.
- `buttons` and `orientation` can have site-wide defaults, for example to show the buttons across the project: `shuoUi.components.inputNumber.buttons: true`.

<warning>

`min` and `max` only limit the buttons and keys. **A typed value outside the range is not corrected**; the bound value stays as typed, and stepping from it moves back into the range. Keep validating the range in the schema with `v.minValue` and `v.maxValue`; see [With form validation](#with-form-validation) below.

</warning>

In horizontal layout the decrement button takes the place of the left `icon` / `leadingIcon` (the `#leading` slot still follows the button); use `orientation="vertical"` when you need a left icon. The increment button sits to the right of the unit, the `#trailing` slot and the loading icon, and the padding on both sides follows their actual width, so the number and unit are never pushed out.

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

### Step buttons with validation

`min` and `max` do not replace validation: the buttons in this example only stop at 0, and the schema checks the upper limit; stepping above 40 shows the error right away.

<component-example name="input-number-step-validation">



</component-example>

### Centered numbers

`ui.base` has a built-in `text-right`; pass `text-center` to center the number, which suits short fields inside a sentence. With horizontal step buttons the built-in value is `text-center`, so the number sits between the buttons; pass `text-right` to keep it right-aligned. With a unit or while loading, the right padding follows the trailing content's actual width, so the number never overlaps the unit.

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
      
       are kept; with horizontal buttons it follows the decrement button
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
      
       slot, loading icon, increment button"; the right padding follows the actual width
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

`ui` accepts every slot of Nuxt UI `UInput` (`root`, `base`, `leading`, `trailing` and so on), plus `suffix`, `unit` and the step button parts `prefix`, `buttons`, `increment`, `decrement`:

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
      
      ; <code>
        text-center
      </code>
      
       with horizontal step buttons
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
  
  <tr>
    <td>
      <code>
        prefix
      </code>
    </td>
    
    <td>
      Wrapper around the decrement button and <code>
        #leading
      </code>
      
       in horizontal layout
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
        buttons
      </code>
    </td>
    
    <td>
      Stack of both buttons in vertical layout
    </td>
    
    <td>
      <code>
        flex flex-col justify-center
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        increment
      </code>
    </td>
    
    <td>
      Increment button wrapper
    </td>
    
    <td>
      <code>
        flex items-center
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        decrement
      </code>
    </td>
    
    <td>
      Decrement button wrapper
    </td>
    
    <td>
      <code>
        flex items-center
      </code>
    </td>
  </tr>
</tbody>
</table>

With buttons on, Nuxt UI's `leading` and `trailing` padding shrinks to `ps-1` and `pe-1` (as in `UInputNumber`); override it with `ui`. The button icons follow `ui.icons` in `app.config.ts`: `plus` and `minus` in horizontal layout, `chevronUp` and `chevronDown` in vertical layout.

To center the number, pass `:ui="{ base: 'text-center' }"`; see [Centered numbers](#centered-numbers). Horizontal step buttons already center it; pass `text-right` or `text-left` to align it right or left. The defaults passed to the function form also follow the button layout. With a unit or while loading, the component sets the input's right padding from the trailing content's actual width (inline style), which `ui`, `class` and `style` do not override. When centered, the number is centered in the space left after the unit and never overlaps it.

## Changelog

<component-changelog name="ShuoInputNumber">



</component-changelog>

---

- [UInput](https://ui.nuxt.com/docs/components/input)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
