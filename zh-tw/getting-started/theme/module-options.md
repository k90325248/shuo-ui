---
title: "模組選項"
description: "在 nuxt.config.ts 以 shuoUi 設定元件庫。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/getting-started/theme/module-options"
---
# 模組選項

> 在 nuxt.config.ts 以 shuoUi 設定元件庫。

## 用法

在 `nuxt.config.ts` 以 `shuoUi` 設定，以下為預設值：

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

## 選項

<field-group>
<field default="Shuo" name="prefix" type="string">

元件名稱前綴。改為 `My` 後使用 `<MyInputText>`。

</field>

<field default="true" name="theme" type="boolean">

是否套用內建 Nuxt UI 主題，見[樣式與主題](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#%E5%85%A7%E5%BB%BA%E4%B8%BB%E9%A1%8C)。`false` 表示完全交給專案決定。

</field>

<field default="true" name="css" type="boolean">

是否載入預設 CSS 變數（`--ui-form-*`），見[表單色票](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#%E8%A1%A8%E5%96%AE%E8%89%B2%E7%A5%A8)。`false` 表示由專案自行定義。

</field>

<field default="zh-TW" name="locale" type="string">

預設語系，頁面沒有設定 Nuxt UI 語系（`<UApp :locale>`）時使用；內建 `zh-TW`、`en`，見[多語系與文案](https://k90325248.github.io/shuo-ui/getting-started/theme/messages)。

</field>

<field default="{}" name="messages" type="object">

覆寫預設語系的文案，只需寫要修改的項目，見[多語系與文案](https://k90325248.github.io/shuo-ui/getting-started/theme/messages#%E8%A6%86%E5%AF%AB%E6%96%87%E6%A1%88)。

</field>

<field default="{}" name="locales" type="object">

依語系代碼覆寫文案，也可加入內建以外的語系，見[多語系與文案](https://k90325248.github.io/shuo-ui/getting-started/theme/messages#%E8%A6%86%E5%AF%AB%E6%96%87%E6%A1%88)。

</field>

<field default="{}" name="components" type="object">

元件全站預設值，依元件分區設定，見[元件全站預設值](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults)。

</field>
</field-group>


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
