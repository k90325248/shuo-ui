---
title: "簡介"
description: "Shuo UI 是什麼、適合用在哪裡。"
canonical_url: "https://k90325248.github.io/getting-started/introduction"
---
# 簡介

> Shuo UI 是什麼、適合用在哪裡。

Shuo UI 是一組基於 [Nuxt UI](https://ui.nuxt.com) 的表單元件，以 Nuxt Module 提供。目標是讓多個專案共用同一套表單元件與行為，同時不失去 Nuxt UI 本身的功能。

## 範例

下面是實際運作的 `ShuoInputText`：輸入文字後，最後 4 碼會被遮蔽，點眼睛按鈕可切換顯示。

<code-preview>
<shuo-input-text :mask="4" className="max-w-80" placeholder="請輸入身分證字號">



</shuo-input-text>

<template v-slot:code="">

```vue
<ShuoInputText v-model="value" :mask="4" placeholder="請輸入身分證字號" />
```

</template>
</code-preview>

## 特色

- 預設繁體中文文案，可由模組設定覆寫
- 樣式使用 Nuxt UI 語意色與 CSS 變數，顏色與主題由使用的專案決定
- 一致的尺寸、停用、載入中（`loading`）與骨架（`skeleton`）行為
- 未自行宣告的 Nuxt UI 參數、插槽與 ref 都能直接使用，並有型別推導
- 元件、utils 與 composables 皆自動匯入


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
