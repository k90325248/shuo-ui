---
title: "InputText"
description: "單行文字輸入，可遮蔽全部或最後幾碼。"
canonical_url: "https://k90325248.github.io/components/input-text"
---
# InputText

> 單行文字輸入，可遮蔽全部或最後幾碼。

`v-model: string`。

## 用法

### 遮蔽

`mask` 為 `true` 時全部遮蔽，正整數遮蔽最後指定碼數。右側眼睛按鈕切換明碼與遮蔽，`hide-mask-toggle` 可隱藏這個按鈕；`v-model` 始終保留原始文字。

<component-example name="input-text-mask">



</component-example>

- `12345678` 搭配 `:mask="4"` 顯示 `1234••••`；不足四碼時全部遮蔽。`false`、`0`、負數與非有限數字不啟用，小數向下取整。
- 遮蔽狀態禁止複製及剪下，顯示明碼後可正常複製。
- 動態變更 `mask` 或 `hideMaskToggle` 會重設為遮蔽狀態。
- 以 `ui.base` 改變文字對齊時，局部遮蔽的顯示層跟著對齊。

### 切換按鈕圖示

`reveal-icon` 是遮蔽中顯示的圖示（按下顯示明碼），`conceal-icon` 是顯示明碼時的圖示（按下恢復遮蔽）。

<component-example name="input-text-mask-icons">



</component-example>

### 外觀

沿用 `UInput` 的 `variant`、`color` 與 `highlight`。

<component-example name="input-text-variant">



</component-example>

### 圖示

沿用 `UInput` 的 `icon`；`trailing` 為 `true` 時圖示放在右側。

<component-example name="input-text-icon">



</component-example>

### 尺寸與狀態

停用時仍可切換明碼顯示；骨架期間不可操作。各狀態的共通行為見[共用參數](https://k90325248.github.io/components/common)。

<component-example name="input-text-states">



</component-example>

## 範例

### 搭配表單驗證

必填用 `requiredText`，格式另外以 `v.regex` 檢查。遮蔽只影響顯示，驗證與送出的都是原始文字。

<component-example name="input-text-validation">



</component-example>

### 前置圖示與遮蔽並用

`#leading` 放在左側，眼睛按鈕仍在右側，兩者可同時使用。

<component-example name="input-text-leading-mask">



</component-example>

### 清除按鈕

以 `#trailing` 放入清除按鈕。有遮蔽或載入中時，尾端優先顯示眼睛按鈕或載入圖示，見下方 [Slots](#slots)。

<component-example name="input-text-clearable">



</component-example>

### 操作原生 input

透過 template ref 的 `inputRef` 取得原生 input。

<component-example name="input-text-expose">



</component-example>

## Props

<component-props name="ShuoInputText">



</component-props>

`size`、`disabled`、`loading`、`skeleton`、`id`、`name` 的行為見[共用參數](https://k90325248.github.io/components/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)。`type` 由 `mask` 決定，不開放傳入。

## Slots

<table>
<thead>
  <tr>
    <th>
      Slot
    </th>
    
    <th>
      參數
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
      <code>
        ui
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
      <code>
        ui
      </code>
    </td>
    
    <td>
      輸入框內的額外內容
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        trailing
      </code>
    </td>
    
    <td>
      <code>
        ui
      </code>
    </td>
    
    <td>
      尾端內容；優先順序為「載入圖示 > 遮罩切換按鈕 > <code>
        trailing
      </code>
      
       slot」
    </td>
  </tr>
</tbody>
</table>

參數同 Nuxt UI `UInput`。

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
      原生 input，可直接 <code>
        focus()
      </code>
      
      、<code>
        select()
      </code>
    </td>
  </tr>
</tbody>
</table>

## 樣式

`ui` 可用 Nuxt UI `UInput` 的所有 slot，與內建樣式合併，見[單一元件的 `ui` prop](https://k90325248.github.io/guides/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)：

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
        root
      </code>
    </td>
    
    <td>
      外框（Nuxt UI）
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
        trailing
      </code>
    </td>
    
    <td>
      尾端內容外層（Nuxt UI）
    </td>
    
    <td>
      有遮蔽時為 <code>
        pointer-events-auto
      </code>
      
      ，讓眼睛按鈕可點擊
    </td>
  </tr>
</tbody>
</table>

`class` 在 `ui.root` 之後合併，可覆寫寬度與最小寬度（例如 `class="min-w-20"`）。

## 更新紀錄

<component-changelog name="ShuoInputText">



</component-changelog>

---

- [UInput](https://ui.nuxt.com/docs/components/input)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
