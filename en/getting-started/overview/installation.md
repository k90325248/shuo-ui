---
title: "Installation"
description: "Install and enable Shuo UI in a Nuxt project."
canonical_url: "https://k90325248.github.io/shuo-ui/en/getting-started/overview/installation"
---
# Installation

> Install and enable Shuo UI in a Nuxt project.

## Requirements

<table>
<thead>
  <tr>
    <th>
      Package
    </th>
    
    <th>
      Version
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Nuxt
    </td>
    
    <td>
      <code>
        ^4.6.2
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        @nuxt/ui
      </code>
    </td>
    
    <td>
      <code>
        ^4.12.0
      </code>
    </td>
  </tr>
</tbody>
</table>

Runtime dependencies such as `date-fns`, `valibot` and `@vuepic/vue-datepicker` are installed along with the package.

## Steps

<steps level="3">

### Install the package

Pin a version with a tag, and change it to the new tag when upgrading. See [GitHub Releases](https://github.com/k90325248/shuo-ui/releases) for the changes in each version; every component page also ends with that component's changelog.

<code-group>

```bash [pnpm]
pnpm add github:k90325248/shuo-ui#v1.2.0
```

```bash [npm]
npm install github:k90325248/shuo-ui#v1.2.0
```

```bash [yarn]
yarn add github:k90325248/shuo-ui#v1.2.0
```

</code-group>

<tip>

We recommend also installing the lucide icon set (`pnpm add @iconify-json/lucide`): the built-in component icons (calendar, eye, download and so on) are then bundled into your site instead of being loaded from the network at runtime. Without it the components still work, and `@nuxt/icon` loads the icons at runtime.

</tip>

### Enable the module

`@nuxt/ui` must also be installed and listed in `modules`.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@shuo/ui']
});
```

### Load the styles

Import Tailwind, Nuxt UI and the component library's source scan in your CSS.

```css [app/assets/css/main.css]
@import 'tailwindcss';
@import '@nuxt/ui';
@import '@shuo/ui/css';
```

Then register this file with `css` in `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@shuo/ui'],
  css: ['~/assets/css/main.css']
});
```

<warning>

The last line, `@import '@shuo/ui/css'`, makes Tailwind scan the classes used inside the component library (Tailwind does not scan `node_modules` by default). Without it, some styles (such as the loading icon size and layout) do not apply.

</warning>
</steps>

## Writing validation rules with Valibot

If your own code uses `import * as v from 'valibot'` to write schemas, install `valibot` in your project as well. pnpm does not let a project import a package's dependencies directly.

```bash
pnpm add valibot
```

## Locale

Component texts are in Traditional Chinese by default and follow the Nuxt UI locale (`<UApp :locale>`), with English built in. For an English-only project, set `shuoUi: { locale: 'en' }` in `nuxt.config.ts`; see [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages) for other options.

## Versions and upgrades

Versions are released as git tags (`vMAJOR.MINOR.PATCH`). When upgrading, update the tag in the install command and test your app.


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
