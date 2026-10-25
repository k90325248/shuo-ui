---
title: "多語系與文案"
description: "元件文案跟隨 Nuxt UI 的語系切換，並可依語系覆寫或加入其他語系。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/getting-started/theme/messages"
---
# 多語系與文案

> 元件文案跟隨 Nuxt UI 的語系切換，並可依語系覆寫或加入其他語系。

元件的文案（驗證訊息、無障礙名稱、提示文字、日期選擇器文字等）跟隨 Nuxt UI 的語系，內建繁體中文（`zh-TW`）與英文（`en`）。

## 切換語系

在 `UApp` 設定 Nuxt UI 的語系，Nuxt UI 與 Shuo UI 的元件會一起切換，不需要另外設定：

```vue [app.vue]
<template>
  <UApp :locale="locales[locale]">
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
import { en, zh_tw } from '@nuxt/ui/locale';

const locales = { 'zh-TW': zh_tw, en };
const locale = ref<keyof typeof locales>('zh-TW');
</script>
```

- 元件依 Nuxt UI 語系的 `code`（例如 `zh-TW`、`en`）選擇文案，切換時已顯示的元件立即更新。
- 搭配 `@nuxtjs/i18n` 時，把目前語系對應的 Nuxt UI 語系傳給 `UApp` 即可，見 Nuxt UI 的 [I18n](https://ui.nuxt.com/docs/getting-started/integrations/i18n/nuxt)。
- 驗證規則（`requiredText` 等）的錯誤訊息在驗證當下才產生，切換語系後重新驗證即為新語系。
- 日期選擇器的日曆月份、星期名稱跟著語系切換；民國年或西元年仍由 `roc` 決定。

### 沒有設定語系時

`UApp` 沒有設定 `locale` 時，元件使用模組選項 `shuoUi.locale`，預設為 `zh-TW`。只用英文的專案改為：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  shuoUi: { locale: 'en' }
});
```

### 未內建的語系

Nuxt UI 語系的代碼不是 `zh-TW` 或 `en` 時，依序使用：

1. `shuoUi.locales` 為這個代碼設定的文案（見下方[加入其他語系](#%E5%8A%A0%E5%85%A5%E5%85%B6%E4%BB%96%E8%AA%9E%E7%B3%BB)）。
2. 同語言的內建語系，例如 `en-GB` 使用英文、`zh-CN` 使用繁體中文。
3. 英文。

## 覆寫文案

`messages` 覆寫預設語系（`shuoUi.locale`）的文案，只需寫要改的項目：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  shuoUi: {
    messages: {
      file: { placeholder: '請選擇附件' },
      listCard: { title: '查詢清單' }
    }
  }
});
```

多語系的專案以 `locales` 依語系代碼覆寫，優先於 `messages`：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  shuoUi: {
    locales: {
      // 繁體中文
      'zh-TW': { listCard: { title: '查詢清單' } },

      // 英文
      'en': {
        validation: { required: '{label} cannot be empty' },
        listCard: { title: 'Search results' }
      }
    }
  }
});
```

`{label}`、`{min}`、`{unit}`、`{total}`、`{start}`、`{end}`、`{year}`、`{month}` 是佔位符，會在使用時替換。

`queryCard` 的 `collapse`、`expand` 會直接接在卡片標題前，組成收合按鈕的 aria-label（例如「收合查詢條件」），中間不另加空白，所以英文文案結尾留一個空格（`'Collapse '` 加上標題 `Filters` 成為 `Collapse Filters`）。

### 加入其他語系

在 `locales` 寫上語系代碼與文案即可加入內建以外的語系，代碼要和 Nuxt UI 語系的 `code` 相同。沒有翻譯的項目沿用同語言或英文的內建文案：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  shuoUi: {
    locales: {
      ja: {
        queryCard: { title: '検索条件', submit: '検索' },
        listCard: { title: '検索結果' }
      }
    }
  }
});
```

<note>

加入的語系不會改變日期選擇器日曆的語系，月份與星期名稱沿用同語言或英文的內建語系。

</note>

## 可覆寫的項目

