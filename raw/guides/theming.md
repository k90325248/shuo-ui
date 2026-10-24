---
title: "樣式與主題"
description: "顏色、表單色票、內建主題，以及單一元件的 ui 覆寫規則。"
canonical_url: "https://k90325248.github.io/guides/theming"
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

## 表單色票

預設值如下，在你的 CSS 重新定義即可覆寫（模組載入的預設值權重最低）：

```css
:root {
  --ui-form-border: var(--ui-color-primary-700); /* 輸入框邊框 */
  --ui-form-disabled-text: var(--color-gray-600); /* 停用文字 */
  --ui-form-disabled-border: var(--color-gray-400); /* 停用邊框 */
  --ui-form-disabled-bg: var(--color-gray-100); /* 停用背景 */
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
<ShuoInputNumber :ui="{ base: (defaults) => defaults.replace('text-right', 'text-left') }" />
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
        ShuoQueryCard
      </code>
    </td>
    
    <td>
      卡片外框
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

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
