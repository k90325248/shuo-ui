---
title: "元件全站預設值"
description: "以 shuoUi.components 統一設定尺寸、顯示格式、圖示等參數。"
canonical_url: "https://k90325248.github.io/guides/component-defaults"
---
# 元件全站預設值

> 以 shuoUi.components 統一設定尺寸、顯示格式、圖示等參數。

以 `components` 依元件設定全站預設值，例如全站下拉選單顯示「值_名稱」、清單每頁 20 筆。優先順序固定為：

```text
元件上明確傳入的 prop  >  全站預設（components.<元件>）  >  元件內建預設
```

`size` 另有 `UFormField` 這一層，見[尺寸與 UFormField](#%E5%B0%BA%E5%AF%B8%E8%88%87-uformfield)。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@shuo/ui'],
  shuoUi: {
    components: {
      // selectMenu 下拉選單
      selectMenu: {
        format: '{value}_{label}',
        size: 'md',
        emptyValue: null,
        labelKey: 'Name',
        valueKey: 'Code'
      },

      // checkboxGroup 複選群組
      checkboxGroup: {
        labelKey: 'Name',
        valueKey: 'Code'
      },

      // radioGroup 單選群組
      radioGroup: {
        orientation: 'horizontal',
        breakpoint: 'lg',
        labelKey: 'Name',
        valueKey: 'Code'
      },

      // checkbox 核取方塊
      checkbox: {
        trueValue: 'Y',
        falseValue: 'N'
      },

      // datepicker 日期選擇器
      datepicker: {
        clearable: true,
        separator: '-'
      },

      // inputNumber 數字輸入
      inputNumber: {
        unit: true, // 單位文字來自 messages.inputNumber.unit（預設「元」）
        thousandSeparator: true
      },

      // queryCard 查詢條件卡片
      queryCard: {
        ui: {
          // 查詢欄位分欄：xl 要明確寫出，
          // 才會蓋過內建的 xl:grid-cols-4（見下方說明）
          grid: 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'
        }
      },

      // listCard 清單卡片
      listCard: {
        pageSize: 20,
        ui: {
          title: 'text-lg' // 標題列 ui 部位與 queryCard 相同
        }
      }
    }
  }
});
```

## 可設定的項目

元件鍵名為元件名稱去掉 `Shuo` 後的 camelCase，和 `messages` 一致，**不隨 prefix 改變**（設定 `prefix: 'My'` 時仍寫 `components.selectMenu`）。

只有下表的 prop 可以全站設定。`disabled`、`loading`、`skeleton` 等狀態類 prop，以及和單一欄位綁定的 prop（`id`、`name`、`items`、`mask`、`decimal`、`multiple` 等）無法全站設定。

<table>
<thead>
  <tr>
    <th>
      鍵名
    </th>
    
    <th>
      可設定的 prop（內建預設）
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        inputText
      </code>
    </td>
    
    <td>
      <code>
        size
      </code>
      
      （<code>
        lg
      </code>
      
      ）、<code>
        hideMaskToggle
      </code>
      
      （<code>
        false
      </code>
      
      ）、<code>
        revealIcon
      </code>
      
      （<code>
        i-lucide-eye
      </code>
      
      ）、<code>
        concealIcon
      </code>
      
      （<code>
        i-lucide-eye-off
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        inputNumber
      </code>
    </td>
    
    <td>
      <code>
        size
      </code>
      
      （<code>
        lg
      </code>
      
      ）、<code>
        unit
      </code>
      
      （<code>
        false
      </code>
      
      ，全站只接受 boolean）、<code>
        thousandSeparator
      </code>
      
      （<code>
        true
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        textarea
      </code>
    </td>
    
    <td>
      <code>
        size
      </code>
      
      （<code>
        lg
      </code>
      
      ）、<code>
        autoresize
      </code>
      
      、<code>
        rows
      </code>
      
      、<code>
        maxrows
      </code>
      
      、<code>
        fixed
      </code>
      
      （未設定時沿用 Nuxt UI）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        file
      </code>
    </td>
    
    <td>
      <code>
        size
      </code>
      
      （<code>
        lg
      </code>
      
      ）、<code>
        clearIcon
      </code>
      
      （<code>
        i-lucide-x
      </code>
      
      ）、<code>
        downloadIcon
      </code>
      
      （<code>
        i-lucide-download
      </code>
      
      ）、<code>
        selectIcon
      </code>
      
      （<code>
        i-lucide-paperclip
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        months
      </code>
    </td>
    
    <td>
      <code>
        size
      </code>
      
      （<code>
        lg
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        phone
      </code>
    </td>
    
    <td>
      <code>
        size
      </code>
      
      （<code>
        lg
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        selectMenu
      </code>
    </td>
    
    <td>
      <code>
        size
      </code>
      
      （<code>
        lg
      </code>
      
      ）、<code>
        format
      </code>
      
      （<code>
        {label}
      </code>
      
      ）、<code>
        emptyValue
      </code>
      
      （<code>
        ''
      </code>
      
      ）、<code>
        labelKey
      </code>
      
      （<code>
        label
      </code>
      
      ）、<code>
        valueKey
      </code>
      
      （<code>
        value
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkbox
      </code>
    </td>
    
    <td>
      <code>
        size
      </code>
      
      （<code>
        lg
      </code>
      
      ）、<code>
        trueValue
      </code>
      
      （<code>
        1
      </code>
      
      ）、<code>
        falseValue
      </code>
      
      （<code>
        0
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        radioGroup
      </code>
    </td>
    
    <td>
      <code>
        size
      </code>
      
      （<code>
        lg
      </code>
      
      ）、<code>
        orientation
      </code>
      
      （<code>
        auto
      </code>
      
      ）、<code>
        breakpoint
      </code>
      
      （<code>
        md
      </code>
      
      ）、<code>
        ui
      </code>
      
      、<code>
        labelKey
      </code>
      
      （<code>
        label
      </code>
      
      ）、<code>
        valueKey
      </code>
      
      （<code>
        value
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        checkboxGroup
      </code>
    </td>
    
    <td>
      同 <code>
        radioGroup
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        datepicker
      </code>
    </td>
    
    <td>
      <code>
        size
      </code>
      
      （<code>
        lg
      </code>
      
      ）、<code>
        clearable
      </code>
      
      （<code>
        false
      </code>
      
      ）、<code>
        calendarIcon
      </code>
      
      （<code>
        i-lucide-calendar
      </code>
      
      ）、<code>
        clearIcon
      </code>
      
      （<code>
        i-lucide-x
      </code>
      
      ）、<code>
        roc
      </code>
      
      （<code>
        true
      </code>
      
      ）、<code>
        separator
      </code>
      
      （<code>
        /
      </code>
      
      ）、<code>
        yearRange
      </code>
      
      （<code>
        [1900, 2100]
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        queryCard
      </code>
    </td>
    
    <td>
      <code>
        icon
      </code>
      
      （<code>
        i-lucide-search
      </code>
      
      ）、<code>
        expandIcon
      </code>
      
      （<code>
        i-lucide-chevron-down
      </code>
      
      ）、<code>
        collapseIcon
      </code>
      
      （<code>
        i-lucide-chevron-up
      </code>
      
      ）、<code>
        validateOn
      </code>
      
      （沿用 <code>
        UForm
      </code>
      
      ）、<code>
        ui
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        listCard
      </code>
    </td>
    
    <td>
      <code>
        icon
      </code>
      
      （<code>
        i-lucide-list
      </code>
      
      ）、<code>
        pageSize
      </code>
      
      （<code>
        10
      </code>
      
      ）、<code>
        showPagination
      </code>
      
      （<code>
        true
      </code>
      
      ）、<code>
        showSummary
      </code>
      
      （<code>
        true
      </code>
      
      ）、<code>
        transition
      </code>
      
      （<code>
        true
      </code>
      
      ）、<code>
        ui
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        infoTooltip
      </code>
    </td>
    
    <td>
      <code>
        icon
      </code>
      
      （<code>
        i-lucide-circle-alert
      </code>
      
      ）
    </td>
  </tr>
</tbody>
</table>

寫到白名單外的元件或 prop 時，`nuxt.config.ts` 會出現型別錯誤；未經型別檢查的值（例如環境變數）在執行時忽略並於主控台警告。

## 規則

- **是否明確傳入看的是有沒有寫這個 prop，不看值**：`<ShuoDatepicker :clearable="false" />`、`<ShuoSelectMenu :empty-value="null" />`、`format=""` 都算明確傳入，不會被全站值取代；`v-bind="{ clearable: undefined }"` 視為沒寫，沿用全站值。
- **ui 依 slot 合併**：全站設定 `radioGroup.ui.fieldset`、頁面傳 `:ui="{ item: '...' }"` 時兩者都生效；頁面也傳了 `fieldset` 時，以頁面的值取代全站值（不做 class 串接）。合併後再和元件內建樣式以 tailwind-merge 合併，同[單一元件的 `ui` prop](https://k90325248.github.io/guides/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)。`queryCard.ui` 與 `listCard.ui` 的標題列部位（`bar`、`icon`、`title`、`headerRight`）與內建樣式相同，要統一兩張卡片的標題樣式時兩邊寫相同的值。
- **其他值整個取代**：陣列（例如 `yearRange`）不和內建值串接。
- `inputNumber.unit` 全站只決定「預設是否顯示單位」，只接受 `true`／`false`；單位文字由 `messages.inputNumber.unit` 決定。單一欄位仍可傳 `unit="件"` 或 `:unit="false"`。
- `labelKey`／`valueKey` 全站設定為 `{ Code, Name }` 後，某一頁的選項仍是 `{ label, value }` 時，在該元件明確傳 `label-key="label" value-key="value"`。單選與複選群組的綁定值仍為字串，後端代碼是數字時請先轉成字串。開發模式下選項缺少欄位時，主控台警告會註明欄位名稱來自明確傳入或全站設定（例如 `（來源：valueKey 為全站設定 components.selectMenu.valueKey）`）。

<warning>

設定經 `runtimeConfig.public` 傳到瀏覽器，必須可序列化成 JSON：**不能寫函式**（例如 `ui` 的 `(defaults) => string` 只能在單一元件使用），也不要放機密資料。執行時可用 `NUXT_PUBLIC_SHUO_UI_COMPONENTS_*` 環境變數覆寫，這是 Nuxt runtimeConfig 的既有行為。

</warning>

## 尺寸與 UFormField

所有輸入元件的尺寸依下列順序決定：

```text
元件明確傳入的 size
  >  UFormField 上寫的 size
  >  components.<元件>.size
  >  formField 主題預設
  >  lg
