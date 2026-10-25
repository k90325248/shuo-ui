---
title: "樣式與主題"
description: "顏色、表單色票、內建主題，以及單一元件的 ui 覆寫規則。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/getting-started/theme/theming"
---
# 樣式與主題

> 顏色、表單色票、內建主題，以及單一元件的 ui 覆寫規則。

## 顏色來自你的專案

元件只使用 Nuxt UI 的語意色（`primary`、`neutral`、`error` 等）與 CSS 變數，不寫死顏色。在專案的 `app.config.ts` 設定主題色即可：

```ts [app.config.ts]
export default defineAppConfig({
  ui: { colors: { primary: 'blue', neutral: 'slate' } }
});
```

### 在文件網站預覽主題

標題列右上角的調色盤按鈕可以即時切換主題，整個網站與頁面上的元件範例都會跟著變，用法同 Nuxt UI 官方文件的主題選單：

- **主題組**：一次套用主色、中性色、字型、圖示與圓角，之後可再個別調整；和主題組不同的項目以主色標示。
- **主色、中性色、字型、圖示、圓角**：同 Nuxt UI 的設定。
- **元件尺寸、日期**：Shuo UI 的全站元件預設值，一次切換所有輸入元件的 `size` 與日期選擇器的民國／西元年；切換圖示集時，元件自己的圖示（日曆、清除、下載等）也會換成同一套。
- **元件語系**：切換元件範例的語系（繁體中文或英文），預設跟隨文件語言，見[多語系與文案](https://k90325248.github.io/shuo-ui/getting-started/theme/messages)。
- **明暗模式**：淺色、深色或跟隨系統。
- **匯出設定**：產生目前設定對應的 `app.config.ts`、CSS 與 `nuxt.config.ts`，只列出和預設不同的項目，可直接複製到專案。

設定只存在目前的瀏覽器，不影響其他人。範例上明確傳入的參數（例如指定 `calendar-icon` 或 `:roc="false"`）優先於這裡的設定。

## 表單色票

輸入框邊框與停用狀態的顏色由下列 CSS 變數決定，淺色與深色模式各有一組。停用色使用 Nuxt UI 的中性色，色調會跟著 `app.config.ts` 的 `ui.colors.neutral`；邊框使用主色，深色模式改用較亮的色階：

```css
:root {
  --ui-form-border: var(--ui-color-primary-700); /* 輸入框邊框 */
  --ui-form-disabled-text: var(--ui-color-neutral-600); /* 停用文字 */
  --ui-form-disabled-border: var(--ui-color-neutral-400); /* 停用邊框 */
  --ui-form-disabled-bg: var(--ui-color-neutral-100); /* 停用背景 */
}

.dark {
  --ui-form-border: var(--ui-color-primary-400);
  --ui-form-disabled-text: var(--ui-color-neutral-400);
  --ui-form-disabled-border: var(--ui-color-neutral-600);
  --ui-form-disabled-bg: var(--ui-color-neutral-800);
}
```

要全站改色時，在專案的 CSS 重新定義即可，模組載入的預設值權重最低，不需要 `!important`。只寫 `:root` 時淺色與深色模式都套用同一個值；兩種模式要用不同顏色時，再加上 `.dark`（寫在 `:root` 之後）：

```css [app/assets/css/main.css]
:root {
  --ui-form-disabled-bg: var(--ui-color-neutral-50);
}

.dark {
  --ui-form-disabled-bg: var(--ui-color-neutral-900);
}
```

## 內建主題

`theme: true` 時，模組以 `defu` 把下列 Nuxt UI 主題當作**預設值**加入 `appConfig.ui`；專案 `app.config.ts` 的 `ui` 設定優先。

<table>
<thead>
  <tr>
    <th>
      元件
    </th>
    
    <th>
      內容
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        input
      </code>
      
      、<code>
        textarea
      </code>
      
      、<code>
        select
      </code>
      
      、<code>
        selectMenu
      </code>
    </td>
    
    <td>
      邊框使用 <code>
        --ui-form-border
      </code>
      
      ，停用時使用停用色票
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkbox
      </code>
      
      、<code>
        radioGroup
      </code>
    </td>
    
    <td>
      停用時保留勾選狀態，文字可換行
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        formField
      </code>
    </td>
    
    <td>
      預設尺寸 <code>
        lg
      </code>
      
      、標題單行省略、錯誤訊息嵌在下邊線
    </td>
  </tr>
</tbody>
</table>

想改其中一項，在 `app.config.ts` 覆寫即可：

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    formField: {
      slots: { error: 'text-xs text-error' } // 改成一般樣式的錯誤訊息
    }
  }
});
```

<tip>

完全不要內建主題：設定 `shuoUi: { theme: false }`，再自行設定 `ui.input`、`ui.formField` 等。

</tip>

## 單一元件的 `ui` prop

元件的 `ui` 寫法同 Nuxt UI 的 `ui` slots，只影響該元件；要改全站所有 Nuxt UI 元件，請用上一節的 `app.config.ts`。

### 合併規則

- 元件內建樣式在前、傳入的 `ui` 在後，以 tailwind-merge 合併，同一 slot 衝突時以傳入值優先。例如 `ShuoInputNumber` 內建 `base: 'text-right'`，傳入 `{ base: 'text-center' }` 後改為置中，其他內建樣式保留。
- 傳入函式 `(defaults) => string` 時，`defaults` 已包含內建樣式，回傳值即為最終樣式，可完整取代：

```vue
<ShuoInputNumber
  :ui="{
    base: (defaults) => defaults.replace('text-right', 'text-left')
  }"
