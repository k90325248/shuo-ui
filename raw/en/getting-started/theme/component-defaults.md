---
title: "Component defaults"
description: "Set size, display format, icons and other props site-wide with shuoUi.components."
canonical_url: "https://k90325248.github.io/shuo-ui/en/getting-started/theme/component-defaults"
---
# Component defaults

> Set size, display format, icons and other props site-wide with shuoUi.components.

Use `components` to set site-wide defaults per component, for example showing "value_label" in every select menu, or 20 rows per page in every list. The order of precedence is always:

```text
Prop passed explicitly on the component  >  Site-wide default (components.<component>)  >  Built-in default
```

`size` has one more layer, `UFormField`; see [Size and UFormField](#size-and-uformfield).

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@shuo/ui'],
  shuoUi: {
    components: {
      // selectMenu: select menu
      selectMenu: {
        format: '{value}_{label}',
        size: 'md',
        emptyValue: null,
        labelKey: 'Name',
        valueKey: 'Code'
      },

      // checkboxGroup: checkbox group
      checkboxGroup: {
        labelKey: 'Name',
        valueKey: 'Code'
      },

      // radioGroup: radio group
      radioGroup: {
        orientation: 'horizontal',
        breakpoint: 'lg',
        labelKey: 'Name',
        valueKey: 'Code'
      },

      // checkbox: checkbox
      checkbox: {
        trueValue: 'Y',
        falseValue: 'N'
      },

      // datepicker: date picker
      datepicker: {
        clearable: true,
        separator: '-'
      },

      // inputNumber: number input
      inputNumber: {
        unit: true, // The unit text comes from messages.inputNumber.unit
        thousandSeparator: true
      },

      // queryCard: query card
      queryCard: {
        ui: {
          // Query field columns: xl must be written explicitly
          // to override the built-in xl:grid-cols-4 (see below)
          grid: 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'
        }
      },

      // listCard: list card
      listCard: {
        pageSize: 20,
        ui: {
          title: 'text-lg' // Title bar ui parts are the same as queryCard
        }
      }
    }
  }
});
```

## Configurable props

The component key is the component name without `Shuo`, in camelCase, the same as in `messages`. It **does not change with prefix** (with `prefix: 'My'` you still write `components.selectMenu`).

Only the props in the table below can be set site-wide. State props such as `disabled`, `loading` and `skeleton`, and props tied to a single field (`id`, `name`, `items`, `mask`, `decimal`, `multiple` and so on) cannot.

<table>
<thead>
  <tr>
    <th>
      Key
    </th>
    
    <th>
      Configurable props (built-in default)
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        inputText
      </code>
    </td>
    
    <td>
      <code>
        size
      </code>
      
       (<code>
        lg
      </code>
      
      ), <code>
        hideMaskToggle
      </code>
      
       (<code>
        false
      </code>
      
      ), <code>
        revealIcon
      </code>
      
       (<code>
        i-lucide-eye
      </code>
      
      ), <code>
        concealIcon
      </code>
      
       (<code>
        i-lucide-eye-off
      </code>
      
      )
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
        size
      </code>
      
       (<code>
        lg
      </code>
      
      ), <code>
        unit
      </code>
      
       (<code>
        false
      </code>
      
      ; only boolean site-wide), <code>
        thousandSeparator
      </code>
      
       (<code>
        true
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        textarea
      </code>
    </td>
    
    <td>
      <code>
        size
      </code>
      
       (<code>
        lg
      </code>
      
      ), <code>
        autoresize
      </code>
      
      , <code>
        rows
      </code>
      
      , <code>
        maxrows
      </code>
      
      , <code>
        fixed
      </code>
      
       (Nuxt UI's when not set)
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
        size
      </code>
      
       (<code>
        lg
      </code>
      
      ), <code>
        clearIcon
      </code>
      
       (<code>
        i-lucide-x
      </code>
      
      ), <code>
        downloadIcon
      </code>
      
       (<code>
        i-lucide-download
      </code>
      
      ), <code>
        selectIcon
      </code>
      
       (<code>
        i-lucide-paperclip
      </code>
      
      )
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
        size
      </code>
      
       (<code>
        lg
      </code>
      
      )
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
        size
      </code>
      
       (<code>
        lg
      </code>
      
      )
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
        size
      </code>
      
       (<code>
        lg
      </code>
      
      ), <code>
        format
      </code>
      
       (<code>
        {label}
      </code>
      
      ), <code>
        emptyValue
      </code>
      
       (<code>
        ''
      </code>
      
      ), <code>
        labelKey
      </code>
      
       (<code>
        label
      </code>
      
      ), <code>
        valueKey
      </code>
      
       (<code>
        value
      </code>
      
      )
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
        size
      </code>
      
       (<code>
        lg
      </code>
      
      ), <code>
        trueValue
      </code>
      
       (<code>
        1
      </code>
      
      ), <code>
        falseValue
      </code>
      
       (<code>
        0
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        radioGroup
      </code>
    </td>
    
    <td>
      <code>
        size
      </code>
      
       (<code>
        lg
      </code>
      
      ), <code>
        orientation
      </code>
      
       (<code>
        auto
      </code>
      
      ), <code>
        breakpoint
      </code>
      
       (<code>
        md
      </code>
      
      ), <code>
        ui
      </code>
      
      , <code>
        labelKey
      </code>
      
       (<code>
        label
      </code>
      
      ), <code>
        valueKey
      </code>
      
       (<code>
        value
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkboxGroup
      </code>
    </td>
    
    <td>
      Same as <code>
        radioGroup
      </code>
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
        size
      </code>
      
       (<code>
        lg
      </code>
      
      ), <code>
        clearable
      </code>
      
       (<code>
        false
      </code>
      
      ), <code>
        calendarIcon
      </code>
      
       (<code>
        i-lucide-calendar
      </code>
      
      ), <code>
        clearIcon
      </code>
      
       (<code>
        i-lucide-x
      </code>
      
      ), <code>
        roc
      </code>
      
       (<code>
        true
      </code>
      
      ), <code>
        separator
      </code>
      
       (<code>
        /
      </code>
      
      ), <code>
        yearRange
      </code>
      
       (<code>
        [1900, 2100]
      </code>
      
      )
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
        icon
      </code>
      
       (<code>
        i-lucide-search
      </code>
      
      ), <code>
        expandIcon
      </code>
      
       (<code>
        i-lucide-chevron-down
      </code>
      
      ), <code>
        collapseIcon
      </code>
      
       (<code>
        i-lucide-chevron-up
      </code>
      
      ), <code>
        validateOn
      </code>
      
       (<code>
        UForm
      </code>
      
      's default), <code>
        ui
      </code>
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
        icon
      </code>
      
       (<code>
        i-lucide-list
      </code>
      
      ), <code>
        pageSize
      </code>
      
       (<code>
        10
      </code>
      
      ), <code>
        showPagination
      </code>
      
       (<code>
        true
      </code>
      
      ), <code>
        showSummary
      </code>
      
       (<code>
        true
      </code>
      
      ), <code>
        transition
      </code>
      
       (<code>
        true
      </code>
      
      ), <code>
        ui
      </code>
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
        icon
      </code>
      
       (<code>
        i-lucide-circle-alert
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tooltip
      </code>
    </td>
    
    <td>
      <code>
        touch
      </code>
      
       (<code>
        true
      </code>
      
      ); also applies to the components in the library that use tooltips (<code>
        ShuoInfoTooltip
      </code>
      
       and the truncated-text tooltips of each component)
    </td>
  </tr>
</tbody>
</table>

Components or props outside this list cause a type error in `nuxt.config.ts`. Values that skip type checking (such as environment variables) are ignored at runtime with a console warning.

## Rules

- **"Passed explicitly" means the prop is written, whatever its value**: `<ShuoDatepicker :clearable="false" />`, `<ShuoSelectMenu :empty-value="null" />` and `format=""` all count as explicit and are not replaced by the site-wide value. `v-bind="{ clearable: undefined }"` counts as not written and uses the site-wide value.
- **ui is merged per slot**: with a site-wide `radioGroup.ui.fieldset` and a page passing `:ui="{ item: '...' }"`, both apply. If the page also passes `fieldset`, the page value replaces the site-wide one (classes are not concatenated). The result is then merged with the component's built-in styles using tailwind-merge, as in [Per-component `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#per-component-ui-prop). The title bar parts of `queryCard.ui` and `listCard.ui` (`bar`, `icon`, `title`, `headerRight`) share the same built-in styles; to make both cards' titles match, set the same values on both.
- **Other values are replaced as a whole**: arrays (such as `yearRange`) are not concatenated with the built-in value.
- `inputNumber.unit` site-wide only decides whether a unit is shown by default and only accepts `true` / `false`; the unit text comes from `messages.inputNumber.unit`. A single field can still pass `unit="pcs"` or `:unit="false"`.
- After setting `labelKey` / `valueKey` site-wide to `{ Code, Name }`, if a page's items are still `{ label, value }`, pass `label-key="label" value-key="value"` on that component. Radio and checkbox groups still bind string values, so convert numeric codes from the back end to strings first. In development mode, when items are missing a field, the console warning says whether the field name was passed explicitly or came from the site-wide setting (for example `(source: valueKey from the site-wide setting components.selectMenu.valueKey)`).

