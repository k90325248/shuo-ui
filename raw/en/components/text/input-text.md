---
title: "InputText"
description: "Single-line text input that can mask all or the last few characters."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/text/input-text"
---
# InputText

> Single-line text input that can mask all or the last few characters.

`v-model: string`.

## Usage

### Mask

When `mask` is `true`, everything is masked; a positive integer masks that many trailing characters. The eye button on the right toggles between plain text and masked, and `hide-mask-toggle` hides that button. `v-model` always keeps the original text.

<component-example name="input-text-mask">



</component-example>

- `12345678` with `:mask="4"` shows `1234••••`; with fewer than four characters, everything is masked. `false`, `0`, negative numbers and non-finite numbers disable masking, and decimals are rounded down.
- Copying and cutting are blocked while masked; after revealing the text, copying works normally.
- Changing `mask` or `hideMaskToggle` dynamically resets to the masked state.
- When the text alignment is changed with `ui.base`, the partial mask overlay follows the alignment.

### Toggle icons

`reveal-icon` is shown while masked (press it to reveal the text), and `conceal-icon` is shown while the text is revealed (press it to mask again).

<component-example name="input-text-mask-icons">



</component-example>

### Variants

Uses the `variant`, `color` and `highlight` of `UInput`.

<component-example name="input-text-variant">



</component-example>

### Icon

Uses the `icon` of `UInput`; when `trailing` is `true`, the icon goes on the right.

<component-example name="input-text-icon">



</component-example>

### Size and states

When disabled, the text can still be revealed; during the skeleton it cannot be used. See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common) for the behavior shared by all states.

<component-example name="input-text-states">



</component-example>

## Examples

### With form validation

Use `requiredText` for required fields and check the format separately with `v.regex`. Masking only affects the display; the original text is what gets validated and submitted.

<component-example name="input-text-validation">



</component-example>

### Leading icon with mask

`#leading` goes on the left while the eye button stays on the right, so both can be used together.

<component-example name="input-text-leading-mask">



</component-example>

### Clear button

Put a clear button in `#trailing`. When masked or loading, the trailing position shows the eye button or the loading icon first; see [Slots](#slots) below.

<component-example name="input-text-clearable">



</component-example>

### Accessing the native input

Get the native input through `inputRef` on the template ref.

<component-example name="input-text-expose">



</component-example>

## Props

<component-props name="ShuoInputText">



</component-props>

See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common#shared-props) for the behavior of `size`, `disabled`, `loading`, `skeleton`, `id` and `name`. `type` is decided by `mask` and cannot be passed.

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
      Trailing content; the order of precedence is "loading icon > mask toggle > <code>
        trailing
      </code>
      
       slot"
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

`ui` accepts every slot of Nuxt UI `UInput`, merged with the built-in styles; see [Per-component `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#per-component-ui-prop):

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
        trailing
      </code>
    </td>
    
    <td>
      Trailing content wrapper (Nuxt UI)
    </td>
    
    <td>
      <code>
        pointer-events-auto
      </code>
      
       when masked, so the eye button can be clicked
    </td>
  </tr>
</tbody>
</table>

`class` is merged after `ui.root`, so it can override the width and minimum width (for example `class="min-w-20"`).

## Changelog

<component-changelog name="ShuoInputText">



</component-changelog>

---

- [UInput](https://ui.nuxt.com/docs/components/input)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
