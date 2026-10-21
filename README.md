# @shuo/ui

基於 [Nuxt UI](https://ui.nuxt.com) 的表單元件庫，以 Nuxt Module 提供。包含 11 個表單輸入元件、查詢條件卡片、資料清單與資訊提示，並附 Valibot 驗證規則與日期、數字等工具函式。

- 預設繁體中文文案，可由模組設定覆寫
- 樣式使用 Nuxt UI 語意色與 CSS 變數，顏色與主題由使用的專案決定
- 一致的尺寸、停用、載入中（`loading`）與骨架（`skeleton`）行為
- 型別完整，元件、utils 與 composables 皆自動匯入

## 需求

| 套件       | 版本 |
| ---------- | ---- |
| Nuxt       | ≥ 4  |
| `@nuxt/ui` | ≥ 4  |

## 安裝

```bash
pnpm add github:k90325248/shuo-ui#v0.1.1
```

指定 tag 以固定版本；升級時改成新的 tag 即可。其他套件管理工具：

```bash
npm install github:k90325248/shuo-ui#v0.1.1
yarn add github:k90325248/shuo-ui#v0.1.1
```

啟用模組（`@nuxt/ui` 須一併安裝並在 `modules` 中）：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@shuo/ui']
});
```

確認 CSS 已載入 Tailwind 與 Nuxt UI（`@nuxt/ui` 的標準設定）：

```css
/* app/assets/css/main.css */
@import 'tailwindcss';
@import '@nuxt/ui';
```

## 快速開始

元件以 `Shuo` 開頭，無須 import。搭配 Nuxt UI 的 `UForm` 與 Valibot 驗證：

```vue
<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField label="姓名" name="name">
      <ShuoInputText v-model="state.name" />
    </UFormField>
    <UFormField label="金額" name="amount">
      <ShuoInputNumber v-model="state.amount" unit />
    </UFormField>
    <UFormField label="申請日期" name="date">
      <ShuoDatepicker v-model="state.date" clearable />
    </UFormField>
    <UButton type="submit" label="送出" />
  </UForm>
</template>

<script setup lang="ts">
import * as v from 'valibot';

// requiredText、requiredNumber 由模組自動匯入
const schema = v.object({
  name: requiredText('姓名'),
  amount: requiredNumber('金額'),
  date: requiredText('申請日期')
});

const state = reactive({ name: '', amount: null as number | null, date: '' });

const onSubmit = (event: { data: v.InferOutput<typeof schema> }) => console.log(event.data);
</script>
```

## 文件

| 文件                                   | 內容                                                        |
| -------------------------------------- | ----------------------------------------------------------- |
| [元件與參數](guide/components.md)      | 全部元件的用途、v-model、props、slots 與事件                |
| [日期選擇器](guide/datepicker.md)      | 民國年、五種格式、範圍選擇、綁定與驗證                      |
| [表單驗證](guide/validation.md)        | Valibot 規則、空值約定、錯誤訊息、群組排列                  |
| [設定與自定義](guide/configuration.md) | 模組選項、主題、CSS 變數、文案覆寫、`ui` prop、自動匯入 API |

## 元件一覽

| 元件                | 用途                       | v-model 型別                                    |
| ------------------- | -------------------------- | ----------------------------------------------- |
| `ShuoInputText`     | 單行文字，可遮蔽           | `string`                                        |
| `ShuoInputNumber`   | 數字，千分位、小數、單位   | `number \| null`                                |
| `ShuoSelectMenu`    | 下拉選單，可搜尋、多選     | `string`／多選為 `string[]`                     |
| `ShuoDatepicker`    | 日期、年月、日期時間，範圍 | `string`／範圍為 `[string, string]`             |
| `ShuoCheckbox`      | 單一核取方塊               | `string \| number \| boolean`（預設 `1`／`0`）  |
| `ShuoCheckboxGroup` | 複選群組                   | `string[]`                                      |
| `ShuoRadioGroup`    | 單選群組                   | `string`                                        |
| `ShuoTextarea`      | 多行文字                   | `string`                                        |
| `ShuoFile`          | 單檔選擇與既有附件下載     | `File \| null`                                  |
| `ShuoMonths`        | 年月數換算輸入             | 總月數 `number \| null`（另有 `year`、`month`） |
| `ShuoPhone`         | 區碼加電話號碼             | `string`（另有 `areaCode`、`number`）           |
| `ShuoQueryCard`     | 可收合的查詢條件表單卡片   | `open`（`boolean`）                             |
| `ShuoList`          | 分頁資料清單               | —                                               |
| `ShuoInfoTooltip`   | 資訊圖示加提示             | —                                               |

## 版本與升級

版本以 git tag 發佈（`v主.次.修`），每次升級請更新 tag 並測試。
