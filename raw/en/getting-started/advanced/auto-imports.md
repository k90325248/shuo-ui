---
title: "Auto-imports and types"
description: "Auto-imported components and utilities, type aliases, and notes on using them with Nuxt UI."
canonical_url: "https://k90325248.github.io/shuo-ui/en/getting-started/advanced/auto-imports"
---
# Auto-imports and types

> Auto-imported components and utilities, type aliases, and notes on using them with Nuxt UI.

## Auto-imports

Components and the utilities below are auto-imported by the module, with no import needed. See the Utilities tab for parameters and examples:

<table>
<thead>
  <tr>
    <th>
      Function
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
        requiredText
      </code>
      
      , <code>
        requiredNumber
      </code>
      
      , <code>
        requiredArray
      </code>
      
      , <code>
        optionalEmail
      </code>
      
      , <code>
        optionalNonNegativeNumber
      </code>
    </td>
    
    <td>
      Valibot validation rules; see <a href="https://k90325248.github.io/shuo-ui/utils/form/validation">
        Validation
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        formatDateDisplay
      </code>
      
      , <code>
        parseDateValue
      </code>
    </td>
    
    <td>
      ROC year display and date parsing; see <a href="https://k90325248.github.io/shuo-ui/utils/format/date">
        Date
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        formatNumberDisplay
      </code>
    </td>
    
    <td>
      Thousands separators and decimal places; see <a href="https://k90325248.github.io/shuo-ui/utils/format/number">
        Number
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        splitPhone
      </code>
      
      , <code>
        joinPhone
      </code>
    </td>
    
    <td>
      Splitting and joining area codes; see <a href="https://k90325248.github.io/shuo-ui/utils/field/phone">
        Phone
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        splitMonths
      </code>
      
      , <code>
        combineMonths
      </code>
    </td>
    
    <td>
      Converting between total months and years/months; see <a href="https://k90325248.github.io/shuo-ui/utils/field/months">
        Months
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        resolveShuoDefault
      </code>
      
      , <code>
        getShuoComponentDefaults
      </code>
    </td>
    
    <td>
      Effective values and raw settings of the component defaults; see <a href="https://k90325248.github.io/shuo-ui/utils/settings/component-defaults">
        Component defaults
      </a>
    </td>
  </tr>
</tbody>
</table>

Utilities and composables used inside the components are not auto-imported and are not part of the public API; they may change between versions.

## Types

Types can be imported from the `#shuo-ui` alias:

```ts
import type { DatepickerValue } from '#shuo-ui/components/ShuoDatepicker.vue';
import type { PageRequest } from '#shuo-ui/types/pagination';
import type { ShuoComponentDefaults } from '#shuo-ui/types/component-defaults';
```

Component props types can also be imported from `#shuo-ui/types/components` (such as `InputTextProps` and `SelectMenuProps`); importing them from the `.vue` files still works.

## Notes on using Nuxt UI

- Your project CSS must include `@import '@shuo/ui/css';` (after `@import 'tailwindcss'`). Otherwise Tailwind does not scan the classes inside the component library and some styles are missing.
- Wrap form fields in `UFormField` with a `name`. The component then picks up the id, name, size, disabled and error state of `UFormField`, and triggers validation on input, blur and change. See [Size and UFormField](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#size-and-uformfield) for the size precedence.
- Icons use Iconify (`i-lucide-*`). Icons used by the component library, and icons set in `shuoUi.components`, are added to the `@nuxt/icon` client bundle by the module automatically. Other icons passed as props in your pages must be added to `icon.clientBundle.icons` yourself, or keep the runtime icon API. If your project disables the runtime icon API (`icon.provider: 'none'`), install `@iconify-json/lucide` so the icons can be bundled at build time.


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