<table>
<thead>
  <tr>
    <th>
      區塊
    </th>
    
    <th>
      項目
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        validation
      </code>
    </td>
    
    <td>
      <code>
        required
      </code>
      
      、<code>
        invalidNumber
      </code>
      
      、<code>
        invalidFormat
      </code>
      
      、<code>
        minValue
      </code>
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
        label
      </code>
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
        placeholder
      </code>
      
      、<code>
        clear
      </code>
      
      、<code>
        download
      </code>
      
      、<code>
        select
      </code>
      
      、<code>
        downloadFailedTitle
      </code>
      
      、<code>
        downloadFailedDescription
      </code>
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
        unit
      </code>
      
      （<code>
        unit
      </code>
      
       為 <code>
        true
      </code>
      
       時顯示的文字）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        inputText
      </code>
    </td>
    
    <td>
      <code>
        hide
      </code>
      
      、<code>
        show
      </code>
      
      （遮蔽顯示按鈕）
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
        areaCode
      </code>
      
      、<code>
        number
      </code>
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
        total
      </code>
      
      、<code>
        years
      </code>
      
      、<code>
        months
      </code>
      
      （無障礙名稱）、<code>
        yearUnit
      </code>
      
      、<code>
        monthUnit
      </code>
      
      （輸入框後的單位）
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
        searchPlaceholder
      </code>
      
      、<code>
        empty
      </code>
      
      （沒有選項時的文字）
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
        label
      </code>
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
        title
      </code>
      
      、<code>
        collapse
      </code>
      
      、<code>
        expand
      </code>
      
      、<code>
        submit
      </code>
      
      （隱藏送出按鈕的名稱）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        table
      </code>
    </td>
    
    <td>
      <code>
        empty
      </code>
      
      、<code>
        loading
      </code>
      
      （<code>
        ShuoTable
      </code>
      
       的空資料與查詢中文字）
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
        title
      </code>
      
      、<code>
        summary
      </code>
      
      （筆數統計，<code>
        {total}
      </code>
      
      、<code>
        {start}
      </code>
      
      、<code>
        {end}
      </code>
      
      ）
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
        hours
      </code>
      
      、<code>
        minutes
      </code>
      
      、<code>
        seconds
      </code>
      
      、<code>
        menu
      </code>
      
      、<code>
        calendarIcon
      </code>
      
      、<code>
        clearInput
      </code>
      
      、<code>
        toggleOverlay
      </code>
      
      、<code>
        monthPicker
      </code>
      
      、<code>
        yearPicker
      </code>
      
      、<code>
        nextMonth
      </code>
      
      、<code>
        prevMonth
      </code>
      
      、<code>
        nextYear
      </code>
      
      、<code>
        prevYear
      </code>
      
      、<code>
        openMonthsOverlay
      </code>
      
      、<code>
        openYearsOverlay
      </code>
      
      、<code>
        openTimePicker
      </code>
      
      、<code>
        closeTimePicker
      </code>
      
      、<code>
        timePicker
      </code>
      
      、<code>
        openTpOverlay
      </code>
      
      、<code>
        timeOverlay
      </code>
      
      、<code>
        incrementValue
      </code>
      
      、<code>
        decrementValue
      </code>
      
      、<code>
        yearOption
      </code>
      
      （年份清單）、<code>
        rangeSeparator
      </code>
      
      （範圍分隔）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        date
      </code>
    </td>
    
    <td>
      <code>
        year
      </code>
      
      、<code>
        month
      </code>
      
      （日期選擇器年、年月模式的顯示，例如「115 年 10 月」）
    </td>
  </tr>
</tbody>
</table>

內建文案可在 `node_modules/@shuo/ui/dist/runtime/locale/zh-tw.js` 與 `en.js` 查看。

## 單一元件覆寫

單一元件也可直接用 prop 覆寫，例如 `<ShuoFile placeholder="..." />`、`<ShuoListCard title="..." empty="..." />`，優先於模組設定，也不隨語系改變。

<note>

`messages`、`locales` 只放文案。下拉選單的顯示格式（`format`）、尺寸、每頁筆數等非文案的全站設定，請寫在 [`components`](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults)。開發期間在主控台顯示的警告訊息固定為繁體中文。

</note>


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
