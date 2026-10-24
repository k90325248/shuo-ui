---
title: "快速開始"
description: "用 UForm 與 Valibot 組出第一個表單，並認識全部元件。"
canonical_url: "https://k90325248.github.io/getting-started/quick-start"
---
# 快速開始

> 用 UForm 與 Valibot 組出第一個表單，並認識全部元件。

## 第一個表單

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

<tip>

`UFormField` 的 `name` 要對應 schema 與 state 的欄位名稱，元件會接入欄位的 id、尺寸、停用與錯誤狀態。驗證規則見[表單驗證](https://k90325248.github.io/guides/validation)。

</tip>

## 元件一覽

<table>
<thead>
  <tr>
    <th>
      元件
    </th>
    
    <th>
      用途
    </th>
    
    <th>
      v-model 型別
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/input-text">
        <code>
          ShuoInputText
        </code>
      </a>
    </td>
    
    <td>
      單行文字，可遮蔽
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/input-number">
        <code>
          ShuoInputNumber
        </code>
      </a>
    </td>
    
    <td>
      數字，千分位、小數、單位
    </td>
    
    <td>
      <code>
        number | null
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/textarea">
        <code>
          ShuoTextarea
        </code>
      </a>
    </td>
    
    <td>
      多行文字
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/select-menu">
        <code>
          ShuoSelectMenu
        </code>
      </a>
    </td>
    
    <td>
      下拉選單，可搜尋、多選
    </td>
    
    <td>
      <code>
        string
      </code>
      
      ／多選為 <code>
        string[]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/datepicker">
        <code>
          ShuoDatepicker
        </code>
      </a>
    </td>
    
    <td>
      日期、年月、日期時間，範圍
    </td>
    
    <td>
      <code>
        string
      </code>
      
      ／範圍為 <code>
        [string, string]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/checkbox">
        <code>
          ShuoCheckbox
        </code>
      </a>
    </td>
    
    <td>
      單一核取方塊
    </td>
    
    <td>
      <code>
        string | number | boolean
      </code>
      
      （預設 <code>
        1
      </code>
      
      ／<code>
        0
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/choice-group">
        <code>
          ShuoRadioGroup
        </code>
      </a>
    </td>
    
    <td>
      單選群組
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/choice-group">
        <code>
          ShuoCheckboxGroup
        </code>
      </a>
    </td>
    
    <td>
      複選群組
    </td>
    
    <td>
      <code>
        string[]
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/file">
        <code>
          ShuoFile
        </code>
      </a>
    </td>
    
    <td>
      單檔選擇與既有附件下載
    </td>
    
    <td>
      <code>
        File | null
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/months">
        <code>
          ShuoMonths
        </code>
      </a>
    </td>
    
    <td>
      年月數換算輸入
    </td>
    
    <td>
      總月數 <code>
        number | null
      </code>
      
      （另有 <code>
        year
      </code>
      
      、<code>
        month
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/phone">
        <code>
          ShuoPhone
        </code>
      </a>
    </td>
    
    <td>
      區碼加電話號碼
    </td>
    
    <td>
      <code>
        string
      </code>
      
      （另有 <code>
        areaCode
      </code>
      
      、<code>
        number
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/query-card">
        <code>
          ShuoQueryCard
        </code>
      </a>
    </td>
    
    <td>
      可收合的查詢條件表單卡片
    </td>
    
    <td>
      <code>
        open
      </code>
      
      （<code>
        boolean
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/list-card">
        <code>
          ShuoListCard
        </code>
      </a>
    </td>
    
    <td>
      查詢結果清單卡片（標題、表格與後端分頁）
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/table">
        <code>
          ShuoTable
        </code>
      </a>
    </td>
    
    <td>
      純表格（無卡片與分頁），含骨架與高度過渡
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/info-tooltip">
        <code>
          ShuoInfoTooltip
        </code>
      </a>
    </td>
    
    <td>
      資訊圖示加提示
    </td>
    
    <td>
      —
    </td>
  </tr>
</tbody>
</table>


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
