---
title: "File"
description: "單檔選擇與既有附件下載，選檔不會自動上傳。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/components/phone-file/file"
---
# File

> 單檔選擇與既有附件下載，選檔不會自動上傳。

`v-model: File | null`，必須提供；選檔不會自動上傳。

## 用法

### 選擇檔案

綁定原始 `File`；清除後為 `null`。點擊欄位，或聚焦後按 Enter、空白鍵開啟選檔對話框。`accept` 只篩選選檔對話框，不阻擋其他類型，類型限制請由表單規則驗證。

<component-example name="file-basic">



</component-example>

### 既有附件

沒有本機 `File` 時顯示 `file-name`；按下載以 Blob 取得 `file-url` 的內容，跨來源網址須允許 CORS，下載失敗會顯示 Toast（需 `UApp`）。檔名被省略時，滑鼠移入或鍵盤聚焦會顯示完整檔名，觸控裝置長按顯示（見 [Tooltip](https://k90325248.github.io/shuo-ui/components/helper/tooltip#%E8%A7%B8%E6%8E%A7%E9%95%B7%E6%8C%89)），長按不會開啟選檔。

<component-example name="file-existing">



</component-example>

### 按鈕圖示

`select-icon` 是尚無檔案時的選擇檔案按鈕，`clear-icon` 是清除按鈕，`download-icon` 是有檔案時的下載按鈕。清除按鈕只在有本機 `File` 且未停用時顯示。

<component-example name="file-icons">



</component-example>

### 外觀

沿用 `UInput` 的 `variant` 與 `icon`。`ShuoFile` 沒有 `color` 與 `highlight`，顏色與錯誤外框沿用 `UFormField`。

<component-example name="file-variant">



</component-example>

### 尺寸與狀態

停用時隱藏清除按鈕，但已有附件仍可下載；載入中以轉圈圖示取代尾端按鈕，一律不可操作。各狀態的共通行為見[共用參數](https://k90325248.github.io/shuo-ui/components/overview/common)。

<component-example name="file-states">



</component-example>

## 範例

### 搭配表單驗證

必填、類型與大小以 Valibot 的 `v.file`、`v.mimeType`、`v.maxSize` 檢查；`accept` 只影響選檔對話框，實際限制以 schema 為準。

<component-example name="file-validation">



</component-example>

### 選檔後再上傳

選檔不會自動上傳，由頁面決定何時送出 `v-model` 的 `File`。範例按「上傳」後以 `loading` 停用欄位，完成後清空 `v-model`，改以 `file-name`、`file-url` 顯示為既有附件。

<component-example name="file-upload">



</component-example>

### 操作原生 input

透過 template ref 的 `inputRef` 取得顯示檔名的原生 input。

<component-example name="file-expose">



</component-example>

## Props

<component-props name="ShuoFile">



</component-props>

`size`、`disabled`、`loading`、`skeleton` 的行為見[共用參數](https://k90325248.github.io/shuo-ui/components/overview/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)。尾端固定為清除與下載按鈕，`trailing`、`trailingIcon` 不開放；識別碼與錯誤外觀取自 `UFormField`。

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

`ui` 可用 Nuxt UI `UInput` 的所有 slot，另外提供 `wrapper`，合併規則見[單一元件的 `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)：

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

## 更新紀錄

<component-changelog name="ShuoFile">



</component-changelog>

---

- [UInput](https://ui.nuxt.com/docs/components/input)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
