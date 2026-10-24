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

`mask` 為 `true` 時全部遮蔽，正整數遮蔽最後指定碼數。右側眼睛按鈕切換明碼與遮蔽，`v-model` 始終保留原始文字。

<component-example name="input-text-mask">



</component-example>

- `12345678` 搭配 `:mask="4"` 顯示 `1234••••`；不足四碼時全部遮蔽。`false`、`0`、負數與非有限數字不啟用，小數向下取整。
- 遮蔽狀態禁止複製及剪下，顯示明碼後可正常複製。
- 動態變更 `mask` 或 `hideMaskToggle` 會重設為遮蔽狀態。
- 以 `ui.base` 改變文字對齊時，局部遮蔽的顯示層跟著對齊。

### 沿用 Nuxt UI

`UInput` 的 props 與 slots 都能直接使用，例如 `variant`、`icon` 與 `#leading`。

<component-example name="input-text-nuxt-ui">



</component-example>

### 載入中、停用與骨架

停用時仍可切換顯示；骨架期間不可操作。

<component-example name="input-text-states">



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
  
  <tr>
    <td>
      <code>
        trailing
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

`ui` 同 Nuxt UI `UInput` 的 `ui`，與內建樣式合併，見[單一元件的 `ui` prop](https://k90325248.github.io/guides/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)。`ui.root` 內建 `w-full min-w-0`；有遮蔽時 `ui.trailing` 加上 `pointer-events-auto` 讓眼睛按鈕可點擊。`class` 在 `ui.root` 之後合併，可覆寫寬度與最小寬度（例如 `class="min-w-20"`）。

---

- [UInput](https://ui.nuxt.com/docs/components/input)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