<warning>

The settings reach the browser through `runtimeConfig.public`, so they must be JSON-serializable: **no functions** (for example, the `(defaults) => string` form of `ui` only works on a single component), and no secrets. They can be overridden at runtime with `NUXT_PUBLIC_SHUO_UI_COMPONENTS_*` environment variables, as with any Nuxt runtimeConfig.

</warning>

## Size and UFormField

The size of every input component is decided in this order:

```text
size passed explicitly on the component
  >  size written on UFormField
  >  components.<component>.size
  >  formField theme default
  >  lg
```

<table>
<thead>
  <tr>
    <th>
      Setup
    </th>
    
    <th>
      Result
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Nothing set
    </td>
    
    <td>
      <code>
        lg
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        <UFormField size="sm">
      </code>
      
       around <code>
        <ShuoInputText />
      </code>
    </td>
    
    <td>
      <code>
        sm
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        <UFormField size="sm">
      </code>
      
       around <code>
        <ShuoInputText size="xl" />
      </code>
    </td>
    
    <td>
      <code>
        xl
      </code>
      
       (the component's own value wins)
    </td>
  </tr>
  
  <tr>
    <td>
      Site-wide <code>
        inputText.size: 'md'
      </code>
      
      , no <code>
        size
      </code>
      
       on <code>
        UFormField
      </code>
    </td>
    
    <td>
      <code>
        md
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Site-wide <code>
        inputText.size: 'md'
      </code>
      
      , <code>
        <UFormField size="sm">
      </code>
    </td>
    
    <td>
      <code>
        sm
      </code>
      
       (a single field is closer than the site-wide setting)
    </td>
  </tr>
</tbody>
</table>

"formField theme default" means `ui.formField.defaultVariants.size` in `app.config.ts` (`lg` in the built-in theme). It comes after the site-wide setting, so a `UFormField` without `size` does not override `components.<component>.size`; without a site-wide setting, the component uses it.

### Resizing every input component at once

This module has no cross-component `components.size`; `size` can only be set per component (`components.inputText.size`, `components.selectMenu.size` and so on). To resize every input component in your forms together, change the Nuxt UI `formField` theme default:

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    formField: { defaultVariants: { size: 'md' } }
  }
});
```

Every Shuo input component inside a `UFormField` becomes `md` when neither the component nor the `UFormField` sets `size` and there is no `components.<component>.size`. The `UFormField` label and description resize too. Limitations:

- Components outside a `UFormField` are not affected and stay at `components.<component>.size` or the built-in `lg`.
- Each component's `components.<component>.size` wins over this theme default. For example, with `components.selectMenu.size: 'lg'` also set, select menus stay `lg` and the other input components become `md`.
- A `size` written explicitly on the component or `UFormField` still wins.

## Query field columns

The built-in columns of `ShuoQueryCard` are `grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-4`. The site-wide `queryCard.ui.grid` is merged with them using tailwind-merge.

<warning>

tailwind-merge does not treat different breakpoints as conflicts: if you only write `md:grid-cols-3`, the built-in `xl:grid-cols-4` is kept and the layout goes back to 4 columns at xl width. So write out every breakpoint you use.

</warning>

```ts [nuxt.config.ts]
shuoUi: {
  components: {
    queryCard: {
      // 1 column on phones, 2 at sm, 3 at md and xl, 4 at 2xl
      ui: {
        grid: 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'
      }
    }
  }
}
```

Site-wide settings cannot contain functions, so you cannot fully replace the built-in columns there; when needed, pass `:ui="{ grid: () => '...' }"` on a single component.

**Tailwind scanning**: classes written in `nuxt.config.ts` must be inside Tailwind's scan range. Tailwind v4 scans the project root by default (excluding files in `.gitignore`), which usually includes `nuxt.config.ts`. If the classes do not apply, add an `@source` pointing at the config file in your project CSS:

```css [app/assets/css/main.css]
@import 'tailwindcss';
@import '@nuxt/ui';
@import '@shuo/ui/css';
@source '../../../nuxt.config.ts'; /* Path relative to this CSS file */
```

## Reading the effective value in a page

`resolveShuoDefault(component, prop)` returns the effective value, "site-wide setting ?? built-in default", for example so that the page size sent to the back end matches the list:

```ts
import type { PageRequest } from '#shuo-ui/types/pagination';

// The back end paginates by this value; if the page passes :page-size, use that value instead.
const pageSize = resolveShuoDefault('listCard', 'pageSize');
const request = reactive<PageRequest>({ PageNumber: 1, PageSize: pageSize });
```

`getShuoComponentDefaults()` returns your raw settings (without built-in defaults). See [Component defaults](https://k90325248.github.io/shuo-ui/utils/settings/component-defaults) under Utilities for the parameters of both functions.


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
