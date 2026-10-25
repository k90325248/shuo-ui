---
title: "Locales and messages"
description: "Component texts follow the Nuxt UI locale, and can be overridden per locale or extended with other locales."
canonical_url: "https://k90325248.github.io/shuo-ui/en/getting-started/theme/messages"
---
# Locales and messages

> Component texts follow the Nuxt UI locale, and can be overridden per locale or extended with other locales.

Component texts (validation messages, accessible names, tooltips, date picker texts and so on) follow the Nuxt UI locale. Traditional Chinese (`zh-TW`) and English (`en`) are built in.

## Switching locales

Set the Nuxt UI locale on `UApp`; Nuxt UI and Shuo UI components switch together with no extra setup:

```vue [app.vue]
<template>
  <UApp :locale="locales[locale]">
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
import { en, zh_tw } from '@nuxt/ui/locale';

const locales = { 'zh-TW': zh_tw, en };
const locale = ref<keyof typeof locales>('zh-TW');
</script>
```

- Components pick texts by the `code` of the Nuxt UI locale (such as `zh-TW` or `en`), and components already on screen update immediately when it changes.
- With `@nuxtjs/i18n`, pass the Nuxt UI locale that matches the current locale to `UApp`; see Nuxt UI's [I18n](https://ui.nuxt.com/docs/getting-started/integrations/i18n/nuxt).
- Error messages of validation rules (`requiredText` and others) are produced at validation time, so validating again after switching gives the new locale.
- The month and weekday names of the date picker calendar follow the locale; the ROC or Gregorian year is still decided by `roc`.

### When no locale is set

When `UApp` has no `locale`, components use the module option `shuoUi.locale`, `zh-TW` by default. For an English-only project:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  shuoUi: { locale: 'en' }
});
```

### Locales that are not built in

When the Nuxt UI locale code is neither `zh-TW` nor `en`, components use, in order:

1. The texts set for this code in `shuoUi.locales` (see [Adding other locales](#adding-other-locales) below).
2. The built-in locale of the same language, for example English for `en-GB` and Traditional Chinese for `zh-CN`.
3. English.

## Overriding messages

`messages` overrides texts of the default locale (`shuoUi.locale`); only list what you want to change:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  shuoUi: {
    messages: {
      file: { placeholder: 'Choose an attachment' },
      listCard: { title: 'Results' }
    }
  }
});
```

Multilingual projects use `locales` to override texts per locale code; it takes precedence over `messages`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  shuoUi: {
    locales: {
      // Traditional Chinese
      'zh-TW': { listCard: { title: '查詢清單' } },

      // English
      'en': {
        validation: { required: '{label} cannot be empty' },
        listCard: { title: 'Search results' }
      }
    }
  }
});
```

`{label}`, `{min}`, `{unit}`, `{total}`, `{start}`, `{end}`, `{year}` and `{month}` are placeholders that are replaced when used.

The `collapse` and `expand` texts of `queryCard` are put directly before the card title to form the aria-label of the collapse button, with no space added in between, so English texts end with a space (`'Collapse '` plus the title `Filters` gives `Collapse Filters`).

### Adding other locales

Add a locale code and its texts to `locales` to add a locale beyond the built-in ones. The code must match the `code` of the Nuxt UI locale. Untranslated items fall back to the built-in texts of the same language, or English:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  shuoUi: {
    locales: {
      ja: {
        queryCard: { title: '検索条件', submit: '検索' },
        listCard: { title: '検索結果' }
      }
    }
  }
});
```

<note>

An added locale does not change the language of the date picker calendar; month and weekday names use the built-in locale of the same language, or English.

</note>

## Overridable items

