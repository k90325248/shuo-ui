# @shuo/ui

基於 [Nuxt UI](https://ui.nuxt.com) 的表單元件庫，以 Nuxt Module 提供。包含 11 個表單輸入元件、查詢條件卡片、清單卡片、表格、資訊提示與提示，並附 Valibot 驗證規則與日期、數字等工具函式。

- 預設繁體中文，內建英文，跟隨 Nuxt UI 的語系（`<UApp :locale>`）切換；文案可依語系覆寫
- 樣式使用 Nuxt UI 語意色與 CSS 變數，顏色與主題由使用的專案決定
- 一致的尺寸、停用、載入中（`loading`）與骨架（`skeleton`）行為
- 型別完整，元件與常用工具函式（驗證規則、日期與數字顯示等）皆自動匯入

## 需求

| 套件       | 版本      |
| ---------- | --------- |
| Nuxt       | `^4.6.2`  |
| `@nuxt/ui` | `^4.12.0` |

`date-fns`、`valibot`、`@vuepic/vue-datepicker` 等執行期依賴會隨套件一併安裝。

## 安裝

```bash
pnpm add github:k90325248/shuo-ui#v1.3.0
```

指定 tag 以固定版本；升級時改成新的 tag 即可，升級前請先看[更新說明](https://github.com/k90325248/shuo-ui/releases)。其他套件管理工具：

```bash
npm install github:k90325248/shuo-ui#v1.3.0
yarn add github:k90325248/shuo-ui#v1.3.0
```

建議一併安裝 lucide 圖示集（`pnpm add @iconify-json/lucide`），元件內建的圖示會打包進網站；沒有安裝時圖示改由 `@nuxt/icon` 在執行時載入。

啟用模組（`@nuxt/ui` 須一併安裝並在 `modules` 中）：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@shuo/ui']
});
```

在 CSS 載入 Tailwind、Nuxt UI 與元件庫的來源掃描：

```css
/* app/assets/css/main.css */
@import 'tailwindcss';
@import '@nuxt/ui';
@import '@shuo/ui/css';
```

最後一行讓 Tailwind 掃描元件庫內使用的 class（Tailwind 預設不掃描 `node_modules`）。**沒有這行，部分樣式（例如載入中圖示大小、排版）不會生效。**

在自己的程式碼中 `import * as v from 'valibot'` 撰寫 schema 時，請在專案另外安裝 `valibot`（pnpm 不會讓專案直接引用套件的依賴）：

```bash
pnpm add valibot
```

## 快速開始

元件以 `Shuo` 開頭，無須 import。搭配 Nuxt UI 的 `UForm` 與 Valibot 驗證：

```vue
<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <!-- 姓名 -->
    <UFormField label="姓名" name="name">
      <ShuoInputText v-model="state.name" />
    </UFormField>

    <!-- 金額 -->
    <UFormField label="金額" name="amount">
      <ShuoInputNumber v-model="state.amount" unit />
    </UFormField>

    <!-- 申請日期 -->
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

完整文件見 **[Shuo UI 文件網站](https://k90325248.github.io/shuo-ui/zh-tw)**，每個元件都有可操作的範例與參數表。

| 文件                                                                                       | 內容                                                                  |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| [元件](https://k90325248.github.io/shuo-ui/zh-tw/components/overview/common)               | 全部元件的用途、v-model、props、slots 與事件，以及沿用 Nuxt UI 的部分 |
| [日期選擇器](https://k90325248.github.io/shuo-ui/zh-tw/components/date/datepicker)         | 民國年、五種格式、範圍選擇、綁定與驗證                                |
| [表單驗證](https://k90325248.github.io/shuo-ui/zh-tw/getting-started/form/validation)      | Valibot 規則、空值約定、錯誤訊息                                      |
| [模組選項](https://k90325248.github.io/shuo-ui/zh-tw/getting-started/theme/module-options) | 模組選項、主題、CSS 變數、文案覆寫、元件全站預設值                    |

## 元件一覽

| 元件                | 用途                                     | v-model 型別                                    |
| ------------------- | ---------------------------------------- | ----------------------------------------------- |
| `ShuoInputText`     | 單行文字，可遮蔽                         | `string`                                        |
| `ShuoInputNumber`   | 數字，千分位、小數、單位                 | `number \| null`                                |
| `ShuoSelectMenu`    | 下拉選單，可搜尋、多選                   | `string`／多選為 `string[]`                     |
| `ShuoDatepicker`    | 日期、年月、日期時間，範圍               | `string`／範圍為 `[string, string]`             |
| `ShuoCheckbox`      | 單一核取方塊                             | `string \| number \| boolean`（預設 `1`／`0`）  |
| `ShuoCheckboxGroup` | 複選群組                                 | `string[]`                                      |
| `ShuoSwitch`        | 開關，切換後可先執行處理函式             | `boolean`（可設定 `trueValue`／`falseValue`）   |
| `ShuoRadioGroup`    | 單選群組                                 | `string`                                        |
| `ShuoTextarea`      | 多行文字                                 | `string`                                        |
| `ShuoFile`          | 單檔選擇與既有附件下載                   | `File \| null`                                  |
| `ShuoMonths`        | 年月數換算輸入                           | 總月數 `number \| null`（另有 `year`、`month`） |
| `ShuoPhone`         | 區碼加電話號碼                           | `string`（另有 `areaCode`、`number`）           |
| `ShuoQueryCard`     | 可收合的查詢條件表單卡片                 | `open`（`boolean`）                             |
| `ShuoListCard`      | 查詢結果清單卡片（標題、表格與後端分頁） | —                                               |
| `ShuoTable`         | 純表格（無卡片與分頁），含骨架與高度過渡 | —                                               |
| `ShuoInfoTooltip`   | 資訊圖示加提示                           | —                                               |
| `ShuoTooltip`       | 提示（UTooltip 加上觸控長按顯示）        | `open`（`boolean`）                             |

## 版本與升級

版本以 git tag 發佈（`v主.次.修`，beta 為 `v主.次.修-beta.N`），每次升級請更新安裝指令中的 tag 並測試。
