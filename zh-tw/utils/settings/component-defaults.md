---
title: "ComponentDefaults"
description: "在頁面取得元件全站預設值的實際生效值與原始設定。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/utils/settings/component-defaults"
---
# ComponentDefaults

> 在頁面取得元件全站預設值的實際生效值與原始設定。

## 用法

元件的全站預設值在 `nuxt.config.ts` 的 `shuoUi.components` 設定，見[元件全站預設值](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults)。頁面需要和元件使用同一個值時（例如送給後端的每頁筆數要和清單一致），用 `resolveShuoDefault` 取得：

```ts
import type { PageRequest } from '#shuo-ui/types/pagination';

// 後端依此值分頁；頁面另外傳 :page-size 時改用頁面自己的值。
const pageSize = resolveShuoDefault('listCard', 'pageSize');
const request = reactive<PageRequest>({ PageNumber: 1, PageSize: pageSize });
```

函式由模組自動匯入。

## API

### resolveShuoDefault

```ts
resolveShuoDefault(name: ShuoComponentName, key: string)
```

回傳元件某個 prop 實際生效的預設值：有全站設定時為設定值，否則為元件內建預設。內建預設為 `undefined` 的項目（例如 `textarea.rows`）沒有設定時回傳 `undefined`。回傳型別依元件與 prop 推導。

<field-group>
<field :required="true" name="name" type="ShuoComponentName">

元件鍵名，同 `shuoUi.components` 的鍵，例如 `listCard`、`selectMenu`。

</field>

<field :required="true" name="key" type="string">

可全站設定的 prop 名稱，例如 `pageSize`；只接受該元件白名單內的項目，見[可設定的項目](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#%E5%8F%AF%E8%A8%AD%E5%AE%9A%E7%9A%84%E9%A0%85%E7%9B%AE)。

</field>
</field-group>

### getShuoComponentDefaults

```ts
getShuoComponentDefaults(): ShuoComponentDefaults
```

回傳使用端在 `shuoUi.components` 的原始設定，只包含有設定的項目，不含元件內建預設；需要實際生效值時改用 `resolveShuoDefault`。

## 範例

```ts
// nuxt.config.ts 設定了 listCard.pageSize: 20、沒有設定 selectMenu.format
resolveShuoDefault('listCard', 'pageSize'); // 20
resolveShuoDefault('selectMenu', 'format'); // '{label}'（內建預設）

getShuoComponentDefaults(); // { listCard: { pageSize: 20 } }
```


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
