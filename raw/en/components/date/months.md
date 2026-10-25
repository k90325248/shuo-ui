---
title: "Months"
description: "Years and months input converted to total months, with total months, years and months all bindable."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/date/months"
---
# Months

> Years and months input converted to total months, with total months, years and months all bindable.

`v-model: number | null` (total months), plus `v-model:year` and `v-model:month`; see [v-model](#v-model) below. It shows "years input yr months input mo".

## Usage

### Converting years and months

`v-model` is the total number of months, and `v-model:year` and `v-model:month` are the split years and months (0–11); the three bindings stay in sync.

<component-example name="months-basic">



</component-example>

- Only non-negative integers are accepted. The value carries over only after focus leaves the whole group (moving focus between years and months does not commit, so both can be cleared together): 0 years 13 months becomes 1 year 1 month, 13 months in total.
- The three bindings can be used alone or together. When the parent fills in total months and years/months that conflict, total months win; when only years/months are filled in, they are summed again and carried over.
- An empty side counts as 0; when both are empty, all three bindings are `null`. Strings, negative numbers, decimals, `NaN` or values beyond the safe integer range from the parent count as empty.

### Narrow containers

When the container is too narrow for both the years and months inputs, it switches to a single "total months" input; with enough width it goes back to both inputs, keeping any input not yet committed.

<component-example name="months-compact">



</component-example>

### Variants

Uses the `color` and `highlight` of `UInput`, applied to every input.

<component-example name="months-color">



</component-example>

### Size and states

While loading, a spinner shows after the months unit and input is disabled. The year and month units switch with the locale ("yr" and "mo" in English, "年" and "月" in Traditional Chinese); their width follows the text, and so does the width needed for the full years and months layout. See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common) for the behavior shared by all states.

<component-example name="months-states">



</component-example>

## Examples

### With form validation

Bind the total months, use `requiredNumber` for a required field, and check bounds separately with `v.minValue` and `v.maxValue`.

<component-example name="months-validation">



</component-example>

### Binding only years and months

When the API splits seniority into year and month fields, bind only `v-model:year` and `v-model:month`.

<component-example name="months-year-month">



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
        number | null
      </code>
    </td>
    
    <td>
      Total months
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        v-model:year
      </code>
    </td>
    
    <td>
      <code>
        number | null
      </code>
    </td>
    
    <td>
      Years
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        v-model:month
      </code>
    </td>
    
    <td>
      <code>
        number | null
      </code>
    </td>
    
    <td>
      Months
    </td>
  </tr>
</tbody>
</table>

## Props

<component-props name="ShuoMonths">



</component-props>

See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common#shared-props) for the behavior of `size`, `disabled`, `loading`, `skeleton` and `name`; `id` points to the years input, or the total months input in narrow containers.

## Styling

See [Per-component `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#per-component-ui-prop) for how `ui` is merged; the values of `year`, `month` and `total` are the same as the `ui` of Nuxt UI `UInput`:

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
        inline-flex items-center gap-2
      </code>
      
      , as wide as the full years and months layout, font size by size
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        year
      </code>
      
      , <code>
        month
      </code>
    </td>
    
    <td>
      Years and months inputs
    </td>
    
    <td>
      <code>
        root
      </code>
      
       fits two digits; <code>
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
        total
      </code>
    </td>
    
    <td>
      Total months input in narrow containers
    </td>
    
    <td>
      <code>
        root
      </code>
      
       fits four digits; <code>
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
        unit
      </code>
    </td>
    
    <td>
      Year and month unit text
    </td>
    
    <td>
      <code>
        min-w-[1em] flex-none whitespace-nowrap
      </code>
    </td>
  </tr>
</tbody>
</table>

```vue
<ShuoMonths
  v-model="totalMonths"
  class="w-80"
  :ui="{ unit: 'text-muted', year: { base: 'text-left' } }"
/>
```

The outer `class` is merged with `ui.root` and can override the width; when narrower than the full years and months layout needs, it switches to the total months input.

## Changelog

<component-changelog name="ShuoMonths">



</component-changelog>

---

- [UInput](https://ui.nuxt.com/docs/components/input)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
