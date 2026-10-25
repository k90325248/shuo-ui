---
title: "自動匯入與型別"
description: "自動匯入的元件與工具函式、型別別名，以及與 Nuxt UI 搭配的注意事項。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/getting-started/advanced/auto-imports"
---
# 自動匯入與型別

> 自動匯入的元件與工具函式、型別別名，以及與 Nuxt UI 搭配的注意事項。

## 自動匯入

元件與下列工具函式由模組自動匯入，無須 import；參數與範例見「工具函式」分頁：

<table>
<thead>
  <tr>
    <th>
      函式
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
      Valibot 驗證規則，見<a href="https://k90325248.github.io/shuo-ui/utils/form/validation">
        驗證規則
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
    </td>
    
    <td>
      民國年顯示與日期解析，見<a href="https://k90325248.github.io/shuo-ui/utils/format/date">
        日期
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        formatNumberDisplay
      </code>
    </td>
    
    <td>
      千分位與小數位數，見<a href="https://k90325248.github.io/shuo-ui/utils/format/number">
        數字
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        splitPhone
      </code>
      
      、<code>
        joinPhone
      </code>
    </td>
    
    <td>
      區碼拆分與合併，見<a href="https://k90325248.github.io/shuo-ui/utils/field/phone">
        電話
      </a>
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
      總月數與年月換算，見<a href="https://k90325248.github.io/shuo-ui/utils/field/months">
        月數
      </a>
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
      全站預設值的生效值與原始設定，見<a href="https://k90325248.github.io/shuo-ui/utils/settings/component-defaults">
        全站預設值
      </a>
    </td>
  </tr>
</tbody>
</table>

元件內部使用的工具與 composables 不會自動匯入，也不屬於公開 API，版本間可能變動。

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
- 表單欄位建議外包 `UFormField` 並設定 `name`，元件會接入 `UFormField` 的 id、name、size、停用與錯誤狀態，並在 input、blur、change 時觸發驗證。尺寸的優先順序見[尺寸與 UFormField](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#%E5%B0%BA%E5%AF%B8%E8%88%87-uformfield)。
- 圖示使用 Iconify（`i-lucide-*`）。元件庫用到的圖示，以及 `shuoUi.components` 設定的圖示，會由模組自動加入 `@nuxt/icon` 的 client bundle；只在頁面以 prop 傳入的其他圖示需自行加入 `icon.clientBundle.icons` 或維持執行期圖示 API。若專案停用執行期圖示 API（`icon.provider: 'none'`），請安裝 `@iconify-json/lucide` 讓圖示能在建置時打包。


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