```

<table>
<thead>
  <tr>
    <th>
      寫法
    </th>
    
    <th>
      結果
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      什麼都沒設定
    </td>
    
    <td>
      <code>
        lg
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        <UFormField size="sm">
      </code>
      
       包住 <code>
        <ShuoInputText />
      </code>
    </td>
    
    <td>
      <code>
        sm
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        <UFormField size="sm">
      </code>
      
       包住 <code>
        <ShuoInputText size="xl" />
      </code>
    </td>
    
    <td>
      <code>
        xl
      </code>
      
      （元件自己傳的優先）
    </td>
  </tr>
  
  <tr>
    <td>
      全站 <code>
        inputText.size: 'md'
      </code>
      
      ，<code>
        UFormField
      </code>
      
       沒寫 <code>
        size
      </code>
    </td>
    
    <td>
      <code>
        md
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      全站 <code>
        inputText.size: 'md'
      </code>
      
      ，<code>
        <UFormField size="sm">
      </code>
    </td>
    
    <td>
      <code>
        sm
      </code>
      
      （單一欄位比全站近）
    </td>
  </tr>
</tbody>
</table>

「formField 主題預設」指 `app.config.ts` 的 `ui.formField.defaultVariants.size`（內建主題為 `lg`）。它在全站設定之後，所以沒寫 `size` 的 `UFormField` 不會蓋掉 `components.<元件>.size`；沒有全站設定時，元件沿用它。

### 一次調整所有輸入元件尺寸

本模組不提供跨元件共用的 `components.size`，`size` 只能逐一元件設定（`components.inputText.size`、`components.selectMenu.size`⋯）。要讓表單內所有輸入元件一起改尺寸，改 Nuxt UI 的 `formField` 主題預設：

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    formField: { defaultVariants: { size: 'md' } }
  }
});
```