/>
```

### `class` 落在哪裡

傳入的 `class` 落在元件外框，與 `ui.root` 一起合併且排在後面，可覆寫內建寬度（例如 `class="w-14"`）。以下元件例外：

<table>
<thead>
  <tr>
    <th>
      元件
    </th>
    
    <th>
      <code>
        class
      </code>
      
       落在
    </th>
    
    <th>
      外層寬度改用
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ShuoSelectMenu
      </code>
      
      、<code>
        ShuoFile
      </code>
    </td>
    
    <td>
      輸入框
    </td>
    
    <td>
      <code>
        ui.wrapper
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoInfoTooltip
      </code>
    </td>
    
    <td>
      觸發按鈕
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoListCard
      </code>
    </td>
    
    <td>
      卡片外框（<code>
        ui
      </code>
      
       沒有 <code>
        root
      </code>
      
      ）
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoDatepicker
      </code>
      
      、<code>
        ShuoTable
      </code>
    </td>
    
    <td>
      外層容器（沒有 <code>
        ui
      </code>
      
      ，直接以 <code>
        class
      </code>
      
       設定）
    </td>
    
    <td>
      —
    </td>
  </tr>
</tbody>
</table>

### 支援的元件

<table>
<thead>
  <tr>
    <th>
      元件
    </th>
    
    <th>
      <code>
        ui
      </code>
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ShuoInputText
      </code>
      
      、<code>
        ShuoInputNumber
      </code>
      
      、<code>
        ShuoTextarea
      </code>
      
      、<code>
        ShuoSelectMenu
      </code>
      
      、<code>
        ShuoCheckbox
      </code>
      
      、<code>
        ShuoCheckboxGroup
      </code>
      
      、<code>
        ShuoRadioGroup
      </code>
      
      、<code>
        ShuoFile
      </code>
      
      、<code>
        ShuoMonths
      </code>
      
      、<code>
        ShuoPhone
      </code>
      
      、<code>
        ShuoInfoTooltip
      </code>
      
      、<code>
        ShuoQueryCard
      </code>
      
      、<code>
        ShuoListCard
      </code>
      
      （標題列）
    </td>
    
    <td>
      依上述規則合併，slot 見各元件頁面
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoDatepicker
      </code>
      
      、<code>
        ShuoTable
      </code>
      
      （表格樣式用 <code>
        tableProps.ui
      </code>
      
      ）
    </td>
    
    <td>
      尚未開放
    </td>
  </tr>
</tbody>
</table>


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
