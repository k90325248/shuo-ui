---
title: "Phone"
description: "Landline number with separate inputs for the area code and the number."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/phone-file/phone"
---
# Phone

> Landline number with separate inputs for the area code and the number.

`v-model: string` (the full number), plus `v-model:area-code` and `v-model:number`; see [v-model](#v-model) below.

## Usage

### Binding

The three bindings update together; the full number is the area code plus the number, with no separator. Press "Read bound values" to show the current three values in a notification.

<component-example name="phone-basic">



</component-example>

- All three keep strings and leading `0`s; for example, area code `02` and number `00123456` give the full number `0200123456`.
- When the user types or pastes, only half-width digits are kept; values filled in by the parent are shown as is, and are only filtered after the user edits that input.
- When the area code or number has the wrong type, only that input is cleared and the full number is joined again; when the full number has the wrong type, both inputs are cleared.

### Filling in only the full number

When only the full number is filled in, it is split by a known area code that matches its prefix; without a usable area code, the whole number goes into the number input and the area code is cleared, with no guessing by length. To split it into both inputs, also bind `v-model:area-code` with a known area code. Switch `area-code` to compare the two results:

<component-example name="phone-split">



</component-example>

### Variants

Uses the `color` and `highlight` of `UInput`, applied to both the area code and number inputs.

<component-example name="phone-color">



</component-example>

### Size and states

While loading, a spinner shows at the far right of the number input and both inputs are disabled. See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common) for the behavior shared by all states.

<component-example name="phone-states">



</component-example>

## Examples

### With form validation

The component has no built-in rules for phone number length or valid area codes; define them in the form schema. The example checks required with `requiredText`, then the format of the full number with `v.regex`.

<component-example name="phone-validation">



</component-example>

### Storing area code and number separately

When the back end stores two fields, bind only `v-model:area-code` and `v-model:number`. Press "Load data" to simulate fetching from the back end, with `loading` disabling input meanwhile.

<component-example name="phone-parts">



</component-example>

## v-model

<table>
<thead>
  <tr>
    <th>
      v-model
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
        v-model
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Full number (area code plus number, no separator)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        v-model:area-code
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Area code
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        v-model:number
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Phone number
    </td>
  </tr>
</tbody>
</table>

## Props

<component-props name="ShuoPhone">



</component-props>

See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common#shared-props) for the behavior of `size`, `disabled`, `loading`, `skeleton` and `name`; `id` points to the area code input.

## Styling

See [Per-component `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#per-component-ui-prop) for how `ui` is merged; the values of `areaCode` and `number` are the same as the `ui` of Nuxt UI `UInput`:

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
      Outer wrapper
    </td>
    
    <td>
      <code>
        flex w-full min-w-0 items-center gap-2
      </code>
      
      , font size by size
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        areaCode
      </code>
    </td>
    
    <td>
      Area code input
    </td>
    
    <td>
      <code>
        root
      </code>
      
       fits three digits and takes at most half the width; <code>
        base
      </code>
      
       is <code>
        text-center tabular-nums
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      Phone number input
    </td>
    
    <td>
      <code>
        root
      </code>
      
       is <code>
        min-w-0 flex-1
      </code>
      
      ; <code>
        base
      </code>
      
       is <code>
        tabular-nums
      </code>
    </td>
  </tr>
</tbody>
</table>

```vue
<ShuoPhone
  v-model="fullPhone"
  class="w-72"
  :ui="{ areaCode: { root: 'w-20' } }"
/>
```

The outer `class` is merged with `ui.root` and can override the width.

## Changelog

<component-changelog name="ShuoPhone">



</component-changelog>

---

- [UInput](https://ui.nuxt.com/docs/components/input)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
