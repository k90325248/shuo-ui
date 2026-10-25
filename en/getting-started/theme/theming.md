---
title: "Theming"
description: "Colors, form color tokens, the built-in theme, and how the per-component ui prop is merged."
canonical_url: "https://k90325248.github.io/shuo-ui/en/getting-started/theme/theming"
---
# Theming

> Colors, form color tokens, the built-in theme, and how the per-component ui prop is merged.

## Colors come from your project

Components only use Nuxt UI semantic colors (`primary`, `neutral`, `error` and so on) and CSS variables, never hard-coded colors. Set your theme colors in your project's `app.config.ts`:

```ts [app.config.ts]
export default defineAppConfig({
  ui: { colors: { primary: 'blue', neutral: 'slate' } }
});
```

### Preview themes on the docs site

The palette button at the top right of the header switches the theme live. The whole site and every component example on the page follow it, just like the theme menu in the Nuxt UI docs:

- **Presets**: apply primary color, neutral color, font, icons and radius at once, then adjust each one. Items that differ from the preset are highlighted in the primary color.
- **Primary, Neutral, Font, Icons, Radius**: the same settings as Nuxt UI.
- **Component size, Date**: Shuo UI's global component defaults. They switch the `size` of every input component and the ROC / Gregorian year of the date picker at once. When you switch the icon set, the components' own icons (calendar, clear, download and so on) switch to the same set.
- **Component language**: the language of the component examples (Traditional Chinese or English). By default it follows the docs language; see [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages).
- **Color mode**: light, dark or system.
- **Export settings**: generates the `app.config.ts`, CSS and `nuxt.config.ts` for the current settings, listing only what differs from the defaults, ready to copy into your project.

Settings are stored only in your current browser and do not affect anyone else. Props passed explicitly in an example (such as a specific `calendar-icon` or `:roc="false"`) take precedence over these settings.

## Form color tokens

The colors of input borders and the disabled state come from the CSS variables below, with one set for light mode and one for dark mode. Disabled colors use the Nuxt UI neutral color, so their tone follows `ui.colors.neutral` in `app.config.ts`; borders use the primary color, with a lighter shade in dark mode:

```css
:root {
  --ui-form-border: var(--ui-color-primary-700); /* Input border */
  --ui-form-disabled-text: var(--ui-color-neutral-600); /* Disabled text */
  --ui-form-disabled-border: var(--ui-color-neutral-400); /* Disabled border */
  --ui-form-disabled-bg: var(--ui-color-neutral-100); /* Disabled background */
}

.dark {
  --ui-form-border: var(--ui-color-primary-400);
  --ui-form-disabled-text: var(--ui-color-neutral-400);
  --ui-form-disabled-border: var(--ui-color-neutral-600);
  --ui-form-disabled-bg: var(--ui-color-neutral-800);
}
```

To change them site-wide, redefine them in your project's CSS. The defaults loaded by the module have the lowest specificity, so no `!important` is needed. Writing only `:root` applies the same value in light and dark mode; to use different colors per mode, add `.dark` after `:root`:

```css [app/assets/css/main.css]
:root {
  --ui-form-disabled-bg: var(--ui-color-neutral-50);
}

.dark {
  --ui-form-disabled-bg: var(--ui-color-neutral-900);
}
```

## Built-in theme

With `theme: true`, the module adds the Nuxt UI theme below to `appConfig.ui` as **defaults** using `defu`; the `ui` settings in your project's `app.config.ts` take precedence.

<table>
<thead>
  <tr>
    <th>
      Component
    </th>
    
    <th>
      Contents
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        input
      </code>
      
      , <code>
        textarea
      </code>
      
      , <code>
        select
      </code>
      
      , <code>
        selectMenu
      </code>
    </td>
    
    <td>
      Borders use <code>
        --ui-form-border
      </code>
      
      ; the disabled state uses the disabled tokens
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkbox
      </code>
      
      , <code>
        radioGroup
      </code>
    </td>
    
    <td>
      Keep the checked state when disabled; labels can wrap
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        formField
      </code>
    </td>
    
    <td>
      Default size <code>
        lg
      </code>
      
      , single-line truncated label, error message inset in the bottom border
    </td>
  </tr>
</tbody>
</table>

To change one of them, override it in `app.config.ts`:

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    formField: {
      slots: { error: 'text-xs text-error' } // Use a regular error message style
    }
  }
});
```

<tip>

To skip the built-in theme entirely, set `shuoUi: { theme: false }` and configure `ui.input`, `ui.formField` and the rest yourself.

</tip>

## Per-component `ui` prop

A component's `ui` works like Nuxt UI's `ui` slots and only affects that component. To change every Nuxt UI component on the site, use `app.config.ts` as described in the previous section.

### Merge rules

- The component's built-in styles come first and the `ui` you pass comes after; they are merged with tailwind-merge, and your value wins when a slot conflicts. For example, `ShuoInputNumber` has a built-in `base: 'text-right'`; passing `{ base: 'text-center' }` centers the text while keeping the other built-in styles.
- When you pass a function `(defaults) => string`, `defaults` already contains the built-in styles and the return value is the final style, so you can replace them completely:

```vue
<ShuoInputNumber
  :ui="{
    base: (defaults) => defaults.replace('text-right', 'text-left')
  }"
/>
```

### Where `class` goes

The `class` you pass goes on the component's outer element, merged after `ui.root`, so it can override the built-in width (for example `class="w-14"`). The exceptions are:

<table>
<thead>
  <tr>
    <th>
      Component
    </th>
    
    <th>
      <code>
        class
      </code>
      
       goes on
    </th>
    
    <th>
      Use for the outer width
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ShuoSelectMenu
      </code>
      
      , <code>
        ShuoFile
      </code>
    </td>
    
    <td>
      The input
    </td>
    
    <td>
      <code>
        ui.wrapper
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoInfoTooltip
      </code>
    </td>
    
    <td>
      The trigger button
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoListCard
      </code>
    </td>
    
    <td>
      The card frame (<code>
        ui
      </code>
      
       has no <code>
        root
      </code>
      
      )
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoDatepicker
      </code>
      
      , <code>
        ShuoTable
      </code>
    </td>
    
    <td>
      The outer container (no <code>
        ui
      </code>
      
      ; set it with <code>
        class
      </code>
      
      )
    </td>
    
    <td>
      —
    </td>
  </tr>
</tbody>
</table>

### Supported components

<table>
<thead>
  <tr>
    <th>
      Component
    </th>
    
    <th>
      <code>
        ui
      </code>
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
        ShuoInputNumber
      </code>
      
      , <code>
        ShuoTextarea
      </code>
      
      , <code>
        ShuoSelectMenu
      </code>
      
      , <code>
        ShuoCheckbox
      </code>
      
      , <code>
        ShuoCheckboxGroup
      </code>
      
      , <code>
        ShuoRadioGroup
      </code>
      
      , <code>
        ShuoFile
      </code>
      
      , <code>
        ShuoMonths
      </code>
      
      , <code>
        ShuoPhone
      </code>
      
      , <code>
        ShuoInfoTooltip
      </code>
      
      , <code>
        ShuoQueryCard
      </code>
      
      , <code>
        ShuoListCard
      </code>
      
       (title bar)
    </td>
    
    <td>
      Merged by the rules above; see each component page for its slots
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoDatepicker
      </code>
      
      , <code>
        ShuoTable
      </code>
      
       (use <code>
        tableProps.ui
      </code>
      
       for table styles)
    </td>
    
    <td>
      Not available yet
    </td>
  </tr>
</tbody>
</table>


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