<table>
<thead>
  <tr>
    <th>
      Group
    </th>
    
    <th>
      Items
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        validation
      </code>
    </td>
    
    <td>
      <code>
        required
      </code>
      
      , <code>
        invalidNumber
      </code>
      
      , <code>
        invalidFormat
      </code>
      
      , <code>
        minValue
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkbox
      </code>
    </td>
    
    <td>
      <code>
        label
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        file
      </code>
    </td>
    
    <td>
      <code>
        placeholder
      </code>
      
      , <code>
        clear
      </code>
      
      , <code>
        download
      </code>
      
      , <code>
        select
      </code>
      
      , <code>
        downloadFailedTitle
      </code>
      
      , <code>
        downloadFailedDescription
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        inputNumber
      </code>
    </td>
    
    <td>
      <code>
        unit
      </code>
      
       (the text shown when <code>
        unit
      </code>
      
       is <code>
        true
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        inputText
      </code>
    </td>
    
    <td>
      <code>
        hide
      </code>
      
      , <code>
        show
      </code>
      
       (the mask toggle button)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        phone
      </code>
    </td>
    
    <td>
      <code>
        areaCode
      </code>
      
      , <code>
        number
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        months
      </code>
    </td>
    
    <td>
      <code>
        total
      </code>
      
      , <code>
        years
      </code>
      
      , <code>
        months
      </code>
      
       (accessible names), <code>
        yearUnit
      </code>
      
      , <code>
        monthUnit
      </code>
      
       (units after the inputs)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        selectMenu
      </code>
    </td>
    
    <td>
      <code>
        searchPlaceholder
      </code>
      
      , <code>
        empty
      </code>
      
       (text when there are no items)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        infoTooltip
      </code>
    </td>
    
    <td>
      <code>
        label
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        queryCard
      </code>
    </td>
    
    <td>
      <code>
        title
      </code>
      
      , <code>
        collapse
      </code>
      
      , <code>
        expand
      </code>
      
      , <code>
        submit
      </code>
      
       (name of the hidden submit button)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        table
      </code>
    </td>
    
    <td>
      <code>
        empty
      </code>
      
      , <code>
        loading
      </code>
      
       (the empty and loading texts of <code>
        ShuoTable
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        listCard
      </code>
    </td>
    
    <td>
      <code>
        title
      </code>
      
      , <code>
        summary
      </code>
      
       (row count summary, with <code>
        {total}
      </code>
      
      , <code>
        {start}
      </code>
      
      , <code>
        {end}
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        datepicker
      </code>
    </td>
    
    <td>
      <code>
        hours
      </code>
      
      , <code>
        minutes
      </code>
      
      , <code>
        seconds
      </code>
      
      , <code>
        menu
      </code>
      
      , <code>
        calendarIcon
      </code>
      
      , <code>
        clearInput
      </code>
      
      , <code>
        toggleOverlay
      </code>
      
      , <code>
        monthPicker
      </code>
      
      , <code>
        yearPicker
      </code>
      
      , <code>
        nextMonth
      </code>
      
      , <code>
        prevMonth
      </code>
      
      , <code>
        nextYear
      </code>
      
      , <code>
        prevYear
      </code>
      
      , <code>
        openMonthsOverlay
      </code>
      
      , <code>
        openYearsOverlay
      </code>
      
      , <code>
        openTimePicker
      </code>
      
      , <code>
        closeTimePicker
      </code>
      
      , <code>
        timePicker
      </code>
      
      , <code>
        openTpOverlay
      </code>
      
      , <code>
        timeOverlay
      </code>
      
      , <code>
        incrementValue
      </code>
      
      , <code>
        decrementValue
      </code>
      
      , <code>
        yearOption
      </code>
      
       (year list), <code>
        rangeSeparator
      </code>
      
       (range separator)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        date
      </code>
    </td>
    
    <td>
      <code>
        year
      </code>
      
      , <code>
        month
      </code>
      
       (display of the date picker's year and year-month modes, such as "10/2026")
    </td>
  </tr>
</tbody>
</table>

The built-in texts are in `node_modules/@shuo/ui/dist/runtime/locale/zh-tw.js` and `en.js`.

## Overriding a single component

A single component can also override texts with props, such as `<ShuoFile placeholder="..." />` or `<ShuoListCard title="..." empty="..." />`. These take precedence over the module settings and do not change with the locale.

<note>

`messages` and `locales` only hold texts. Put non-text site-wide settings, such as the select menu display format (`format`), sizes and page size, in [`components`](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults). Warnings shown in the console during development are always in Traditional Chinese.

</note>


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
