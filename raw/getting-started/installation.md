---
title: "安裝"
description: "在 Nuxt 專案中安裝並啟用 Shuo UI。"
canonical_url: "https://k90325248.github.io/getting-started/installation"
---
# 安裝

> 在 Nuxt 專案中安裝並啟用 Shuo UI。

## 需求

<table>
<thead>
  <tr>
    <th>
      套件
    </th>
    
    <th>
      版本
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

`date-fns`、`valibot`、`@vuepic/vue-datepicker` 等執行期依賴會隨套件一併安裝。

## 步驟

<steps level="3">

### 安裝套件

指定 tag 以固定版本，升級時改成新的 tag 即可。各版本的改動見 [GitHub Releases](https://github.com/k90325248/shuo-ui/releases)，元件頁最下方也有該元件的更新紀錄。

<code-group>

```bash [pnpm]
pnpm add github:k90325248/shuo-ui#v1.0.1
```

```bash [npm]
npm install github:k90325248/shuo-ui#v1.0.1
```

```bash [yarn]
yarn add github:k90325248/shuo-ui#v1.0.1
```

</code-group>

<tip>

建議一併安裝 lucide 圖示集（`pnpm add @iconify-json/lucide`）：元件內建的圖示（日曆、眼睛、下載等）會打包進網站，不必在執行時從網路載入。沒有安裝時元件仍可使用，圖示改由 `@nuxt/icon` 在執行時載入。

</tip>

### 啟用模組

`@nuxt/ui` 須一併安裝並放在 `modules` 中。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@shuo/ui']
});
```

### 載入樣式

在 CSS 載入 Tailwind、Nuxt UI 與元件庫的來源掃描。

```css [app/assets/css/main.css]
@import 'tailwindcss';
@import '@nuxt/ui';
@import '@shuo/ui/css';
```

再到 `nuxt.config.ts` 以 `css` 註冊這個檔案：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@shuo/ui'],
  css: ['~/assets/css/main.css']
});
```

<warning>

CSS 的最後一行 `@import '@shuo/ui/css'` 讓 Tailwind 掃描元件庫內使用的 class（Tailwind 預設不掃描 `node_modules`）。沒有這行，部分樣式（例如載入中圖示大小、排版）不會生效。

</warning>
</steps>

## 使用 Valibot 撰寫驗證規則

在自己的程式碼中 `import * as v from 'valibot'` 撰寫 schema 時，請在專案另外安裝 `valibot`。pnpm 不會讓專案直接引用套件的依賴。

```bash
pnpm add valibot
```

## 版本與升級

版本以 git tag 發佈（`v主.次.修`），每次升級請更新安裝指令中的 tag 並測試。


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
