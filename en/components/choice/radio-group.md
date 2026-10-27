---
title: "RadioGroup"
description: "Radio group that lays out by viewport width, with custom item fields and appended content."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/choice/radio-group"
---
# RadioGroup

> Radio group that lays out by viewport width, with custom item fields and appended content.

`v-model: string`; item `value`s should not be empty strings. For multiple selection, use [CheckboxGroup](https://k90325248.github.io/shuo-ui/components/choice/checkbox-group) instead.

## Usage

### Items

`items` accepts objects or strings. Object items show `label` and bind `value`, and `disabled` disables a single item; for string items, both `label` and `value` are the string. With nothing selected, the bound value is `''`.

<component-example name="radio-group-items">



</component-example>

### Orientation

`orientation` defaults to `auto`, switching between vertical and horizontal around `breakpoint` (default `md`) by viewport width; `horizontal` and `vertical` fix the direction regardless of the viewport. When an item label is truncated, hovering or keyboard focus shows a tooltip with the full text, or a long press on touch devices (see [Tooltip](https://k90325248.github.io/shuo-ui/components/helper/tooltip#touch-long-press)); a long press that shows the tooltip does not select the item. `orientation`, `breakpoint`, `label-key`, `value-key` and `ui` can have site-wide defaults; see [Configurable props](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#configurable-props).

<component-example name="radio-group-orientation">



</component-example>

### Responsive columns

Use `orientation="grid"` and override the Tailwind column and breakpoint classes with `ui.fieldset`. It defaults to one column, and each row is at least as tall as an input of the same size; truncation tooltips and skeleton behavior are kept.

<component-example name="radio-group-grid">



</component-example>

The first group is set to one column by default, two from md and four from xl. `breakpoint` is only used for the horizontal / vertical switch of `orientation="auto"`; grid breakpoints are controlled by the classes. `class` sets the outer frame and `ui.fieldset` sets the item container. Use complete static classes so Tailwind can scan them.

### Custom item fields

When the back-end item fields are not `label` and `value` (for example `{ Code, Name }`), set them with `label-key` and `value-key` instead of converting the data first:

<component-example name="radio-group-keys">



</component-example>

- **The bound value must be a string**: the `v-model` type stays `string`. If the back-end codes are numbers, convert them to strings first, for example `items.map((item) => ({ ...item, Code: String(item.Code) }))`.
- **The original label and value fields are replaced**: the component turns each object item into "the original fields + `label` and `value` resolved by `labelKey` and `valueKey`". If the original data already has `label` and `value` fields, they are replaced by the resolved values.
- The `item` of `#item-append` is the converted object, with both the original fields (`item.Code`, `item.Name`) and `item.label`, `item.value`.
- In development mode, when the first object item lacks the field set by `labelKey` or `valueKey`, the console warns once (with the component and field names); production does not check. `ShuoSelectMenu` has the same check.

### Item descriptions

An item's `description` field (or the field set by `description-key`) shows below its label. Items without a description match the height of an input of the same size; items with one grow and wrap the description. In horizontal layout the whole row grows, the first lines of all items stay aligned, and the description does not squeeze the labels of other items.

<component-example name="radio-group-description">



</component-example>

### Color

Uses the `color` of `URadioGroup` to change the selected color.

<component-example name="radio-group-color">



</component-example>

### Size and states

In horizontal layout, the height matches an input of the same size; the example puts a `ShuoInputText` of the same size on the right for comparison. While loading, spinners replace the radio buttons and the group is disabled. See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common) for the behavior shared by all states.

<component-example name="radio-group-states">



</component-example>

## Examples

### Item append content

When an item needs an input right next to its label (for example "○ Fixed amount <span>

hundreds

</span>

"), use the `#item-append` slot. The example selects "Fixed amount" when its amount input is focused:

<component-example name="radio-group-append">



</component-example>

- Clicking the appended content (the input, the unit or empty space) does not change the selection; to select on focus, bind `@focus="select"`.
- `disabled` already covers a disabled item, a disabled component, loading and a disabled form.
- `labelId` is the id of the item label; set it as the appended input's `aria-labelledby`. The radio button itself is named only by the item label and does not include the input's value.
- The appended input is not part of the outer `UFormField`. To validate it, wrap it in its own `UFormField`, or show its error together through the outer `error-pattern`.

### With form validation

Use `requiredText` for a required group (empty is `''`). To validate an appended input, wrap it in its own `UFormField` and show its error through the outer `error-pattern`. The example only requires the amount when "Fixed amount" is selected; otherwise the amount input is disabled.

<component-example name="radio-group-validation">



</component-example>

### Showing fields by selection

The mailing address only appears when "Mail" is selected; the schema switches by delivery method with `v.variant`, and the address is required for mail.

<component-example name="radio-group-conditional">



</component-example>

## Props

<component-props name="ShuoRadioGroup">



</component-props>

See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common#shared-props) for the behavior of `size`, `disabled`, `loading`, `skeleton`, `id` and `name`.

Nuxt UI's `variant` (card, table), `indicator` and `highlight` are not supported, so that a frame does not make the items taller and break the height alignment with inputs; see [Built on Nuxt UI](https://k90325248.github.io/shuo-ui/components/overview/common#built-on-nuxt-ui) for why.

### Item fields

Items (`RadioGroupOption`) use Nuxt UI's item fields, with `value` limited to strings.

<table>
<thead>
  <tr>
    <th>
      Field
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
        label
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
       (required)
    </td>
    
    <td>
      Label; the field name can be set with <code>
        labelKey
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        value
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
       (required)
    </td>
    
    <td>
      Bound value; the field name can be set with <code>
        valueKey
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        disabled
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Disables this item; a selected disabled item stays selected, and arrow keys and Tab skip it
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        class
      </code>
      
      , <code>
        ui
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Class and style overrides for this item, with the same parts as Nuxt UI; each <code>
        ui
      </code>
      
       part only accepts a class string or a <code>
        (defaults) => string
      </code>
      
       function, not arrays or objects
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        description
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Item description, shown below the label and wrapped; the field name can be set with <code>
        descriptionKey
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Other fields
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Custom fields are kept as is and available on the <code>
        item
      </code>
      
       of <code>
        #item-append
      </code>
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
        legend
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Group title, as in Nuxt UI; use the <code>
        legend
      </code>
      
       prop when you only need text
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        item-append
      </code>
    </td>
    
    <td>
      <code>
        item
      </code>
      
      , <code>
        selected
      </code>
      
      , <code>
        disabled
      </code>
      
      , <code>
        labelId
      </code>
      
      , <code>
        select()
      </code>
    </td>
    
    <td>
      Content next to the item label; see <a href="#item-append-content">
        Item append content
      </a>
    </td>
  </tr>
</tbody>
</table>

## Styling

The built-in styles are written in `ui` and can be overridden directly (see [Per-component `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#per-component-ui-prop)):

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
      Outer frame
    </td>
    
    <td>
      <code>
        w-fit max-w-full min-w-0
      </code>
      
      ; <code>
        w-full max-w-full min-w-0
      </code>
      
       for <code>
        grid
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        fieldset
      </code>
    </td>
    
    <td>
      Item container
    </td>
    
    <td>
      <code>
        min-w-0 flex-nowrap justify-start
      </code>
      
      ; horizontal adds <code>
        items-center gap-x-2
      </code>
      
       with height matching inputs of the same size; <code>
        grid
      </code>
      
       adds <code>
        grid grid-cols-1
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        item
      </code>
    </td>
    
    <td>
      Single item
    </td>
    
    <td>
      <code>
        min-w-0 w-fit max-w-full text-start
      </code>
      
      ; horizontal adds <code>
        items-center
      </code>
      
       and can shrink; <code>
        grid
      </code>
      
       adds <code>
        items-center
      </code>
      
       with a minimum height matching inputs of the same size; <code>
        relative
      </code>
      
       while loading
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        base
      </code>
    </td>
    
    <td>
      Radio button
    </td>
    
    <td>
      <code>
        opacity-0
      </code>
      
       while loading
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        wrapper
      </code>
    </td>
    
    <td>
      Item label wrapper
    </td>
    
    <td>
      <code>
        w-auto min-w-0
      </code>
      
      ; <code>
        ms-1
      </code>
      
       in horizontal layout
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        label
      </code>
    </td>
    
    <td>
      Item label
    </td>
    
    <td>
      <code>
        w-fit max-w-full
      </code>
    </td>
  </tr>
</tbody>
</table>

For example, `:ui="{ fieldset: 'gap-x-8' }"` widens the gap between items in horizontal layout. The defaults passed to the function form include the built-in styles above; when replacing `fieldset` in `grid` mode, keep `grid`, for example `(defaults) => defaults.replace('grid-cols-1', 'grid-cols-3')`.

## Changelog

<component-changelog name="ShuoRadioGroup">



</component-changelog>

---

- [URadioGroup](https://ui.nuxt.com/docs/components/radio-group)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
