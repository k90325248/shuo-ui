---
title: "Textarea"
description: "多行文字輸入，保留換行，可自動調整高度。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/components/text/textarea"
---
# Textarea

> 多行文字輸入，保留換行，可自動調整高度。

`v-model: string`，保留換行。

## 用法

### 行數與自動高度

`rows` 是基本行數（Nuxt UI 預設 `3`）。`autoresize` 為 `true` 時高度隨內容增加，最少 `rows` 行，最多 `maxrows` 行，超過後出現捲軸；`maxrows` 為 `0` 時不限。

<component-example name="textarea-autoresize">



</component-example>

- 未啟用 `autoresize` 時可上下拖拉調整高度，最低不小於同尺寸單行輸入框；啟用後不能拖拉。
- `autoresize`、`rows`、`maxrows`、`fixed` 可在全站設定預設值，見[可設定的項目](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#%E5%8F%AF%E8%A8%AD%E5%AE%9A%E7%9A%84%E9%A0%85%E7%9B%AE)。

### 外觀

沿用 `UTextarea` 的 `variant`、`color` 與 `highlight`。

<component-example name="textarea-variant">



</component-example>

### 圖示

沿用 `UTextarea` 的 `icon`；`trailing` 為 `true` 時圖示放在右側。

<component-example name="textarea-icon">



</component-example>

### 尺寸與狀態

載入中在右上角顯示轉圈圖示，位置同 Nuxt UI 的尾端圖示，不取代左側 `icon`、也不推移文字起點。骨架保留 `rows` 對應的高度。各狀態的共通行為見[共用參數](https://k90325248.github.io/shuo-ui/components/overview/common)。

<component-example name="textarea-states">



</component-example>

## 範例

### 搭配表單驗證

必填用 `requiredText`，純空白也不通過；字數下限另以 `v.minLength` 檢查。

<component-example name="textarea-validation">



</component-example>

### 字數上限與計數

`maxlength` 是原生字數上限，達到上限後無法再輸入。搭配 `UFormField` 的 `hint` 顯示目前字數。

<component-example name="textarea-maxlength">



</component-example>

### 快捷鍵送出

事件會轉給原生 textarea，可直接加上鍵盤修飾符。下例按 Ctrl＋Enter（macOS 為 ⌘＋Enter）送出留言，單獨按 Enter 仍是換行。

<component-example name="textarea-shortcut">



</component-example>

### 操作原生 textarea

透過 template ref 的 `textareaRef` 取得原生 textarea；另有 `autoResize()` 可依內容重新計算自動高度，見下方 [Expose](#expose)。

<component-example name="textarea-expose">



</component-example>

## Props

<component-props name="ShuoTextarea">



</component-props>

`size`、`disabled`、`loading`、`skeleton`、`id`、`name` 的行為見[共用參數](https://k90325248.github.io/shuo-ui/components/overview/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)。

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
      尾端內容；載入中不顯示，由載入圖示佔用同一位置
    </td>
  </tr>
</tbody>
</table>

參數同 Nuxt UI `UTextarea`。

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
        textareaRef
      </code>
    </td>
    
    <td>
      <code>
        HTMLTextAreaElement | null
      </code>
    </td>
    
    <td>
      原生 textarea
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        autoResize
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      依內容重新計算自動高度
    </td>
  </tr>
</tbody>
</table>

## 樣式

`ui` 可用 Nuxt UI `UTextarea` 的所有 slot，另外提供 `loading`：

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
        base
      </code>
    </td>
    
    <td>
      原生 textarea（Nuxt UI）
    </td>
    
    <td>
      依尺寸的最小高度；未啟用 <code>
        autoresize
      </code>
      
       時 <code>
        resize-y
      </code>
      
      ；載入中加右內距
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        loading
      </code>
    </td>
    
    <td>
      右上角載入圖示的外層
    </td>
    
    <td>
      <code>
        pointer-events-none absolute end-0 flex items-start
      </code>
      
      ，依尺寸的位置
    </td>
  </tr>
</tbody>
</table>

## 更新紀錄

<component-changelog name="ShuoTextarea">



</component-changelog>

---

- [UTextarea](https://ui.nuxt.com/docs/components/textarea)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
