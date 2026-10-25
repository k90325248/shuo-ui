---
title: "Introduction"
description: "What Shuo UI is and where it fits."
canonical_url: "https://k90325248.github.io/shuo-ui/en/getting-started/overview/introduction"
---
# Introduction

> What Shuo UI is and where it fits.

Shuo UI is a set of form components built on [Nuxt UI](https://ui.nuxt.com) and shipped as a Nuxt module. It lets several projects share the same form components and behavior without giving up anything Nuxt UI already offers.

## Example

Below is a live `ShuoInputText`: type some text and the last 4 characters are masked. Click the eye button to toggle them.

<code-preview>
<shuo-input-text :mask="4" className="max-w-80" placeholder="Enter your ID number">



</shuo-input-text>

<template v-slot:code="">

```vue
<ShuoInputText v-model="value" :mask="4" placeholder="Enter your ID number" />
```

</template>
</code-preview>

## Features

- Traditional Chinese by default with English built in, following the Nuxt UI locale. Texts can be overridden per locale; see [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages)
- Styles use Nuxt UI semantic colors and CSS variables, so colors and themes come from your project
- Consistent size, disabled, loading (`loading`) and skeleton (`skeleton`) behavior
- Nuxt UI props, slots and refs that are not redeclared can be used directly, with full type inference
- Components and common [utilities](https://k90325248.github.io/shuo-ui/utils/form/validation) (validation rules, date and number display and more) are auto-imported


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
