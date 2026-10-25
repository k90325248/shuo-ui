---
title: "自動匯入與型別"
description: "自動匯入的工具函式、型別別名，以及與 Nuxt UI 搭配的注意事項。"
canonical_url: "https://k90325248.github.io/guides/auto-imports"
---
# 自動匯入與型別

> 自動匯入的工具函式、型別別名，以及與 Nuxt UI 搭配的注意事項。

## 自動匯入

模組自動匯入 `dist/runtime/utils` 與 `dist/runtime/composables`，無須 import：

<table>
<thead>
  <tr>
    <th>
      名稱
    </th>
    
    <th>
      說明
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        requiredText
      </code>
      
      、<code>
        requiredNumber
      </code>
      
      、<code>
        requiredArray
      </code>
      
      、<code>
        optionalEmail
      </code>
      
      、<code>
        optionalNonNegativeNumber
      </code>
    </td>
    
    <td>
      Valibot 驗證規則，見<a href="https://k90325248.github.io/guides/validation">
        表單驗證
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        formatDateDisplay
      </code>
      
      、<code>
        parseDateValue
      </code>
      
      、<code>
        getDateModelFormat
      </code>
      
      、<code>
        isValidDateSeparator
      </code>
      
       等
    </td>
    
    <td>
      日期格式與解析
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        formatNumberDisplay
      </code>
      
      、<code>
        toNumberText
      </code>
      
      、<code>
        getDecimalPlaces
      </code>
    </td>
    
    <td>
      數字顯示
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        filterPhoneInput
      </code>
      
      、<code>
        joinPhone
      </code>
      
      、<code>
        splitPhone
      </code>
    </td>
    
    <td>
      電話號碼
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        splitMonths
      </code>
      
      、<code>
        combineMonths
      </code>
    </td>
    
    <td>
      年月數換算
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        useChoiceGroup
      </code>
      
      、<code>
        useTruncatedText
      </code>
    </td>
    
    <td>
      排列與文字省略
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        getShuoMessages
      </code>
      
      、<code>
        setShuoMessages
      </code>
      
      、<code>
        formatMessage
      </code>
    </td>
    
    <td>
      文案讀取、覆寫與佔位符替換（通常不需直接使用）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        resolveShuoDefault
      </code>
      
      、<code>
        getShuoComponentDefaults
      </code>
    </td>
    
    <td>
      元件全站預設值的生效值與原始設定，見<a href="https://k90325248.github.io/guides/component-defaults#%E5%9C%A8%E9%A0%81%E9%9D%A2%E5%8F%96%E5%BE%97%E7%94%9F%E6%95%88%E5%80%BC">
        在頁面取得生效值
      </a>
    </td>
  </tr>
</tbody>
</table>

<warning>

目錄內其他元件內部使用的工具（例如 `getByPath`、`getMaskCount`、`useChoiceAppend`、`getChoiceGroupUi`）同樣會被匯入，但不屬於公開 API，版本間可能變動。若與專案自己的函式同名，請改名或關閉其中一方的自動匯入。

</warning>

## 型別

型別可由別名 `#shuo-ui` 匯入：

```ts
import type { DatepickerValue } from '#shuo-ui/components/ShuoDatepicker.vue';
import type { PageRequest } from '#shuo-ui/types/pagination';
import type { ShuoComponentDefaults } from '#shuo-ui/types/component-defaults';
```

元件 props 型別也可由 `#shuo-ui/types/components` 匯入（例如 `InputTextProps`、`SelectMenuProps`），原本從 `.vue` 匯入的寫法仍可使用。

## 與 Nuxt UI 搭配的注意事項

- 專案 CSS 必須加入 `@import '@shuo/ui/css';`（放在 `@import 'tailwindcss'` 之後），否則 Tailwind 不會掃描元件庫內的 class，部分樣式會缺失。
- 表單欄位建議外包 `UFormField` 並設定 `name`，元件會接入 `UFormField` 的 id、name、size、停用與錯誤狀態，並在 input、blur、change 時觸發驗證。尺寸的優先順序見[尺寸與 UFormField](https://k90325248.github.io/guides/component-defaults#%E5%B0%BA%E5%AF%B8%E8%88%87-uformfield)。
- 圖示使用 Iconify（`i-lucide-*`）。元件庫用到的圖示，以及 `shuoUi.components` 設定的圖示，會由模組自動加入 `@nuxt/icon` 的 client bundle；只在頁面以 prop 傳入的其他圖示需自行加入 `icon.clientBundle.icons` 或維持執行期圖示 API。若專案停用執行期圖示 API（`icon.provider: 'none'`），請安裝 `@iconify-json/lucide` 讓圖示能在建置時打包。


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
