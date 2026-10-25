---
title: "SelectMenu"
description: "下拉選單，可搜尋、多選，文字過長時顯示完整提示。"
canonical_url: "https://k90325248.github.io/components/select-menu"
---
# SelectMenu

> 下拉選單，可搜尋、多選，文字過長時顯示完整提示。

`v-model`：單選為選項的 value，多選（`multiple`）為 value 陣列；清空時的值見 [`empty-value`](#%E5%96%AE%E9%81%B8%E8%88%87%E5%A4%9A%E9%81%B8)。

## 用法

### 單選與多選

單選綁定選項的 value；`multiple` 時綁定 value 陣列，已選取的名稱以「、」連接。單選未選取時為 `empty-value`（預設 `''`，可改為 `null`），多選為 `[]`。

<component-example name="select-menu-basic">



</component-example>

### 顯示格式

`format` 預設 `{label}`，只顯示名稱。`{value}`、`{label}` 會被替換，替換結果不再二次解析，未知標記原樣保留。選項與已選取文字都套用同一格式。

<component-example name="select-menu-format">



</component-example>

要讓整個專案都顯示「值_名稱」，在全站設定 `format`：

<code-group>

```vue [單一元件]
<ShuoSelectMenu v-model="state.type" :items="items" format="{value}_{label}" />
```

```ts [全站設定]
// nuxt.config.ts
export default defineNuxtConfig({
  shuoUi: {
    components: {
      selectMenu: { format: '{value}_{label}' }
    }
  }
});
```

</code-group>

### 自訂選項欄位

後端欄位不是 `label`、`value` 時，以 `label-key`、`value-key` 指定。`USelectMenu` 的 `description-key` 等 props 也能直接使用，欄位名稱依 `items` 推導，寫錯會有型別錯誤。

<component-example name="select-menu-keys">



</component-example>

### 搜尋

選單內建搜尋框，提示文字為「關鍵字查詢...」，可由[文案覆寫](https://k90325248.github.io/guides/messages#%E5%8F%AF%E8%A6%86%E5%AF%AB%E7%9A%84%E9%A0%85%E7%9B%AE)調整。關鍵字查詢依 `label-key` 欄位比對，不受顯示格式影響。選項很少時可傳 `:search-input="false"` 隱藏搜尋框。

<component-example name="select-menu-search">



</component-example>

### 外觀

沿用 `USelectMenu` 的 `variant`、`color` 與 `highlight`。

<component-example name="select-menu-variant">



</component-example>

### 圖示

沿用 `USelectMenu` 的 `icon` 與 `trailing-icon`；`icon` 顯示在左側，`trailing-icon` 取代右側的箭頭。

<component-example name="select-menu-icon">



</component-example>

### 尺寸與狀態

載入中以轉圈圖示取代右側箭頭並停用選單。切換骨架、停用或載入中時會關閉已開啟的選單，還原後不自動重開。各狀態的共通行為見[共用參數](https://k90325248.github.io/components/common)。

<component-example name="select-menu-states">



</component-example>

## 範例

### 搭配表單驗證

單選未選取為 `''`，用 `requiredText`；多選未選取為 `[]`，用 `requiredArray`。

<component-example name="select-menu-validation">



</component-example>

### 長文字省略提示

已選取文字超過寬度時以省略號截斷，滑鼠移入或聚焦時以 Tooltip 顯示完整文字；選單開啟時不顯示。寬度設定在 `ui.wrapper`，見下方[樣式](#%E6%A8%A3%E5%BC%8F)。

<component-example name="select-menu-truncate">



</component-example>

### 非同步載入選項

向後端查詢選項時以 `loading` 顯示轉圈圖示並停用選單，查詢完成後填入 `items`。綁定值找不到對應選項時顯示 `placeholder`，選項回來後自動顯示名稱。

<component-example name="select-menu-async">



</component-example>

### 連動選單

縣市改變時清空區域，區域的 `items` 由縣市計算。

<component-example name="select-menu-cascade">



</component-example>

### 開啟選單

透過 template ref 的 `triggerRef` 取得觸發按鈕，呼叫 `click()` 開啟選單。

<component-example name="select-menu-expose">



</component-example>

## Props

<component-props name="ShuoSelectMenu">



</component-props>

`size`、`disabled`、`loading`、`skeleton`、`id`、`name` 的行為見[共用參數](https://k90325248.github.io/components/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)。

`open` 未設定時由使用者操作開關，不提供 v-model。`clear`、`clearIcon` 的型別依 Nuxt UI 的另一個泛型推導，本元件未提供，因此不列入型別。

## Slots

`USelectMenu` 的 slot 全部可用（`leading`、`trailing`、`item`、`item-leading`、`content-top` 等）。以下三個有傳入時取代元件的內建內容：

<table>
<thead>
  <tr>
    <th>
      Slot
    </th>
    
    <th>
      內建內容
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        item-label
      </code>
    </td>
    
    <td>
      依 <code>
        format
      </code>
      
       格式化的選項文字
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        default
      </code>
    </td>
    
    <td>
      依 <code>
        format
      </code>
      
       格式化的已選取文字
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        empty
      </code>
    </td>
    
    <td>
      「無可用選項」
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
        triggerRef
      </code>
    </td>
    
    <td>
      <code>
        HTMLButtonElement | null
      </code>
    </td>
    
    <td>
      觸發按鈕
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        viewportRef
      </code>
    </td>
    
    <td>
      <code>
        HTMLDivElement | null
      </code>
    </td>
    
    <td>
      選單捲動區域
    </td>
  </tr>
</tbody>
</table>

## 樣式

`ui` 可用 Nuxt UI `USelectMenu` 的所有 slot，另外提供 `wrapper`：

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
      外層，量測省略文字並掛 Tooltip
    </td>
    
    <td>
      <code>
        flex w-full min-w-0
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
      觸發按鈕（Nuxt UI）
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
        value
      </code>
      
      、<code>
        placeholder
      </code>
    </td>
    
    <td>
      已選取文字、提示文字（Nuxt UI）
    </td>
    
    <td>
      <code>
        min-w-0 truncate
      </code>
    </td>
  </tr>
</tbody>
</table>

要縮短寬度時設定 `ui.wrapper`（例如 `w-40`），觸發按鈕會填滿外層；`class` 落在觸發按鈕，不影響外層。`ui.value`、`ui.placeholder` 在已選取、未選取與找不到選項時都套用。

## 更新紀錄

<component-changelog name="ShuoSelectMenu">



</component-changelog>

---

- [USelectMenu](https://ui.nuxt.com/docs/components/select-menu)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.
