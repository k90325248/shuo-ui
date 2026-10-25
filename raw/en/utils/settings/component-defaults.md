---
title: "ComponentDefaults"
description: "Read the effective values and raw settings of the component defaults in a page."
canonical_url: "https://k90325248.github.io/shuo-ui/en/utils/settings/component-defaults"
---
# ComponentDefaults

> Read the effective values and raw settings of the component defaults in a page.

## Usage

Site-wide component defaults are set in `shuoUi.components` in `nuxt.config.ts`; see [Component defaults](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults). When a page needs the same value the component uses (for example, the page size sent to the back end must match the list), get it with `resolveShuoDefault`:

```ts
import type { PageRequest } from '#shuo-ui/types/pagination';

// The back end paginates by this value; if the page passes :page-size, use that value instead.
const pageSize = resolveShuoDefault('listCard', 'pageSize');
const request = reactive<PageRequest>({ PageNumber: 1, PageSize: pageSize });
```

The functions are auto-imported by the module.

## API

### resolveShuoDefault

```ts
resolveShuoDefault(name: ShuoComponentName, key: string)
```

Returns the effective default of a component prop: the setting when there is a site-wide one, otherwise the component's built-in default. Items whose built-in default is `undefined` (such as `textarea.rows`) return `undefined` when not set. The return type is inferred from the component and prop.

<field-group>
<field :required="true" name="name" type="ShuoComponentName">

Component key, the same as the keys of `shuoUi.components`, such as `listCard` or `selectMenu`.

</field>

<field :required="true" name="key" type="string">

The name of a prop that can be set site-wide, such as `pageSize`; only items in that component's list are accepted. See [Configurable props](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#configurable-props).

</field>
</field-group>

### getShuoComponentDefaults

```ts
getShuoComponentDefaults(): ShuoComponentDefaults
```

Returns your raw settings in `shuoUi.components`, with only the items you set and none of the components' built-in defaults; use `resolveShuoDefault` for effective values.

## Examples

```ts
// nuxt.config.ts sets listCard.pageSize: 20 and no selectMenu.format
resolveShuoDefault('listCard', 'pageSize'); // 20
resolveShuoDefault('selectMenu', 'format'); // '{label}' (built-in default)

getShuoComponentDefaults(); // { listCard: { pageSize: 20 } }
```


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
