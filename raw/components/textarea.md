---
title: "Textarea"
description: "多行文字輸入，保留換行，可自動調整高度。"
canonical_url: "https://k90325248.github.io/components/textarea"
---
# Textarea

> 多行文字輸入，保留換行，可自動調整高度。

`v-model: string`，保留換行。

## 用法

### 行數與自動高度

未啟用 `autoresize` 時可上下拖拉調整高度，最低不小於同尺寸單行輸入框。

<component-example name="textarea-basic">



</component-example>

### 載入中、停用與骨架

載入中在右上角顯示轉圈圖示，位置同 Nuxt UI 的尾端圖示，不取代左側 `icon`、也不推移文字起點。骨架保留 `rows` 對應的高度。

<component-example name="textarea-states">



</component-example>

## Props

<component-props name="ShuoTextarea">



</component-props>

`size`、`disabled`、`loading`、`skeleton`、`name` 的行為見[共用參數](https://k90325248.github.io/components/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)。

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
      尾端內容；載入中不顯示，由載入圖示佔用同一位置
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

---

- [UTextarea](https://ui.nuxt.com/docs/components/textarea)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
