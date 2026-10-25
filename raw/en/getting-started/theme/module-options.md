---
title: "Module options"
description: "Configure the component library with shuoUi in nuxt.config.ts."
canonical_url: "https://k90325248.github.io/shuo-ui/en/getting-started/theme/module-options"
---
# Module options

> Configure the component library with shuoUi in nuxt.config.ts.

## Usage

Configure it with `shuoUi` in `nuxt.config.ts`. These are the defaults:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@shuo/ui'],
  shuoUi: {
    prefix: 'Shuo',
    theme: true,
    css: true,
    locale: 'zh-TW',
    messages: {},
    locales: {},
    components: {}
  }
});
```

## Options

<field-group>
<field default="Shuo" name="prefix" type="string">

Component name prefix. Change it to `My` to use `<MyInputText>`.

</field>

<field default="true" name="theme" type="boolean">

Whether to apply the built-in Nuxt UI theme; see [Theming](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#built-in-theme). `false` leaves it entirely to your project.

</field>

<field default="true" name="css" type="boolean">

Whether to load the default CSS variables (`--ui-form-*`); see [Form color tokens](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#form-color-tokens). `false` means your project defines them.

</field>

<field default="zh-TW" name="locale" type="string">

Default locale, used when the page sets no Nuxt UI locale (`<UApp :locale>`). `zh-TW` and `en` are built in; see [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages).

</field>

<field default="{}" name="messages" type="object">

Overrides texts of the default locale; only list what you want to change. See [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages#overriding-messages).

</field>

<field default="{}" name="locales" type="object">

Overrides texts per locale code, and can add locales beyond the built-in ones. See [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages#overriding-messages).

</field>

<field default="{}" name="components" type="object">

Global component defaults, grouped by component. See [Component defaults](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults).

</field>
</field-group>


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
