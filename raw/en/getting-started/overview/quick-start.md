---
title: "Quick start"
description: "Build your first form with UForm and Valibot, and meet every component."
canonical_url: "https://k90325248.github.io/shuo-ui/en/getting-started/overview/quick-start"
---
# Quick start

> Build your first form with UForm and Valibot, and meet every component.

## Your first form

Components start with `Shuo` and need no import. Use them with Nuxt UI's `UForm` and Valibot validation:

```vue
<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <!-- Name -->
    <UFormField label="Name" name="name">
      <ShuoInputText v-model="state.name" />
    </UFormField>

    <!-- Amount -->
    <UFormField label="Amount" name="amount">
      <ShuoInputNumber v-model="state.amount" unit />
    </UFormField>

    <!-- Application date -->
    <UFormField label="Application date" name="date">
      <ShuoDatepicker v-model="state.date" clearable />
    </UFormField>

    <UButton type="submit" label="Submit" />
  </UForm>
</template>

<script setup lang="ts">
import * as v from 'valibot';

// requiredText and requiredNumber are auto-imported by the module
const schema = v.object({
  name: requiredText('Name'),
  amount: requiredNumber('Amount'),
  date: requiredText('Application date')
});

const state = reactive({
  name: '',
  amount: null as number | null,
  date: ''
});

const onSubmit = (event: { data: v.InferOutput<typeof schema> }) => {
  console.log(event.data);
};
</script>
```

<tip>

The `name` of `UFormField` must match the field name in the schema and state; the component then picks up the field's id, size, disabled and error state. See [Validation](https://k90325248.github.io/shuo-ui/getting-started/form/validation) for the rules.

</tip>

## Components at a glance

<table>
<thead>
  <tr>
    <th>
      Component
    </th>
    
    <th>
      Purpose
    </th>
    
    <th>
      v-model type
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
      Single-line text, maskable
    </td>
    
    <td>
      <code>
        string
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
      Numbers with thousands separators, decimals and units
    </td>
    
    <td>
      <code>
        number | null
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
      Multi-line text
    </td>
    
    <td>
      <code>
        string
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
      Select menu, searchable, multiple
    </td>
    
    <td>
      <code>
        string
      </code>
      
      ; <code>
        string[]
      </code>
      
       when multiple
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/date/datepicker">
        <code>
          ShuoDatepicker
        </code>
      </a>
    </td>
    
    <td>
      Date, year-month, date-time, ranges
    </td>
    
    <td>
      <code>
        string
      </code>
      
      ; <code>
        [string, string] | []
      </code>
      
       for ranges (plus <code>
        start
      </code>
      
      , <code>
        end
      </code>
      
      )
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
      Single checkbox
    </td>
    
    <td>
      <code>
        string | number | boolean
      </code>
      
       (default <code>
        1
      </code>
      
       / <code>
        0
      </code>
      
      )
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
      Radio group
    </td>
    
    <td>
      <code>
        string
      </code>
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
      Checkbox group
    </td>
    
    <td>
      <code>
        string[]
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
      Single file selection and existing attachment download
    </td>
    
    <td>
      <code>
        File | null
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/date/months">
        <code>
          ShuoMonths
        </code>
      </a>
    </td>
    
    <td>
      Years and months input converted to months
    </td>
    
    <td>
      Total months <code>
        number | null
      </code>
      
       (plus <code>
        year
      </code>
      
      , <code>
        month
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/phone-file/phone">
        <code>
          ShuoPhone
        </code>
      </a>
    </td>
    
    <td>
      Area code plus phone number
    </td>
    
    <td>
      <code>
        string
      </code>
      
       (plus <code>
        areaCode
      </code>
      
      , <code>
        number
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/layout/query-card">
        <code>
          ShuoQueryCard
        </code>
      </a>
    </td>
    
    <td>
      Collapsible query form card
    </td>
    
    <td>
      <code>
        open
      </code>
      
       (<code>
        boolean
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/layout/list-card">
        <code>
          ShuoListCard
        </code>
      </a>
    </td>
    
    <td>
      Result list card (title, table and server-side pagination)
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/layout/table">
        <code>
          ShuoTable
        </code>
      </a>
    </td>
    
    <td>
      Plain table (no card or pagination) with skeleton and height transition
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/helper/info-tooltip">
        <code>
          ShuoInfoTooltip
        </code>
      </a>
    </td>
    
    <td>
      Info icon with a tooltip
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/shuo-ui/components/helper/tooltip">
        <code>
          ShuoTooltip
        </code>
      </a>
    </td>
    
    <td>
      Tooltip (UTooltip plus long press on touch devices)
    </td>
    
    <td>
      —
    </td>
  </tr>
</tbody>
</table>


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
