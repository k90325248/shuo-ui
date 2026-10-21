# @shuo/ui

基於 [Nuxt UI](https://ui.nuxt.com) 的表單元件庫，以 Nuxt Module 提供。需求：Nuxt 4 + `@nuxt/ui` 4。

## 元件

`ShuoInputText`、`ShuoInputNumber`、`ShuoSelectMenu`、`ShuoDatepicker`、`ShuoCheckbox`、`ShuoCheckboxGroup`、`ShuoRadioGroup`、`ShuoTextarea`、`ShuoFile`、`ShuoMonths`、`ShuoPhone`、`ShuoQueryCard`、`ShuoList`、`ShuoInfoTooltip`。

另自動匯入：`requiredText`、`requiredNumber`、`requiredArray`、`optionalEmail`、`optionalNonNegativeNumber`（valibot 驗證規則）與日期、數字、電話等 utils、`useChoiceGroup`、`useTruncatedText`。

## 安裝

```bash
pnpm add github:k90325248/shuo-ui   # 或指定 tag：github:k90325248/shuo-ui#v0.1.0
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@shuo/ui']
});
```

## 自定義

### 1. 樣式吃專案設定

元件只使用 Nuxt UI 語意色與 CSS 變數，顏色由專案決定。在自己的 CSS 覆寫表單色票：

```css
:root {
  --ui-form-border: var(--ui-color-primary-700);
  --ui-form-disabled-text: var(--color-gray-600);
  --ui-form-disabled-border: var(--color-gray-400);
  --ui-form-disabled-bg: var(--color-gray-100);
}
```

內建的 Nuxt UI 主題（輸入框、核取方塊、`formField` 錯誤樣式等）只是預設值，專案 `app.config.ts` 的 `ui` 設定優先；各元件也支援 `ui` prop 與 slots。

### 2. 模組設定

```ts
export default defineNuxtConfig({
  modules: ['@shuo/ui'],
  shuoUi: {
    prefix: 'Shuo', // 元件前綴，例如改成 'My' → <MyInputText>
    theme: true, // false：不套用內建主題，完全由專案決定
    css: true, // false：不載入預設 CSS 變數
    messages: {
      // 只需寫想改的項目，其餘維持預設繁體中文
      validation: { required: '{label} is required' },
      file: { placeholder: 'Choose a file' },
      list: { empty: 'No data' }
    }
  }
});
```

可覆寫的文案結構見 [`src/runtime/utils/messages.ts`](src/runtime/utils/messages.ts)。

## 開發

```bash
pnpm install
pnpm dev            # 啟動 playground（所有元件的測試頁）
pnpm lint           # eslint + prettier + typecheck
pnpm test:unit      # 單元測試
pnpm test:e2e       # Playwright E2E
pnpm test:scenarios # 檢查 docs/test-scenarios 與測試名稱一致
pnpm build          # 建置模組
```

測試情境文件在 [`docs/test-scenarios`](docs/test-scenarios)，每個元件對應一份情境表與一支 E2E／單元測試。
