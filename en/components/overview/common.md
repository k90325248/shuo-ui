---
title: "Shared props"
description: "Props shared by the form input components, skeleton behavior and the empty-value contract."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/overview/common"
---
# Shared props

> Props shared by the form input components, skeleton behavior and the empty-value contract.

## Playground

Use the selects above to switch size and state, and every component below changes together. The disabled, loading and skeleton states map to `disabled`, `loading` and `skeleton`; to make comparison easy, only one is on at a time. The four props are passed to each component at once with `v-bind`; in your own code, write them as ordinary props, for example `<ShuoInputText v-model="name" size="md" :loading="pending" />`.

<component-example name="common-playground">



</component-example>

## Shared props

The form input components (`ShuoInputText`, `ShuoInputNumber`, `ShuoSelectMenu`, `ShuoDatepicker`, `ShuoCheckbox`, `ShuoCheckboxGroup`, `ShuoRadioGroup`, `ShuoTextarea`, `ShuoFile`, `ShuoMonths`, `ShuoPhone`) all support the props below, which are not repeated on each component page:

<field-group>
<field name="size" type="'xs' | 'sm' | 'md' | 'lg' | 'xl'" default="lg">

Component size; components of the same size have the same height. When not passed, it falls back to the `size` of `UFormField`, then the site-wide setting, and finally `lg`. See [Size and UFormField](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#size-and-uformfield).

</field>

<field name="disabled" type="boolean">

Disables the component. When not set, it follows the disabled state of `UForm`.

</field>

<field name="loading" type="boolean" default="false">

Shows a spinner and disables interaction.

</field>

<field name="skeleton" type="boolean" default="false">

Covers the component with a skeleton and pauses interaction while keeping the layout. The bound value is kept when switching back, and form validation is not affected.

</field>

<field name="id" type="string">

Input id; when not set, it follows `UFormField`. On `ShuoMonths` it points to the years input (the total months input in narrow containers), on `ShuoPhone` to the area code input; `ShuoFile` only follows `UFormField`.

</field>

<field name="name" type="string">

Field name; when not set, it follows `UFormField`.

</field>
</field-group>

Except for `ShuoDatepicker` (which uses `state` instead; see [Datepicker](https://k90325248.github.io/shuo-ui/components/date/datepicker)) and `ShuoFile`, components also support Nuxt UI's `color` (component color). Input-style components other than `ShuoDatepicker` and `ShuoFile` also support `highlight` (emphasized border); checkboxes and groups have no border and do not support `highlight`. The color and error border of `ShuoFile` follow `UFormField`.

### With UForm and UFormField

Wrap the component in `UFormField` with `name` matching the schema field. The component picks up the id, size, disabled and error state of `UFormField`, and triggers validation on input, blur and change:

```vue
<!-- Name -->
<UFormField label="Name" name="name" required>
  <ShuoInputText v-model="state.name" />
</UFormField>
```

None of the components below pass `size` or `disabled`: the size comes from `UFormField` and the disabled state from `UForm`. Press "Submit" first to see the error borders and messages of empty fields; fill everything in and submit again to see a notification with the submitted data.

<component-example name="common-form-field">



</component-example>

### Color and highlight

`color` changes the focus border and the selection color; `highlight` keeps the input border in that color without focus (not supported by checkboxes and groups). `ShuoDatepicker` has no `color`; it uses `state` for the validation result (`false` for error, `true` for success).

<component-example name="common-color">



</component-example>

## Built on Nuxt UI

Shuo components that wrap a Nuxt UI component inherit the props types of the underlying component, so Nuxt UI props that are not redeclared also get autocompletion and type checking. Event arguments are typed too. Slots are forwarded to the underlying component, and the same refs as the underlying component are exposed.

<table>
<thead>
  <tr>
    <th>
      Component
    </th>
    
    <th>
      Inherited props
    </th>
    
    <th>
      Available slots
    </th>
    
    <th>
      Exposed refs
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/text/input-text">
        <code>
          ShuoInputText
        </code>
      </a>
    </td>
    
    <td>
      <code>
        UInput
      </code>
    </td>
    
    <td>
      <code>
        leading
      </code>
      
      , <code>
        default
      </code>
      
      , <code>
        trailing
      </code>
    </td>
    
    <td>
      <code>
        inputRef
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/text/input-number">
        <code>
          ShuoInputNumber
        </code>
      </a>
    </td>
    
    <td>
      <code>
        UInput
      </code>
    </td>
    
    <td>
      <code>
        leading
      </code>
      
      , <code>
        default
      </code>
      
      , <code>
        trailing
      </code>
    </td>
    
    <td>
      <code>
        inputRef
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/text/textarea">
        <code>
          ShuoTextarea
        </code>
      </a>
    </td>
    
    <td>
      <code>
        UTextarea
      </code>
    </td>
    
    <td>
      <code>
        leading
      </code>
      
      , <code>
        default
      </code>
      
      , <code>
        trailing
      </code>
    </td>
    
    <td>
      <code>
        textareaRef
      </code>
      
      , <code>
        autoResize
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/phone-file/file">
        <code>
          ShuoFile
        </code>
      </a>
    </td>
    
    <td>
      <code>
        UInput
      </code>
    </td>
    
    <td>
      <code>
        leading
      </code>
      
      , <code>
        default
      </code>
    </td>
    
    <td>
      <code>
        inputRef
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/choice/select-menu">
        <code>
          ShuoSelectMenu
        </code>
      </a>
    </td>
    
    <td>
      <code>
        USelectMenu
      </code>
    </td>
    
    <td>
      All
    </td>
    
    <td>
      <code>
        triggerRef
      </code>
      
      , <code>
        viewportRef
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/choice/checkbox">
        <code>
          ShuoCheckbox
        </code>
      </a>
    </td>
    
    <td>
      <code>
        UCheckbox
      </code>
    </td>
    
    <td>
      <code>
        append
      </code>
      
       (component's own)
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/choice/radio-group">
        <code>
          ShuoRadioGroup
        </code>
      </a>
    </td>
    
    <td>
      <code>
        URadioGroup
      </code>
    </td>
    
    <td>
      <code>
        legend
      </code>
      
      , <code>
        item-append
      </code>
      
       (component's own)
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/choice/checkbox-group">
        <code>
          ShuoCheckboxGroup
        </code>
      </a>
    </td>
    
    <td>
      <code>
        UCheckboxGroup
      </code>
    </td>
    
    <td>
      <code>
        legend
      </code>
      
      , <code>
        item-append
      </code>
      
       (component's own)
    </td>
    
    <td>
      —
    </td>
  </tr>
</tbody>
</table>

- Inherited props are only used for type inference; at runtime they are passed to the underlying component through `$attrs`.
- Props the component handles itself are not inherited and do not show up in autocompletion, such as `modelValue`. Input-style components (`ShuoInputText`, `ShuoInputNumber`, `ShuoTextarea`, `ShuoFile`) show their own loading icon, always using Nuxt UI's `appConfig.ui.icons.loading`, so `loadingIcon` is excluded as well and has no effect. `ShuoSelectMenu` lets `USelectMenu` show the loading icon, so `loadingIcon` works as usual.
- Events are forwarded to the underlying component through `$attrs` as usual, with types taken from the underlying component's emits; for example, the argument of `@blur` is a `FocusEvent`.
- Checkboxes and groups do not support descriptions (`description`, `descriptionKey`): a description makes the options taller and breaks the height alignment with inputs.
- Checkboxes and groups also do not support Nuxt UI's `variant` (card, table), `indicator` or `highlight`: the border and padding of card and table make options taller; `indicator` moves the checkbox, while the loading spinner stays where the left checkbox is; `highlight` only changes the border color of card and table. Passing them is a type error and they are not applied at runtime.

### Slots

Input-style components can use `#leading` and `#trailing` to put icons or buttons before and after the input; `ShuoSelectMenu` can use every slot of `USelectMenu`. Checkboxes and groups have their own `#append` and `#item-append` for content next to the option label.

<component-example name="common-slots">



</component-example>

- The `#trailing` of `ShuoInputNumber` sits next to the unit and the loading icon without replacing them.
- See the component pages for the slot props, for example [Item append content](https://k90325248.github.io/shuo-ui/components/choice/radio-group#item-append-content).

### Exposed refs

After getting the component with a template ref, use the refs in the table to work with the underlying native elements, for example to focus, select all or open the menu.

<component-example name="common-expose">



</component-example>

## Skeleton

The skeleton keeps the layout space of the original control, following `size`, width, textarea rows and the option group layout, with no fixed height of its own. While it is on, the component cannot be clicked or used with the keyboard, and tooltips and open menus close.

A common use is an edit page loading data from the back end, with one loading state controlling the skeleton of every field. Press "Reload data" to try it: the layout stays the same during the skeleton, and the data fills in when it arrives.

<component-example name="common-skeleton">



</component-example>

Compared with `loading`: `loading` keeps the current value and shows a spinner inside the field, suited to a field doing its own work (such as fetching select options); `skeleton` covers the whole field, suited to when the page data has not arrived yet and the current value means nothing.

## Locales

Component texts (placeholders, accessible names, validation messages, date picker texts and so on) follow the Nuxt UI locale (`<UApp :locale>`), with Traditional Chinese and English built in; components already on screen update immediately when it changes. The default texts mentioned on these pages are the English ones. Text props passed explicitly (such as `title` or `placeholder`) are not affected by the locale. See [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages) for setup and overrides.

"Component language" in the palette menu at the top right of the docs site switches the language of the component examples on the page; by default it follows the docs language.

## Empty values

When the parent binds `null` / `undefined`, the components below write back the agreed empty value; unexpected values such as wrong types are also cleared to the agreed empty value. This applies both on mount and when the parent fills values in later. When clearing an unexpected value, `ShuoInputText`, `ShuoTextarea`, `ShuoInputNumber`, `ShuoRadioGroup`, `ShuoPhone` and `ShuoDatepicker` log a `console.warn` (`[ShuoComponentName] … cleared`); `ShuoSelectMenu` and `ShuoMonths` only clear, without a warning.

<table>
<thead>
  <tr>
    <th>
      Component
    </th>
    
    <th>
      Empty value
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ShuoInputText
      </code>
      
      , <code>
        ShuoTextarea
      </code>
      
      , <code>
        ShuoRadioGroup
      </code>
      
      , <code>
        ShuoPhone
      </code>
    </td>
    
    <td>
      <code>
        ''
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoSelectMenu
      </code>
    </td>
    
    <td>
      <code>
        emptyValue
      </code>
      
       (default <code>
        ''
      </code>
      
      ); <code>
        []
      </code>
      
       when multiple
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoInputNumber
      </code>
      
      , <code>
        ShuoMonths
      </code>
    </td>
    
    <td>
      <code>
        null
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoDatepicker
      </code>
    </td>
    
    <td>
      <code>
        ''
      </code>
      
       for a single date, <code>
        []
      </code>
      
       for a range
    </td>
  </tr>
</tbody>
</table>

Press "Apply null from the back end" to simulate the back end returning `null` for every field: the bound values below change to each component's agreed empty value. `ShuoCheckboxGroup` does not write back and stays `null`.

<component-example name="common-empty-value">



</component-example>

These components do not write back the parent's value:

- `ShuoCheckboxGroup`: `null` or a non-array value shows everything unchecked; checking an option writes back the full array. Clearing gives `[]`.
- `ShuoCheckbox`: shows unchecked when the bound value is not `trueValue`.
- `ShuoFile`: `null` after clearing.


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
