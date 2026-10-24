---
title: "File"
description: "單檔選擇與既有附件下載，選檔不會自動上傳。"
canonical_url: "https://k90325248.github.io/components/file"
---
# File

> 單檔選擇與既有附件下載，選檔不會自動上傳。

`v-model: File | null`，必須提供；選檔不會自動上傳。

## 用法

### 選擇檔案

綁定原始 `File`，選檔不會自動上傳；清除後為 `null`。`accept` 只篩選選檔對話框，不阻擋其他類型，類型限制請由表單規則驗證。

<component-example name="file-basic">



</component-example>

### 既有附件

沒有本機 `File` 時顯示 `file-name`；按下載以 Blob 取得 `file-url` 的內容，跨來源網址須允許 CORS，下載失敗會顯示 Toast（需 `UApp`）。停用時隱藏移除按鈕，但已有附件仍可下載；載入中則一律不可操作。

<component-example name="file-existing">



</component-example>

## Props

<component-props name="ShuoFile">



</component-props>

`size`、`disabled`、`loading`、`skeleton` 的行為見[共用參數](https://k90325248.github.io/components/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)。尾端固定為清除與下載按鈕，`trailing`、`trailingIcon` 不開放；識別碼與錯誤外觀取自 `UFormField`。

## Slots

<table>
<thead>
  <tr>
    <th>
      Slot
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
        leading
      </code>
    </td>
    
    <td>
      前置內容；未傳時保留 <code>
        icon
      </code>
      
      、<code>
        leadingIcon
      </code>
      
      、<code>
        avatar
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        default
      </code>
    </td>
    
    <td>
      輸入框內的額外內容
    </td>
  </tr>
</tbody>
</table>

## Expose

<table>
<thead>
  <tr>
    <th>
      名稱
    </th>
    
    <th>
      型別
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
        inputRef
      </code>
    </td>
    
    <td>
      <code>
        HTMLInputElement | null
      </code>
    </td>
    
    <td>
      顯示檔名的原生 input
    </td>
  </tr>
</tbody>
</table>

## 樣式

`ui` 可用 Nuxt UI `UInput` 的所有 slot，另外提供 `wrapper`，合併規則見[單一元件的 `ui` prop](https://k90325248.github.io/guides/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)：

<table>
<thead>
  <tr>
    <th>
      Slot
    </th>
    
    <th>
      部位
    </th>
    
    <th>
      內建樣式
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        wrapper
      </code>
    </td>
    
    <td>
      外層，量測省略檔名並掛 Tooltip
    </td>
    
    <td>
      <code>
        flex w-full min-w-0 cursor-default
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        root
      </code>
    </td>
    
    <td>
      輸入框外框（Nuxt UI）
    </td>
    
    <td>
      <code>
        w-full min-w-0
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        base
      </code>
    </td>
    
    <td>
      檔名欄位（Nuxt UI）
    </td>
    
    <td>
      <code>
        truncate
      </code>
      
      、游標與滑過底色；右內距依尾端按鈕數為 <code>
        pe-9
      </code>
      
       或 <code>
        pe-16
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        trailing
      </code>
    </td>
    
    <td>
      清除與下載按鈕的外層（Nuxt UI）
    </td>
    
    <td>
      <code>
        pointer-events-auto cursor-default gap-1 pe-2
      </code>
    </td>
  </tr>
</tbody>
</table>

要縮短寬度時設定 `ui.wrapper`（例如 `w-60`）；`class` 落在輸入框外框。

---

- [UInput](https://ui.nuxt.com/docs/components/input)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