包在 `UFormField` 內、元件沒有傳 `size`、`UFormField` 沒有寫 `size`、也沒有 `components.<元件>.size` 的 Shuo 輸入元件都會改為 `md`；`UFormField` 的標籤與說明文字也一起改尺寸。限制：

- 不在 `UFormField` 內的元件不受影響，仍為 `components.<元件>.size` 或內建的 `lg`。
- 各元件的 `components.<元件>.size` 優先於這個主題預設，例如同時設定 `components.selectMenu.size: 'lg'` 時，下拉選單仍為 `lg`、其他輸入元件為 `md`。
- 元件或 `UFormField` 上明確寫的 `size` 仍然優先。

## 查詢欄位分欄

`ShuoQueryCard` 的內建分欄為 `grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-4`，全站設定的 `queryCard.ui.grid` 會和它以 tailwind-merge 合併。

<warning>

tailwind-merge 不會把不同斷點視為衝突：只寫 `md:grid-cols-3` 時，內建的 `xl:grid-cols-4` 仍會保留，到了 xl 寬度又變回 4 欄。因此要把每個會用到的斷點都寫出來。

</warning>

```ts [nuxt.config.ts]
shuoUi: {
  components: {
    queryCard: {
      // 手機 1 欄、sm 2 欄、md 與 xl 3 欄、2xl 4 欄
      ui: {
        grid: 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'
      }
    }
  }
}
```

全站設定無法寫函式，所以做不到「完整取代內建分欄」；需要時在單一元件傳 `:ui="{ grid: () => '...' }"`。

**Tailwind 掃描**：class 寫在 `nuxt.config.ts`，必須在 Tailwind 的掃描範圍內。Tailwind v4 預設會掃描專案根目錄（排除 `.gitignore` 的檔案），通常已包含 `nuxt.config.ts`；若設定的 class 沒有生效，在專案 CSS 加上 `@source` 指向設定檔：

```css [app/assets/css/main.css]
@import 'tailwindcss';
@import '@nuxt/ui';
@import '@shuo/ui/css';
@source '../../../nuxt.config.ts'; /* 路徑相對於這個 CSS 檔 */
```

## 在頁面取得生效值

`resolveShuoDefault(元件, prop)` 回傳「全站設定 ?? 元件內建預設」的實際生效值，例如送給後端的每頁筆數要和清單一致：

```ts
import type { PageRequest } from '#shuo-ui/types/pagination';

// 後端依此值分頁；頁面另外傳 :page-size 時改用頁面自己的值。
const pageSize = resolveShuoDefault('listCard', 'pageSize');
const request = reactive<PageRequest>({ PageNumber: 1, PageSize: pageSize });
```

`getShuoComponentDefaults()` 回傳使用端的原始設定（不含內建預設）。


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
